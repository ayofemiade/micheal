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
 * - reduced motion: no camera travel; each distance dissolves into the next
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
    const prints = [...photos.querySelectorAll<HTMLElement>("[data-print]")];
    const rulerBtns = [...stage.querySelectorAll<HTMLButtonElement>(".pullback-ruler [data-goto]")];
    const root = document.documentElement;

    let W = 0;
    let H = 0;
    let cam0 = camera(0, 1, 1);
    let current = -1;
    // The header turns light only while the exposed stage is actually behind it.
    let dark = false;
    let underHeader = true;
    const applyTone = () => {
      // Only on change: rewriting <html data-tone> re-checks every [data-tone] selector.
      const tone = dark && underHeader ? "dark" : "light";
      if (root.dataset.tone !== tone) root.dataset.tone = tone;
    };
    const reduce = prefersReducedMotion();

    const measure = () => {
      W = stage.clientWidth;
      H = stage.clientHeight;
      cam0 = camera(0, W, H);
    };

    // Write a style only when its value changes. Rewriting identical values every
    // frame (colour variables especially) forced a style recalc of the whole
    // stage, including every line of the drawing: the main cost on phones.
    const written = new Map<string, string>();
    const put = (key: string, value: string, apply: (v: string) => void) => {
      if (written.get(key) === value) return;
      written.set(key, value);
      apply(value);
    };
    const op = (v: number) => v.toFixed(3);
    if (reduce) exposure.style.clipPath = "none";

    const render = (p: number) => {
      // Reduced motion: the camera never travels. It holds each distance and
      // the scene dissolves out and back in at the next one, so every scroll
      // still visibly does something (rounding alone left four "dead" wheel
      // notches and then a cut).
      const pc = reduce ? Math.round(p) : p;
      const scene = reduce ? smoothstep(0.08, 0.42, Math.abs(p - Math.floor(p) - 0.5)) : 1;

      const cam = camera(pc, W, H);
      const r = cam.s / cam0.s;
      put("photos", `translate3d(${(cam.tx - cam0.tx * r).toFixed(2)}px, ${(cam.ty - cam0.ty * r).toFixed(2)}px, 0) scale(${r.toFixed(5)})`, (v) => (photos.style.transform = v));
      put("photosO", op(scene), (v) => (photos.style.opacity = v));
      put("face", op(smoothstep(0.35, 0.8, r)), (v) => (faceEl.style.opacity = v));
      // The other prints arrive as the camera pulls back. At 1:1 they are
      // off-screen on most displays, but an ultrawide frame caught the edge of one, hugely magnified.
      put("prints", op(1 - smoothstep(0.75, 0.97, r)), (v) => prints.forEach((el) => (el.style.opacity = v)));

      const drawO = smoothstep(1.15, 1.6, pc) * scene;
      put("drawO", op(drawO), (v) => {
        drawing.style.opacity = v;
        drawing.style.visibility = drawO > 0 ? "visible" : "hidden";
      });
      // Repainting the drawing is costly; skip it entirely while it is invisible.
      if (drawO > 0) put("draw", `translate3d(${cam.tx.toFixed(2)}px, ${cam.ty.toFixed(2)}px, 0) scale(${cam.s.toFixed(5)})`, (v) => (drawing.style.transform = v));

      // studio white → paper; then the cyanotype exposure rises from the horizon
      // Reduced motion fades the blue instead of wiping it, and only after the scene has
      // dissolved: fading paper into blue under the photos read as a muddy grey.
      const exposed = reduce ? smoothstep(2.5, 2.85, p) : smoothstep(2.35, 2.85, p);
      const flip = smoothstep(2.55, 2.7, p);
      put("bg", mixHex(STUDIO, PAPER, Math.min(1, p)), (v) => stage.style.setProperty("--stage-bg", v));
      put("fg", mixHex(INK, PAPER, flip), (v) => stage.style.setProperty("--stage-fg", v));
      put("line", mixHex(CYAN, PAPER, flip), (v) => stage.style.setProperty("--stage-line", v));
      if (reduce) put("exp", op(exposed), (v) => (exposure.style.opacity = v));
      else put("exp", `inset(${((1 - exposed) * 100).toFixed(2)}% 0 0 0)`, (v) => (exposure.style.clipPath = v));
      if (veil) put("veil", op(Math.max(0, 1 - p * 2.6)), (v) => (veil.style.opacity = v));
      dark = flip > 0.5;
      applyTone();

      chapterEls.forEach((el, j) => {
        const d = p - j;
        const o = Math.max(0, 1 - Math.abs(d) * 2.6);
        put(`c${j}`, op(o), (v) => {
          el.style.opacity = v;
          el.style.pointerEvents = o > 0.5 ? "auto" : "none";
        });
        if (!reduce && o > 0) put(`ct${j}`, `translate3d(0, ${(-d * 40).toFixed(1)}px, 0)`, (v) => (el.style.transform = v));
      });

      const nearest = Math.round(p);
      if (nearest !== current) {
        current = nearest;
        rulerBtns.forEach((b, j) =>
          j === nearest ? b.setAttribute("aria-current", "step") : b.removeAttribute("aria-current"),
        );
      }
    };

    // Scroll → progress, eased toward the target each frame (a "scrub").
    // Native scroll and rAF only, so the camera works the moment the page
    // hydrates; it does not wait for any animation library to download.
    let target = 0;
    let cur = 0;
    let raf = 0;
    let last = 0;
    const header = document.querySelector("header");

    // The sticky span is track minus stage. Not innerHeight: that changes every
    // time a phone's address bar slides in or out, which made the camera jump.
    const spanOf = () => track.offsetHeight - stage.offsetHeight;

    const readScroll = () => {
      const rect = track.getBoundingClientRect();
      const span = spanOf();
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
      // ~0.7 s catch-up, independent of frame rate (also smooths the reduced-motion dissolve)
      const k = 1 - Math.pow(1 - 0.12, dt / 16.7);
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
      const span = spanOf();
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
      stage.removeEventListener("click", onClick);
      stage.removeEventListener("focusin", onFocus);
      delete root.dataset.tone;
    };
  }, []);

  return null;
}
