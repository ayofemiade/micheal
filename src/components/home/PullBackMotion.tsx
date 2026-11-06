"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { camera, HOUSE, HOUSE_OUTLINE, LAYOUT_SCALE, mixHex, smoothstep } from "./scene";

const STUDIO = "#fafafa";
const PAPER = "#f5f3ee";
const INK = "#14161a";
const CYAN = "#1b3463";
const LAST = 4;

/**
 * Drives the camera from native scroll (rAF scrub, no library): in from the
 * whole portrait to the face, then back out through the four distances. On the
 * way to Places the prints recede and go; the real house draws itself on the
 * paper, its outline fills with the photograph, and that opens to full screen.
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
    const blend = stage?.querySelector<HTMLElement>("[data-blend]");
    const ruler = stage?.querySelector<HTMLElement>(".pullback-ruler");
    const placeEl = stage?.querySelector<HTMLElement>("[data-place]");
    const shade = stage?.querySelector<HTMLElement>("[data-place-shade]");
    const ground = drawing?.querySelector<SVGGElement>("[data-ground]");
    if (!track || !stage || !photos || !drawing || !faceEl || !exposure || !placeEl || !shade || !ground) return;
    const lines = [...drawing.querySelectorAll<SVGElement>("[data-line]")];
    const chapterEls = [...stage.querySelectorAll<HTMLElement>("[data-chapter]")];
    const prints = [...photos.querySelectorAll<HTMLElement>("[data-print]")];
    const rulerBtns = [...stage.querySelectorAll<HTMLButtonElement>(".pullback-ruler [data-goto]")];
    const root = document.documentElement;

    let W = 0;
    let H = 0;
    let layout = { s: 1, tx: 0, ty: 0 };
    let faceScale = 1;
    let houseScale = 1;
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
      // The frame the CSS lays the photographs out at (see scene.ts).
      const hero = camera(0, W, H);
      layout = { s: hero.s * LAYOUT_SCALE, tx: hero.tx * LAYOUT_SCALE, ty: hero.ty * LAYOUT_SCALE };
      faceScale = camera(1, W, H).s;
      // The photograph's own size is its full-screen frame; the camera scales up from that.
      houseScale = camera(3, W, H).s;
      placeEl.style.width = `${HOUSE.w * houseScale}px`;
      placeEl.style.height = `${HOUSE.h * houseScale}px`;
      written.delete("placeT");
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

    // The photograph opens from the building's outline: each corner of the
    // silhouette travels straight out, past the frame, from the middle of the house.
    const cx = HOUSE.pxW / 2;
    const cy = HOUSE.pxH / 2;
    const opening = HOUSE_OUTLINE.map(([x, y]) => {
      const a = Math.atan2(y - cy, x - cx);
      return [x, y, cx + Math.cos(a) * 1300, cy + Math.sin(a) * 1300] as const;
    });
    const aperture = (t: number) =>
      `polygon(${opening
        .map(([x, y, x1, y1]) => `${(((x + (x1 - x) * t) / HOUSE.pxW) * 100).toFixed(2)}% ${(((y + (y1 - y) * t) / HOUSE.pxH) * 100).toFixed(2)}%`)
        .join(",")})`;

    const render = (p: number) => {
      // Reduced motion: the camera never travels. It holds each distance and
      // the scene dissolves out and back in at the next one, so every scroll
      // still visibly does something (rounding alone left four "dead" wheel
      // notches and then a cut).
      const pc = reduce ? Math.round(p) : p;
      // The pull-back to Places covers most of its distance early, so the whole
      // house is in frame by the time its outline fills.
      const zoom = pc > 2 && pc < 3 ? 3 - Math.pow(3 - pc, 2.4) : pc;
      const scene = reduce ? smoothstep(0.08, 0.42, Math.abs(p - Math.floor(p) - 0.5)) : 1;

      const cam = camera(zoom, W, H);
      const r = cam.s / layout.s;
      // The prints and the portrait recede and leave for good; only the house remains.
      const stories = 1 - smoothstep(2.08, 2.32, pc);
      put("photosV", stories * scene > 0 ? "visible" : "hidden", (v) => (photos.style.visibility = v));
      put("photos", `translate3d(${(cam.tx - layout.tx * r).toFixed(2)}px, ${(cam.ty - layout.ty * r).toFixed(2)}px, 0) scale(${r.toFixed(5)})`, (v) => (photos.style.transform = v));
      put("photosO", op(stories * scene), (v) => (photos.style.opacity = v));
      // Size relative to the 1:1 close-up.
      const near = cam.s / faceScale;
      // The sharper face crop takes over as the camera closes in, and hands back on the way out.
      put("face", op(pc <= 1 ? smoothstep(0.4, 0.9, pc) : smoothstep(0.35, 0.8, near)), (v) => (faceEl.style.opacity = v));
      // The other prints arrive only once the camera pulls back past 1:1; the
      // introduction frames the same wall, so they must stay away until then.
      put("prints", op(pc <= 1 ? 0 : 1 - smoothstep(0.75, 0.97, near)), (v) => prints.forEach((el) => (el.style.opacity = v)));
      // Blends the photograph's edges into the studio white; a print again from 1:10.
      if (blend) put("blend", op(1 - smoothstep(1, 1.3, pc)), (v) => (blend.style.opacity = v));

      // Places. Draw, then fill the outline, then open it. Reduced motion simply holds the full frame.
      const fill = smoothstep(2.52, 2.64, pc);
      const open = smoothstep(2.64, 2.97, pc);
      const held = pc >= 3 && p < 3.9;
      const placeO = (reduce ? (held ? 1 : 0) : fill * (p < 3.9 ? 1 : 0)) * scene;
      put("placeV", placeO > 0 ? "visible" : "hidden", (v) => (placeEl.style.visibility = v));
      if (placeO > 0) {
        put("placeO", op(placeO), (v) => (placeEl.style.opacity = v));
        // Holds still once it is full screen: past here the camera would show its edges.
        const c = camera(Math.min(zoom, 3), W, H);
        put("placeT", `translate3d(${(c.tx + HOUSE.x * c.s).toFixed(2)}px, ${(c.ty + HOUSE.y * c.s).toFixed(2)}px, 0) scale(${(c.s / houseScale).toFixed(5)})`, (v) => (placeEl.style.transform = v));
        put("placeC", open >= 1 ? "none" : aperture(open * open), (v) => (placeEl.style.clipPath = v));
      }
      const shadeO = (reduce ? (held ? 1 : 0) : smoothstep(2.74, 2.94, pc)) * scene;
      put("shade", op(p < 3.9 ? shadeO : 0), (v) => (shade.style.opacity = v));

      // The line drawing draws itself, gives way to the photograph, and returns on the blue.
      const away = smoothstep(2.28, 2.34, pc) * (1 - smoothstep(2.7, 2.9, pc));
      const blueprint = smoothstep(3.55, 3.85, p);
      const drawO = Math.max(away, blueprint) * scene;
      if (drawO > 0) {
        // World-unit strokes (dashes need them): keep them a hairline at any distance.
        put("hw", (1.25 / cam.s).toFixed(3), (v) => drawing.style.setProperty("--hw", v));
        const u = Math.max(0, Math.min(1, (pc - 2.3) / 0.28));
        lines.forEach((el, i) => {
          const local = Math.max(0, Math.min(1, u * 1.7 - (i / lines.length) * 0.7));
          put(`l${i}`, (1 - local).toFixed(3), (v) => (el.style.strokeDashoffset = v));
        });
        put("ground", op(blueprint), (v) => (ground.style.opacity = v));
      }
      put("drawO", op(drawO), (v) => {
        drawing.style.opacity = v;
        drawing.style.visibility = drawO > 0 ? "visible" : "hidden";
      });
      // Repainting the drawing is costly; skip it entirely while it is invisible.
      if (drawO > 0) put("draw", `translate3d(${cam.tx.toFixed(2)}px, ${cam.ty.toFixed(2)}px, 0) scale(${cam.s.toFixed(5)})`, (v) => (drawing.style.transform = v));

      // studio white → paper; then the cyanotype exposure rises from the horizon
      // Reduced motion fades the blue instead of wiping it, and only after the scene has
      // dissolved: fading paper into blue under the photos read as a muddy grey.
      const exposed = reduce ? smoothstep(3.5, 3.85, p) : smoothstep(3.35, 3.85, p);
      const flip = smoothstep(3.55, 3.7, p);
      // Text turns light as the photograph's sky reaches it.
      const onPhoto = reduce ? (held ? 1 : 0) : smoothstep(2.76, 2.84, p);
      const light = Math.max(flip, onPhoto);
      put("bg", mixHex(STUDIO, PAPER, Math.max(0, Math.min(1, p - 1))), (v) => stage.style.setProperty("--stage-bg", v));
      put("fg", mixHex(INK, PAPER, light), (v) => stage.style.setProperty("--stage-fg", v));
      put("line", mixHex(CYAN, PAPER, flip), (v) => stage.style.setProperty("--stage-line", v));
      if (reduce) put("exp", op(exposed), (v) => (exposure.style.opacity = v));
      else put("exp", `inset(${((1 - exposed) * 100).toFixed(2)}% 0 0 0)`, (v) => (exposure.style.clipPath = v));
      if (veil) put("veil", op(Math.max(0, 1 - Math.abs(p - 1) * 2.6)), (v) => (veil.style.opacity = v));
      // The distance ruler starts at 1:1, not on the introduction.
      if (ruler) {
        const o = smoothstep(0.5, 0.9, p);
        put("ruler", op(o), (v) => {
          ruler.style.opacity = v;
          ruler.style.visibility = o > 0 ? "visible" : "hidden";
        });
      }
      dark = light > 0.5;
      applyTone();

      chapterEls.forEach((el, j) => {
        const d = p - j;
        // Places waits for the photograph to open under it.
        const o = j === 3 && d < 0 && !reduce ? smoothstep(2.82, 2.96, p) : Math.max(0, 1 - Math.abs(d) * 2.6);
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
          j === nearest - 1 ? b.setAttribute("aria-current", "step") : b.removeAttribute("aria-current"),
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
