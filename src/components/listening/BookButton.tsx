import { siteConfig } from "@/data/site";

const LABEL = "Book a Listening Session";

/**
 * The only booking action on this page, used by both buttons, so they can never
 * point to different places. The destination is one setting:
 * NEXT_PUBLIC_BOOKING_URL (see siteConfig.bookingCalendarUrl).
 *
 * Until it is set there is no calendar, so this never pretends to be a working
 * link: it shows the button at rest. It does not fall back to Contact.
 * On cyan the red mark goes (red on cyan is 1.55:1).
 */
export function BookButton({ waiting, onCyan = false }: { waiting: string; onCyan?: boolean }) {
  const url = siteConfig.bookingCalendarUrl;
  const style = onCyan ? "cta cta-on-cyan" : "cta";
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener" className={style} data-booking>
        {LABEL}
        <span className="sr-only"> (opens the booking calendar in a new tab)</span>
      </a>
    );
  }
  return (
    <div>
      <p className={`${style} hub-resting`} data-booking-unset>
        {LABEL}
      </p>
      <p className="hub-wait">{waiting}</p>
    </div>
  );
}
