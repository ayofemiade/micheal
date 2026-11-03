import Image from "next/image";
import Link from "next/link";
import { listening } from "@/data/home";
import { siteConfig } from "@/data/site";
import { LineReveal } from "@/components/motion/LineReveal";

/**
 * 02: Listening Hub, at 1:1 again. The closest, quietest section: his hands,
 * his face, very few words. The primary action lives here.
 */
export function ListeningSection() {
  return (
    <section id="listening-hub" aria-labelledby="lh-title" className="bg-studio relative">
      <div className="grid lg:min-h-[100svh] lg:grid-cols-12">
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:order-2 lg:col-span-7 lg:aspect-auto lg:[mask-image:linear-gradient(to_right,transparent,#000_14%)]">
          <Image loading="eager" fetchPriority="low"
            src={listening.photo.src}
            alt={listening.photo.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 58vw"
            className="object-cover object-[50%_42%] lg:object-[50%_46%]"
          />
        </div>

        <div className="shell flex flex-col justify-center py-16 sm:py-20 lg:col-span-5 lg:py-28 lg:pr-12">
          <p className="t-scale flex items-center gap-3.5">
            <span className="ratio" aria-hidden="true">1:1</span>
            <span>Listening Hub · human connection</span>
          </p>
          <LineReveal id="lh-title" className="t-statement mt-7 lg:!text-[clamp(3rem,4.5vw,5.25rem)]">
            {listening.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </LineReveal>
          <p className="text-ink-2 mt-8 max-w-[36ch] text-lg leading-relaxed">{listening.body}</p>
          <div className="mt-9">
            <Link href={siteConfig.bookingHref} className="cta">
              Book a Listening Session
            </Link>
          </div>
          <p className="border-rule text-ink-2 mt-12 max-w-[44ch] border-t pt-5 text-sm leading-relaxed">
            {listening.notice}
          </p>
        </div>
      </div>
    </section>
  );
}
