"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Slide {
  id: string;
  title: string;
  category: string;
  year: string;
  plate: string;
  image: string;
  alt: string;
  aspect: "portrait" | "landscape";
}

const slides: Slide[] = [
  {
    id: "wed-portrait",
    title: "Wedding Chronicle // Gold & Ivory",
    category: "Wedding Chronicle",
    year: "2024",
    plate: "SLIDE 01 // MAO-WED-12",
    image: "/images/media/mao-wedding-portrait.jpg",
    alt: "Authentic wedding portrait by MAO Media with bride and groom in radiant celebratory attire",
    aspect: "portrait",
  },
  {
    id: "portrait-green",
    title: "Editorial Study // Emerald & Shadow",
    category: "Editorial Portrait",
    year: "2024",
    plate: "SLIDE 02 // MAO-ED-30",
    image: "/images/media/mao-portrait-green.jpg",
    alt: "Studio portrait in striking emerald green styling and rich skin tones",
    aspect: "portrait",
  },
  {
    id: "portrait-red",
    title: "Studio Study // Crimson Warmth",
    category: "Creative Direction",
    year: "2023",
    plate: "SLIDE 03 // MAO-ST-44",
    image: "/images/media/mao-portrait-red.jpg",
    alt: "Studio creative direction with deep red tones and cinematic poise",
    aspect: "landscape",
  },
  {
    id: "couple-blue",
    title: "Intimate Chronicle // Indigo Light",
    category: "Couples & Portraits",
    year: "2024",
    plate: "SLIDE 04 // MAO-CP-55",
    image: "/images/media/mao-couple-blue.jpg",
    alt: "Intimate portrait chronicle of a couple in rich indigo ambient light",
    aspect: "portrait",
  },
  {
    id: "wedding-detail",
    title: "Bridal Chronicle // Joyful Radiance",
    category: "Wedding Commission",
    year: "2024",
    plate: "SLIDE 05 // MAO-WED-11",
    image: "/images/media/mao-wedding-closeup.jpg",
    alt: "Close-up joyful bridal portrait captured during traditional celebration",
    aspect: "landscape",
  },
  {
    id: "studio-crimson",
    title: "Figure Study // Bold Monochrome",
    category: "Editorial Portrait",
    year: "2023",
    plate: "SLIDE 06 // MAO-ST-56",
    image: "/images/media/mao-studio-red.jpg",
    alt: "Editorial figure study in vibrant crimson backdrop and poised composition",
    aspect: "landscape",
  },
];

export function LightTableSection() {
  const [activeSlide, setActiveSlide] = useState<string | null>(null);

  return (
    <section
      id="selected-work"
      aria-label="The light table selected photography"
      className="border-ink/12 bg-paper border-b py-20 lg:py-32"
    >
      <div className="container-proof">
        {/* Light Table Header Strip */}
        <div className="border-ink/15 text-ink/60 mb-14 flex items-center justify-between border-b pb-4 font-mono text-[11px] tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <span className="bg-mao-red size-1.5" />
            <span>05 &mdash; THE LIGHT TABLE &bull; SELECTED PHOTOGRAPHY</span>
          </div>
          <span className="text-mao-red font-semibold">
            MAO MEDIA ARCHIVE // 6 CURATED SLIDES
          </span>
        </div>

        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-mao-red mb-2 font-mono text-xs tracking-widest uppercase">
              ORIGINAL VISUAL WORK BY SEGUN MICHAEL
            </p>
            <h2 className="font-display text-ink text-3xl leading-tight font-light sm:text-4xl lg:text-5xl">
              Stories captured with poise, warmth, and cinematic stillness.
            </h2>
          </div>

          <Link
            href="/media-communication"
            className="group border-ink text-ink hover:bg-mao-red hover:border-mao-red hover:text-paper inline-flex items-center gap-2 border px-4 py-2.5 font-mono text-xs tracking-wider uppercase transition-all"
          >
            <span>All Commissions</span>
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* The Light Table Slide Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {slides.map((slide) => {
            const isHovered = activeSlide === slide.id;
            return (
              <div
                key={slide.id}
                onMouseEnter={() => setActiveSlide(slide.id)}
                onMouseLeave={() => setActiveSlide(null)}
                className="group border-ink/15 bg-paper-light hover:border-ink/50 border p-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(20,20,20,0.08)]"
              >
                {/* Slide Top Film Mount Header */}
                <div className="text-ink/55 mb-3 flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
                  <span
                    className={isHovered ? "text-mao-red font-semibold" : ""}
                  >
                    {slide.plate}
                  </span>
                  <span>{slide.year}</span>
                </div>

                {/* Photographic slide frame */}
                <div
                  className={`bg-paper-muted relative w-full overflow-hidden ${
                    slide.aspect === "landscape"
                      ? "aspect-[3/2]"
                      : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="bg-ink/0 group-hover:bg-ink/5 pointer-events-none absolute inset-0 transition-colors" />
                </div>

                {/* Slide Caption Bottom */}
                <div className="mt-3.5 flex items-baseline justify-between">
                  <div>
                    <h3 className="font-display text-ink group-hover:text-mao-red text-base font-normal transition-colors">
                      {slide.title}
                    </h3>
                    <p className="text-ink/50 font-mono text-[10px] tracking-wider uppercase">
                      {slide.category}
                    </p>
                  </div>
                  <span className="text-ink/30 group-hover:text-mao-red font-mono text-[10px] transition-colors">
                    &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Provenance note */}
        <div className="border-ink/10 text-ink/50 mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6 font-mono text-[11px]">
          <span>
            ALL PHOTOGRAPHS PRODUCED &amp; DIRECTED BY SEGUN MICHAEL VIA MAO
            MEDIA
          </span>
          <span>
            ORIGINAL UNRETOUCHED ARCHIVE &bull; LAGOS &amp; INTERNATIONAL
          </span>
        </div>
      </div>
    </section>
  );
}
