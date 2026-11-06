"use client";

import { useCallback, useRef } from "react";
import { about } from "@/data/about";
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
 * and the words change colour exactly where the blue meets them. The sentence
 * exists twice so that one copy can be clipped; only the first is read aloud.
 */
export function OnePair() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const blue = useRef<HTMLDivElement>(null);

  const render = useCallback((p: number, reduced: boolean) => {
    if (!blue.current) return;
    const risen = reduced ? 1 : Math.max(0, Math.min(1, (p - 0.08) / 0.74));
    blue.current.style.clipPath = `inset(${((1 - risen) * 100).toFixed(2)}% 0 0 0)`;
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
        </div>
      </div>
    </section>
  );
}
