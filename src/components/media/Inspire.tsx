import Link from "next/link";
import { media } from "@/data/media";

const { inspire } = media;

/**
 * Inspire Network: a different publication, not a MAO Media service, so it has
 * its own masthead and ink. Only real published items are ever listed.
 */
export function Inspire() {
  return (
    <section id="inspire-network" aria-labelledby="inspire-title" className="inspire">
      <div className="shell">
        <div className="inspire-rule" aria-hidden="true" />
        <h2 id="inspire-title" className="inspire-masthead">
          {inspire.heading}
        </h2>
        <div className="inspire-rule" aria-hidden="true" />
        <div className="inspire-page">
          <p className="inspire-lead">{inspire.lead}</p>
          <div>
            <p className="inspire-body">{inspire.body}</p>
            {inspire.items.length > 0 ? (
              <ul className="inspire-items">
                {inspire.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <span className="t-scale">{item.kind}</span> {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="inspire-wait">{inspire.waiting}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
