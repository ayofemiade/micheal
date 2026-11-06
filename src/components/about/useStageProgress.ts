"use client";

import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * Progress (0 to 1) through a sticky stage inside a taller track, eased toward
 * the scroll position each frame. Native scroll and rAF, like the homepage
 * camera, so it works the moment the page hydrates.
 *
 * The stage's own height is used, never innerHeight, which changes whenever a
 * phone's address bar moves. Everything driven by this must stay screen-sized
 * (docs §9g): nothing here may ask a phone for a layer larger than the stage.
 */
export function useStageProgress(
  trackRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
  render: (p: number, reduced: boolean) => void,
) {
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    const reduced = prefersReducedMotion();

    const read = () => {
      const span = track.offsetHeight - stage.offsetHeight;
      return span > 0 ? Math.max(0, Math.min(1, -track.getBoundingClientRect().top / span)) : 0;
    };

    let cur = read();
    let target = cur;
    let raf = 0;
    let last = 0;

    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16.7;
      last = now;
      cur += (target - cur) * (1 - Math.pow(0.88, dt / 16.7));
      if (Math.abs(target - cur) < 0.0005) cur = target;
      render(cur, reduced);
      if (cur !== target) raf = requestAnimationFrame(tick);
      else {
        raf = 0;
        last = 0;
      }
    };
    const onScroll = () => {
      target = read();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    render(cur, reduced);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [trackRef, stageRef, render]);
}
