import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ArrowRight, ShieldCheck, Clock, Compass } from "lucide-react";

export function DarkroomListeningSection() {
  return (
    <section
      id="listening-hub"
      aria-label="The Listening Hub darkroom sanctuary"
      className="border-darkroom-border bg-darkroom text-darkroom-ink relative overflow-hidden border-b py-24 lg:py-36"
    >
      {/* Subtle safelight glow accent in background */}
      <div
        aria-hidden
        className="bg-mao-red/10 pointer-events-none absolute top-1/4 right-0 size-[500px] rounded-full blur-[140px]"
      />

      <div className="container-proof relative z-10">
        {/* Darkroom Header Strip */}
        <div className="border-darkroom-border text-darkroom-muted mb-14 flex items-center justify-between border-b pb-4 font-mono text-[11px] tracking-wider uppercase">
          <div className="flex items-center gap-2.5">
            <span className="bg-mao-red size-2 rounded-full shadow-[0_0_8px_#A70405]" />
            <span className="text-darkroom-ink font-semibold">
              04 &mdash; THE DARKROOM &bull; THE LISTENING HUB
            </span>
          </div>
          <span className="text-mao-red font-mono">
            SAFE LIGHT // 60 MIN SESSIONS
          </span>
        </div>

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Intimate Listening Portrait Frame */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-[480px] lg:max-w-none">
              <div className="border-darkroom-border bg-darkroom-card relative aspect-[4/5] w-full overflow-hidden border shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image
                  src="/images/portraits/segun-listening.jpg"
                  alt="Segun Michael listening attentively in warm light"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />

                {/* Subtle vignette */}
                <div className="from-darkroom pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80" />

                <div className="bg-darkroom/90 text-darkroom-ink absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 font-mono text-[10px]">
                  <span className="bg-mao-red size-1.5 rounded-full" />
                  <span>SANCTUARY // 01</span>
                </div>

                <div className="absolute right-4 bottom-4 left-4">
                  <p className="text-darkroom-muted font-mono text-[10px] tracking-wider uppercase">
                    ACTIVE LISTENING PRACTICE
                  </p>
                  <p className="font-display text-darkroom-ink text-xl">
                    Space to speak. Room to think.
                  </p>
                </div>
              </div>

              <div className="text-darkroom-muted mt-3 flex items-center justify-between font-mono text-[10px]">
                <span>PLATE: SM-LISTEN-01</span>
                <span>CONFIDENTIAL &bull; VIRTUAL &amp; IN-PERSON</span>
              </div>
            </div>
          </div>

          {/* Right Column: Statement, Pillars, and Booking */}
          <div className="lg:col-span-7">
            <p className="text-mao-red mb-3 font-mono text-xs tracking-widest uppercase">
              THE LISTENING SANCTUARY
            </p>

            <h2 className="font-display text-darkroom-ink text-3xl leading-tight font-light sm:text-4xl lg:text-5xl">
              Sometimes, the most important thing is to be heard.
            </h2>

            <p className="text-darkroom-muted mt-6 font-sans text-base leading-relaxed sm:text-lg">
              In a world crowded with urgent demands and immediate reactions,
              having a calm space to speak openly without being rushed,
              corrected, or analyzed is rare.
            </p>

            {/* Three Pillars of the Experience */}
            <div className="border-darkroom-border mt-10 grid grid-cols-1 gap-6 border-t pt-8 sm:grid-cols-3">
              <div className="border-darkroom-border bg-darkroom-card/50 border p-4">
                <Clock className="text-mao-red mb-2 size-5" />
                <h3 className="font-display text-darkroom-ink text-base font-normal">
                  Unhurried Time
                </h3>
                <p className="text-darkroom-muted mt-1.5 font-sans text-xs leading-relaxed">
                  60 dedicated minutes where the pace slows down and your words
                  have room to breathe.
                </p>
              </div>

              <div className="border-darkroom-border bg-darkroom-card/50 border p-4">
                <Compass className="text-mao-red mb-2 size-5" />
                <h3 className="font-display text-darkroom-ink text-base font-normal">
                  Reflective Clarity
                </h3>
                <p className="text-darkroom-muted mt-1.5 font-sans text-xs leading-relaxed">
                  Speaking your thoughts aloud to a focused listener often
                  reveals the answer you already hold.
                </p>
              </div>

              <div className="border-darkroom-border bg-darkroom-card/50 border p-4">
                <ShieldCheck className="text-mao-red mb-2 size-5" />
                <h3 className="font-display text-darkroom-ink text-base font-normal">
                  Total Discretion
                </h3>
                <p className="text-darkroom-muted mt-1.5 font-sans text-xs leading-relaxed">
                  Strictly confidential, completely non-judgmental, grounded in
                  quiet mutual respect.
                </p>
              </div>
            </div>

            {/* Scope / Ethical Disclosure Box */}
            <div className="border-mao-red bg-darkroom-card/70 text-darkroom-muted mt-8 border-l-2 p-4 font-sans text-xs leading-relaxed">
              <span className="text-darkroom-ink mb-1 block font-mono text-[10px] font-semibold tracking-wider uppercase">
                A NOTE ON OUR SCOPE
              </span>
              The Listening Hub provides supportive, reflective personal
              dialogue. It is not psychotherapy, psychiatric evaluation, medical
              advice, or clinical crisis counseling.
            </div>

            {/* Booking Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-5 font-mono text-xs">
              <Link
                href={siteConfig.bookingHref}
                className="bg-mao-red text-paper hover:bg-mao-red/90 inline-flex items-center gap-2.5 px-6 py-3.5 font-medium tracking-wider uppercase transition-all"
              >
                <span className="bg-paper size-2 rounded-full" />
                <span>Book a Listening Session</span>
                <ArrowRight className="size-3.5" />
              </Link>

              <Link
                href="/listening-hub"
                className="text-darkroom-ink hover:text-mao-red border-darkroom-border inline-flex items-center gap-2 border-b pb-1 transition-colors"
              >
                <span>Read Session Guide &amp; FAQ &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
