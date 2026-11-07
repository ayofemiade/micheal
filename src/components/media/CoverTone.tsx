"use client";

import { useEffect } from "react";

/** Light header text only while the dark cover is actually behind the header. */
export function CoverTone() {
  useEffect(() => {
    const root = document.documentElement;
    const cover = document.getElementById("pullback");
    if (!cover) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const over = cover.getBoundingClientRect().bottom > (document.querySelector("header")?.offsetHeight ?? 72);
      if (over) root.dataset.tone = "dark";
      else delete root.dataset.tone;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      delete root.dataset.tone;
    };
  }, []);
  return null;
}
