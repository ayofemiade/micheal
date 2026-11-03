import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/data/site";

/**
 * Section 08 — Closing Statement & CTA
 * A calm, authoritative final invitation that brings the visitor journey
 * to a close and offers both the primary Listening Hub action and direct contact.
 */
export function ClosingSection() {
  return (
    <section
      aria-labelledby="closing-title"
      className="on-dark border-ivory/12 bg-charcoal-deep text-ivory relative overflow-hidden border-b py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="via-terracotta-light/40 pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
      />

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-terracotta-light font-mono text-[0.75rem] font-semibold tracking-[0.16em] uppercase">
                Begin the Conversation
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                id="closing-title"
                className="t-h1 text-ivory mt-4 max-w-[18ch] text-balance"
              >
                Every meaningful connection begins with a{" "}
                <span className="text-terracotta-light italic">
                  conversation.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="t-lead text-sand/80 mt-5 max-w-[48ch] text-pretty">
                Whether you are seeking a dedicated listening session, a visual
                or editorial collaboration, or structured coordination for a
                property project, I would be glad to hear from you.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
            <Reveal delay={0.18}>
              <div className="flex flex-wrap items-center gap-4 lg:flex-col lg:items-stretch">
                <Button href={siteConfig.bookingHref} variant="light">
                  Book a Listening Session
                </Button>
                <Button href="/contact" variant="outlineLight">
                  Let&rsquo;s Connect
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
