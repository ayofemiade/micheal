import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { chapters, face, hero, house, portrait, storiesCollage } from "@/data/home";
import { siteConfig } from "@/data/site";
import { COLLAGE, FACE_RECT, PRINT_RECT } from "./scene";
import { HouseDrawing } from "./HouseDrawing";
import { PullBackMotion } from "./PullBackMotion";
import { Arrival } from "./Arrival";

const place = (r: { x: number; y: number; w: number; h: number }) =>
  ({ "--x": r.x, "--y": r.y, "--w": r.w, "--h": r.h }) as CSSProperties;

/**
 * The collage's 64 cells, as paper laid over it. Each lifts in turn, nearest his
 * slot first, so the photographs develop outward from him (PullBackMotion).
 * d is the cell's distance from the slot, 0 → 1.
 */
const { xs, ys, slot, tile } = COLLAGE;
const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;
const slotX = (xs[slot.c] + xs[slot.c + 1]) / 2;
const slotY = (ys[slot.r0] + ys[slot.r1]) / 2;
const reach = Math.hypot(COLLAGE.pxW, COLLAGE.pxH) * 0.62;
const cells = xs.slice(0, -1).flatMap((x, c) =>
  ys.slice(0, -1).map((y, r) => {
    const w = xs[c + 1] - x;
    const h = ys[r + 1] - y;
    return {
      key: `${c}-${r}`,
      style: { left: pct(x, COLLAGE.pxW), top: pct(y, COLLAGE.pxH), width: pct(w, COLLAGE.pxW), height: pct(h, COLLAGE.pxH) },
      d: Math.min(1, Math.hypot(x + w / 2 - slotX, y + h / 2 - slotY) / reach).toFixed(3),
      slot: c === slot.c && r >= slot.r0 && r < slot.r1,
      tile: c >= tile.c0 && c < tile.c1 && r >= tile.r0 && r < tile.r1,
    };
  }),
);

/**
 * 01: The introduction, then the camera: in to 1:1, back out to 1:10 → 1:100 → 1:∞.
 * Server-rendered at the introduction; PullBackMotion drives the camera on scroll.
 * Every chapter is a real heading in reading order, so the narrative does not
 * depend on the animation.
 */
