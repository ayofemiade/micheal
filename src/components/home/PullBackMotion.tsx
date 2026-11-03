"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { camera, mixHex, smoothstep } from "./scene";

const STUDIO = "#fafafa";
const PAPER = "#f5f3ee";
const INK = "#14161a";
const CYAN = "#1b3463";
const LAST = 3;

/**
 * Drives the pull-back camera from native scroll (rAF scrub, no library).
 * - transform-only: one transform for the photographs, one for the drawing
 * - reduced motion: the camera cuts between the four distances, no scrub
 * - keyboard: focusing anything in a chapter moves the camera to it
 */
export function PullBackMotion() {
  useEffect(() => {
    const track = document.getElementById("pullback");
    const stage = track?.querySelector<HTMLElement>("[data-stage]");
    const photos = stage?.querySelector<HTMLElement>("[data-photos]");
    const drawing = stage?.querySelector<SVGSVGElement>("[data-drawing]");
    const faceEl = stage?.querySelector<HTMLElement>("[data-face]");
    const exposure = stage?.querySelector<HTMLElement>("[data-exposure]");
    const veil = stage?.querySelector<HTMLElement>("[data-veil]");
    if (!track || !stage || !photos || !drawing || !faceEl || !exposure) return;
    const chapterEls = [...stage.querySelectorAll<HTMLElement>("[data-chapter]")];
    const rulerBtns = [...stage.querySelectorAll<HTMLButtonElement>(".pullback-ruler [data-goto]")];
    const root = document.documentElement;

    let W = 0;
    let H = 0;
    let cam0 = camera(0, 1, 1);
    let current = -1;
    let idle: number | undefined;
    // The header turns light only while the exposed stage is actually behind it.
    let dark = false;
    let underHeader = true;
    const applyTone = () => {
      root.dataset.tone = dark && underHeader ? "dark" : "light";
    };
    const reduce = prefersReducedMotion();

    const measure = () => {
      W = stage.clientWidth;
      H = stage.clientHeight;
      cam0 = camera(0, W, H);
    };

    const render = (raw: number) => {
      const p = reduce ? Math.round(raw) : raw;
      const cam = camera(p, W, H);
      const r = cam.s / cam0.s;
      photos.style.transform = `translate3d(${cam.tx - cam0.tx * r}px, ${cam.ty - cam0.ty * r}px, 0) scale(${r})`;
      drawing.style.transform = `translate3d(${cam.tx}px, ${cam.ty}px, 0) scale(${cam.s})`;
      faceEl.style.opacity = String(smoothstep(0.35, 0.8, r));
      drawing.style.opacity = String(smoothstep(1.15, 1.6, p));

      // studio white → paper; then the cyanotype exposure rises from the horizon
      const exposed = smoothstep(2.35, 2.85, p);
      const flip = smoothstep(2.55, 2.7, p);
      stage.style.setProperty("--stage-bg", mixHex(STUDIO, PAPER, Math.min(1, p)));
      stage.style.setProperty("--stage-fg", mixHex(INK, PAPER, flip));
      stage.style.setProperty("--stage-line", mixHex(CYAN, PAPER, flip));
      exposure.style.clipPath = `inset(${((1 - exposed) * 100).toFixed(2)}% 0 0 0)`;
      if (veil) veil.style.opacity = String(Math.max(0, 1 - p * 2.6));
      dark = flip > 0.5;
      applyTone();

      chapterEls.forEach((el, j) => {
        const d = p - j;
        const o = Math.max(0, 1 - Math.abs(d) * 2.6);
        el.style.opacity = String(o);
        el.style.transform = reduce ? "" : `translate3d(0, ${-d * 40}px, 0)`;
        el.style.pointerEvents = o > 0.5 ? "auto" : "none";
      });

      const nearest = Math.round(p);
      if (nearest !== current) {
        current = nearest;
        rulerBtns.forEach((b, j) =>
          j === nearest ? b.setAttribute("aria-current", "step") : b.removeAttribute("aria-current"),
        );
      }

      // Rasterise with will-change only while moving, then let the browser re-render crisply.
      photos.classList.add("is-moving");
      window.clearTimeout(idle);
      idle = window.setTimeout(() => photos.classList.remove("is-moving"), 160);
    };

    // Scroll → progress, eased toward the target each frame (a "scrub").
    // Native scroll and rAF only, so the camera works the moment the page
    // hydrates; it does not wait for any animation library to download.
    let target = 0;
    let cur = 0;
    let raf = 0;
    let last = 0;
    const header = document.querySelector("header");

    const readScroll = () => {
      const rect = track.getBoundingClientRect();
      const span = track.offsetHeight - window.innerHeight;
      target = span > 0 ? Math.max(0, Math.min(1, -rect.top / span)) * LAST : 0;
      const next = rect.top <= 0 && rect.bottom > (header?.offsetHeight ?? 72);
      if (next !== underHeader) {
        underHeader = next;
        applyTone();
      }
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16.7;
      last = now;
      // ~0.7 s catch-up, independent of frame rate
      const k = reduce ? 1 : 1 - Math.pow(1 - 0.12, dt / 16.7);
      cur += (target - cur) * k;
      if (Math.abs(target - cur) < 0.0005) cur = target;
      render(cur);
      if (cur !== target) raf = requestAnimationFrame(tick);
      else {
        raf = 0;
        last = 0;
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      readScroll();
      kick();
    };
    const onResize = () => {
      measure();
      readScroll();
      render(cur);
    };

    const goTo = (i: number, instant = false) => {
      const top = track.getBoundingClientRect().top + window.scrollY;
      const span = track.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + (span * i) / LAST, behavior: reduce || instant ? "auto" : "smooth" });
      if (instant) {
        // Skip the catch-up when focus moves the camera.
        target = cur = i;
        render(cur);
      }
    };

    const onClick = (e: MouseEvent) => {
      const btn = (e.target as Element).closest<HTMLElement>("[data-goto]");
      if (btn) goTo(Number(btn.dataset.goto));
    };
    const onFocus = (e: FocusEvent) => {
      const ch = (e.target as Element).closest<HTMLElement>("[data-chapter]");
      // Keyboard focus must never land on an invisible control: move there at once.
      if (ch && Number(ch.dataset.i) !== current) goTo(Number(ch.dataset.i), true);
    };
    stage.addEventListener("click", onClick);
    stage.addEventListener("focusin", onFocus);

    measure();
    readScroll();
    cur = target; // a reload mid-page starts where the visitor is, without a sweep
    render(cur);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(idle);
      stage.removeEventListener("click", onClick);
      stage.removeEventListener("focusin", onFocus);
      delete root.dataset.tone;
    };
  }, []);

  return null;
}
