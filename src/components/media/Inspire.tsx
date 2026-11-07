import Link from "next/link";
import { inspireEnquiryHref, media } from "@/data/media";

const { inspire } = media;

/**
 * Inspire Network: a different publication, not a MAO Media service, so it has
 * its own masthead and ink. The whole section can later point to a dedicated
 * page or site without touching the navigation.
 *
 * Articles and audio are hidden until real, confirmed selections exist. The
 * podcast is future intent: never add Subscribe or Listen to the Podcast until
 * a live show or feed exists.
 */
export function Inspire() {
  const { articles, audio, next, collaborate } = inspire;
  return (
    <section id="inspire-network" aria-labelledby="inspire-title" className="inspire">
      <div className="shell inspire-top">
        <div className="inspire-rule" aria-hidden="true" />
        <h2 id="inspire-title" className="inspire-masthead">
          {inspire.heading}
        </h2>
        <div className="inspire-rule" aria-hidden="true" />
        <div className="inspire-page">
          <h3 className="inspire-lead">{inspire.tagline}</h3>
          <div className="inspire-intro">
            {inspire.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        {articles.items.length > 0 && (
          <div className="inspire-shelf">
            <h3 className="media-heading">{articles.heading}</h3>
            <p>{articles.body}</p>
            <ul>
              {articles.items.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>
                    <span className="t-scale">{item.archive ? "Read · Archive" : "Read"}</span>
                    <span className="inspire-item">{item.title}</span>
                    <span className="inspire-meta">
                      {item.author} · {item.date}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {audio.items.length > 0 && (
          <div className="inspire-shelf">
            <h3 className="media-heading">{audio.heading}</h3>
            <p>{audio.body}</p>
            <ul>
              {audio.items.map((item) => (
                <li key={item.src}>
                  <span className="t-scale">Listen</span>
                  <span className="inspire-item">{item.title}</span>
                  {/* Native controls: real playback, keyboard support, no autoplay. */}
                  <audio controls preload="none" src={item.src} aria-label={item.title} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="inspire-next">
        <div className="shell inspire-next-inner">
          <h3 className="inspire-next-title">{next.heading}</h3>
          <p>{next.body}</p>
        </div>
      </div>

      <div className="shell inspire-collab">
        <h3 className="media-heading">{collaborate.heading}</h3>
        <div>
          <p>{collaborate.body}</p>
          <Link href={inspireEnquiryHref} className="cta cta-plain inspire-cta">
            {collaborate.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
