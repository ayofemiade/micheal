import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { pillars } from "@/data/pillars";
import { cn } from "@/lib/utils";
import type { Pillar } from "@/types/content";

const cardStyles: Record<
  Pillar["id"],
  {
    wrapper: string;
    badge: string;
    indexColor: string;
    muted: string;
    divider: string;
    cta: string;
    stagger: string;
  }
> = {
  "listening-hub": {
    wrapper: "border-terracotta/25 bg-[#EFE6DA] text-charcoal",
    badge: "border-terracotta-deep/25 bg-ivory/85 text-terracotta-deep",
    indexColor: "text-terracotta-deep",
    muted: "text-charcoal/80",
    divider: "border-charcoal/12",
    cta: "text-charcoal group-hover/card:text-terracotta-deep",
    stagger: "lg:mt-0",
  },
  media: {
    wrapper: "border-charcoal bg-charcoal text-ivory",
    badge: "border-ivory/20 bg-charcoal-deep/80 text-terracotta-light",
    indexColor: "text-terracotta-light",
    muted: "text-sand/85",
    divider: "border-ivory/14",
    cta: "text-ivory group-hover/card:text-terracotta-light",
    stagger: "lg:mt-7",
  },
  "real-estate": {
    wrapper: "border-olive/30 bg-[#E6E0D3] text-charcoal",
    badge: "border-charcoal/20 bg-ivory/85 text-charcoal",
    indexColor: "text-olive-deep",
    muted: "text-charcoal/80",
    divider: "border-charcoal/12",
    cta: "text-charcoal group-hover/card:text-terracotta-deep",
    stagger: "lg:mt-14",
  },
};

function ExpressionDossier({ pillar }: { pillar: Pillar }) {
  const style = cardStyles[pillar.id];

  return (
    <article
      className={cn(
        "group/card relative flex flex-col justify-between overflow-hidden rounded-xs border transition-transform duration-500 ease-[var(--ease-editorial)] hover:-translate-y-1",
        style.wrapper,
        style.stagger,
      )}
    >
      <div>
        {/* Editorial Image Header with Index Overlay */}
        <div className="bg-charcoal/10 relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={pillar.image.src}
            alt={pillar.image.alt}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 768px) 48vw, 92vw"
            style={{ objectPosition: pillar.image.objectPosition }}
            className="object-cover transition-transform duration-1000 ease-[var(--ease-editorial)] group-hover/card:scale-[1.04]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15"
          />

          <div className="absolute inset-x-5 top-4 flex items-center justify-between gap-2">
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.08em] backdrop-blur-xs",
                style.badge,
              )}
            >
              {pillar.domain}
            </span>
            <span className="font-display text-ivory text-[1.65rem] leading-none drop-shadow-xs">
              {pillar.index}
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-7 sm:p-8">
          <p
            className={cn(
              "font-mono text-[0.72rem] font-semibold tracking-[0.14em] uppercase",
              style.indexColor,
            )}
          >
            {pillar.index} · {pillar.entity}
          </p>

          <h3 className="t-h3 mt-2.5">
            <Link
              href={pillar.href}
              className="outline-offset-4 after:absolute after:inset-0 after:content-['']"
            >
              {pillar.title}
            </Link>
          </h3>

          <p className="font-display mt-3 text-[1.35rem] leading-[1.2] italic">
            &ldquo;{pillar.line}&rdquo;
          </p>

          <p className={cn("t-body mt-4 text-pretty", style.muted)}>
            {pillar.description}
          </p>

          <ul
            className={cn(
              "mt-6 space-y-2.5 border-t pt-5 text-[0.84375rem]",
              style.divider,
              style.muted,
            )}
          >
            {pillar.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className={cn(
                    "mt-2 size-1.5 shrink-0 rounded-full bg-current",
                    style.indexColor,
                  )}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer CTA inside Dossier */}
      <div className={cn("border-t px-7 py-4.5 sm:px-8", style.divider)}>
        <span
          aria-hidden
          className={cn(
            "inline-flex items-center gap-2 text-[0.84375rem] font-semibold tracking-[0.02em] transition-colors",
            style.cta,
          )}
        >
          <span>{pillar.cta}</span>
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
            strokeWidth={1.75}
          />
        </span>
      </div>
    </article>
  );
}

/**
 * Section 04 — Three Expressions of Purpose
 * Full-width 12-column editorial header followed by a generous, stepped
 * 3-column dossier grid on desktop (`lg:grid-cols-3`) so each expression has
 * room to breathe and a distinct visual identity.
 */
export function PillarsSection() {
  return (
    <section
      id="expressions"
      aria-labelledby="pillars-title"
      className="section-y border-charcoal/10 bg-ivory border-b"
    >
      <Container>
        {/* Editorial Section Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>Three Ways We Can Work Together</SectionLabel>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                id="pillars-title"
                className="t-h1 text-charcoal mt-6 max-w-[15ch] text-balance"
              >
                One person. Three expressions of{" "}
                <span className="t-em">purpose.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.14}>
              <p className="t-body text-charcoal/82 text-pretty">
                Whether it&rsquo;s a reflective conversation, a creative media
                commission, or a property renovation venture—each expression is
                guided by the same standard of care, clarity, and personal
                accountability.
              </p>
              <div className="mt-5">
                <Button href="#listening-hub" variant="link">
                  Start with the Listening Hub
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stepped 3-Column Editorial Dossier Grid */}
        <div className="mt-12 grid items-start gap-8 lg:mt-16 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.id} delay={0.08 * index} y={24}>
              <ExpressionDossier pillar={pillar} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
