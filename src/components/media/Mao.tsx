import Image from "next/image";
import { media } from "@/data/media";
import { Photo } from "./Photo";

const { mao, photography: p, concepts: c, voice: v } = media;

/** MAO Media: what it is, then the three disciplines, each composed around its own work. */
export function Mao() {
  return (
    <section id="mao-media" aria-labelledby="mao-title" className="mao">
      <div className="shell mao-opening">
        <h2 id="mao-title" className="t-word">
          {mao.heading}
        </h2>
        <div className="mao-words">
          <p className="mao-statement">{mao.statement}</p>
          <p className="mao-body">{mao.body}</p>
        </div>
        <ul className="mao-index">
          {mao.index.map((item) => (
            <li key={item.href}>
              <a href={item.href}>
                {item.label} <span aria-hidden="true">↓</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* The heading lives in the photograph's own white space. */}
      <article id="photography" aria-labelledby="photo-title" className="profile">
        <Image src={p.lead.src} alt={p.lead.alt} fill sizes="(max-width: 639px) 200vw, 100vw" className="profile-img" />
        <div className="profile-copy">
          <h3 id="photo-title" className="media-heading">
            {p.heading}
          </h3>
          <p>{p.body}</p>
        </div>
      </article>

      <div className="shell portraits">
        <Photo shot={p.sofa} sizes="(max-width: 1023px) 100vw, 64vw" className="p-sofa" />
        <Photo shot={p.green} sizes="(max-width: 1023px) 62vw, 30vw" className="p-green" />
        <Photo shot={p.overhead} sizes="(max-width: 1023px) 62vw, 28vw" className="p-overhead" />
        <Photo shot={p.keys} sizes="(max-width: 1023px) 100vw, 60vw" className="p-keys" />
        <Photo shot={p.crown} sizes="(max-width: 1023px) 100vw, 675px" className="p-crown" />
        <Photo shot={p.braids} sizes="(max-width: 1023px) 100vw, 675px" className="p-braids" />
      </div>

      <div className="documentary">
        <Photo shot={p.drum} sizes="(max-width: 639px) 80vw, 480px" className="d-drum" />
        <Photo shot={p.bride} sizes="(max-width: 639px) 80vw, 480px" className="d-bride" />
      </div>

      <article id="concepts" aria-labelledby="concepts-title" className="shell concepts">
        <div className="concepts-head">
          <h3 id="concepts-title" className="media-heading">
            {c.heading}
          </h3>
          <p>{c.body}</p>
        </div>
        <Photo shot={c.brochure[0]} sizes="(max-width: 1023px) 100vw, 92vw" className="c-lead" />
        <div className="concepts-row">
          <Photo shot={c.brochure[1]} sizes="(max-width: 1023px) 100vw, 46vw" />
          <Photo shot={c.brochure[2]} sizes="(max-width: 1023px) 100vw, 46vw" />
        </div>
        <div className="concepts-stationery">
          {c.stationery.map((s) => (
            <Photo key={s.src} shot={s} sizes="(max-width: 639px) 32vw, 22vw" />
          ))}
          <p className="concepts-caption">{c.caption}</p>
        </div>
      </article>

      {/* No pictures here on purpose: this one is for the ear. Clips join when real files exist. */}
      <article id="voice" aria-labelledby="voice-title" className="voice">
        <div className="shell voice-inner">
          <h3 id="voice-title" className="media-heading">
            {v.heading}
          </h3>
          <p className="voice-body">{v.body}</p>
          <p className="voice-statement">{v.statement}</p>
        </div>
      </article>
    </section>
  );
}
