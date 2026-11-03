import type { NavItem } from "@/types/content";

export const siteConfig = {
  name: "Segun Michael",
  title: "Segun Michael — People. Stories. Places. Possibilities.",
  description:
    "Segun Michael listens, creates and builds across supportive conversation (Listening Hub), media and communication (MAO Media, Inspire Network) and real estate (MAO Contractors).",
  /**
   * The booking journey does not exist yet. Until it does, booking CTAs go to
   * the Listening Hub holding page. Replace with the real booking URL when
   * confirmed — every CTA reads from here.
   */
  bookingHref: "/listening-hub",
  copyrightYear: 2026,
  credit: "MoyoCode Technologies",
} as const;

export const navItems: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Listening Hub", href: "/listening-hub" },
  { label: "Media & Communication", href: "/media-communication" },
  { label: "Real Estate", href: "/real-estate" },
  { label: "Contact", href: "/contact" },
] as const;

/** Routes that are linked but not built yet. They render an honest holding page. */
export const holdingPages: Record<string, string> = {
  about: "About",
  "listening-hub": "Listening Hub",
  "media-communication": "Media & Communication",
  "real-estate": "Real Estate",
  contact: "Contact",
};

export const ventures = ["MAO Media", "Inspire Network", "MAO Contractors"];
