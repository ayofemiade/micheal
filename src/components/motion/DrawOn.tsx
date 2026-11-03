"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Draws an SVG's lines once, as it arrives. The drawing is complete without
 * JS and with reduced motion. Uses pathLength=1 so every shape draws evenly.
 */
export function DrawOn({ className, viewBox, label, children }: { className?: string; viewBox: string; label: string; children: ReactNode }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || prefersReducedMotion()) return;
    const shapes = [...svg.querySelectorAll<SVGGeometryElement>("line,polyline,polygon,rect,path")];
    let revert = () => {};
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      // Hide the lines only once the animation can actually run; never leave the drawing blank.
      // If it's already on screen by now, just leave it drawn.
      if (svg.getBoundingClientRect().top < window.innerHeight * 0.75) return;
      shapes.forEach((s) => {
        s.setAttribute("pathLength", "1");
        s.style.strokeDasharray = "1";
        s.style.strokeDashoffset = "1";
      });
      const ctx = gsap.context(() => {
        gsap.to(shapes, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          stagger: { each: 0.06, from: "start" },
          scrollTrigger: { trigger: svg, start: "top 75%", once: true },
        });
      }, svg);
      revert = () => ctx.revert();
    });
    return () => {
      cancelled = true;
      revert();
      shapes.forEach((s) => {
        s.style.strokeDasharray = "";
        s.style.strokeDashoffset = "";
      });
    };
  }, []);

  return (
    <svg ref={ref} viewBox={viewBox} role="img" aria-label={label} className={className}>
      {children}
    </svg>
  );
}
