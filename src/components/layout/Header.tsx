"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems, siteConfig } from "@/data/site";

/**
 * Quiet, fixed, and always offering the one action. Colour follows the page:
 * the pull-back sets <html data-tone="dark"> while the cyanotype frame is up.
 *
 * The mobile menu animates with CSS (clip-path), not a motion library: one
 * transition did not justify ~42 KB of JS (measured; see docs).
 */
export function Header() {
  const pathname = usePathname();
  // The menu belongs to the route it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Transparent over the pull-back (the stage manages its own colour); a solid
  // paper bar everywhere else, so links never sit on top of photographs.
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const hero = document.getElementById("pullback");
      const limit = hero ? hero.getBoundingClientRect().bottom : 0;
      setSolid(limit <= (document.querySelector("header")?.offsetHeight ?? 72));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        toggleRef.current?.focus();
      }
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className="group/h fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b border-transparent transition-[color,background-color,border-color] duration-500 data-solid:border-rule data-solid:bg-paper [:root[data-tone=dark]_&:not([data-open])]:text-paper"
      data-open={open || undefined}
      data-solid={solid || undefined}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <Link href="/" className="relative z-10 text-[0.9375rem] font-semibold tracking-[-0.01em]">
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="link-quiet decoration-transparent hover:decoration-current aria-[current=page]:decoration-current"
            >
              {item.label}
            </Link>
          ))}
          <Link href={siteConfig.bookingHref} className="flex items-center gap-2 font-semibold">
            <span aria-hidden="true" className="bg-mao size-[7px] [:root[data-tone=dark]_&]:bg-paper" />
            Book a session
          </Link>
        </nav>

        <div className="relative z-10 flex items-center gap-5 text-sm md:hidden">
          <Link href={siteConfig.bookingHref} className="flex items-center gap-2 font-semibold">
            <span aria-hidden="true" className="bg-mao size-[7px] [:root[data-tone=dark]_&]:bg-paper group-data-open/h:bg-mao" />
            Book
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenOn(open ? null : pathname)}
            className="min-h-11 min-w-11 font-medium"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        inert={!open}
        className="bg-paper text-ink invisible fixed inset-0 flex flex-col justify-end px-[var(--gutter)] pt-[var(--header-h)] pb-10 [clip-path:inset(0_0_100%_0)] transition-[clip-path,visibility] duration-[550ms] ease-[var(--ease-camera)] group-data-open/h:visible group-data-open/h:[clip-path:inset(0_0_0_0)] md:hidden"
      >
        <nav aria-label="Main">
          <ul className="grid gap-1">
            {navItems.map((item, i) => (
              <li
                key={item.href}
                style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
                className="translate-y-6 opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-camera)] group-data-open/h:translate-y-0 group-data-open/h:opacity-100"
              >
                <Link href={item.href} className="font-display block py-1.5 text-[clamp(2.5rem,12vw,4rem)]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href={siteConfig.bookingHref} className="cta mt-10 self-start">
          Book a Listening Session
        </Link>
      </div>
    </header>
  );
}
