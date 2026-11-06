import Image from "next/image";
import { about } from "@/data/about";

const { who } = about;

/**
 * 02: You look back, and he is looking at you. Almost nothing but his eyes,
 * edge to edge, then his name and his own sentence. Segun's words slot in here
 * when he supplies them (`ownWords`).
 */
export function Who() {
  return (
    <section id="who" aria-labelledby="who-title" className="bg-studio">
      <div className="who-eyes">
        <Image src={who.eyes.src} alt={who.eyes.alt} fill sizes="100vw" className="who-eyes-img" />
      </div>
      <div className="shell who-grid">
        <h2 id="who-title" className="who-name">
          {who.name}
        </h2>
        <div className="who-words">
          <p className="who-positioning">{who.positioning}</p>
          <p className="text-ink-2 mt-6 max-w-[34ch] text-lg leading-relaxed">{who.aside}</p>
          {who.ownWords && <blockquote className="who-own">{who.ownWords}</blockquote>}
        </div>
      </div>
    </section>
  );
}
