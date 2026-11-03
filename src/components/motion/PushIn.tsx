"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * The camera's other half: after pulling back to 1:∞, the page pushes in
 * again. A slow, scroll-linked scale toward 1:1. Transform only.
 */
export function PushIn({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let revert = () => {};
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { scale: 1.18, transformOrigin: "30% 75%" },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "top 15%", scrub: 0.6 },
          },
        );
      }, el);
      revert = () => ctx.revert();
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
