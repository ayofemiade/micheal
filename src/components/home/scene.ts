/**
 * The pull-back camera. One scene in world units (the portrait print is 140
 * wide), framed at four distances. Progress p runs 0 → 3.
 *
 * Level 0 must match the CSS first frame in globals.css (.pullback-stage):
 * rect (30,2,80,68), fill 1, anchor (.66,.55) desktop / (.5,.34) mobile.
 * The face crop in scripts/optimize-images.mjs uses the same rect.
 */

export const FACE_RECT = { x: 30, y: 2, w: 80, h: 68 } as const;
export const PRINT_RECT = { x: 0, y: 0, w: 140, h: 196 } as const;
export const MOBILE_MAX = 639;

type Level = {
  rect: readonly [number, number, number, number];
  fill: readonly [desktop: number, mobile: number];
  anchor: readonly [number, number];
  anchorMobile: readonly [number, number];
};

const LEVELS: readonly Level[] = [
  { rect: [30, 2, 80, 68], fill: [1, 1], anchor: [0.66, 0.55], anchorMobile: [0.5, 0.34] }, // 1:1   the face
  { rect: [-270, -55, 865, 375], fill: [0.62, 0.94], anchor: [0.67, 0.4], anchorMobile: [0.5, 0.3] }, // 1:10  the prints
  { rect: [-1500, -1000, 3600, 2100], fill: [0.78, 0.94], anchor: [0.66, 0.46], anchorMobile: [0.5, 0.29] }, // 1:100 the room
  { rect: [-7000, -2600, 14000, 7000], fill: [0.9, 0.94], anchor: [0.64, 0.36], anchorMobile: [0.5, 0.29] }, // 1:∞   open ground
];

export type Camera = { s: number; tx: number; ty: number };

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function at(i: number, W: number, H: number) {
  const l = LEVELS[i];
  // Stacked composition on phones and on any portrait stage (e.g. tablets).
  // Must match the @container queries in globals.css.
  const mobile = W <= MOBILE_MAX || W <= H;
  const [x, y, w, h] = l.rect;
  const fill = mobile ? l.fill[1] : l.fill[0];
  const [ax, ay] = mobile ? l.anchorMobile : l.anchor;
  return { s: Math.min((W * fill) / w, (H * fill) / h), cx: x + w / 2, cy: y + h / 2, ax, ay };
}

/**
 * Zoom with log-scale timing; pan by interpolating the visible width, which
 * keeps the zoom anchored instead of drifting.
 */
export function camera(p: number, W: number, H: number): Camera {
  const i = Math.min(LEVELS.length - 2, Math.max(0, Math.floor(p)));
  const t = clamp(p - i, 0, 1);
  const A = at(i, W, H);
  const B = at(i + 1, W, H);
  const s = Math.exp(lerp(Math.log(A.s), Math.log(B.s), t));
  const k = (1 / s - 1 / A.s) / (1 / B.s - 1 / A.s);
  const cx = lerp(A.cx, B.cx, k);
  const cy = lerp(A.cy, B.cy, k);
  const ax = lerp(A.ax, B.ax, k);
  const ay = lerp(A.ay, B.ay, k);
  return { s, tx: ax * W - cx * s, ty: ay * H - cy * s };
}

export const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

export function mixHex(a: string, b: string, t: number) {
  const c = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  return (
    "#" +
    [0, 1, 2]
      .map((i) => Math.round(lerp(c(a, i), c(b, i), t)).toString(16).padStart(2, "0"))
      .join("")
  );
}
