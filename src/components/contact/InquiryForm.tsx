"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { sendInquiry } from "@/app/contact/actions";
import { ASSESSMENT, areas, contact, type AreaValue } from "@/data/contact";
import { validateInquiry, type InquiryState, type InquiryValues } from "@/lib/inquiry";

const copy = contact.inquiry;
const EMPTY: InquiryValues = { name: "", email: "", message: "" };

/** Checks first, so errors are instant. A dropped connection becomes a failure, not a crash. */
async function submit(_previous: InquiryState, data: FormData): Promise<InquiryState> {
  const errors = validateInquiry({
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    message: String(data.get("message") ?? ""),
  });
  if (Object.keys(errors).length) return { status: "invalid", errors };
  try {
    return await sendInquiry(data);
  } catch {
    return { status: "failed" };
  }
}

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="ct-error">
      {text}
    </p>
  );
}

/**
 * One form for every inquiry. Every value lives in state, so nothing typed is
 * lost when a submission fails: only a confirmed send clears it. The page keys
 * this component to its link, so a new route can never inherit an old selection.
 */
export function InquiryForm({ area: startArea, assessment }: { area: AreaValue | null; assessment: boolean }) {
  const [state, action, pending] = useActionState(submit, { status: "idle" });
  const [values, setValues] = useState(EMPTY);
  const [area, setArea] = useState<AreaValue | null>(startArea);
  const form = useRef<HTMLFormElement>(null);
  const thanks = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state.status === "invalid") form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    if (state.status === "sent") thanks.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <p ref={thanks} tabIndex={-1} role="status" className="ct-thanks">
        {copy.success}
      </p>
    );
  }

  const errors = state.status === "invalid" ? state.errors : {};
  const update = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [event.target.name]: event.target.value }));
  // Submitted by hand: <form action> would reset the radios after every attempt,
  // and a second press or Enter while sending would queue a second email.
  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    startTransition(() => action(data));
  };
  const showAssessment = assessment && area === "mao-contractors";

  return (
    <form ref={form} onSubmit={send} noValidate className="ct-form">
      <fieldset className="ct-areas">
        <legend className="t-scale">{copy.area}</legend>
        {areas.map((option) => (
          <label key={option.value} className="ct-area">
            <input
              type="radio"
              name="area"
              value={option.value}
              checked={area === option.value}
              onChange={() => setArea(option.value)}
            />
            <span className="ct-area-mark" aria-hidden="true" />
            <span className="ct-area-name">
              {option.label}
              {option.value === "mao-contractors" && showAssessment && (
                <small data-assessment>{copy.assessmentNote}</small>
              )}
            </span>
          </label>
        ))}
        {showAssessment && <input type="hidden" name="context" value={ASSESSMENT} />}
      </fieldset>

      <div className="ct-letter">
        <div className="ct-pair">
          <div className="ct-field">
            <label htmlFor="ct-name">
              <span className="t-scale">{copy.name}</span>
              <span className="t-scale ct-required">Required</span>
            </label>
            <input
              id="ct-name"
              name="name"
              autoComplete="name"
              required
              value={values.name}
              onChange={update}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "ct-name-error" : undefined}
            />
            <FieldError id="ct-name-error" text={errors.name} />
          </div>
          <div className="ct-field">
            <label htmlFor="ct-email">
              <span className="t-scale">{copy.email}</span>
              <span className="t-scale ct-required">Required</span>
            </label>
            <input
              id="ct-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={values.email}
              onChange={update}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "ct-email-error" : undefined}
            />
            <FieldError id="ct-email-error" text={errors.email} />
          </div>
        </div>

        <div className="ct-field">
          <label htmlFor="ct-message">
            <span className="t-scale">{copy.message}</span>
            <span className="t-scale ct-required">Required</span>
          </label>
          <textarea
            id="ct-message"
            name="message"
            rows={3}
            required
            value={values.message}
            onChange={update}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={`ct-prompt${errors.message ? " ct-message-error" : ""}`}
          />
          <FieldError id="ct-message-error" text={errors.message} />
          <p id="ct-prompt" className="ct-prompt">
            {copy.prompt}
          </p>
          <p className="ct-prompt">
            <Link href="/privacy" className="link-quiet">
              {copy.privacy}
            </Link>
          </p>
        </div>

        {/* Left empty by people, filled by form-filling software. */}
        <div className="ct-trap" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        <div className="ct-send">
          <button type="submit" className="cta cta-plain" disabled={pending} aria-busy={pending} data-pending={pending || undefined}>
            {pending ? copy.sending : copy.submit}
          </button>
          <p role="alert" className="ct-failed">
            {state.status === "failed" && !pending ? copy.errors.failed : ""}
          </p>
        </div>
      </div>
    </form>
  );
}
