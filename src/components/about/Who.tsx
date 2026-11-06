import Image from "next/image";
import { about } from "@/data/about";

const { who } = about;

/**
 * 02: You look back, and he begins to speak. Almost nothing but his eyes, edge
 * to edge, then his name and, from here on, his own first-person words.
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
        <p className="who-label t-scale">{who.heading}</p>
        <p className="who-story">{who.story}</p>
        <p className="who-path t-statement">{who.path}</p>
      </div>
    </section>
  );
}
