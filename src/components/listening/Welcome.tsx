import Image from "next/image";
import { hub } from "@/data/listening-hub";
import { BookButton } from "./BookButton";

const { hero, book } = hub;

/**
 * 01: The other chair. He sits across the table from you, and the two sentences
 * open to either side of him: the page making room. On phones they sit above
 * and below him instead.
 */
export function Welcome() {
  return (
    <section aria-labelledby="hub-title" className="hub-hero">
      <p className="hub-eyebrow t-scale">{hero.eyebrow}</p>
      <h1 id="hub-title" className="hub-title">
        <span className="hub-speak">{hero.heading[0]}</span> <span className="hub-think">{hero.heading[1]}</span>
      </h1>
      <div className="hub-chair">
        <Image src={hero.photo.src} alt={hero.photo.alt} fill sizes="(max-width: 639px) 100vw, 90vh" loading="eager" fetchPriority="high" className="hub-chair-img" />
      </div>
      <p className="hub-lead">{hero.lead}</p>
      <div className="hub-action">
        <BookButton waiting={book.waiting} />
      </div>
    </section>
  );
}
