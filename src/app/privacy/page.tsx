import Link from "next/link";
import type { Metadata } from "next";
import { privacy } from "@/data/privacy";
import "./privacy.css";

export const metadata: Metadata = {
  title: { absolute: privacy.title },
  description: privacy.description,
  alternates: { canonical: "/privacy" },
};

/** Privacy notice: set like the rest of the site, a plain sheet that is easy to read. */
export default function PrivacyPage() {
  return (
    <article className="pv-page shell" aria-labelledby="pv-title">
      <header className="pv-head">
        <h1 id="pv-title" className="pv-title">
          {privacy.heading}
        </h1>
        <p className="pv-intro">{privacy.intro}</p>
      </header>

      <div className="pv-body">
        {privacy.sections.map((s) => (
          <section key={s.heading} className="pv-section">
            <h2>{s.heading}</h2>
            <div>
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.link &&
                (s.link.href.startsWith("/") ? (
                  <Link href={s.link.href} className="link-quiet">
                    {s.link.label}
                  </Link>
                ) : (
                  <a href={s.link.href} target="_blank" rel="noopener" className="link-quiet">
                    {s.link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
            </div>
          </section>
        ))}
      </div>

      <p className="pv-updated t-scale">Last updated {privacy.updated}</p>
    </article>
  );
}
