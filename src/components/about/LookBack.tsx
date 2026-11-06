"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { about } from "@/data/about";
import { smoothstep } from "@/components/home/scene";
import { useStageProgress } from "./useStageProgress";

const { lookBack } = about;

/**
 * 01: He lowers the camera. Two real frames from one sitting, registered on his
 * face, so scrolling is the gesture: the camera comes down and he is simply
 * there, looking at you.
 *
 * `id="pullback"` is what the Header watches to stay transparent over a full
 * first screen; nothing else on this page uses it.
 */
export function LookBack() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const frames = useRef<HTMLDivElement>(null);
  const lowered = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLParagraphElement>(null);
  const second = useRef<HTMLParagraphElement>(null);
  const cue = useRef<HTMLAnchorElement>(null);

  const render = useCallback((p: number, reduced: boolean) => {
    const down = smoothstep(0.34, 0.6, p);
    if (lowered.current) lowered.current.style.opacity = down.toFixed(3);
    // The room settles a little as he does.
    if (frames.current && !reduced) frames.current.style.transform = `scale(${(1.045 - 0.045 * smoothstep(0, 1, p)).toFixed(4)})`;
    const out = 1 - smoothstep(0.16, 0.38, p);
    const inn = smoothstep(0.56, 0.78, p);
    if (first.current) {
      first.current.style.opacity = out.toFixed(3);
      if (!reduced) first.current.style.transform = `translate3d(0, ${((out - 1) * 28).toFixed(1)}px, 0)`;
    }
    if (second.current) {
      second.current.style.opacity = inn.toFixed(3);
      if (!reduced) second.current.style.transform = `translate3d(0, ${((1 - inn) * 28).toFixed(1)}px, 0)`;
    }
    if (cue.current) cue.current.style.opacity = (1 - smoothstep(0.02, 0.16, p)).toFixed(3);
  }, []);

  useStageProgress(track, stage, render);

  return (
    <section aria-labelledby="about-title" className="lb">
      <div ref={track} id="pullback" className="lb-track">
        <div ref={stage} className="lb-stage">
          <div ref={frames} className="lb-frames">
            <Image
              src={lookBack.raised.src}
              alt={lookBack.raised.alt}
              fill
              sizes="(max-width: 639px) 300vw, 100vw"
              loading="eager"
              fetchPriority="high"
              className="lb-photo"
            />
            <div ref={lowered} className="lb-lowered">
              <Image
                src={lookBack.lowered.src}
                alt={lookBack.lowered.alt}
                fill
                sizes="(max-width: 639px) 300vw, 100vw"
                loading="eager"
                fetchPriority="low"
                className="lb-photo"
              />
            </div>
          </div>
          <div className="lb-shade" aria-hidden="true" />

          <div className="lb-copy">
            <h1 id="about-title" className="t-scale">
              {lookBack.heading}
            </h1>
            <div className="lb-lines">
              <p ref={first} className="lb-line">
                {lookBack.first}
              </p>
              <p ref={second} className="lb-line lb-line-second">
                {lookBack.second}
              </p>
            </div>
            <a ref={cue} href="#who" className="link-quiet lb-cue text-[0.9375rem]">
              {lookBack.cue} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
