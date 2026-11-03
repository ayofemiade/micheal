import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function EditorialCaptionSection() {
  return (
    <section
      id="about"
      aria-label="Editorial statement and provenance"
      className="border-ink/12 bg-paper border-b py-20 lg:py-32"
    >
      <div className="container-proof">
        {/* Caption Header Strip */}
        <div className="border-ink/15 text-ink/60 mb-12 flex items-center justify-between border-b pb-4 font-mono text-[11px] tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <span className="bg-mao-red size-1.5" />
            <span>02 &mdash; THE CAPTION &bull; EDITORIAL PROVENANCE</span>
          </div>
          <span>PERSPECTIVE // 2026</span>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Candid Working Frame */}
          <div className="lg:col-span-5">
            <div className="border-ink/15 bg-paper-muted relative aspect-[4/3] w-full overflow-hidden border shadow-[0_8px_30px_rgba(20,20,20,0.06)]">
              <Image
                src="/images/portraits/segun-media.jpg"
                alt="Segun Michael reviewing visual work behind the camera"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <div className="bg-ink/80 text-paper absolute bottom-2 left-2 px-2 py-0.5 font-mono text-[10px]">
                FIGURE 02.1 &mdash; BEHIND THE LENS
              </div>
            </div>
            <p className="text-ink/50 mt-3 font-mono text-[10px] tracking-wider uppercase">
              STUDIO ARCHIVE // MOMENT OF INTENTIONAL CRAFT
            </p>
          </div>

          {/* Statement & Disciplines */}
          <div className="lg:col-span-7">
            <p className="text-mao-red mb-3 font-mono text-xs tracking-widest uppercase">
              THE CORE CONVICTION
            </p>
            <h2 className="font-display text-ink text-3xl leading-tight font-light tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Every meaningful endeavor begins by listening deeply, discerning
              what matters, and translating that insight into tangible form.
            </h2>

            <div className="text-ink/80 mt-8 space-y-4 font-sans text-base leading-relaxed sm:text-lg">
              <p>
                My work spans three interconnected worlds: holding a calm,
                non-judgmental space for reflective human conversation;
                capturing profound visual stories through photography and media;
                and coordinating physical spaces where people live, work, and
                thrive.
              </p>
              <p>
                I don&rsquo;t believe these practices are separate careers. They
                are three expressions of the same instinct:{" "}
                <span className="text-ink font-medium">
                  curiosity about people and care for how their reality unfolds.
                </span>
              </p>
            </div>

            {/* Disciplines Grid */}
            <div className="border-ink/15 mt-10 grid grid-cols-1 gap-4 border-t pt-8 sm:grid-cols-3">
              <div>
                <span className="text-mao-red font-mono text-xs font-semibold">
                  01 / LISTEN
                </span>
                <h3 className="font-display text-ink mt-1 text-lg font-normal">
                  Presence
                </h3>
                <p className="text-ink/70 mt-1 text-xs">
                  One-on-one reflective listening without rush or unsolicited
                  advice.
                </p>
              </div>

              <div>
                <span className="text-mao-red font-mono text-xs font-semibold">
                  02 / CREATE
                </span>
                <h3 className="font-display text-ink mt-1 text-lg font-normal">
                  Visual Craft
                </h3>
                <p className="text-ink/70 mt-1 text-xs">
                  Cinematic portraits, weddings, and editorial narratives via
                  MAO Media.
                </p>
              </div>

              <div>
                <span className="text-mao-red font-mono text-xs font-semibold">
                  03 / BUILD
                </span>
                <h3 className="font-display text-ink mt-1 text-lg font-normal">
                  Execution
                </h3>
                <p className="text-ink/70 mt-1 text-xs">
                  Renovation coordination, project planning, and property
                  execution.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Link
                href="/about"
                className="group border-ink text-ink hover:border-mao-red hover:text-mao-red inline-flex items-center gap-2 border-b pb-1 font-mono text-xs tracking-wider uppercase transition-colors"
              >
                <span>Read Full Biography &amp; Journey</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
