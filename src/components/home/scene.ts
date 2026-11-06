/**
 * The camera. One scene in world units (the portrait print is 140 wide),
 * framed at five positions. Progress p runs 0 → 4:
 * 0 the whole portrait (introduction), 1 the face (1:1), 2 the prints (1:10),
 * 3 the house (1:100), 4 open ground (1:∞).
 *
 * The hero frame must match the CSS first frame in globals.css (.pullback-photos).
 * Photographs are LAID OUT at LAYOUT_SCALE × the hero frame and shown at
 * 1/LAYOUT_SCALE, so moving in to the face scales layers down, never up: a
 * will-change layer scaled above its layout size turns blurry.
 * The face crop in scripts/optimize-images.mjs uses FACE_RECT.
 */

export const FACE_RECT = { x: 30, y: 2, w: 80, h: 68 } as const;
export const PRINT_RECT = { x: 0, y: 0, w: 140, h: 196 } as const;
export const MOBILE_MAX = 639;
export const LAYOUT_SCALE = 3;

/**
 * The Places photograph, in world units, with the ground of the house at
 * y = 1000 (the same ground line as 1:∞). HouseDrawing is traced to it in its
 * own pixels (pxW × pxH), so drawing and photograph always register.
 */
export const HOUSE = { x: -1500, y: -969, w: 3600, h: 2250, pxW: 1024, pxH: 640 } as const;
/** The building's silhouette in those pixels: the photograph opens out from this shape. */
export const HOUSE_OUTLINE = [[82, 365], [190, 307], [397, 307], [397, 271], [644, 179], [917, 256], [880, 292], [876, 572], [438, 546], [324, 536], [118, 530], [118, 385]] as const;
/** Phones and portrait stages: the photograph fills this much of the height; the copy sits on paper below it. */
const HOUSE_BAND = 0.62;

type Level = {
  rect: readonly [number, number, number, number];
  fill: readonly [desktop: number, mobile: number];
  anchor: readonly [number, number];
  anchorMobile: readonly [number, number];
};

const LEVELS: readonly Level[] = [
  { rect: [0, 0, 140, 196], fill: [1, 1], anchor: [0.5, 0.5], anchorMobile: [0.5, 0.5] }, // the whole portrait: see heroFrame()
  { rect: [30, 2, 80, 68], fill: [1, 1], anchor: [0.66, 0.55], anchorMobile: [0.5, 0.34] }, // 1:1   the face
  { rect: [-270, -55, 865, 375], fill: [0.62, 0.94], anchor: [0.67, 0.4], anchorMobile: [0.5, 0.3] }, // 1:10  the prints
  { rect: [HOUSE.x, HOUSE.y, HOUSE.w, HOUSE.h], fill: [1, 1], anchor: [0.5, 0.5], anchorMobile: [0.5, 0.5] }, // 1:100 the house, full bleed: see at()
  { rect: [-7000, -2600, 14000, 7000], fill: [0.9, 0.94], anchor: [0.64, 0.36], anchorMobile: [0.5, 0.29] }, // 1:∞   open ground
];

export type Camera = { s: number; tx: number; ty: number };

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Stacked composition on phones and on any portrait stage (e.g. tablets). Must match the @container queries in globals.css. */
const isMobile = (W: number, H: number) => W <= MOBILE_MAX || W <= H;

/**
 * The introduction. Desktop: 1.12 × stage height, bleeding off the right and
 * bottom edges. Phones: centred under the header, at most 62% of the height.
 * Must match --sh, --tx0 and --ty0 in globals.css.
 */
function heroFrame(W: number, H: number) {
  if (isMobile(W, H)) {
    const s = Math.min(W / 140, (H * 0.3164) / 100);
    return { s, tx: W / 2 - 70 * s, ty: 58 };
  }
  const s = (H * 0.5714) / 100;
  return { s, tx: W - 140 * s, ty: H * 0.035 };
}

function at(i: number, W: number, H: number) {
  if (i === 0) {
    const { s, tx, ty } = heroFrame(W, H);
    return { s, cx: 70, cy: 98, ax: (tx + 70 * s) / W, ay: (ty + 98 * s) / H };
  }
  const l = LEVELS[i];
  const mobile = isMobile(W, H);
  if (i === 3) {
    // Covers the stage (phones: a band, centred on the gable and the door).
    const band = mobile ? H * HOUSE_BAND : H;
    const s = Math.max(W / HOUSE.w, band / HOUSE.h);
    const seen = W / s / HOUSE.w;
    const fx = mobile ? clamp(0.62, seen / 2, 1 - seen / 2) : 0.5;
    return { s, cx: HOUSE.x + HOUSE.w * fx, cy: HOUSE.y + HOUSE.h / 2, ax: 0.5, ay: mobile ? band / 2 / H : 0.5 };
  }
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
