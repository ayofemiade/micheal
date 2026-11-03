import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { HeroAnimator } from "@/components/motion/HeroAnimator";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

const expressionsIndex = [
  {
    num: "01",
    label: "Listening Hub",
    role: "Human connection",
    href: "#listening-hub",
  },
  {
    num: "02",
    label: "Media & Communication",
    role: "Creative expression",
    href: "#expressions",
  },
  {
    num: "03",
    label: "Real Estate",
    role: "Practical execution",
    href: "#expressions",
  },
] as const;

/**
 * Section 02 — Hero
 * Structured as an intentional editorial monograph cover:
 * - Left column: Kicker, display headline ("People. Stories. Places. Possibilities."),
 *   reflective sub-statement, concise introduction, dual CTAs, and architectural index.
 * - Right column: Authentic portrait of Segun Michael (potrait/IMG_2543c.jpg)
 *   presented in a sculpted warm editorial frame that preserves the integrity
 *   of the original studio photograph on both desktop and mobile.
 */
export function HeroSection() {
  return (
    <HeroAnimator
      aria-labelledby="hero-title"
      className="hero-pending border-charcoal/10 bg-ivory relative overflow-hidden border-b pt-[var(--header-h)]"
    >
      <Container className="py-10 sm:py-14 lg:py-16 xl:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          {/* Editorial Copy & Narrative Column */}
          <div className="lg:col-span-7">
            <p
              data-hero="fade"
              className="text-terracotta-deep inline-flex items-center gap-3 text-[0.75rem] font-semibold tracking-[0.16em] uppercase"
            >
              <span>One Person · Three Expressions of Purpose</span>
              <span aria-hidden className="bg-terracotta-deep/60 h-px w-10" />
            </p>

            <h1
              id="hero-title"
              className="font-display text-charcoal mt-5 text-[clamp(3.1rem,5.4vw+1rem,6.25rem)] leading-[0.94] tracking-[-0.026em]"
            >
              <span className="-my-[0.06em] block overflow-hidden py-[0.06em]">
                <span data-hero="line" className="block">
                  People. Stories.
                </span>
              </span>
              <span className="-my-[0.06em] block overflow-hidden py-[0.06em]">
                <span data-hero="line" className="block">
                  Places. <span className="t-em">Possibilities.</span>
                </span>
              </span>
            </h1>

            <p
              data-hero="fade"
              className="font-display text-charcoal/90 mt-6 max-w-[34ch] text-[clamp(1.35rem,1.2vw+0.9rem,1.85rem)] leading-[1.22]"
            >
              A life shaped by listening closely, telling stories well, and
              turning thoughtful plans into{" "}
              <span className="text-terracotta-deep italic">
                practical progress.
              </span>
            </p>

            <p
              data-hero="fade"
              className="t-lead text-charcoal/80 mt-5 max-w-[46ch] text-pretty"
            >
              I&rsquo;m Segun Michael. I listen, create, and bring ideas to life
              across supportive human conversations, visual and editorial media,
              and grounded real estate execution.
            </p>

            <div
              data-hero="fade"
              className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 sm:mt-10"
            >
              <Button href={siteConfig.bookingHref}>
                Book a Listening Session
              </Button>
              <Button href="#work" variant="link">
                Explore My Work
              </Button>
            </div>

            {/* Architectural Index of the Three Expressions */}
            <div
              data-hero="fade"
              className="border-charcoal/12 mt-11 grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-3 sm:gap-6 lg:mt-14"
            >
              {expressionsIndex.map((item) => (
                <Link
                  key={item.num}
                  href={item.href}
                  className="group hover:text-terracotta-deep flex flex-col gap-1 transition-colors"
                >
                  <span className="text-olive-deep font-mono text-[0.7rem] tracking-[0.14em] uppercase">
                    {item.num} / {item.role}
                  </span>
                  <span className="font-display text-charcoal group-hover:text-terracotta-deep text-[1.2rem] leading-tight transition-colors">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Sculpted Editorial Portrait Column */}
          <div className="lg:col-span-5">
            <figure
              data-hero="portrait"
              className="relative mx-auto w-full max-w-[29rem] lg:max-w-none"
            >
              {/* Architectural Offset Frame */}
              <div
                aria-hidden
                className="border-charcoal/12 bg-sand/45 pointer-events-none absolute -inset-2.5 rounded-sm border sm:-inset-3.5"
              />

              <div className="border-charcoal/15 relative overflow-hidden rounded-xs border bg-[#F3F1EC] shadow-[0_24px_60px_-20px_rgba(41,41,35,0.18)]">
                {/* Top Editorial Plate Header */}
                <div className="border-charcoal/10 bg-ivory/90 text-olive-deep flex items-center justify-between border-b px-4 py-2.5 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">
                  <span>Segun Michael</span>
                  <span>Listen · Create · Build</span>
                </div>

                {/* Primary Hero Portrait (potrait/IMG_2543c.jpg) */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4F3EF]">
                  <Image
                    src="/images/portraits/segun-hero.jpg"
                    alt="Segun Michael smiling warmly with arms crossed in a cream mandarin-collar shirt."
                    fill
                    preload
                    quality={85}
                    sizes="(min-width: 1024px) 38vw, (min-width: 640px) 70vw, 92vw"
                    className="object-cover object-[50%_12%]"
                  />
                  {/* Subtle warm editorial bottom gradient for caption legibility */}
                  <div
                    aria-hidden
                    className="from-charcoal/75 via-charcoal/25 pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t to-transparent"
                  />
                  <figcaption className="text-ivory absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-5 py-4">
                    <div>
                      <p className="text-terracotta-light text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">
                        Personal Brand &amp; Ecosystem
                      </p>
                      <p className="font-display text-ivory mt-0.5 text-[1.15rem] leading-snug">
                        Listening Hub · MAO Media · MAO Contractors
                      </p>
                    </div>
                  </figcaption>
                </div>
              </div>
            </figure>
          </div>
        </div>

        {/* Quiet Scroll Cue */}
        <div
          data-hero="fade"
          className="border-charcoal/10 text-olive-deep mt-10 hidden items-center justify-between border-t pt-5 text-[0.75rem] font-medium tracking-[0.12em] uppercase lg:flex"
        >
          <a
            href="#about-segun"
            className="hover:text-charcoal inline-flex items-center gap-2.5 transition-colors"
          >
            <ArrowDown aria-hidden className="text-terracotta-deep size-3.5" />
            <span>Scroll to explore the narrative</span>
          </a>
          <span>The Human Editorial</span>
        </div>
      </Container>
    </HeroAnimator>
  );
}
