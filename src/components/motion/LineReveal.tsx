"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Reveals a statement line by line at reading pace, once. Used in one place
 * only (the Listening Hub): "reading as an event", not a page-wide effect.
 * Text is fully visible without JS and with reduced motion.
 */
export function LineReveal({
  as: Tag = "h2",
  className,
  id,
  children,
}: {
  as?: ElementType;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let revert = () => {};
    let cancelled = false;
    loadGsap().then(({ gsap, SplitText }) => {
      if (cancelled) return;
      // Already being read? Don't hide it just to animate it back in.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.82) return;
      const ctx = gsap.context(() => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 105,
              duration: 1.1,
              stagger: 0.12,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 82%", once: true },
            }),
        });
      }, el);
      revert = () => ctx.revert();
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
