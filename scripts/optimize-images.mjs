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
  ["potrait/IMG_2543c.jpg", "portrait.jpg", 2000], // primary portrait (the 1:10 print)
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
];

/**
 * Static responsive sizes, served as plain files from the CDN (see
 * src/lib/image-loader.ts). Pre-building them means no image is ever encoded
 * on demand, so the first visitor gets the same speed as the hundredth.
 * Keep in sync with WIDTHS in src/lib/image-loader.ts and next.config.ts.
 */
const WIDTHS = [480, 800, 1200, 1600, 2400];

await mkdir(out, { recursive: true });

async function sizes(input, name, quality = 78) {
  const base = name.replace(/\.jpg$/, "");
  for (const w of WIDTHS) {
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality, effort: 5 })
      .toFile(path.join(out, `${base}-${w}.webp`));
  }
}

for (const [src, name, edge] of jobs) {
  const master = await sharp(path.join(root, src))
    .rotate()
    .resize(edge, edge, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });
  await sharp(master.data).toFile(path.join(out, name)); // master (also used for Open Graph)
  await sizes(master.data, name);
  console.log(`${name.padEnd(18)} ${master.info.width}×${master.info.height}`);
}

// The 1:1 face layer: an exact crop of the print, at high resolution.
{
  const srcPath = path.join(root, "potrait/IMG_2543c.jpg");
  const { width } = await sharp(srcPath).metadata();
  const k = width / PRINT_WORLD_WIDTH;
  const region = {
    left: Math.round(FACE_RECT.x * k),
    top: Math.round(FACE_RECT.y * k),
    width: Math.round(FACE_RECT.w * k),
    height: Math.round(FACE_RECT.h * k),
  };
  const face = await sharp(srcPath)
    .rotate()
    .extract(region)
    .resize(2400)
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });
  await sharp(face.data).toFile(path.join(out, "face.jpg"));
  await sizes(face.data, "face.jpg", 82); // the 1:1 face is seen closest: a little more quality
  console.log(`face.jpg           ${face.info.width}×${face.info.height}  (crop ${JSON.stringify(region)})`);
}
