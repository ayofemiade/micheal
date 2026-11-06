import Image from "next/image";
import Link from "next/link";
import { realEstate, SIZES } from "@/data/home";

/**
 * 04: Real Estate, at 1:100. Real work, not an illustration: one MAO
 * Contractors kitchen, before and after, standing on the same floor line as
 * Segun.
 */
export function RealEstateSection() {
  const { before, after, caption } = realEstate.project;
  return (
    <section id="real-estate" aria-labelledby="re-title" className="bg-paper border-rule border-t pt-24 pb-24 sm:pt-32 lg:pt-40 lg:pb-36">
      <div className="shell grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="t-scale flex flex-wrap items-center gap-x-3.5 gap-y-1">
            <span className="ratio" aria-hidden="true">1:100</span>
            <span>Real Estate · practical execution</span>
          </p>
          <h2 id="re-title" className="t-statement mt-7 max-w-[14ch]">
            {realEstate.heading}
          </h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="text-ink-2 max-w-[34ch] text-lg leading-relaxed">{realEstate.body}</p>
          <p className="t-scale text-ink-2 mt-5">MAO Contractors</p>
          <Link href="/real-estate" className="link-quiet mt-7 inline-block text-[0.9375rem]">
            Explore Real Estate <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="shell mt-16 grid grid-cols-12 items-end gap-x-4 sm:mt-20 lg:gap-x-8">
        {/* One floor line: before → after → the person who coordinated it */}
        <figure className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-12 items-end gap-x-4 gap-y-8 lg:grid-cols-9 lg:gap-x-8">
            <div className="col-span-7 sm:col-span-5 lg:col-span-3">
              <p className="t-scale text-ink-2 mb-3" aria-hidden="true">Before</p>
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  loading="eager"
                  fetchPriority="low"
                  src={before.src}
                  alt={before.alt}
                  fill
                  sizes="(max-width: 639px) 60vw, (max-width: 1023px) 42vw, 22vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="col-span-12 sm:col-span-7 lg:col-span-6">
              <p className="t-scale text-ink-2 mb-3" aria-hidden="true">After</p>
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  loading="eager"
                  fetchPriority="low"
                  src={after.src}
                  alt={after.alt}
                  fill
                  sizes={SIZES.kitchen}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <figcaption className="text-ink-2 mt-4 text-sm">{caption}</figcaption>
        </figure>

        {/* Lifted by the caption's height (mt-4 + one 20px line) so all three share the floor line */}
        <div className="relative col-span-6 col-start-7 mt-12 aspect-[4/5] overflow-hidden sm:col-span-4 sm:col-start-9 lg:col-span-3 lg:col-start-auto lg:mt-0 lg:mb-9">
          <Image
            loading="eager"
            fetchPriority="low"
            src={realEstate.photo.src}
            alt={realEstate.photo.alt}
            fill
            sizes="(max-width: 639px) 50vw, 25vw"
            className="object-cover object-[50%_18%]"
          />
        </div>
      </div>
    </section>
  );
}
