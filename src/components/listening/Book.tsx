import Image from "next/image";
import { hub, sessionDetails } from "@/data/listening-hub";
import { BookButton } from "./BookButton";

const { book } = hub;

/**
 * 06: Night. The hands from the first screen, printed as a real cyanotype, and
 * the plain facts of the next step. Set like the footer's title block. The
 * session row stays away until duration and format are confirmed.
 */
export function Book() {
  const { duration, format } = sessionDetails;
  return (
    <section id="book" aria-labelledby="hub-book" className="hub-book">
      <div className="shell hub-book-grid">
        <div className="hub-book-main">
          <h2 id="hub-book" className="t-word">
            {book.heading}
          </h2>
          <p className="hub-book-how">{book.how}</p>
          <div className="mt-9">
            <BookButton waiting={book.waiting} onCyan />
          </div>
        </div>
        <figure className="hub-print">
          <Image src={book.print.src} alt={book.print.alt} fill sizes="(max-width: 1023px) 100vw, 46vw" className="object-cover object-[50%_40%]" />
        </figure>
        <dl className="hub-terms">
          {duration && format && (
            <div>
              <dt className="t-scale">{book.session.label}</dt>
              <dd>
                Sessions last {duration} and take place {format}.
              </dd>
            </div>
          )}
          <div>
            <dt className="t-scale">{book.contribution.label}</dt>
            <dd>{book.contribution.text}</dd>
          </div>
          <div>
            <dt className="t-scale">{book.nature.label}</dt>
            <dd>
              {book.nature.text} {book.nature.care}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
