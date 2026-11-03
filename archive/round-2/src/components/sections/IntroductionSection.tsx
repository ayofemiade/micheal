import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const principles = [
  {
    label: "Presence first",
    detail:
      "Every meaningful conversation, story, or project begins by paying attention to what matters to the person in front of you.",
  },
  {
    label: "Clarity in expression",
    detail:
      "Whether framing a portrait, shaping an editorial piece, or scoping a renovation, clarity removes noise and builds trust.",
  },
  {
    label: "Follow-through",
    detail:
      "Good intentions need practical structure. Ideas only serve people when they are carried through with care and discipline.",
  },
] as const;

/**
 * Section 03 — Introduction (About Segun)
 * Introduces the person behind the work using genuine documentary imagery
 * (potrait/IMG_1982c.jpg — Segun seated by the window with his camera)
 * and controlled editorial typography on a warm Sand surface.
 */
export function IntroductionSection() {
  return (
    <section
      id="about-segun"
      aria-labelledby="intro-title"
      className="section-y border-charcoal/10 bg-sand border-b"
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Documentary Window Portrait */}
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>About Segun</SectionLabel>
            </Reveal>

            <Reveal delay={0.08} className="mt-7">
              <figure className="border-charcoal/15 bg-ivory overflow-hidden rounded-xs border p-2.5 shadow-[0_18px_40px_-18px_rgba(41,41,35,0.14)] sm:p-3">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[2px]">
                  <Image
                    src="/images/portraits/segun-media.jpg"
                    alt="Segun Michael seated by a sunlit window in a blue shirt, holding a camera and smiling."
                    fill
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    className="object-cover object-[65%_28%]"
                  />
                </div>
                <figcaption className="text-olive-deep mt-3 flex items-center justify-between px-1 text-[0.75rem]">
                  <span className="text-charcoal font-medium">
                    Segun Michael
                  </span>
                  <span>Observer · Storyteller · Builder</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Right Column: Editorial Narrative & Core Principles */}
          <div className="lg:col-span-7 lg:pl-4">
            <Reveal delay={0.1}>
              <h2
                id="intro-title"
                className="t-h1 text-charcoal max-w-[16ch] text-balance"
              >
                A curious mind. A <span className="t-em">purposeful</span>{" "}
                heart.
              </h2>
            </Reveal>

            <Reveal delay={0.16} className="mt-7 max-w-[56ch] space-y-5">
              <p className="t-lead text-charcoal/90 text-pretty">
                My journey has taken me across different disciplines and
                responsibilities, yet one thread has remained constant: a
                genuine curiosity about people—how we think, how we tell our
                stories, and how we shape the spaces we live and work in.
              </p>
              <p className="t-body text-charcoal/80 text-pretty">
                Rather than separating human connection, creative communication,
                and practical project work into unrelated compartments, my work
                brings them into conversation. Listening well informs how a
                story is captured; clear communication strengthens how a real
                estate or renovation project is planned and coordinated.
              </p>
            </Reveal>

            {/* Three Grounded Personal Principles (replaces invented numeric stats) */}
            <Reveal delay={0.22} className="mt-10">
              <dl className="border-charcoal/12 grid gap-6 border-y py-7 sm:grid-cols-3">
                {principles.map((item, idx) => (
                  <div key={item.label} className="flex flex-col">
                    <dt className="font-display text-charcoal flex items-center gap-2 text-[1.35rem] leading-snug">
                      <span className="text-terracotta-deep font-mono text-[0.7rem] tracking-widest">
                        0{idx + 1}
                      </span>
                      <span>{item.label}</span>
                    </dt>
                    <dd className="t-small text-charcoal/78 mt-2">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.28} className="mt-8">
              <Button href="/about" variant="link">
                Learn more about Segun
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
