import Image from "next/image";
import Link from "next/link";
import { closing } from "@/data/home";
import { siteConfig } from "@/data/site";
import { PushIn } from "@/components/motion/PushIn";

/**
 * 05: Closing, back at 1:1. The page began face to face, stepped back to the
 * horizon, and ends with his hand reaching toward you.
 */
export function ClosingSection() {
  return (
    <section aria-labelledby="closing-title" className="bg-studio">
      <div className="grid lg:min-h-[100svh] lg:grid-cols-12">
        <div className="relative aspect-[4/5] overflow-hidden lg:col-span-7 lg:aspect-auto">
          <PushIn className="absolute inset-0">
            <Image
              src={closing.photo.src}
              alt={closing.photo.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 58vw"
              className="object-cover object-[50%_38%]"
            />
          </PushIn>
        </div>
        <div className="shell flex flex-col justify-center py-16 sm:py-20 lg:col-span-5 lg:py-28">
          <p className="t-scale flex flex-wrap items-center gap-x-3.5 gap-y-1">
            <span className="ratio" aria-hidden="true">1:1</span>
            <span>Back where it starts</span>
          </p>
          <h2 id="closing-title" className="t-statement mt-7 max-w-[14ch]">
            {closing.heading}
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href={siteConfig.bookingHref} className="cta">
              Book a Listening Session
            </Link>
            <Link href="/contact" className="link-quiet text-[0.9375rem]">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
