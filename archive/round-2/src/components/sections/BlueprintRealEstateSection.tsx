import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Layers, Ruler } from "lucide-react";

export function BlueprintRealEstateSection() {
  return (
    <section
      id="real-estate"
      aria-label="Real estate and architectural execution"
      className="border-ink/12 bg-paper-light relative overflow-hidden border-b py-20 lg:py-32"
    >
      {/* Blueprint grid subtle pattern */}
      <div
        aria-hidden
        className="sheet-grid pointer-events-none absolute inset-0 opacity-80"
      />

      <div className="container-proof relative z-10">
        {/* Blueprint Header Strip */}
        <div className="border-ink/15 text-ink/60 mb-14 flex items-center justify-between border-b pb-4 font-mono text-[11px] tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <span className="bg-mao-red size-1.5" />
            <span>
              06 &mdash; THE BLUEPRINT &bull; REAL ESTATE &amp; PROJECT
              EXECUTION
            </span>
          </div>
          <span className="text-mao-red font-mono">
            SPEC: MAO CONTRACTORS // SPATIAL PLANNING
          </span>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Blueprint Text & Capabilities */}
          <div className="lg:col-span-7">
            <p className="text-mao-red mb-3 font-mono text-xs tracking-widest uppercase">
              PHYSICAL EXECUTION &bull; GROUNDED PROGRESS
            </p>

            <h2 className="font-display text-ink text-3xl leading-tight font-light sm:text-4xl lg:text-5xl">
              Turning property potential into practical, finished reality.
            </h2>

            <p className="text-ink/80 mt-6 font-sans text-base leading-relaxed sm:text-lg">
              Through MAO Contractors, we bridge the gap between architectural
              ambition and job-site reality. We take residential and commercial
              properties that require transformation and coordinate the design,
              trades, and finishings to deliver spaces people love being in.
            </p>

            {/* Practical execution triad */}
            <div className="border-ink/15 mt-10 grid grid-cols-1 gap-6 border-t pt-8 sm:grid-cols-3">
              <div className="border-ink/10 bg-paper border p-4">
                <Compass className="text-mao-red mb-2 size-5" />
                <h3 className="font-display text-ink text-base font-normal">
                  Renovation Planning
                </h3>
                <p className="text-ink/70 mt-1 font-sans text-xs">
                  Assessing layout utility, materials, and cost-effective
                  transformation roadmaps.
                </p>
              </div>

              <div className="border-ink/10 bg-paper border p-4">
                <Layers className="text-mao-red mb-2 size-5" />
                <h3 className="font-display text-ink text-base font-normal">
                  Trade Coordination
                </h3>
                <p className="text-ink/70 mt-1 font-sans text-xs">
                  Managing subcontractors, material schedules, and timeline
                  discipline on-site.
                </p>
              </div>

              <div className="border-ink/10 bg-paper border p-4">
                <Ruler className="text-mao-red mb-2 size-5" />
                <h3 className="font-display text-ink text-base font-normal">
                  Finish Quality
                </h3>
                <p className="text-ink/70 mt-1 font-sans text-xs">
                  Rigorous attention to lighting, surfaces, spatial flow, and
                  enduring durability.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Link
                href="/real-estate"
                className="group border-ink bg-ink text-paper hover:border-mao-red hover:bg-mao-red inline-flex items-center gap-2 border px-5 py-3 font-mono text-xs tracking-wider uppercase transition-all"
              >
                <span>Inquire About Real Estate Projects</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Builder Portrait Frame */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-[460px] lg:max-w-none">
              <div className="crop-marks border-ink/15 bg-paper relative aspect-[4/5] w-full overflow-hidden border shadow-[0_12px_40px_rgba(20,20,20,0.06)]">
                <Image
                  src="/images/portraits/segun-property.jpg"
                  alt="Segun Michael in navy blazer, grounded project coordinator"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />

                <div className="bg-ink/80 text-paper absolute top-3 left-3 px-2 py-0.5 font-mono text-[10px]">
                  SURVEY // EXP-06
                </div>

                <div className="bg-paper/90 text-ink absolute right-3 bottom-3 px-2.5 py-1 font-mono text-[9px] tracking-wider uppercase backdrop-blur-xs">
                  MAO CONTRACTORS
                </div>
              </div>

              <div className="text-ink/50 mt-3 flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
                <span>SITE PLAN SPECIFICATION</span>
                <span>LAGOS &bull; REGIONAL PROJECTS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
