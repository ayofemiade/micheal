import Image from "next/image";
import Link from "next/link";
import { about } from "@/data/about";
import { LineReveal } from "@/components/motion/LineReveal";

const { holdsIntro, space, camera, together } = about;

function Go({ link }: { link: { label: string; href: string } }) {
  return (
    <Link href={link.href} className="link-quiet mt-7 inline-block text-[0.9375rem]">
      {link.label} <span aria-hidden="true">→</span>
    </Link>
  );
}

/**
 * 03: One verb, three objects. Each composition is what it says: space is
 * nearly empty, the camera fills the frame, and the folded arms close the
 * layout around themselves.
 */
export function Holds() {
  return (
    <section aria-labelledby="holds-title">
      <div className="bg-studio shell holds-intro">
        <h2 id="holds-title" className="t-statement max-w-[12ch]">
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
            <p className="t-scale">{space.label}</p>
            <p className="text-ink-2 mt-4 text-lg leading-relaxed">{space.body}</p>
            <Go link={space.link} />
            <p className="border-rule text-ink-2 mt-8 border-t pt-4 text-sm leading-relaxed">{space.notice}</p>
          </div>
        </div>
        <div className="space-photo">
          <Image src={space.photo.src} alt={space.photo.alt} fill sizes="100vw" className="object-cover object-[50%_42%]" />
        </div>
      </article>

      {/* Holds a camera: no room at all. */}
      <article aria-labelledby="holds-camera" className="camera">
        <div className="camera-photo">
          <Image src={camera.photo.src} alt={camera.photo.alt} fill sizes="(max-width: 1023px) 100vw, 62vw" className="camera-img" />
        </div>
        <div className="camera-copy">
          <LineReveal as="h3" id="holds-camera" className="holds-word">
            {camera.word}
          </LineReveal>
          <p className="t-scale mt-6">{camera.label}</p>
          <p className="mt-4 text-lg leading-relaxed">{camera.body}</p>
          <Go link={camera.link} />
        </div>
      </article>

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
          <p className="t-scale mt-7">{together.label}</p>
          <p className="text-ink-2 mt-4 max-w-[32ch] text-lg leading-relaxed">{together.body}</p>
          <Go link={together.link} />
        </div>
      </article>
    </section>
  );
}
