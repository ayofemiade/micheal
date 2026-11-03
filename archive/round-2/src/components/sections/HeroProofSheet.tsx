"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ArrowDownRight, ArrowRight } from "lucide-react";

interface Frame {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  role: string;
  tag: string;
  image: string;
  alt: string;
  meta: string;
}

const frames: Frame[] = [
  {
    id: "people",
    num: "01",
    title: "People",
    subtitle: "Listening Hub",
    role: "Attentive Listener",
    tag: "FRAME 01 / 04 — HUMAN CONNECTION",
    image: "/images/portraits/segun-listening.jpg",
    alt: "Segun Michael, seated attentively with hands clasped in thoughtful conversation",
    meta: "50MM // F/1.8 // THE LISTENING SANCTUARY",
  },
  {
    id: "stories",
    num: "02",
    title: "Stories",
    subtitle: "MAO Media",
    role: "Visual Storyteller",
    tag: "FRAME 02 / 04 — VISUAL STORYTELLING",
    image: "/images/portraits/segun-camera.jpg",
    alt: "Segun Michael by the window holding camera, studying light and frames",
    meta: "35MM // F/2.0 // MAO MEDIA ARCHIVES",
  },
  {
    id: "places",
    num: "03",
    title: "Places",
    subtitle: "Real Estate Execution",
    role: "Practical Builder",
    tag: "FRAME 03 / 04 — PHYSICAL SPACES",
    image: "/images/portraits/segun-property.jpg",
    alt: "Segun Michael in tailored navy blazer, grounded and thoughtful",
    meta: "85MM // F/2.8 // MAO CONTRACTORS",
  },
  {
    id: "possibilities",
    num: "04",
    title: "Possibilities",
    subtitle: "Creative Director & Producer",
    role: "All Three Dimensions",
    tag: "FRAME 04 / 04 — THE WHOLE PERSON",
    image: "/images/portraits/segun-hero-bw.jpg",
    alt: "Segun Michael, black and white portrait with arms crossed and mandarin collar",
    meta: "85MM // 1/250S // SIGNATURE ARCHIVE",
  },
];

