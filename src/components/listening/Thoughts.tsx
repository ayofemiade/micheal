import Image from "next/image";
import { hub } from "@/data/listening-hub";

const { hero } = hub;

/**
 * 02: He comes closer. One composed spread, taken in at a glance: the offer,
 * the sentence, and the last line where his reaching hand arrives. The
 * photograph is flush to the edge so one arm leaves the screen; the other
 * dissolves into the paper. On phones the last line sits across his arms.
 */
export function Thoughts() {
  return (
    <section aria-label="What brings people here" className="hub-thoughts">
      <p className="hub-offer">{hero.offer}</p>
      <p className="hub-recognition">{hero.clauses.join(" ")}</p>
      <div className="hub-reach">
        <Image src={hero.reach.src} alt={hero.reach.alt} fill sizes="(max-width: 1023px) 100vw, 60vw" className="hub-reach-img" />
      </div>
      <p className="hub-heard">{hero.heard}</p>
    </section>
  );
}
