"use client";

import { useEffect } from "react";
import { pageTop, watchGeometry } from "@/lib/scroll-geometry";

/** Light header text only while the dark cover is actually behind the header. */
export function CoverTone() {
  useEffect(() => {
    const root = document.documentElement;
    const cover = document.getElementById("pullback");
    if (!cover) return;
    let raf = 0;
    // Measured, never read on scroll (see scroll-geometry.ts).
    let coverBottom = 0;
    let headerH = 72;
    let dark: boolean | undefined;
    const update = () => {
      raf = 0;
      const over = coverBottom - window.scrollY > headerH;
      if (over === dark) return;
      dark = over;
      if (over) root.dataset.tone = "dark";
      else delete root.dataset.tone;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const unwatch = watchGeometry(() => {
      coverBottom = pageTop(cover) + cover.offsetHeight;
      headerH = document.querySelector("header")?.offsetHeight ?? 72;
      update();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      unwatch();
      window.removeEventListener("scroll", onScroll);
      delete root.dataset.tone;
    };
  }, []);
  return null;
}
