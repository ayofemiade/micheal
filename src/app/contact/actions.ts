"use server";

import { ASSESSMENT, areaLabel } from "@/data/contact";
import { validateInquiry, type InquiryState } from "@/lib/inquiry";

const text = (data: FormData, key: string) => {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
};

/**
 * Sends one inquiry through Resend (https://resend.com/docs/api-reference/emails/send-email).
 * "sent" is returned only when Resend confirms it accepted the email with an id.
 * Missing settings or any provider failure come back as "failed", never success.
 *
 * Settings, on the server only (see .env.example): RESEND_API_KEY, CONTACT_TO_EMAIL,
 * and CONTACT_FROM_EMAIL once a sending domain is verified.
 */
export async function sendInquiry(data: FormData): Promise<InquiryState> {
  const values = { name: text(data, "name"), email: text(data, "email"), message: text(data, "message") };
  const errors = validateInquiry(values);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  // The hidden field only software fills in. Answered honestly, so a person
  // whose browser filled it by mistake sees a failure rather than losing it.
  if (text(data, "website")) return { status: "failed" };

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return { status: "failed" };
  }

  const area = areaLabel(text(data, "area"));
  const assessment = area !== null && text(data, "area") === "mao-contractors" && text(data, "context") === ASSESSMENT;
  const subject = `Website inquiry: ${assessment ? "Renovation assessment" : (area ?? "General")}`;
  const lines = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Area of interest: ${area ?? "Not selected"}`,
    ...(assessment ? ["Asking about: Renovation assessment"] : []),
    "",
    values.message.trim(),
  ];

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Segun Michael website <onboarding@resend.dev>",
        to: [to],
        reply_to: values.email.trim(),
        subject,
        text: lines.join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const body = (await response.json().catch(() => null)) as { id?: string } | null;
    if (response.ok && body?.id) return { status: "sent" };
    console.error(`Contact form: Resend answered ${response.status}.`);
  } catch (error) {
    console.error("Contact form: delivery failed.", error);
  }
  return { status: "failed" };
}
