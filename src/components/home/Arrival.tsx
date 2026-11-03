"use client";

import { useEffect, useRef } from "react";

/**
 * Never hold anyone longer than this, measured from when the page started
 * loading (not from hydration, which alone can take ~2 s on a slow phone).
 * Measured on throttled "Slow 4G": counting from hydration held people 4.5–5.5 s.
 */
const MAX_WAIT_FROM_NAV = 3000;
const SESSION_KEY = "sm-arrived";

/**
 * The arrival: his studio backdrop, held until the essentials are ready
 * (fonts, the 1:1 photographs, the prints the camera reveals), then lifted.
 * Scrolling is locked meanwhile, so nobody scrolls into a half-loaded scene.
 *
 * Fail-safes: a hard cap (MAX_WAIT_FROM_NAV); a CSS-only timeout in globals.css if JS
 * fails; never shown without JS; skipped on repeat visits in a session (the
 * inline script in layout.tsx adds `arrived` before first paint).
 */
export function Arrival() {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("arrived")) return;

    let done = false;
    const arrive = () => {
      if (done) return;
      done = true;
      root.classList.add("arrived");
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
    };

    const imgs = [...document.querySelectorAll<HTMLImageElement>("#pullback img")];
    const tasks: Promise<unknown>[] = [
      document.fonts?.ready ?? Promise.resolve(),
      ...imgs.map((img) =>
        // decode() waits for the bytes and the decode, so the first frame paints complete
        img.decode ? img.decode().catch(() => undefined) : Promise.resolve(),
      ),
    ];
    let settled = 0;
    tasks.forEach((t) =>
      t.then(() => {
        settled += 1;
        if (barRef.current) barRef.current.style.transform = `scaleX(${settled / tasks.length})`;
      }),
    );

    const cap = window.setTimeout(arrive, Math.max(0, MAX_WAIT_FROM_NAV - performance.now()));
    Promise.all(tasks).then(() => {
      // let the full bar register before lifting
      window.setTimeout(arrive, 180);
    });
    return () => window.clearTimeout(cap);
  }, []);

  return (
    <div className="arrival" aria-hidden="true">
      <div className="arrival-mark">
        <p className="t-scale flex items-center gap-3.5">
          <span className="ratio">1:1</span>
          <span>Segun Michael</span>
        </p>
        <span className="arrival-track">
          <span ref={barRef} className="arrival-bar" />
        </span>
      </div>
    </div>
  );
}
