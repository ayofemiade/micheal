import Image from "next/image";
import { media } from "@/data/media";
import { CoverTone } from "./CoverTone";

const { hero } = media;

/**
 * The cover. One photograph, full screen, with the headline in the crimson she
 * leaves empty. `id="pullback"` keeps the Header transparent over it.
 */
export function Cover() {
  return (
    <section aria-labelledby="media-title" className="cover" id="pullback">
      <Image src={hero.photo.src} alt={hero.photo.alt} fill sizes="(max-width: 639px) 260vw, 100vw" loading="eager" fetchPriority="high" className="cover-img" />
      <div className="cover-shade" aria-hidden="true" />
      <div className="cover-copy">
        <h1 id="media-title" className="t-scale">
          {hero.title}
        </h1>
        <p className="cover-headline">
          {hero.heading.map((line) => (
            <span key={line}>{line} </span>
          ))}
        </p>
        <p className="cover-body">{hero.body}</p>
        <p className="cover-body cover-invite">{hero.invite}</p>
        <div className="cover-actions">
          <a href="#mao-media" className="cta cta-plain cover-cta">
            Explore MAO Media
          </a>
          <a href="#inspire-network" className="link-quiet text-[0.9375rem]">
            Explore Inspire Network
          </a>
        </div>
      </div>
      <CoverTone />
    </section>
  );
}
