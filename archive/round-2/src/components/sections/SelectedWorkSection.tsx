import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { practiceDistinctions, workItems } from "@/data/work";

/**
 * Section 06 — Selected Work
 * Showcases genuine MAO Media photography from the workspace (`website gallery/`)
 * and includes an explicit Provenance & Scope Ledger distinguishing:
 * 1. MAO Client Work
 * 2. V&M Partnership Work
 * 3. Proposed Development Planning (clearly marked as planning, never implied completed)
 */
export function SelectedWorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="section-y border-charcoal/10 bg-ivory border-b"
    >
      <Container>
        {/* Header Row */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>Selected Work &amp; Provenance</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="work-title"
                className="t-h1 text-charcoal mt-6 max-w-[14ch] text-balance"
              >
                Ideas captured. Projects <span className="t-em">carefully</span>{" "}
                stewarded.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.14}>
              <p className="t-body text-charcoal/80 text-pretty">
                Every commission and project plan is presented with clear
                attribution—distinguishing completed MAO Media photography,
                collaborative V&amp;M partnership engagements, and proposed
                development planning under MAO Contractors.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Provenance & Scope Distinction Ledger */}
        <Reveal delay={0.18} className="mt-12">
          <div className="border-charcoal/12 bg-sand/65 grid gap-5 rounded-xs border p-6 sm:p-8 lg:grid-cols-3 lg:gap-8">
            {practiceDistinctions.map((item) => (
              <div
                key={item.code}
                className="border-charcoal/10 flex flex-col justify-between border-b pb-5 last:border-b-0 last:pb-0 lg:border-r lg:border-b-0 lg:pr-7 lg:pb-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-terracotta-deep font-mono text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">
                      {item.code}
                    </span>
                    <span className="border-charcoal/15 bg-ivory text-charcoal rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-medium">
                      {item.statusBadge}
                    </span>
                  </div>
                  <h3 className="font-display text-charcoal mt-3 text-[1.45rem] leading-tight">
                    {item.category}
                  </h3>
                  <p className="text-olive-deep mt-1 text-[0.75rem] font-semibold">
                    {item.venture}
                  </p>
                  <p className="t-small text-charcoal/80 mt-3 text-pretty">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Genuine MAO Media Visual Archive Grid */}
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {workItems.map((item, idx) => {
            const isVertical = item.height > item.width;
            return (
              <Reveal key={item.id} delay={0.06 * idx} y={24}>
                <figure className="group border-charcoal/12 bg-sand/35 hover:border-charcoal/25 flex h-full flex-col justify-between overflow-hidden rounded-xs border p-3 transition-colors duration-300">
                  <div>
                    <div
                      className={`bg-charcoal/10 relative w-full overflow-hidden rounded-[2px] ${
                        isVertical ? "aspect-[4/5]" : "aspect-[4/5]"
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                        className="object-cover transition-transform duration-1000 ease-[var(--ease-editorial)] group-hover:scale-[1.035]"
                      />
                    </div>

                    <figcaption className="mt-4 px-1 pb-1">
                      <div className="text-terracotta-deep flex items-center justify-between gap-2 text-[0.6875rem] font-semibold tracking-[0.1em] uppercase">
                        <span>{item.provenance}</span>
                        <span className="text-olive-deep font-mono">
                          0{idx + 1}
                        </span>
                      </div>
                      <h3 className="font-display text-charcoal mt-1.5 text-[1.35rem] leading-snug">
                        {item.title}
                      </h3>
                      <p className="t-small text-charcoal/78 mt-1.5">
                        {item.summary}
                      </p>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA Row */}
        <Reveal
          delay={0.2}
          className="border-charcoal/12 mt-12 flex flex-wrap items-center justify-between gap-6 border-t pt-8"
        >
          <p className="t-small text-olive-deep max-w-[54ch]">
            Additional MAO Media commissions, V&amp;M partnership documentation,
            and MAO Contractors renovation planning briefs are available on
            their dedicated practice pages.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Button href="/media-communication" variant="link">
              Explore Media &amp; Communication
            </Button>
            <Button href="/real-estate" variant="link">
              Explore Real Estate Planning
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
