import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { chapters, face, maoPrints, portrait } from "@/data/home";
import { siteConfig } from "@/data/site";
import { FACE_RECT, PRINT_RECT } from "./scene";
import { GroundGrid, RoomDrawing } from "./RoomDrawing";
import { PullBackMotion } from "./PullBackMotion";

const place = (r: { x: number; y: number; w: number; h: number }) =>
  ({ "--x": r.x, "--y": r.y, "--w": r.w, "--h": r.h }) as CSSProperties;

/**
 * 01: The pull-back. 1:1 → 1:10 → 1:100 → 1:∞.
 * Server-rendered at the 1:1 frame; PullBackMotion drives the camera on scroll.
 * All four chapters are real headings in reading order, so the narrative does
 * not depend on the animation.
 */
export function PullBack() {
  return (
    <section aria-label="Introduction" className="pullback">
      <div className="pullback-track" id="pullback">
        <div className="pullback-stage" data-stage>
          <div className="pullback-exposure" aria-hidden="true" data-exposure />
          <svg className="pullback-drawing" width="1" height="1" aria-hidden="true" data-drawing>
            <GroundGrid />
            <RoomDrawing ground />
          </svg>

          <div className="pullback-photos" data-photos>
            {maoPrints.map((p) => (
              <Image
                key={p.id}
                src={p.src}
                alt=""
                width={p.width}
                height={p.height}
                sizes="(max-width: 639px) 240px, 420px"
                className="print-frame"
                style={place(p)}
                fetchPriority="low"
              />
            ))}
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
            />
            <Image
              src={face.src}
              alt=""
              width={face.width}
              height={face.height}
              sizes="(max-width: 639px) 100vw, (max-aspect-ratio: 80/68) 100vw, 118vh"
              fetchPriority="high"
              loading="eager"
              quality={85}
              style={place(FACE_RECT)}
              data-face
            />
          </div>

          <div className="pullback-veil" aria-hidden="true" data-veil />

          {chapters.map((c, i) => {
            const Heading = i === 0 ? "h1" : "h2";
            return (
              <div key={c.ratio} className="pullback-chapter" data-i={i} data-chapter>
                <p className="t-scale flex flex-wrap items-center gap-x-3.5 gap-y-1">
                  <span className="ratio" aria-hidden="true">{c.ratio}</span>
                  <span>{c.label}</span>
                </p>
                <Heading className="t-word mt-4">
                  {i === 0 && <span className="sr-only">Segun Michael. </span>}
                  {c.word}
                </Heading>
                <p className="mt-5 max-w-[34ch] text-[1.0625rem] leading-relaxed sm:mt-6 sm:text-lg">
                  {"body" in c ? c.body : siteConfig.positioning}
                </p>
                {"note" in c && <p className="mt-3 text-xs opacity-80">{c.note}</p>}
                {i === 0 && (
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <Link href={siteConfig.bookingHref} className="cta">
                      Book a Listening Session
                    </Link>
                    <button type="button" data-goto="1" className="link-quiet hidden text-[0.9375rem] [.js_&]:inline">
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
                    data-goto={i}
                    aria-current={i === 0 ? "step" : undefined}
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
    </section>
  );
}