export function PullBack() {
  return (
    <section aria-label="Introduction" className="pullback">
      <div className="pullback-track" id="pullback">
        <div className="pullback-stage" data-stage>
          <Image
            className="pullback-place"
            src={house.src}
            alt={house.alt}
            width={house.width}
            height={house.height}
            // The source holds about 1024 px of real detail: the 1600 file shows all of it.
            sizes="(max-width: 639px) 120vw, min(100vw, 1280px)"
            loading="eager"
            fetchPriority="low"
            data-place
          />
          <div className="pullback-place-shade" aria-hidden="true" data-place-shade />
          <div className="pullback-exposure" aria-hidden="true" data-exposure />
          <div className="pullback-ground" aria-hidden="true" data-ground />
          <svg className="pullback-drawing" aria-hidden="true" data-drawing>
            <HouseDrawing />
          </svg>

          {/* Stories: the collage, under paper cells that lift outward from his slot. */}
          <div className="pullback-collage-clip" data-collage-clip>
          <div className="pullback-collage" data-collage>
            <Image
              src={storiesCollage.src}
              alt={storiesCollage.alt}
              width={storiesCollage.width}
              height={storiesCollage.height}
              sizes="(max-width: 639px) 260vw, (max-aspect-ratio: 3/2) 140vw, 110vw"
              // Needed the moment the camera pulls back from the face: never lazy.
              loading="eager"
              fetchPriority="low"
            />
            <div className="pullback-cells" aria-hidden="true">
              {cells.map((c) => (
                <span key={c.key} style={c.style} data-d={c.d} data-slot={c.slot || undefined} data-tile={c.tile || undefined} />
              ))}
            </div>
          </div>
          </div>

          <div className="pullback-photos" data-photos>
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              sizes="(max-width: 639px) 100vw, 1400px"
              loading="eager"
              fetchPriority="high"
              quality={85}
              style={place(PRINT_RECT)}
              data-portrait
            />
            <Image
              src={face.src}
              alt=""
              width={face.width}
              height={face.height}
              sizes="(max-width: 639px) 100vw, (max-aspect-ratio: 80/68) 100vw, 118vh"
              loading="eager"
              fetchPriority="low"
              quality={85}
              style={place(FACE_RECT)}
              data-face
            />
            <div className="pullback-blend" aria-hidden="true" style={place(PRINT_RECT)} data-blend />
          </div>

          {/* The collage's grid, drawn out from his slot before the photographs arrive. */}
          <svg className="pullback-grid" aria-hidden="true" preserveAspectRatio="none" data-grid>
            {xs.slice(1, -1).map((x) => (
              <line key={`x${x}`} data-gx={x} />
            ))}
            {ys.slice(1, -1).map((y) => (
              <line key={`y${y}`} data-gy={y} />
            ))}
          </svg>

          <div className="pullback-veil" aria-hidden="true" data-veil />

          <div className="pullback-chapter pullback-hero" data-i={0} data-chapter>
            <h1 className="pullback-hero-title">
              {hero.heading.map((line) => (
                <span key={line}>{line} </span>
              ))}
            </h1>
            <div className="pullback-hero-lower">
              <div className="pullback-hero-intro">
                <p className="pullback-hero-body">
                  {hero.body}
                  <span className="pullback-hero-ventures"> {hero.ventures}</span>
                </p>
                <div className="pullback-hero-actions">
                  <Link href={siteConfig.bookingHref} className="cta">
                    Book a Listening Session
                  </Link>
                  <button type="button" data-goto="1" className="link-quiet hidden text-[0.9375rem] [.js_&]:inline">
                    Step closer <span aria-hidden="true">↓</span>
                  </button>
                </div>
              </div>
              <ul className="pullback-hero-rows">
                {hero.rows.map((row) => (
                  <li key={row.name}>
                    <small className="t-scale">{row.tag}</small>
                    <Link href={row.href}>{row.name}</Link>
                    <span>{row.does}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {chapters.map((c, i) => {
            return (
              <div key={c.ratio} className="pullback-chapter" data-i={i + 1} data-chapter>
                <p className="t-scale flex flex-wrap items-center gap-x-3.5 gap-y-1">
                  <span className="ratio" aria-hidden="true">{c.ratio}</span>
                  <span>{c.label}</span>
                </p>
                <h2 className="t-word mt-4">{c.word}</h2>
                <p className="mt-5 max-w-[34ch] text-[1.0625rem] leading-relaxed sm:mt-6 sm:text-lg">
                  {c.body}
                </p>
                {i === 0 && (
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <Link href={siteConfig.bookingHref} className="cta">
                      Book a Listening Session
                    </Link>
                    <button type="button" data-goto="2" className="link-quiet hidden text-[0.9375rem] [.js_&]:inline">
                      Step back <span aria-hidden="true">↓</span>
                    </button>
                  </div>
                )}
                {i === 3 && (
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <Link href={siteConfig.bookingHref} className="cta cta-on-cyan">
                      Book a Listening Session
                    </Link>
                    <a href="#media" className="link-quiet text-[0.9375rem]">
                      See the work <span aria-hidden="true">→</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}

          <nav className="pullback-ruler" aria-label="Distance">
            <ol className="grid gap-2.5 text-right text-xs tabular-nums">
              {chapters.map((c, i) => (
                <li key={c.ratio}>
                  <button
                    type="button"
                    data-goto={i + 1}
                    className="px-1 py-0.5 opacity-65 transition-opacity hover:opacity-100 aria-[current=step]:font-semibold aria-[current=step]:opacity-100"
                  >
                    {c.ratio}
                    <span className="sr-only"> {c.word.replace(".", "")}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
      <PullBackMotion />
      <Arrival />
    </section>
  );
}
