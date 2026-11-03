import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ThreeExpressionsProof() {
  return (
    <section
      id="expressions"
      aria-label="Three expressions of purpose"
      className="border-ink/12 bg-paper border-b py-20 lg:py-32"
    >
      <div className="container-proof">
        {/* Section Index Strip */}
        <div className="border-ink/15 text-ink/60 mb-14 flex items-center justify-between border-b pb-4 font-mono text-[11px] tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <span className="bg-mao-red size-1.5" />
            <span>03 &mdash; THE THREE EXPRESSIONS OF PURPOSE</span>
          </div>
          <span>CONTACT STRIP // TRIAD</span>
        </div>

        <div className="mb-16 max-w-2xl">
          <p className="text-mao-red mb-2 font-mono text-xs tracking-widest uppercase">
            DISTINCT VENTURES &bull; ONE COHESIVE PURPOSE
          </p>
          <h2 className="font-display text-ink text-3xl leading-tight font-light sm:text-4xl lg:text-5xl">
            One human commitment expressed in three distinct mediums.
          </h2>
        </div>

        {/* Asymmetric Contact Strip Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Expression 01: The Listening Hub (Col 4) */}
          <div className="border-ink/15 bg-paper-light hover:border-ink/40 flex flex-col justify-between border p-6 transition-all duration-300 sm:p-8 lg:col-span-4">
            <div>
              <div className="text-ink/50 flex items-center justify-between font-mono text-[11px] tracking-wider uppercase">
                <span className="text-mao-red font-semibold">01 / LISTEN</span>
                <span>SANCTUARY</span>
              </div>

              <div className="bg-paper-muted relative mt-6 aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/portraits/segun-listening.jpg"
                  alt="Segun Michael listening with calm, dedicated attention"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top"
                />
                <div className="bg-ink/80 text-paper absolute top-2 left-2 px-2 py-0.5 font-mono text-[9px]">
                  PLATE 01.A
                </div>
              </div>

              <h3 className="font-display text-ink mt-6 text-2xl font-normal">
                The Listening Hub
              </h3>
              <p className="text-mao-red mt-2 font-mono text-xs">
                &ldquo;Space to speak. Room to think.&rdquo;
              </p>

              <p className="text-ink/75 mt-4 font-sans text-sm leading-relaxed">
                A dedicated, non-clinical space for reflective human
                conversation. For individuals navigating transitions, seeking
                clarity, or simply needing to be heard without judgment.
              </p>
            </div>

            <div className="border-ink/10 mt-8 border-t pt-6">
              <Link
                href="/listening-hub"
                className="group text-ink hover:text-mao-red inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase transition-colors"
              >
                <span>Explore The Listening Hub</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Expression 02: MAO Media & Storytelling (Col 5) */}
          <div className="border-ink/15 bg-paper-light hover:border-ink/40 flex flex-col justify-between border p-6 transition-all duration-300 sm:p-8 lg:col-span-5">
            <div>
              <div className="text-ink/50 flex items-center justify-between font-mono text-[11px] tracking-wider uppercase">
                <span className="text-mao-red font-semibold">02 / CREATE</span>
                <span>STUDIO &amp; ARCHIVE</span>
              </div>

              <div className="bg-paper-muted relative mt-6 aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/portraits/segun-camera.jpg"
                  alt="Segun Michael holding camera by the window"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="bg-ink/80 text-paper absolute top-2 left-2 px-2 py-0.5 font-mono text-[9px]">
                  PLATE 02.A &mdash; MAO MEDIA
                </div>
              </div>

              <h3 className="font-display text-ink mt-6 text-2xl font-normal">
                Media &amp; Communication
              </h3>
              <p className="text-mao-red mt-2 font-mono text-xs">
                &ldquo;Stories deserve to be told well.&rdquo;
              </p>

              <p className="text-ink/75 mt-4 font-sans text-sm leading-relaxed">
                Creative direction, portraiture, wedding commissions, and
                editorial writing via MAO Media and the Inspire Network.
                Capturing dignity, warmth, and cinematic stillness.
              </p>
            </div>

            <div className="border-ink/10 mt-8 border-t pt-6">
              <Link
                href="/media-communication"
                className="group text-ink hover:text-mao-red inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase transition-colors"
              >
                <span>Explore Visual &amp; Media Work</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Expression 03: Real Estate Execution (Col 3) */}
          <div className="border-ink/15 bg-paper-light hover:border-ink/40 flex flex-col justify-between border p-6 transition-all duration-300 sm:p-8 lg:col-span-3">
            <div>
              <div className="text-ink/50 flex items-center justify-between font-mono text-[11px] tracking-wider uppercase">
                <span className="text-mao-red font-semibold">03 / BUILD</span>
                <span>COORDINATION</span>
              </div>

              <div className="bg-paper-muted relative mt-6 aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/portraits/segun-property.jpg"
                  alt="Segun Michael in tailored blazer, practical execution"
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover object-top"
                />
                <div className="bg-ink/80 text-paper absolute top-2 left-2 px-2 py-0.5 font-mono text-[9px]">
                  PLATE 03.A
                </div>
              </div>

              <h3 className="font-display text-ink mt-6 text-xl font-normal">
                Real Estate
              </h3>
              <p className="text-mao-red mt-1 font-mono text-xs">
                &ldquo;Practical execution.&rdquo;
              </p>

              <p className="text-ink/75 mt-3 font-sans text-xs leading-relaxed">
                Renovation planning and project coordination through MAO
                Contractors. Turning physical space into enduring utility and
                living spaces.
              </p>
            </div>

            <div className="border-ink/10 mt-8 border-t pt-6">
              <Link
                href="/real-estate"
                className="group text-ink hover:text-mao-red inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase transition-colors"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
