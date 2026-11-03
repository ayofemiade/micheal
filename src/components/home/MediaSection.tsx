import Image from "next/image";
import Link from "next/link";
import { maoPrints, media } from "@/data/home";
import { WallControls } from "./WallControls";

/** Hang heights for the salon wall (share of the wall height): varied, never a grid. */
const HANG = [0.62, 0.92, 0.74, 0.86, 0.66, 1, 0.7, 0.82, 0.9];
/** Vertical offsets, so prints don't sit on one baseline. */
const DROP = [0.22, 0, 0.12, 0.06, 0.3, 0, 0.18, 0.1, 0.04];

/**
 * 03: Media & Communication, at 1:10. The prints from the pull-back, now at
 * a size you can look at. Captions describe the photograph, nothing more.
 */
export function MediaSection() {
  return (
    <section id="media" aria-labelledby="media-title" className="bg-paper overflow-hidden pt-24 pb-20 sm:pt-32 lg:pt-40">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-5">
          <p className="t-scale flex flex-wrap items-center gap-x-3.5 gap-y-1">
            <span className="ratio" aria-hidden="true">1:10</span>
            <span>Media & Communication · creative expression</span>
          </p>
          <h2 id="media-title" className="t-statement mt-7 max-w-[12ch]">
            {media.heading}
          </h2>
          <p className="text-ink-2 mt-8 max-w-[34ch] text-lg leading-relaxed">
            {media.body} {media.inspire}
          </p>
          <p className="t-scale text-ink-2 mt-6">MAO Media · Inspire Network</p>
        </div>
        <figure className="relative lg:col-span-7 lg:-mr-[var(--gutter)]">
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image loading="eager" fetchPriority="low"
              src={media.photo.src}
              alt={media.photo.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 60vw"
              className="object-cover object-[62%_50%]"
            />
          </div>
          <figcaption className="text-ink-2 mt-3 text-sm">Segun, behind the camera.</figcaption>
        </figure>
      </div>

      <div className="shell mt-20 flex items-end justify-between gap-6 sm:mt-28">
        <p className="t-scale">Selected photographs · MAO Media</p>
        <WallControls targetId="print-wall" />
      </div>

      <div
        id="print-wall"
        role="region"
        aria-label="MAO Media photographs. Scroll sideways to see more."
        tabIndex={0}
        className="mt-8 flex scroll-px-[var(--gutter)] items-start snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--gutter)] pb-6 [scrollbar-color:var(--color-ink)_transparent] [scrollbar-width:thin] focus-visible:outline-offset-[-2px] sm:gap-10"
      >
        {maoPrints.map((p, i) => {
          const h = HANG[i % HANG.length] * (1 - DROP[i % DROP.length] * 0.5);
          return (
            <figure
              key={p.id}
              className="group flex shrink-0 snap-start flex-col"
              style={{ marginTop: `calc(${DROP[i % DROP.length]} * clamp(4rem, 18svh, 9rem))` }}
            >
              <div
                className="relative overflow-hidden shadow-[0_0_0_1px_var(--color-rule)] transition-transform duration-500 ease-[var(--ease-camera)] group-hover:-translate-y-2"
                style={{ height: `calc(${h} * clamp(14rem, 44svh, 28rem))`, aspectRatio: `${p.width} / ${p.height}` }}
              >
                <Image loading="eager" fetchPriority="low" src={p.src} alt={p.alt} fill sizes="(max-width: 639px) 80vw, 520px" className="object-cover" />
              </div>
              <figcaption className="text-ink-2 mt-3 text-sm">{p.caption}</figcaption>
            </figure>
          );
        })}
        <div aria-hidden="true" className="w-[var(--gutter)] shrink-0" />
      </div>

      <div className="shell mt-10">
        <Link href="/media-communication" className="link-quiet text-[0.9375rem]">
          Explore Media &amp; Communication <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
