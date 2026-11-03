import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { journeyChapters } from "@/data/journey";

/**
 * Section 05 — Personal Journey
 * An editorial narrative timeline connecting the three expressions of purpose
 * without fabricating chronological dates or unverified biographical claims.
 */
export function JourneySection() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="section-y border-charcoal/10 bg-sand border-b"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>Personal Journey &amp; Evolution</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="journey-title"
                className="t-h1 text-charcoal mt-6 max-w-[16ch] text-balance"
              >
                Three chapters of one <span className="t-em">coherent</span>{" "}
                path.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.14}>
              <p className="t-body text-charcoal/80 text-pretty">
                Rather than three disconnected ventures, Segun&rsquo;s work has
                grown through a natural progression: learning to listen deeply,
                communicating stories with care, and coordinating practical
                projects in the physical environment.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Editorial Timeline / Chapter Ledger */}
        <div className="border-charcoal/15 mt-14 border-t lg:mt-16">
          {journeyChapters.map((chapter, idx) => (
            <Reveal key={chapter.index} delay={0.08 * idx} y={20}>
              <article className="border-charcoal/15 grid gap-6 border-b py-10 lg:grid-cols-12 lg:items-baseline lg:gap-10 lg:py-12">
                {/* Chapter Roman Numeral & Phase */}
                <div className="flex items-baseline gap-4 lg:col-span-3">
                  <span className="font-display text-terracotta-deep text-[2.25rem] leading-none">
                    {chapter.index}.
                  </span>
                  <div>
                    <p className="text-olive-deep font-mono text-[0.7rem] font-semibold tracking-[0.14em] uppercase">
                      {chapter.phase}
                    </p>
                    <p className="text-charcoal mt-1 text-[0.8125rem] font-semibold">
                      {chapter.expression}
                    </p>
                  </div>
                </div>

                {/* Chapter Title */}
                <div className="lg:col-span-4">
                  <h3 className="t-h3 text-charcoal text-balance">
                    {chapter.title}
                  </h3>
                </div>

                {/* Chapter Narrative & Ecosystem Footnote */}
                <div className="lg:col-span-5">
                  <p className="t-body text-charcoal/82 text-pretty">
                    {chapter.narrative}
                  </p>
                  <p className="border-terracotta-deep/40 text-olive-deep mt-4 border-l-2 pl-3.5 text-[0.8125rem] font-medium">
                    {chapter.ecosystemNote}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
