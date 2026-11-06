export interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "Segun Michael",
  title: "Segun Michael: People. Stories. Places. Possibilities.",
  description:
    "Segun Michael listens, creates and brings ideas to life across conversations, media and real estate, through the Listening Hub, MAO Media, Inspire Network and MAO Contractors.",
  /** Approved positioning sentence. */
  positioning:
    "I’m Segun Michael. I listen, create and bring ideas to life across conversations, media and real estate.",
  /**
   * The booking journey does not exist yet. Until it does, booking CTAs go to
   * the Listening Hub holding page. Every CTA reads from here.
   */
  bookingHref: "/listening-hub",
  copyrightYear: 2026,
  credit: "MoyoCode Technologies",
} as const;

export const navItems: readonly NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Listening Hub", href: "/listening-hub" },
  { label: "Media", href: "/media-communication" },
  { label: "Real Estate", href: "/real-estate" },
  { label: "Contact", href: "/contact" },
];

/** Routes linked but not built yet. They render an honest holding page. */
export const holdingPages: Record<string, string> = {
  "listening-hub": "Listening Hub",
  "media-communication": "Media & Communication",
  "real-estate": "Real Estate",
  contact: "Contact",
};

/** The three expressions and the ventures that carry them. Names are fixed. */
export const expressions = [
  { key: "listen", name: "Listening Hub", domain: "Human connection", ventures: "Listening Hub", href: "/listening-hub" },
  { key: "create", name: "Media & Communication", domain: "Creative expression", ventures: "MAO Media · Inspire Network", href: "/media-communication" },
  { key: "build", name: "Real Estate", domain: "Practical execution", ventures: "MAO Contractors", href: "/real-estate" },
] as const;
