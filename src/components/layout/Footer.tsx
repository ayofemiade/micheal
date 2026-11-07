import Link from "next/link";
import { expressions, navItems, siteConfig } from "@/data/site";
import { BookingLink } from "./BookingLink";

/**
 * Set like the title block of a drawing: the part of the sheet that says what
 * it is, who it is for, and who drew it. A real convention, used honestly.
 */
export function Footer() {
  const cell = "border-cyan/25 border-t p-5 sm:p-6";
  return (
    <footer className="bg-paper text-cyan shell pt-20 pb-8 sm:pt-28">
      <div className="border-cyan/40 grid border sm:grid-cols-2 lg:grid-cols-12">
        <div className={`${cell} border-t-0 sm:col-span-2 lg:col-span-5 lg:row-span-3 lg:border-r`}>
          <p className="t-scale opacity-70">Sheet</p>
          <p className="font-display mt-3 text-[clamp(2.75rem,6vw,5rem)]">{siteConfig.name}</p>
          <p className="mt-4 max-w-[32ch]">{expressions.map((e) => e.name).join(" · ")}</p>
          {/* Cyan button: the mark goes paper, never MAO red on cyan (1.55:1). */}
          <BookingLink className="cta !bg-cyan !text-paper mt-8 [&::before]:!bg-paper">
            Book a Listening Session
          </BookingLink>
        </div>

        {expressions.map((e, i) => (
          <div
            key={e.key}
            className={`${cell} lg:col-span-7 lg:col-start-6 ${i === 0 ? "lg:border-t-0" : ""} sm:last:col-span-2 lg:last:col-span-7`}
          >
            <Link href={e.href} className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <span className="font-display text-2xl tracking-[-0.02em] group-hover:underline group-hover:underline-offset-4 sm:text-3xl">
                {e.name}
              </span>
              <span className="t-scale opacity-80">
                {e.ventures !== e.name && `${e.ventures} · `}
                {e.domain}
              </span>
            </Link>
          </div>
        ))}

        <nav aria-label="Footer" className={`${cell} sm:col-span-2 lg:col-span-12`}>
          <ul className="flex flex-wrap gap-x-7 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-quiet">
                  {item.label}
                </Link>
              </li>
            ))}
            {siteConfig.privacyNoticeHref && (
              <li>
                <Link href={siteConfig.privacyNoticeHref} className="link-quiet">
                  Privacy notice
                </Link>
              </li>
            )}
            {siteConfig.socialLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener" className="link-quiet">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`${cell} t-scale flex flex-wrap justify-between gap-x-8 gap-y-2 opacity-80 sm:col-span-2 lg:col-span-12`}>
          <span>
            © {siteConfig.copyrightYear} {siteConfig.name}
          </span>
          <span>Scale 1:1 to 1:∞</span>
          <span>Site by {siteConfig.credit}</span>
        </div>
      </div>
    </footer>
  );
}
