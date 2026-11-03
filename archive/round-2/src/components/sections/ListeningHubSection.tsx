import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/data/site";

const listeningPillars = [
  {
    title: "Unhurried presence",
    body: "A quiet conversation without interruption, agenda, or the pressure to perform.",
  },
  {
    title: "Room to think aloud",
    body: "Untangle complex decisions, transitions, or responsibilities by speaking them through with an attentive listener.",
  },
  {
    title: "Grounded perspective",
    body: "Leave with greater calm, personal clarity, and a steadier sense of your next step.",
  },
] as const;

/**
 * Section 07 — Listening Hub Feature
 * Designed as an intimate, warm evening sanctuary (`bg-charcoal text-ivory`)
 * to give the Listening Hub strong conversion focus while maintaining clear,
 * honest non-clinical boundaries.
 */
export function ListeningHubSection() {
  return (
    <section
      id="listening-hub"
      aria-labelledby="listening-hub-title"
      className="on-dark section-y border-ivory/12 bg-charcoal text-ivory relative overflow-hidden border-b"
    >
      {/* Subtle architectural radial warmth */}
      <div
        aria-hidden
        className="bg-terracotta/12 pointer-events-none absolute -top-40 right-1/4 h-[32rem] w-[32rem] rounded-full blur-3xl"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Sculpted Arch Portrait & Motto */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="mx-auto max-w-[26rem] lg:max-w-none">
                <div className="border-ivory/18 bg-charcoal-deep overflow-hidden rounded-t-[12rem] rounded-b-xs border p-3.5 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.55)]">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[11.5rem] rounded-b-[2px] bg-[#E8DFD1]">
                    <Image
                      src="/images/portraits/segun-listening.jpg"
                      alt="Segun Michael seated attentively at a table with hands clasped, offering a warm, welcoming presence."
                      fill
                      sizes="(min-width: 1024px) 36vw, 88vw"
                      className="object-cover object-[50%_16%] mix-blend-multiply contrast-[1.04]"
                    />
                    <div
                      aria-hidden
                      className="from-charcoal-deep/45 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between px-2 pb-1">
                    <div>
                      <p className="text-terracotta-light font-mono text-[0.6875rem] tracking-[0.16em] uppercase">
                        The Listening Hub
                      </p>
                      <p className="font-display text-ivory mt-0.5 text-[1.35rem] leading-tight italic">
                        Space to speak. Room to think.
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="border-terracotta-light/35 font-display text-terracotta-light flex size-10 items-center justify-center rounded-full border text-sm"
                    >
                      01
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Sanctuary Narrative, Pillars,CTA & Ethical Scope Note */}
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel onDark>Listening Hub · Primary Focus</SectionLabel>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                id="listening-hub-title"
                className="t-h1 text-ivory mt-6 max-w-[16ch] text-balance"
              >
                Sometimes, the most important thing is to be{" "}
                <span className="text-terracotta-light italic">heard.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="t-lead text-sand/90 mt-6 max-w-[52ch] text-pretty">
                In seasons of decision, responsibility, or quiet transition, we
                rarely need another loud opinion. Often, what helps most is a
                calm, trustworthy conversation where you can speak openly and
                hear your own thoughts clearly.
              </p>
            </Reveal>

            {/* Three Value Pillars */}
            <Reveal delay={0.2} className="mt-9">
              <div className="border-ivory/14 grid gap-6 border-y py-7 sm:grid-cols-3">
                {listeningPillars.map((item) => (
                  <div key={item.title}>
                    <h3 className="font-display text-ivory text-[1.35rem] leading-snug">
                      {item.title}
                    </h3>
                    <p className="t-small text-sand/78 mt-2">{item.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Primary Conversion Actions */}
            <Reveal
              delay={0.26}
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Button href={siteConfig.bookingHref} variant="light">
                Book a Listening Session
              </Button>
              <Button href="/listening-hub" variant="linkLight">
                How the Listening Hub works
              </Button>
            </Reveal>

            {/* Mandatory Non-Clinical Scope Boundary */}
            <Reveal delay={0.32} className="mt-8">
              <p className="border-ivory/12 bg-charcoal-deep/70 text-sand/72 max-w-[58ch] rounded-xs border px-4 py-3 text-[0.8125rem] leading-relaxed">
                <strong className="text-ivory font-semibold">
                  Important note on scope:
                </strong>{" "}
                The Listening Hub offers supportive listening, reflective
                conversation, and human connection. It is not psychotherapy,
                clinical counselling, medical treatment, or a licensed mental
                health service.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
