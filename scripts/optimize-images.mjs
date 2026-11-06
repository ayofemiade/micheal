/**
 * Builds the web derivatives used by the homepage ("Near to Far").
 * Originals in /potrait and /website gallery are never served or modified.
 *
 *   node scripts/optimize-images.mjs
 *
 * Output: public/images/home/*.jpg (high-quality JPEG masters; next/image
 * serves AVIF/WebP at the sizes each component asks for).
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const out = path.join(root, "public/images/home");

/**
 * The 1:1 face layer must line up exactly with the full print in the scene.
 * In the scene, the print IMG_2543c is 140 world units wide (4160 px), and
 * the 1:1 camera frames the world rect x 30→110, y 2→70 (see
 * src/components/home/scene.ts → FACE_RECT). Keep these two in sync.
 */
const PRINT_WORLD_WIDTH = 140;
const FACE_RECT = { x: 30, y: 2, w: 80, h: 68 };

/** [source, output name, long edge px] */
const jobs = [
  // Segun: one studio session, used by meaning (see docs/NEW_CREATIVE_DIRECTION.md)
  ["potrait/IMG_2518.jpg", "listen.jpg", 2200], // hands clasped: Listening Hub
  ["potrait/IMG_1982c.jpg", "window.jpg", 2400], // camera at the window: Media
  ["potrait/IMG_2486.jpg", "blazer.jpg", 2000], // blazer: Real Estate
  ["potrait/IMG_2555.jpg", "reach.jpg", 2400], // reaching toward the lens: closing
  // MAO Media: genuine work. Unsigned or MAO-marked frames only. Frames signed
  // "Michael Adebiyi Photography" and third-party brand work are excluded until confirmed.
  ["website gallery/_MG_3015 hcc.jpg", "mao-green.jpg", 1600],
  ["website gallery/IMG_5680-Editd.jpg", "mao-red.jpg", 1600],
  ["website gallery/_MG_4478_edited-1-2.jpg", "mao-sofa.jpg", 1600],
  ["website gallery/wed13c-2c.jpg", "mao-blue.jpg", 1600],
  ["website gallery/wed11-2cc.jpg", "mao-wed.jpg", 1600],
  ["website gallery/wed12-2c.jpg", "mao-couple.jpg", 1600],
  ["website gallery/img_9800-copyc-2c.jpg", "mao-bride.jpg", 1050],
  ["website gallery/img_9812c.jpg", "mao-headwrap.jpg", 774],
  ["website gallery/11-2c.jpg", "mao-gele.jpg", 1050],
  // MAO Contractors: one kitchen renovation (confirmed as MAO's work, 2026-11-03).
  // Originals live in /real estate, which is git-ignored: only these derivatives ship.
  // The before photo is a phone shot: cropped to the after photo's 3:2, which also
  // drops a dark screen-overlay bar along its bottom edge (rows 686+).
  ["real estate/kitchen-before.jpg", "re-before.jpg", 952, { left: 0, top: 48, width: 952, height: 635 }],
  ["real estate/kitchen-after.jpg", "re-after.jpg", 2400],
];

/** Optional filter: `node scripts/optimize-images.mjs re-` rebuilds only matching outputs. */
const only = process.argv[2];

/**
 * Static responsive sizes, served as plain files from the CDN (see
 * src/lib/image-loader.ts). Pre-building them means no image is ever encoded
 * on demand, so the first visitor gets the same speed as the hundredth.
 * Keep in sync with WIDTHS in src/lib/image-loader.ts and next.config.ts.
 */
const WIDTHS = [480, 800, 1200, 1600, 2400];

await mkdir(out, { recursive: true });

/**
 * The portrait's studio backdrop is uneven white. Flood-fills it in from the
 * frame edges and settles only those pixels on the page's exact studio white
 * (#fafafa), so the photograph has no visible edge on the page. Nothing inside
 * his outline is touched: the fill stops at anything darker or warmer than the
 * backdrop, and the join is feathered.
 */
