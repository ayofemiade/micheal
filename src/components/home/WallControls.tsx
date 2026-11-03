"use client";

import { useEffect, useState } from "react";

/** Previous / next for the print wall: native horizontal scroll, no hijacking. */
export function WallControls({ targetId }: { targetId: string }) {
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const update = () =>
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  const go = (dir: 1 | -1) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: reduce ? "auto" : "smooth" });
  };

  const btn =
    "grid size-12 place-items-center border border-current transition-opacity disabled:opacity-25 hover:bg-ink hover:text-paper disabled:hover:bg-transparent disabled:hover:text-current";
  return (
    <div className="flex gap-2">
      <button type="button" className={btn} onClick={() => go(-1)} disabled={edge.start} aria-controls={targetId}>
        <span aria-hidden="true">←</span>
        <span className="sr-only">Previous photographs</span>
      </button>
      <button type="button" className={btn} onClick={() => go(1)} disabled={edge.end} aria-controls={targetId}>
        <span aria-hidden="true">→</span>
        <span className="sr-only">Next photographs</span>
      </button>
    </div>
  );
}
