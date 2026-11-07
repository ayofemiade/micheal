import { contact } from "@/data/contact";

/** The same rules run in the browser, for instant errors, and on the server, where they count. */

export interface InquiryValues {
  name: string;
  email: string;
  message: string;
}

export type InquiryErrors = Partial<Record<keyof InquiryValues, string>>;

export type InquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: InquiryErrors }
  | { status: "failed" }
  | { status: "sent" };

const { errors } = contact.inquiry;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry({ name, email, message }: InquiryValues): InquiryErrors {
  const found: InquiryErrors = {};
  if (!name.trim()) found.name = errors.name;
  else if (name.length > 120) found.name = errors.long;
  if (!email.trim()) found.email = errors.email;
  else if (email.length > 254 || !EMAIL.test(email.trim())) found.email = errors.emailFormat;
  if (!message.trim()) found.message = errors.message;
  else if (message.length > 6000) found.message = errors.long;
  return found;
}