async function flatBackdrop(srcPath) {
  const { data, info } = await sharp(srcPath).rotate().removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const isBackdrop = (i) => {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    const lo = Math.min(r, g, b);
    const spread = Math.max(r, g, b) - lo;
    // Low in the right-hand corner the backdrop turns a cooler blue.
    if (i % W > W * 0.865 && i > W * H * 0.7 && b >= r) return lo >= 195 && spread <= 32;
    return lo >= 222 && spread <= 9;
  };
  // His shirt has near-white highlights the colour test alone cannot tell from the
  // backdrop, so the fill may never enter this outline (just inside his body).
  const body = [[285, 376], [130, 436], [68, 520], [44, 590], [28, 700], [28, 835], [66, 876], [136, 926], [152, 1000], [592, 1000], [598, 896], [690, 858], [706, 800], [706, 640], [684, 524], [614, 434], [480, 376]];
  const outline = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 714 1000" preserveAspectRatio="none"><rect width="714" height="1000"/><polygon fill="#fff" points="${body.join(" ")}"/></svg>`;
  const blocked = await sharp(Buffer.from(outline)).extractChannel(0).raw().toBuffer();
  const seen = new Uint8Array(W * H);
  const stack = [];
  const push = (i) => {
    if (!seen[i] && !blocked[i] && isBackdrop(i)) {
      seen[i] = 1;
      stack.push(i);
    }
  };
  for (let x = 0; x < W; x++) {
    push(x);
    push((H - 1) * W + x);
  }
  for (let y = 0; y < H; y++) {
    push(y * W);
    push(y * W + W - 1);
  }
  while (stack.length) {
    const i = stack.pop();
    const x = i % W;
    if (x > 0) push(i - 1);
    if (x < W - 1) push(i + 1);
    if (i >= W) push(i - W);
    if (i < W * (H - 1)) push(i + W);
  }
  // Specks of dust the fill flowed around: anything small, wholly surrounded by backdrop.
  const wide = await sharp(Buffer.from(seen.map((v) => v * 255)), { raw: { width: W, height: H, channels: 1 } }).blur(30).extractChannel(0).raw().toBuffer();
  for (let i = 0; i < W * H; i++) if (!blocked[i] && wide[i] > 238) seen[i] = 1;
  const mask = Buffer.from(seen.map((v) => v * 255));
  const matte = await sharp(mask, { raw: { width: W, height: H, channels: 1 } }).blur(5).extractChannel(0).raw().toBuffer();
  if (matte.length !== W * H) throw new Error("backdrop matte must be one channel");
  const res = Buffer.alloc(data.length);
  for (let i = 0; i < W * H; i++) {
    const a = matte[i] / 255;
    for (let c = 0; c < 3; c++) res[i * 3 + c] = Math.round(data[i * 3 + c] * (1 - a) + 250 * a);
  }
  return sharp(res, { raw: { width: W, height: H, channels: 3 } }).png({ compressionLevel: 1 }).toBuffer();
}
const PORTRAIT_SRC = path.join(root, "potrait/IMG_2543c.jpg");
const needsPortrait = !only || "portrait.jpg".startsWith(only) || "face.jpg".startsWith(only);
const cleanPortrait = needsPortrait ? await flatBackdrop(PORTRAIT_SRC) : null;
if (!only || "portrait.jpg".startsWith(only)) {
  const master = await sharp(cleanPortrait)
    .resize(2000, 2000, { fit: "inside" })
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });
  await sharp(master.data).toFile(path.join(out, "portrait.jpg"));
  await sizes(master.data, "portrait.jpg");
  console.log(`portrait.jpg       ${master.info.width}×${master.info.height}  (backdrop settled on #fafafa)`);
}

/**
 * The house for Places. The supplied copy is only 1024 px wide, so it is enlarged
 * in two gentle steps for a full-screen frame. The crop drops the bottom strip
 * of the frame. HOUSE in scene.ts and the drawing in RoomDrawing.tsx are traced
 * to this crop. REPLACE real estate/house-after.webp with the original file when available.
 */
