import Image from "next/image";
import Link from "next/link";
import { assessmentEnquiryHref, propertyEnquiryHref, realEstatePage as page, type Fact, type Picture } from "@/data/real-estate";

function Photo({ picture, sizes, priority = false, className }: { picture: Picture; sizes: string; priority?: boolean; className?: string }) {
  return (
    <Image
      src={picture.src}
      alt={picture.alt}
      width={picture.width}
      height={picture.height}
      sizes={sizes}
      className={className}
      {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
    />
  );
}

/** A photograph with its Before or After tag set on it. */
function Plate({ picture, label, sizes, className }: { picture: Picture; label: string; sizes: string; className?: string }) {
  return (
    <figure className={`re-plate ${className ?? ""}`}>
      <Photo picture={picture} sizes={sizes} />
      <figcaption className="t-scale">{label}</figcaption>
    </figure>
  );
}

/** Only confirmed facts: a missing one simply is not shown. */
function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl className="re-facts">
      {facts.map((f) => (
        <div key={f.label}>
          <dt className="t-scale">{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** 01: What this is, plainly, with a real room beside it. */
export function Intro() {
  const { intro } = page;
  return (
    <section aria-labelledby="re-title" className="re-intro re-lines">
      <div className="re-intro-copy">
        <p className="t-scale">{intro.title}</p>
        <h1 id="re-title" className="re-title">
          {intro.heading}
        </h1>
        <div className="re-intro-body">
          {intro.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Link href={propertyEnquiryHref} className="cta cta-plain re-cta-dark">
          {intro.cta}
        </Link>
      </div>
      <div className="re-intro-photo">
        <Photo picture={intro.photo} sizes="(max-width: 1023px) 100vw, 44vw" priority />
      </div>
    </section>
  );
}

/** 02: The way in. A blueprint sheet: the approved sentence, one item to a line. */
export function Assessment() {
  const { assessment: a } = page;
  return (
    <section aria-labelledby="re-assess" className="re-assess">
      <div className="shell re-assess-grid">
        <div>
          <h2 id="re-assess" className="re-assess-title">
            {a.heading}
          </h2>
          <p className="re-assess-lead">{a.lead}</p>
        </div>
        <div className="re-assess-sheet">
          <p className="re-assess-open">{a.opening}</p>
          <ul>
            {a.items.map((item) => (
              <li key={item}>{item} </li>
            ))}
          </ul>
          <p className="re-assess-close">{a.close}</p>
          <Link href={assessmentEnquiryHref} className="cta cta-plain cta-on-cyan">
            {a.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

/** 03: Ongoing support, and the person who gives it. */
export function Coordination() {
  const { coordination: c } = page;
  return (
    <section aria-labelledby="re-coord" className="re-coord re-lines">
      <div className="re-coord-photo">
        <Photo picture={c.photo} sizes="(max-width: 1023px) 80vw, 34vw" />
      </div>
      <div className="re-coord-copy">
        <h2 id="re-coord" className="re-heading">
          {c.heading}
        </h2>
        <p className="re-coord-lead">{c.lead}</p>
        <p className="re-coord-body">{c.body}</p>
      </div>
    </section>
  );
}

/** 04: Plainly a different kind of work: proposed, not built. */
export function Planning() {
  const { planning: p } = page;
  return (
    <section aria-labelledby="re-plan" className="re-plan">
      <div className="shell re-plan-grid">
        <div>
          <p className="t-scale re-plan-label">{p.label}</p>
          <h2 id="re-plan" className="re-heading">
            {p.heading}
          </h2>
        </div>
        <p className="re-plan-body">{p.body}</p>
      </div>
    </section>
  );
}

/** 05: The work. Three real properties, each composed differently, the photographs first. */
export function Projects() {
  const { projects: p } = page;
  return (
    <section aria-labelledby="re-projects" className="re-projects">
      <div className="shell">
        <h2 id="re-projects" className="t-word">
          {p.heading}
        </h2>
      </div>

      {/* The change in one look, split on the sheet's centre line. */}
      <article aria-labelledby="re-split" className="re-project">
        <div className="re-diptych">
          <Plate picture={p.split.before} label="Before" sizes="(max-width: 767px) 100vw, 50vw" />
          <Plate picture={p.split.after} label="After" sizes="(max-width: 767px) 100vw, 50vw" />
        </div>
        <div className="shell re-split-foot">
          <div className="re-inside">
            <Plate picture={p.split.insideBefore} label="Before" sizes="(max-width: 767px) 100vw, 26vw" />
            <Plate picture={p.split.insideAfter} label="After" sizes="(max-width: 767px) 100vw, 44vw" />
          </div>
          <div className="re-info">
            <h3 id="re-split" className="re-heading">
              {p.split.title}
            </h3>
            <Facts facts={p.split.facts} />
          </div>
        </div>
      </article>

      {/* The sharpest photograph, with the before set in like a detail callout. */}
      <article aria-labelledby="re-kitchen" className="re-project">
        <div className="re-callout">
          <Plate picture={p.kitchen.after} label="After" sizes="100vw" className="re-callout-after" />
          <Plate picture={p.kitchen.before} label="Before" sizes="(max-width: 767px) 100vw, 32vw" className="re-callout-before" />
        </div>
        <div className="shell re-kitchen-foot">
          <h3 id="re-kitchen" className="re-heading">
            {p.kitchen.title}
          </h3>
          <Facts facts={p.kitchen.facts} />
        </div>
      </article>

      {/* A quieter close. */}
      <article aria-labelledby="re-single" className="re-project shell re-single">
        <div className="re-info">
          <h3 id="re-single" className="re-heading">
            {p.single.title}
          </h3>
          <Facts facts={p.single.facts} />
        </div>
        <div className="re-single-pair">
          <Plate picture={p.single.before} label="Before" sizes="(max-width: 767px) 100vw, 34vw" />
          <Plate picture={p.single.after} label="After" sizes="(max-width: 767px) 100vw, 34vw" />
        </div>
      </article>
    </section>
  );
}

/** 06: A precise statement of a relationship, drawn rather than decorated. */
export function Partnership() {
  const { partnership: p } = page;
  const formed = p.url ? (
    <a href={p.url} target="_blank" rel="noopener">
      {p.formed}
    </a>
  ) : (
    p.formed
  );
  return (
    <section aria-labelledby="re-partner" className="re-partner re-lines">
      <div className="shell re-partner-grid">
        <div>
          <h2 id="re-partner" className="re-heading">
            {p.heading}
          </h2>
          <p className="re-partner-body">{p.body}</p>
        </div>
        <div className="re-partner-map">
          {p.from.map((name) => (
            <div key={name}>
              <p className="t-scale">Partner</p>
              <p>{name}</p>
            </div>
          ))}
          <div>
            <p className="t-scale">Shared venture</p>
            <p>{formed}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 07: Exactly what to send. */
export function Discuss() {
  const { discuss: d } = page;
  return (
    <section aria-labelledby="re-discuss" className="re-discuss">
      <div className="shell re-discuss-grid">
        <h2 id="re-discuss" className="t-word">
          {d.heading}
        </h2>
        <div>
          <p>{d.body}</p>
          <Link href={propertyEnquiryHref} className="cta cta-plain cta-on-cyan mt-8">
            {d.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
