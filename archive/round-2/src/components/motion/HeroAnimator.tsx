"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Orchestrates the hero entrance with a single GSAP timeline.
 * Children are server-rendered; this wrapper only animates them.
 *
 * Targets (data-hero):
 *   line      – headline words, rise inside their mask
 *   fade      – annotations, copy, CTAs
 *   portrait  – the photograph, revealed upward
 *
 * Progressive enhancement: the `hero-pending` class (globals.css) hides
 * targets only when motion is allowed, with a CSS failsafe if JS never runs.
 */
export function HeroAnimator({
  children,
  className,
  ...rest
}: React.ComponentProps<"section">) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(el);

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            el.classList.remove("hero-pending");
            gsap.set(q("[data-hero]"), { clearProps: "all" });
          },
        });

        tl.fromTo(
          q("[data-hero='portrait']"),
          { opacity: 0, clipPath: "inset(100% 0% 0% 0%)", scale: 1.06 },
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.5,
            ease: "power4.out",
          },
          0,
        )
          .fromTo(
            q("[data-hero='line']"),
            { yPercent: 108, opacity: 1 },
            { yPercent: 0, duration: 1.1, stagger: 0.09 },
            0.15,
          )
          .fromTo(
            q("[data-hero='fade']"),
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.07 },
            0.75,
          );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={className} {...rest}>
      {children}
    </section>
  );
}
