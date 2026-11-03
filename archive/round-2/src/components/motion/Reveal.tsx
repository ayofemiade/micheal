"use client";

import { LazyMotion, domAnimation } from "motion/react";
import * as m from "motion/react-m";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. Keep small — this is a reveal, not an entrance. */
  y?: number;
}

/**
 * In-view reveal. Fires once.
 * Renders identical markup on SSR and client hydration to prevent hydration
 * mismatches; reduced-motion users see content immediately via CSS
 * `[data-reveal]` override in `globals.css`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
}: RevealProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        data-reveal=""
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
