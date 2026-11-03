import Link from "next/link";
import { navItems, siteConfig } from "@/data/site";

const ecosystemAreas = [
  {
    name: "The Listening Hub",
    role: "Supportive listening & reflective conversation",
    code: "SESSION // 01",
    href: "/listening-hub",
  },
  {
    name: "MAO Media",
    role: "Photography & visual storytelling commissions",
    code: "STUDIO // 02",
    href: "/media-communication",
  },
  {
    name: "Inspire Network",
    role: "Editorial platform & written perspectives",
    code: "PUBLISH // 03",
    href: "/media-communication",
  },
  {
    name: "MAO Contractors",
    role: "Renovation planning & project coordination",
    code: "BUILD // 04",
    href: "/real-estate",
  },
] as const;

export function Footer() {
  return (
    <footer className="border-ink/15 bg-paper text-ink border-t">
      <div className="container-proof py-16 sm:py-24">
        {/* Top Colophon strip */}
        <div className="border-ink/10 text-ink/60 mb-12 flex flex-wrap items-center justify-between gap-4 border-b pb-6 font-mono text-[11px] tracking-wider uppercase">
          <div className="flex items-center gap-3">
            <span className="bg-mao-red inline-block size-2" />
            <span>COLOPHON &mdash; SEGFRAME // 2026.1</span>
          </div>
          <div>LAGOS, NIGERIA &bull; SERVING GLOBALLY</div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand Identity */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="font-display text-ink hover:text-mao-red inline-flex items-center gap-3 text-3xl font-light transition-colors"
            >
              <span className="border-ink/40 flex size-9 items-center justify-center border font-mono text-xs font-semibold">
                SM
              </span>
              <span>{siteConfig.name}</span>
            </Link>

            <p className="text-ink/75 mt-6 max-w-[42ch] font-sans text-sm leading-relaxed">
              One person. Three expressions of purpose. Connecting attentive
              human listening, distinctive media production, and practical
              property execution.
            </p>

            <div className="mt-8 flex items-center gap-4 font-mono text-xs">
              <Link
                href={siteConfig.bookingHref}
                className="border-ink bg-ink text-paper hover:border-mao-red hover:bg-mao-red inline-flex items-center gap-2 border px-4 py-2.5 font-medium tracking-wider uppercase transition-all"
              >
                <span className="bg-paper size-1.5 rounded-full" />
                Book a Session
              </Link>
              <Link
                href="/contact"
                className="border-ink/60 text-ink hover:border-mao-red hover:text-mao-red inline-flex items-center gap-1 border-b pb-0.5"
              >
                Direct Inquiry &rarr;
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation" className="lg:col-span-3">
            <h2 className="text-mao-red font-mono text-xs tracking-widest uppercase">
              Directory
            </h2>
            <ul className="mt-5 space-y-2.5">
              {navItems.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group text-ink/80 hover:text-mao-red inline-flex items-center gap-2 font-sans text-sm transition-colors"
                  >
                    <span className="text-ink/40 group-hover:text-mao-red font-mono text-[10px]">
                      0{i + 1}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Professional Ecosystem */}
          <div className="lg:col-span-4">
            <h2 className="text-mao-red font-mono text-xs tracking-widest uppercase">
              Ventures &amp; Practices
            </h2>
            <ul className="mt-5 space-y-3">
              {ecosystemAreas.map((area) => (
                <li
                  key={area.name}
                  className="border-ink/10 bg-paper-light/50 hover:border-ink/30 border p-3.5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={area.href}
                      className="font-display text-ink hover:text-mao-red text-base font-normal transition-colors"
                    >
                      {area.name}
                    </Link>
                    <span className="text-ink/45 font-mono text-[9px] tracking-wider uppercase">
                      {area.code}
                    </span>
                  </div>
                  <p className="text-ink/65 mt-1 font-sans text-xs">
                    {area.role}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Footer / Colophon Meta */}
        <div className="border-ink/10 text-ink/55 mt-16 flex flex-col gap-4 border-t pt-8 font-mono text-[11px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {siteConfig.copyrightYear} {siteConfig.name}. Proof Sheet
            Architecture.
          </p>
          <p>Type: Fraunces &bull; Instrument Sans &bull; IBM Plex Mono</p>
          <p>Designed &amp; Developed by {siteConfig.credit}</p>
        </div>
      </div>
    </footer>
  );
}