export function HeroProofSheet() {
  const [activeFrameIndex, setActiveFrameIndex] = useState(3); // Frame 04 is the primary hero portrait
  const active = frames[activeFrameIndex];

  return (
    <section
      aria-label="Introduction proof sheet"
      className="border-ink/12 bg-paper relative min-h-[92svh] overflow-hidden border-b pt-20 pb-10 lg:pt-24 lg:pb-14"
    >
      {/* Proof Sheet Background Coordinates */}
      <div
        aria-hidden
        className="sheet-grid pointer-events-none absolute inset-0 opacity-60"
      />

      <div className="container-proof relative z-10">
        {/* Top Sheet Header Meta */}
        <div className="border-ink/15 text-ink/65 mb-6 flex flex-wrap items-center justify-between gap-4 border-b pb-4 font-mono text-[11px] tracking-wider uppercase">
          <div className="flex items-center gap-3">
            <span className="flex size-2 items-center justify-center">
              <span className="bg-mao-red size-2 rounded-full" />
            </span>
            <span className="text-ink font-semibold">
              CONTACT SHEET // SM-2026-01
            </span>
            <span className="text-ink/40 hidden sm:inline">|</span>
            <span className="text-ink/75 hidden sm:inline">
              ORIGINAL ARCHIVAL PROOFS
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-mao-red font-medium">{active.tag}</span>
            <span className="text-ink/40 hidden md:inline">|</span>
            <span className="hidden font-mono md:inline">{active.meta}</span>
          </div>
        </div>

        {/* Main Proof Grid */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Monumental Editorial Typography */}
          <div className="flex flex-col justify-between lg:col-span-6 xl:col-span-6">
            <div>
              <p className="text-mao-red mb-3 font-mono text-[11px] tracking-widest uppercase">
                &mdash; ONE PERSON &bull; THREE EXPRESSIONS OF PURPOSE
              </p>

              <h1 className="font-display text-ink text-[3.25rem] leading-[0.92] tracking-[-0.03em] sm:text-[4.75rem] md:text-[5.5rem] xl:text-[6.25rem]">
                {frames.map((f, i) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveFrameIndex(i)}
                    onMouseEnter={() => setActiveFrameIndex(i)}
                    className={`group block w-full text-left transition-colors duration-200 focus:outline-none ${
                      activeFrameIndex === i
                        ? "text-ink"
                        : "text-ink/30 hover:text-ink/70"
                    }`}
                  >
                    <span className="inline-flex items-baseline gap-3 sm:gap-5">
                      <span className="text-mao-red/80 font-mono text-xs font-normal tracking-normal sm:text-sm">
                        {f.num}
                      </span>
                      <span
                        className={
                          activeFrameIndex === i && i === 3
                            ? "text-mao-red italic"
                            : ""
                        }
                      >
                        {f.title}.
                      </span>
                    </span>
                  </button>
                ))}
              </h1>

              <div className="mt-8 max-w-xl sm:mt-10">
                <p className="text-ink/80 font-sans text-base leading-relaxed sm:text-lg">
                  I&rsquo;m{" "}
                  <span className="text-ink font-semibold">Segun Michael</span>.
                  I listen, create, and bring ideas to life across supportive
                  conversations, visual and editorial media, and grounded real
                  estate execution.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-xs sm:gap-6">
                  <Link
                    href={siteConfig.bookingHref}
                    className="bg-ink text-paper hover:bg-mao-red inline-flex items-center gap-2.5 px-6 py-3.5 font-medium tracking-wider uppercase transition-all duration-200"
                  >
                    <span className="bg-mao-red size-2 rounded-full" />
                    <span>Book a Listening Session</span>
                    <ArrowRight className="size-3.5" />
                  </Link>

                  <a
                    href="#selected-work"
                    className="border-ink/30 text-ink hover:border-ink hover:text-mao-red inline-flex items-center gap-2 border px-5 py-3.5 transition-colors"
                  >
                    <span>Selected Work</span>
                    <ArrowDownRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Contact Strip (Interactive proof frame selector) */}
            <div className="border-ink/10 mt-12 border-t pt-8 sm:mt-16">
              <div className="text-ink/60 mb-3 flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
                <span>INTERACTIVE PROOF STRIP &mdash; CLICK OR HOVER</span>
                <span className="text-mao-red font-semibold">
                  ACTIVE: FRAME {active.num}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
                {frames.map((frame, index) => {
                  const isSelected = activeFrameIndex === index;
                  return (
                    <button
                      key={frame.id}
                      type="button"
                      onClick={() => setActiveFrameIndex(index)}
                      onMouseEnter={() => setActiveFrameIndex(index)}
                      className={`group relative text-left transition-all duration-200 focus:outline-none ${
                        isSelected
                          ? "scale-[1.02]"
                          : "opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div
                        className={`bg-paper-muted relative aspect-[3/4] w-full overflow-hidden ${
                          isSelected
                            ? "ring-mao-red ring-offset-paper ring-2 ring-offset-2"
                            : "border-ink/15 group-hover:border-ink/50 border"
                        }`}
                      >
                        <Image
                          src={frame.image}
                          alt={frame.alt}
                          fill
                          sizes="(max-width: 640px) 25vw, 120px"
                          className={`object-cover object-top transition-transform duration-500 ${
                            isSelected ? "scale-105" : "group-hover:scale-105"
                          }`}
                        />
                        {/* Red frame index stamp */}
                        <div className="bg-ink/80 text-paper absolute top-1 left-1 px-1 py-0.5 font-mono text-[9px]">
                          {frame.num}
                        </div>
                      </div>

                      <div className="mt-1.5 flex items-center justify-between font-mono text-[10px]">
                        <span
                          className={`truncate font-medium ${
                            isSelected
                              ? "text-mao-red font-semibold"
                              : "text-ink/70"
                          }`}
                        >
                          {frame.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Large Primary Portrait Proof Frame */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative mx-auto max-w-[560px] lg:max-w-none">
              {/* Proof Sheet Red Crop Marks Frame */}
              <div className="crop-marks bg-paper-muted relative aspect-[3/4] w-full overflow-hidden shadow-[0_12px_40px_rgba(20,20,20,0.08)]">
                {/* Cross-fade main image */}
                <Image
                  key={active.image}
                  src={active.image}
                  alt={active.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-opacity duration-300"
                />

                {/* Subtle dark gradient overlay at base for technical caption */}
                <div className="from-ink/70 via-ink/20 pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t to-transparent" />

                {/* Frame technical coordinates overlay */}
                <div className="bg-ink/85 text-paper absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase backdrop-blur-xs">
                  <span className="bg-mao-red size-1.5 rounded-full" />
                  <span>FRAME {active.num}</span>
                </div>

                <div className="bg-paper/90 text-ink absolute top-3 right-3 px-2 py-0.5 font-mono text-[10px] backdrop-blur-xs">
                  ARCHIVE // 2026
                </div>

                {/* Caption at bottom of portrait */}
                <div className="text-paper absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-paper/70 font-mono text-[10px] tracking-widest uppercase">
                    {active.subtitle} &bull; {active.role}
                  </p>
                  <p className="font-display text-paper text-lg font-normal sm:text-xl">
                    &ldquo;{active.title}&rdquo; &mdash; Segun Michael
                  </p>
                </div>
              </div>

              {/* Technical Caption Note below portrait */}
              <div className="text-ink/55 mt-3 flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
                <span>PLATE: SEGFRAME-EXP-04</span>
                <span>AUTHENTIC B&amp;W PHOTOGRAPHIC RECORD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
