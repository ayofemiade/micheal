import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { chapters, face, hero, house, maoPrints, portrait, SIZES } from "@/data/home";
import { siteConfig } from "@/data/site";
import { FACE_RECT, PRINT_RECT } from "./scene";
import { HouseDrawing } from "./HouseDrawing";
import { PullBackMotion } from "./PullBackMotion";
import { Arrival } from "./Arrival";

const place = (r: { x: number; y: number; w: number; h: number }) =>
  ({ "--x": r.x, "--y": r.y, "--w": r.w, "--h": r.h }) as CSSProperties;

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

          <div className="pullback-photos" data-photos>
            {maoPrints.map((p) => (
              <Image
                key={p.id}
                src={p.src}
                alt=""
                width={p.width}
                height={p.height}
                sizes={SIZES.maoPrint}
                style={place(p)}
                data-print
                // Off-screen at 1:1 but needed the moment the camera moves: never lazy.
                loading="eager"
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
              loading="eager"
              fetchPriority="low"
              quality={85}
              style={place(FACE_RECT)}
              data-face
            />
            <div className="pullback-blend" aria-hidden="true" style={place(PRINT_RECT)} data-blend />
          </div>

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
