import Image from "next/image";
import Link from "next/link";
import { BookingLink } from "@/components/layout/BookingLink";
import { about } from "@/data/about";
import { PushIn } from "@/components/motion/PushIn";

const { yourTurn } = about;

/**
 * 05: The page opened with a camera pointed at you, and ends with him pointing
 * at you. The way on is a question, answered by choosing a door.
 */
export function YourTurn() {
  return (
    <section aria-labelledby="turn-title" className="bg-studio">
      <div className="turn">
        <div className="turn-photo">
          <PushIn className="absolute inset-0">
            <Image src={yourTurn.photo.src} alt={yourTurn.photo.alt} fill sizes="(max-width: 1023px) 100vw, 58vw" className="object-cover object-[42%_30%]" />
          </PushIn>
        </div>
        <div className="shell turn-copy">
          <h2 id="turn-title" className="t-statement">
            <span className="block">{yourTurn.heading} </span>
            <span className="block">{yourTurn.question}</span>
          </h2>
          <ul className="doors">
            {yourTurn.doors.map((door) => (
              <li key={door.ask}>
                {door.booking ? (
                  <BookingLink className="door">
                    <span className="door-ask">{door.ask}</span>
                    <span className="door-go door-book">
                      {door.go} <span aria-hidden="true">→</span>
                    </span>
                  </BookingLink>
                ) : (
                  <Link href={door.href} className="door">
                    <span className="door-ask">{door.ask}</span>
                    <span className="door-go">
                      {door.go} <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link href={yourTurn.other.href} className="link-quiet mt-7 inline-block text-[0.9375rem]">
            {yourTurn.other.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
