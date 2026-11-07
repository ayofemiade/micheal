export interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "Segun Michael",
  title: "Segun Michael | Listening, Media and Real Estate",
  description:
    "Segun Michael listens, creates and brings ideas to life across conversations, media and real estate, through the Listening Hub, MAO Media, Inspire Network and MAO Contractors.",
  /** Approved positioning sentence. */
  positioning:
    "I’m Segun Michael. I listen, create and bring ideas to life across conversations, media and real estate.",
  /**
   * The real booking calendar: the one destination of every "Book a Listening
   * Session" action. Set NEXT_PUBLIC_BOOKING_URL (see .env.example) and rebuild.
   * Booking and general inquiries are separate: never point this at Contact.
   */
  bookingCalendarUrl: process.env.NEXT_PUBLIC_BOOKING_URL || null,
  /** Until the calendar exists, site-wide "book" links lead to the Listening Hub page. */
  bookingHref: process.env.NEXT_PUBLIC_BOOKING_URL || "/listening-hub",
  /** Shown in the footer only once a real, approved notice exists. */
  privacyNoticeHref: null as string | null,
  /** Verified, intentionally chosen accounts only. Shown in the footer when present. */
  socialLinks: [] as readonly NavItem[],
  copyrightYear: 2026,
  credit: "MoyoCode Technologies",
} as const;

export const navItems: readonly NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Listening Hub", href: "/listening-hub" },
  { label: "Media & Communication", href: "/media-communication" },
  { label: "Real Estate", href: "/real-estate" },
  { label: "Contact", href: "/contact" },
];

/** The three expressions and the ventures that carry them. Names are fixed. */
export const expressions = [
  { key: "listen", name: "Listening Hub", domain: "Human connection", ventures: "Listening Hub", href: "/listening-hub" },
  { key: "create", name: "Media & Communication", domain: "Creative expression", ventures: "MAO Media · Inspire Network", href: "/media-communication" },
  { key: "build", name: "Real Estate", domain: "Practical execution", ventures: "MAO Contractors", href: "/real-estate" },
] as const;
