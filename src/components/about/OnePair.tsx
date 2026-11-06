"use client";

import { useCallback, useRef } from "react";
import { about } from "@/data/about";
import { smoothstep } from "@/components/home/scene";
import { useStageProgress } from "./useStageProgress";

const Lines = () => (
  <>
    {about.onePair.map((line) => (
      <span key={line} className="block">
        {line}{" "}
      </span>
    ))}
  </>
);

/**
 * 04: The turn. The homepage's cyanotype exposure rises through the sentence,
 * and the words change colour exactly where the blue meets them. Only when the
 * screen is fully blue does his family line arrive, in his own words and with
 * nothing added: three things to hold, and what those hands go home to.
 *
 * The sentence exists twice so that one copy can be clipped; only the first is
 * read aloud.
 */
export function OnePair() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const blue = useRef<HTMLDivElement>(null);
  const family = useRef<HTMLParagraphElement>(null);

  const render = useCallback((p: number, reduced: boolean) => {
    if (blue.current) {
      const risen = reduced ? 1 : Math.max(0, Math.min(1, (p - 0.06) / 0.56));
      blue.current.style.clipPath = `inset(${((1 - risen) * 100).toFixed(2)}% 0 0 0)`;
    }
    if (family.current) {
      family.current.style.opacity = (reduced ? 1 : smoothstep(0.68, 0.86, p)).toFixed(3);
    }
  }, []);

  useStageProgress(track, stage, render);

  return (
    <section aria-label={about.onePair.join(" ")} className="pair">
      <div ref={track} className="pair-track">
        <div ref={stage} className="pair-stage">
          <p className="pair-line">
            <Lines />
          </p>
          <div ref={blue} className="pair-blue" aria-hidden="true">
            <p className="pair-line">
              <Lines />
            </p>
          </div>
          <p ref={family} className="pair-family">
            {about.family}
          </p>
        </div>
      </div>
    </section>
  );
}