if (!only || "re-house.jpg".startsWith(only)) {
  const crop = await sharp(path.join(root, "real estate/house-after.webp"))
    .extract({ left: 0, top: 0, width: 1024, height: 640 })
    .removeAlpha()
    .toBuffer();
  const mid = await sharp(crop)
    .resize(1536, 960, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.8, m1: 0.4, m2: 1.1 })
    .toBuffer();
  const master = await sharp(mid)
    .resize(2400, 1500, { kernel: "lanczos3" })
    .sharpen({ sigma: 1.1, m1: 0.3, m2: 0.9 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
  await sharp(master).toFile(path.join(out, "re-house.jpg"));
  await sizes(master, "re-house.jpg", 80);
  console.log("re-house.jpg       2400×1500");
}

async function sizes(input, name, quality = 78) {
  const base = name.replace(/\.jpg$/, "");
  for (const w of WIDTHS) {
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality, effort: 5 })
      .toFile(path.join(out, `${base}-${w}.webp`));
  }
}

for (const [src, name, edge, crop] of jobs) {
  if (only && !name.startsWith(only)) continue;
  let pipeline = sharp(path.join(root, src)).rotate();
  if (crop) pipeline = sharp(await pipeline.extract(crop).toBuffer());
  const master = await pipeline
    .resize(edge, edge, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });
  await sharp(master.data).toFile(path.join(out, name)); // master (also used for Open Graph)
  await sizes(master.data, name);
  console.log(`${name.padEnd(18)} ${master.info.width}×${master.info.height}`);
}

/**
 * About page. Crops are fractions of the frame: [source, output, left, top, width, height].
 * The lowered-camera frame is scaled and shifted so his face stays on the raised
 * frame's face (measured: scale 1.015, shift -2.0% and +0.86% of the width).
 */
const aboutCrops = [
  ["potrait/IMG_1982c.jpg", "about-lens.jpg", 0, 0, 1, 1],
  ["potrait/propfie.jpg", "about-eyes.jpg", 0.13, 0.285, 0.74, 0.17],
  ["potrait/IMG_2518.jpg", "about-space.jpg", 0, 0.52, 1, 0.48],
  ["potrait/IMG_2040.jpg", "about-camera.jpg", 0, 0.16, 0.655, 0.5],
  ["potrait/IMG_2486.jpg", "about-arms.jpg", 0, 0.5, 1, 0.42],
  ["potrait/IMG_2552cc.jpg", "about-you.jpg", 0, 0.06, 1, 0.62],
];
async function aboutImage(input, name) {
  const master = await sharp(input)
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });
  await sharp(master.data).toFile(path.join(out, name));
  await sizes(master.data, name, 80);
  console.log(`${name.padEnd(18)} ${master.info.width}×${master.info.height}`);
}
for (const [src, name, l, t, w, h] of aboutCrops) {
  if (only && !name.startsWith(only)) continue;
  const file = path.join(root, src);
  const { width: W, height: H } = await sharp(file).rotate().metadata();
  const region = { left: Math.round(l * W), top: Math.round(t * H), width: Math.round(w * W), height: Math.round(h * H) };
  await aboutImage(await sharp(file).rotate().extract(region).toBuffer(), name);
}
if (!only || "about-lowered.jpg".startsWith(only)) {
  const scaled = await sharp(path.join(root, "potrait/IMG_1980c.jpg")).resize({ width: Math.round(2400 * 1.015) }).toBuffer();
  const moved = await sharp(scaled)
    .extend({ top: 21, right: 12, extendWith: "mirror" })
    .toBuffer();
  await aboutImage(await sharp(moved).extract({ left: 48, top: 0, width: 2400, height: 1600 }).toBuffer(), "about-lowered.jpg");
}

// The 1:1 face layer: an exact crop of the print, at high resolution.
if (!only || "face.jpg".startsWith(only)) {
  const { width } = await sharp(PORTRAIT_SRC).metadata();
  const k = width / PRINT_WORLD_WIDTH;
  const region = {
    left: Math.round(FACE_RECT.x * k),
    top: Math.round(FACE_RECT.y * k),
    width: Math.round(FACE_RECT.w * k),
    height: Math.round(FACE_RECT.h * k),
  };
  const face = await sharp(cleanPortrait)
    .extract(region)
    .resize(2400)
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });
  await sharp(face.data).toFile(path.join(out, "face.jpg"));
  await sizes(face.data, "face.jpg", 82); // the 1:1 face is seen closest: a little more quality
  console.log(`face.jpg           ${face.info.width}×${face.info.height}  (crop ${JSON.stringify(region)})`);
}
