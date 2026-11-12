"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { pageTop, watchGeometry } from "@/lib/scroll-geometry";
import { camera, COLLAGE, COLLAGE_RECT, HOUSE, HOUSE_OUTLINE, isMobile, LAYOUT_SCALE, mixHex, SLOT_TRIM, smoothstep, type StoriesFrame } from "./scene";

const STUDIO = "#fafafa";
const PAPER = "#f5f3ee";
const INK = "#14161a";
const CYAN = "#1b3463";
const LAST = 4;
// World units: the ground line, and the size of a survey grid square.
const GROUND_Y = 1000;
const GROUND_CELL = 1700;
// Stories holds still from 2 until here, then the camera leaves for Places.
const HOLD = 2.16;
// Below this tile width (px) the copy cannot sit in the collage's grid: it goes on paper below.
const MIN_TILE = 260;
// From this much free width (px) beside the whole collage, the copy takes a column there instead.
const MIN_COLUMN = 240;

/**
 * Drives the camera from native scroll (rAF scrub, no library): in from the
 * whole portrait to the face, then back out through the four distances.
 * Stories: pulling back from his face, the collage's grid draws out from his
 * print, his print settles into its slot, and the photographs develop outward
 * from him; at rest his slot hands over to the photograph that is really there.
 * Places: the collage clears, the real house draws itself on the paper, its
 * outline fills with the photograph, and that opens to full screen.
 * - transform-only: one transform each for the photographs, the collage, the house
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
    const portraitEl = stage?.querySelector<HTMLElement>("[data-portrait]");
    const exposure = stage?.querySelector<HTMLElement>("[data-exposure]");
    const veil = stage?.querySelector<HTMLElement>("[data-veil]");
    const blend = stage?.querySelector<HTMLElement>("[data-blend]");
    const ruler = stage?.querySelector<HTMLElement>(".pullback-ruler");
    const placeEl = stage?.querySelector<HTMLElement>("[data-place]");
    const shade = stage?.querySelector<HTMLElement>("[data-place-shade]");
    const ground = stage?.querySelector<HTMLElement>("[data-ground]");
    const collageEl = stage?.querySelector<HTMLElement>("[data-collage]");
    const grid = stage?.querySelector<HTMLElement>("[data-grid]");
    const clipEl = stage?.querySelector<HTMLElement>("[data-collage-clip]");
    if (!clipEl || !track || !stage || !photos || !drawing || !faceEl || !portraitEl || !exposure || !placeEl || !shade || !ground || !collageEl || !grid) return;
    const lines = [...drawing.querySelectorAll<SVGElement>("[data-line]")];
    const chapterEls = [...stage.querySelectorAll<HTMLElement>("[data-chapter]")];
    const storiesCopy = chapterEls[2];
    const rulerBtns = [...stage.querySelectorAll<HTMLButtonElement>(".pullback-ruler [data-goto]")];
    const cells = [...collageEl.querySelectorAll<HTMLElement>(".pullback-cells > span")].map((el) => ({
      el,
      d: Number(el.dataset.d),
      slot: el.dataset.slot !== undefined,
      tile: el.dataset.tile !== undefined,
    }));
    const R = COLLAGE_RECT;
    const { xs, ys, slot } = COLLAGE;
    // The slot's centre in world units: the grid draws out from here.
    const slotWX = R.x + ((xs[slot.c] + xs[slot.c + 1]) / 2) * R.k;
    const slotWY = R.y + ((ys[slot.r0] + ys[slot.r1]) / 2) * R.k;
    const gridLines = [...grid.querySelectorAll<HTMLElement>("i")].map((el) => ({
      el,
      x: el.dataset.gx !== undefined ? R.x + Number(el.dataset.gx) * R.k : null,
      y: el.dataset.gy !== undefined ? R.y + Number(el.dataset.gy) * R.k : null,
    }));
    const root = document.documentElement;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let layout = { s: 1, tx: 0, ty: 0 };
    let faceScale = 1;
    let houseScale = 1;
    let collageScale = 1;
    let frame: StoriesFrame = { mode: "tile", top: 0, bottom: 0, glide: 0.5 };
    let tileMode = true;
    // Band screens: where the glide starts, his slot still in view at the right.
    let glideFrom = 0.5;
    let current = -1;
    // The header turns light only while the exposed stage is actually behind it.
    let dark = false;
    let underHeader = true;
    let away = false;
    const applyTone = () => {
      // Only on change: rewriting <html data-tone> re-checks every [data-tone] selector.
      const tone = dark && underHeader ? "dark" : "light";
      if (root.dataset.tone !== tone) root.dataset.tone = tone;
    };
    const reduce = prefersReducedMotion();

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

    const measure = () => {
      W = stage.clientWidth;
      H = stage.clientHeight;
      dpr = window.devicePixelRatio || 1;

      // Stories sits beneath the menu, which turns into a paper bar while the
      // collage shows: the links stay, and never sit on a photograph.
      const top = document.querySelector<HTMLElement>("[data-site-header]")?.offsetHeight ?? 72;
      const wide = !isMobile(W, H) && W / H >= 1.5;
      const setTile = (x: number, y: number, w: number, h: number) => {
        storiesCopy.style.setProperty("--tile-x", `${x.toFixed(1)}px`);
        storiesCopy.style.setProperty("--tile-y", `${y.toFixed(1)}px`);
        storiesCopy.style.setProperty("--tile-w", `${w.toFixed(1)}px`);
        storiesCopy.style.setProperty("--tile-h", `${h.toFixed(1)}px`);
      };
      // Wide, short screens: the whole collage at full height, the copy in the paper beside it.
      const column = W - R.w * ((H - top) / R.h);
      // Other wide screens: the collage covers the space, the copy in a tile of its grid.
      const cover: StoriesFrame = { mode: "tile", top, bottom: H, glide: 0.5 };
      const c2 = camera(2, W, H, cover);
      const { tile } = COLLAGE;
      const left = Math.max(0, c2.tx + (R.x + xs[tile.c0] * R.k) * c2.s);
      const right = c2.tx + (R.x + xs[tile.c1] * R.k) * c2.s;
      const tileTop = Math.max(top, c2.ty + (R.y + ys[tile.r0] * R.k) * c2.s);
      if (wide && column >= MIN_COLUMN) {
        frame = { mode: "column", top, bottom: H, glide: 0.5 };
        setTile(0, top, column, H - top);
      } else if (wide && right - left >= MIN_TILE) {
        frame = cover;
        setTile(left, tileTop, right - left, H - tileTop);
      } else {
        // The band ends a little above the copy, which keeps its own CSS position.
        stage.dataset.stories = "band";
        const copyTop = H - storiesCopy.offsetHeight - parseFloat(getComputedStyle(storiesCopy).bottom || "0");
        const bottom = Math.max(top + H * 0.35, Math.min(H, copyTop - 24));
        const visW = W / camera(2, W, H, { mode: "band", top, bottom, glide: 0 }).s;
        const slotRight = R.x + xs[slot.c + 1] * R.k;
        glideFrom = R.w > visW ? Math.max(0, Math.min(1, (slotRight + 0.08 * visW - visW - R.x) / (R.w - visW))) : 0.5;
        frame = { mode: "band", top, bottom, glide: glideFrom };
      }
      stage.dataset.stories = frame.mode;
      tileMode = frame.mode === "tile";

      // The frame the CSS lays the photographs out at (see scene.ts).
      const hero = camera(0, W, H, frame);
      layout = { s: hero.s * LAYOUT_SCALE, tx: hero.tx * LAYOUT_SCALE, ty: hero.ty * LAYOUT_SCALE };
      faceScale = camera(1, W, H, frame).s;
      // Each photograph's own size is its resting frame; the camera scales from that.
      collageScale = camera(2, W, H, frame).s;
      // On band screens nothing of the collage, grid included, runs on to the copy's paper.
      clipEl.style.clipPath = grid.style.clipPath = frame.mode === "band" ? `inset(0 0 ${(H - frame.bottom).toFixed(1)}px 0)` : "none";
      collageEl.style.width = `${R.w * collageScale}px`;
      collageEl.style.height = `${R.h * collageScale}px`;
      houseScale = camera(3, W, H, frame).s;
      placeEl.style.width = `${HOUSE.w * houseScale}px`;
      placeEl.style.height = `${HOUSE.h * houseScale}px`;
      written.clear();
    };

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
      // Pulling back from the face settles into the collage; the collage holds
      // until HOLD; the pull-back to Places then covers most of its distance
      // early, so the whole house is in frame by the time its outline fills.
      let zoom = pc;
      if (pc > 1 && pc < 2) zoom = 2 - Math.pow(2 - pc, 1.6);
      else if (pc >= 2 && pc < HOLD) zoom = 2;
      else if (pc >= HOLD && pc < 3) zoom = 3 - Math.pow(1 - (pc - HOLD) / (3 - HOLD), 3.2);
      const scene = reduce ? smoothstep(0.08, 0.42, Math.abs(p - Math.floor(p) - 0.5)) : 1;
      // Phones and band screens: the camera glides across the collage while it holds.
      const st: StoriesFrame = { ...frame, glide: reduce ? glideFrom : glideFrom + (1 - glideFrom) * smoothstep(1.96, HOLD, pc) };

      const cam = camera(zoom, W, H, st);
      const r = cam.s / layout.s;

      // His print: whole, then trimmed into its slot, then handing over to the photograph there.
      const handover = smoothstep(1.9, 2, pc);
      const portraitO = (1 - handover) * scene;
      put("photosV", portraitO > 0 ? "visible" : "hidden", (v) => (photos.style.visibility = v));
      put("photos", `translate3d(${(cam.tx - layout.tx * r).toFixed(2)}px, ${(cam.ty - layout.ty * r).toFixed(2)}px, 0) scale(${r.toFixed(5)})`, (v) => (photos.style.transform = v));
      put("photosO", op(portraitO), (v) => (photos.style.opacity = v));
      const trim = smoothstep(1.3, 1.5, pc) * SLOT_TRIM * 100;
      put("trim", trim > 0 ? `inset(0 ${trim.toFixed(2)}% 0 ${trim.toFixed(2)}%)` : "none", (v) => (portraitEl.style.clipPath = v));
      // Size relative to the 1:1 close-up.
      const near = cam.s / faceScale;
      // The sharper face crop takes over as the camera closes in, and hands back on the way out.
      put("face", op(pc <= 1 ? smoothstep(0.4, 0.9, pc) : smoothstep(0.35, 0.8, near)), (v) => (faceEl.style.opacity = v));
      // Blends the photograph's edges into the studio white; a print again past 1:1.
      if (blend) {
        const b = 1 - smoothstep(1, 1.3, pc);
        put("blend", op(b), (v) => {
          blend.style.opacity = v;
          // Hidden, so a phone can release the memory behind it.
          blend.style.visibility = b > 0 ? "visible" : "hidden";
        });
      }

      // Stories. The collage sits under paper cells; each lifts in turn, nearest
      // his slot first, and on the way to Places they close again, farthest first.
      const collageOn = pc > 1.1 && pc < 2.38;
      put("collageV", collageOn && scene > 0 ? "visible" : "hidden", (v) => (collageEl.style.visibility = v));
      if (collageOn) {
        put("collage", `translate3d(${(cam.tx + R.x * cam.s).toFixed(2)}px, ${(cam.ty + R.y * cam.s).toFixed(2)}px, 0) scale(${(cam.s / collageScale).toFixed(5)})`, (v) => (collageEl.style.transform = v));
        put("collageO", op(scene), (v) => (collageEl.style.opacity = v));
        cells.forEach((c, i) => {
          let dev: number;
          if (tileMode && c.tile) dev = 0; // the copy's paper
          else if (c.slot) dev = handover;
          else {
            const start = 1.42 + 0.36 * c.d;
            dev = smoothstep(start, start + 0.16, pc);
          }
          const close = HOLD + 0.04 + 0.1 * (1 - c.d);
          const paper = 1 - dev * (1 - smoothstep(close, close + 0.06, pc));
          // Faded by colour, which only repaints the one cells layer. Opacity made the browser
          // lay the cells out again, and 64 separate GPU layers cost more than they saved (measured).
          put(`v${i}`, (paper * 100).toFixed(1), (v) => c.el.style.setProperty("--paper", `${v}%`));
        });
      }

      // The grid draws out from his slot in drafting blue, and turns into the
      // collage's own white hairlines as the photographs arrive.
      const g = smoothstep(1.12, 1.45, pc);
      const white = smoothstep(1.75, 1.95, pc);
      const gridO = (g > 0 ? 1 : 0) * (1 - smoothstep(HOLD + 0.02, HOLD + 0.14, pc)) * scene;
      put("gridV", gridO > 0 ? "visible" : "hidden", (v) => (grid.style.visibility = v));
      if (gridO > 0) {
        put("gridC", mixHex(CYAN, "#ffffff", white), (v) => (grid.style.color = v));
        put("gridO", op(gridO * (0.5 + 0.4 * white)), (v) => (grid.style.opacity = v));
        // World → screen, lines snapped to device pixels so they stay one crisp hairline.
        const lerp = (a: number, b: number) => a + (b - a) * g;
        const snap = (v: number) => Math.round(v * dpr) / dpr;
        gridLines.forEach((l, i) => {
          let v: string;
          if (l.x !== null) {
            const y1 = cam.ty + lerp(slotWY, R.y) * cam.s;
            const y2 = cam.ty + lerp(slotWY, R.y + R.h) * cam.s;
            v = `translate3d(${snap(cam.tx + l.x * cam.s)}px, ${y1.toFixed(1)}px, 0) scaleY(${((y2 - y1) / H).toFixed(4)})`;
          } else {
            const x1 = cam.tx + lerp(slotWX, R.x) * cam.s;
            const x2 = cam.tx + lerp(slotWX, R.x + R.w) * cam.s;
            v = `translate3d(${x1.toFixed(1)}px, ${snap(cam.ty + (l.y as number) * cam.s)}px, 0) scaleX(${((x2 - x1) / W).toFixed(4)})`;
          }
          put(`g${i}`, v, (t) => (l.el.style.transform = t));
        });
      }

      // Places. Draw, then fill the outline, then open it. Reduced motion simply holds the full frame.
      const fill = smoothstep(2.52, 2.64, pc);
      const open = smoothstep(2.64, 2.97, pc);
      const held = pc >= 3 && p < 3.9;
      const placeO = (reduce ? (held ? 1 : 0) : fill * (p < 3.9 ? 1 : 0)) * scene;
      put("placeV", placeO > 0 ? "visible" : "hidden", (v) => (placeEl.style.visibility = v));
      if (placeO > 0) {
        put("placeO", op(placeO), (v) => (placeEl.style.opacity = v));
        // Holds still once it is full screen: past here the camera would show its edges.
        const c = camera(Math.min(zoom, 3), W, H, st);
        put("placeT", `translate3d(${(c.tx + HOUSE.x * c.s).toFixed(2)}px, ${(c.ty + HOUSE.y * c.s).toFixed(2)}px, 0) scale(${(c.s / houseScale).toFixed(5)})`, (v) => (placeEl.style.transform = v));
        put("placeC", open >= 1 ? "none" : aperture(open * open), (v) => (placeEl.style.clipPath = v));
      }
      const shadeO = (reduce ? (held ? 1 : 0) : smoothstep(2.74, 2.94, pc)) * scene;
      put("shade", op(p < 3.9 ? shadeO : 0), (v) => (shade.style.opacity = v));

      // The line drawing draws itself, gives way to the photograph, and returns on the blue.
      const awayLine = smoothstep(2.28, 2.34, pc) * (1 - smoothstep(2.7, 2.9, pc));
      const blueprint = smoothstep(3.55, 3.85, p);
      const drawO = Math.max(awayLine, blueprint) * scene;
      if (drawO > 0) {
        // World-unit strokes (dashes need them): keep them a hairline at any distance.
        // Rewritten only when it changes visibly (3% steps): each write restyles every
        // line of the drawing and lays it out again, the main cost of the zoom on phones.
        put("hw", (1.25 * Math.pow(1.03, Math.round(Math.log(1 / cam.s) / Math.log(1.03)))).toPrecision(4), (v) => drawing.style.setProperty("--hw", v));
        const u = Math.max(0, Math.min(1, (pc - 2.3) / 0.28));
        lines.forEach((el, i) => {
          const local = Math.max(0, Math.min(1, u * 1.7 - (i / lines.length) * 0.7));
          put(`l${i}`, (1 - local).toFixed(3), (v) => (el.style.strokeDashoffset = v));
        });
      }
      // The open ground: one screen-sized layer. Never world-sized geometry, which
      // asked iPhones for a 32 GB layer and crashed the page (docs §9g).
      put("groundO", op(blueprint * scene), (v) => {
        ground.style.opacity = v;
        ground.style.visibility = blueprint * scene > 0 ? "visible" : "hidden";
      });
      if (blueprint > 0) {
        const cell = GROUND_CELL * cam.s;
        put("groundT", `translate3d(0, ${(cam.ty + GROUND_Y * cam.s).toFixed(2)}px, 0)`, (v) => (ground.style.transform = v));
        put("groundS", `${cell.toFixed(2)}px ${cell.toFixed(2)}px`, (v) => (ground.style.backgroundSize = v));
        put("groundP", `${(cam.tx % cell).toFixed(2)}px 0`, (v) => (ground.style.backgroundPosition = v));
      }
      put("drawO", op(drawO), (v) => {
        drawing.style.opacity = v;
        drawing.style.visibility = drawO > 0 ? "visible" : "hidden";
      });
      // Stage-sized for life: the camera moves the window on to the drawing, so
      // its memory is one screen however close or far the view.
      if (drawO > 0) put("draw", `${(-cam.tx / cam.s).toFixed(2)} ${(-cam.ty / cam.s).toFixed(2)} ${(W / cam.s).toFixed(2)} ${(H / cam.s).toFixed(2)}`, (v) => drawing.setAttribute("viewBox", v));

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

      // While the collage fills the screen, the menu becomes a paper bar and the
      // ruler gets a paper backing: no link or number ever sits on a photograph.
      const cover = smoothstep(1.4, 1.52, pc) * (1 - smoothstep(HOLD + 0.02, HOLD + 0.14, pc)) * scene;
      if (ruler) {
        const o = smoothstep(0.5, 0.9, p);
        put("ruler", op(o), (v) => {
          ruler.style.opacity = v;
          ruler.style.visibility = o > 0 ? "visible" : "hidden";
        });
      }
      const nextAway = cover > 0.5 && underHeader;
      if (nextAway !== away) {
        away = nextAway;
        if (away) root.dataset.chrome = "paper";
        else delete root.dataset.chrome;
      }
      dark = light > 0.5;
      applyTone();

      chapterEls.forEach((el, j) => {
        const d = p - j;
        let o: number;
        if (j === 2 && !reduce) {
          // Stories arrives once the collage has settled, and is gone before it clears.
          o = smoothstep(1.84, 1.98, p) * (1 - smoothstep(HOLD - 0.02, HOLD + 0.04, p));
        } else if (j === 3 && d < 0 && !reduce) {
          // Places waits for the photograph to open under it.
          o = smoothstep(2.82, 2.96, p);
        } else o = Math.max(0, 1 - Math.abs(d) * 2.6);
        put(`c${j}`, op(o), (v) => {
          el.style.opacity = v;
          el.style.pointerEvents = o > 0.5 ? "auto" : "none";
        });
        // Stories stays put in its tile of the grid; the others drift with the camera.
        if (!reduce && o > 0 && j !== 2) put(`ct${j}`, `translate3d(0, ${(-d * 40).toFixed(1)}px, 0)`, (v) => (el.style.transform = v));
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

    // Measured once, and again only when the page resizes: reading positions on
    // every scroll forced a layout mid-frame (see scroll-geometry.ts).
    // The sticky span is track minus stage. Not innerHeight: that changes every
    // time a phone's address bar slides in or out, which made the camera jump.
    let trackTop = 0;
    let trackH = 0;
    let span = 0;
    let headerH = 72;
    const measureScroll = () => {
      trackTop = pageTop(track);
      trackH = track.offsetHeight;
      span = trackH - stage.offsetHeight;
      headerH = header?.offsetHeight ?? 72;
    };

    const readScroll = () => {
      const top = trackTop - window.scrollY;
      target = span > 0 ? Math.max(0, Math.min(1, -top / span)) * LAST : 0;
      const next = top <= 0 && top + trackH > headerH;
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
      measureScroll();
      readScroll();
      render(cur);
    };

    const goTo = (i: number, instant = false) => {
      window.scrollTo({ top: trackTop + (span * i) / LAST, behavior: reduce || instant ? "auto" : "smooth" });
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
    measureScroll();
    readScroll();
    cur = target; // a reload mid-page starts where the visitor is, without a sweep
    render(cur);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Images and fonts settling below can move nothing here, but a size change can.
    const unwatch = watchGeometry(() => {
      measureScroll();
      readScroll();
      kick();
    });

    return () => {
      cancelAnimationFrame(raf);
      unwatch();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      stage.removeEventListener("click", onClick);
      stage.removeEventListener("focusin", onFocus);
      delete root.dataset.tone;
      delete root.dataset.chrome;
    };
  }, []);

  return null;
}
