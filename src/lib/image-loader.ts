"use client";

/**
 * Serves pre-built WebP sizes from /public (made by scripts/optimize-images.mjs)
 * instead of on-demand optimisation. On Vercel each on-demand variant was a
 * separate 0.5–1.5 s request on first visit (measured), so images arrived late
 * and in pieces. Static files come straight from the CDN.
 *
 * Keep WIDTHS in sync with the script and with images.deviceSizes in next.config.ts.
 */
export const WIDTHS = [480, 800, 1200, 1600, 2400] as const;

/**
 * Files are cached for a week under names that never change, so a photograph
 * rebuilt in place needs a new version here or browsers keep showing the old one.
 */
const VERSIONS: Record<string, number> = { portrait: 2, face: 2 };

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const m = src.match(/^\/images\/home\/([\w-]+)\.jpg$/);
  if (!m) return src;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  const v = VERSIONS[m[1]];
  return `/images/home/${m[1]}-${w}.webp${v ? `?v=${v}` : ""}`;
}
