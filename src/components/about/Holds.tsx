import Image from "next/image";
import Link from "next/link";
import { about } from "@/data/about";
import { LineReveal } from "@/components/motion/LineReveal";
import { Camera } from "./Camera";

const { holdsIntro, space, together } = about;

function Go({ link }: { link: { label: string; href: string } }) {
  return (
    <Link href={link.href} className="link-quiet mt-7 inline-block text-[0.9375rem]">
      {link.label} <span aria-hidden="true">→</span>
    </Link>
  );
}

function Paragraphs({ items }: { items: readonly string[] }) {
  return (
    <div className="holds-paras">
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

/**
 * 03: One verb, three objects. The large words are the page's voice; his own
 * headings and paragraphs sit beneath them, verbatim. Each composition is what
 * it says: space is open, the camera fills the frame, and the folded arms close
 * the layout around themselves.
 */
export function Holds() {
  return (
    <section aria-labelledby="holds-title">
      <div className="bg-studio shell holds-intro">
        <h2 id="holds-title" className="holds-pivot">
          {holdsIntro}
        </h2>
      </div>

      {/* Holds space: the page gives it room, and the hands rest at the bottom of it. */}
      <article aria-labelledby="holds-space" className="bg-studio">
        <div className="shell space-text">
          <LineReveal as="h3" id="holds-space" className="holds-word">
            {space.word}
          </LineReveal>
          <div className="space-copy">
            <h4 className="holds-sub">{space.heading}</h4>
            <p className="holds-lead">{space.lead}</p>
            <Paragraphs items={[space.body]} />
            <Go link={space.link} />
            <p className="border-rule text-ink-2 mt-8 border-t pt-4 text-sm leading-relaxed">{space.notice}</p>
          </div>
        </div>
        <div className="space-photo">
          <Image src={space.photo.src} alt={space.photo.alt} fill sizes="100vw" className="object-cover object-[50%_42%]" />
        </div>
      </article>

      <Camera />

      {/* Holds it together: the arms cross, and the words close around them. */}
      <article aria-labelledby="holds-together" className="together">
        <div className="together-photo">
          <Image src={together.photo.src} alt={together.photo.alt} fill sizes="(max-width: 1023px) 100vw, 56vw" className="object-cover object-[50%_40%]" />
        </div>
        <div className="shell together-copy">
          <LineReveal as="h3" id="holds-together" className="holds-word">
            {together.word.map((line) => (
              <span key={line} className="block">
                {line}{" "}
              </span>
            ))}
          </LineReveal>
          <h4 className="holds-sub mt-7">{together.heading}</h4>
          <Paragraphs items={together.body} />
          <Go link={together.link} />
        </div>
      </article>
    </section>
  );
}
