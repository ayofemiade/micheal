import Image from "next/image";
import Link from "next/link";
import { realEstate } from "@/data/home";
import { DrawOn } from "@/components/motion/DrawOn";
import { RoomDrawing } from "./RoomDrawing";

/**
 * 04: Real Estate, at 1:100. No property photographs exist, so none are
 * faked: the room is a labelled line drawing. Segun stands beside it, on the
 * same floor line, not composited into it.
 */
export function RealEstateSection() {
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
        <figure className="text-cyan col-span-12 sm:col-span-9">
          <DrawOn
            viewBox="-1520 -1010 3640 2014"
            label="Line drawing of a room arranged for a conversation: two chairs facing each other, a lamp, a window and a doorway."
            className="room-drawing block h-auto w-full"
          >
            <RoomDrawing />
          </DrawOn>
        </figure>
        <div className="relative col-span-6 col-start-7 mt-10 aspect-[4/5] overflow-hidden sm:col-span-3 sm:col-start-auto sm:mt-0">
          <Image loading="eager" fetchPriority="low"
            src={realEstate.photo.src}
            alt={realEstate.photo.alt}
            fill
            sizes="(max-width: 639px) 50vw, 25vw"
            className="object-cover object-[50%_18%]"
          />
        </div>
        <p className="text-ink-2 col-span-12 mt-4 text-xs">{realEstate.note}</p>
      </div>
    </section>
  );
}
