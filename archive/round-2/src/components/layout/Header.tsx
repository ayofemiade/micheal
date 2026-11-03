"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  useReducedMotion,
} from "motion/react";
import * as m from "motion/react-m";
import { Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-ink/12 bg-paper/94 border-b py-3 shadow-[0_2px_12px_rgba(20,20,20,0.03)] backdrop-blur-md"
          : "border-ink/8 bg-paper/85 border-b py-4 backdrop-blur-xs",
      )}
    >
      <div className="container-proof flex items-center justify-between gap-6">
        {/* Brand / Monogram */}
        <Link
          href="/"
          aria-label="Segun Michael — home"
          className="group focus-visible:outline-mao-red inline-flex items-center gap-3.5"
        >
          <span
            aria-hidden
            className="border-ink/30 bg-paper text-ink group-hover:border-mao-red group-hover:text-mao-red flex size-8 items-center justify-center border font-mono text-[11px] font-semibold tracking-wider transition-colors duration-200"
          >
            SM
          </span>
          <span className="font-display text-ink text-xl font-normal tracking-[-0.015em] sm:text-[1.35rem]">
            Segun Michael
          </span>
          <span className="text-ink/40 hidden font-mono text-[10px] tracking-widest uppercase sm:inline-block">
            / PROOF SHEET
          </span>
        </Link>

        {/* Primary Navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 lg:gap-9">
            {navItems.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "group relative inline-flex items-center gap-1.5 py-1 text-[13px] font-medium tracking-[0.01em] transition-colors duration-200",
                    isActive(item.href)
                      ? "text-ink font-semibold"
                      : "text-ink/70 hover:text-ink",
                  )}
                >
                  <span className="text-ink/40 group-hover:text-mao-red font-mono text-[10px] transition-colors">
                    0{i + 1}
                  </span>
                  <span className="whitespace-nowrap">{item.label}</span>
                  {isActive(item.href) && (
                    <span className="bg-mao-red absolute right-0 -bottom-1 left-0 h-[1.5px]" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            href={siteConfig.bookingHref}
            className="group border-ink/80 bg-paper text-ink hover:border-mao-red hover:bg-mao-red hover:text-paper hidden items-center gap-2.5 border px-4 py-2 font-mono text-[12px] font-medium transition-all duration-200 sm:inline-flex"
          >
            <span className="bg-mao-red group-hover:bg-paper inline-block size-2 rounded-full transition-transform duration-200 group-hover:scale-125" />
            <span>Book a Listening Session</span>
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="border-ink/20 bg-paper text-ink flex min-h-10 cursor-pointer items-center gap-2 border px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-colors md:hidden"
          >
            <span>Menu</span>
            <Menu aria-hidden className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <LazyMotion features={domAnimation} strict>
        <AnimatePresence>
          {open && (
            <m.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="bg-paper fixed inset-0 z-50 flex min-h-dvh flex-col md:hidden"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="container-proof border-ink/10 flex h-16 shrink-0 items-center justify-between border-b">
                <span className="inline-flex items-center gap-3">
                  <span className="border-ink/30 text-ink flex size-8 items-center justify-center border font-mono text-xs">
                    SM
                  </span>
                  <span className="font-display text-ink text-xl">
                    Segun Michael
                  </span>
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="border-ink/20 text-ink flex size-10 items-center justify-center border"
                >
                  <X aria-hidden className="size-5" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>

              <nav className="container-proof flex flex-1 flex-col justify-between py-8">
                <ul className="divide-ink/10 flex flex-col divide-y">
                  {navItems.map((item, i) => (
                    <li key={item.href} className="py-4">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "font-display flex items-baseline justify-between text-2xl",
                          isActive(item.href)
                            ? "text-mao-red font-normal"
                            : "text-ink hover:text-mao-red",
                        )}
                      >
                        <span>{item.label}</span>
                        <span className="text-ink/40 font-mono text-xs">
                          FRAME 0{i + 1}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="border-ink/10 border-t pt-6">
                  <p className="text-ink/70 mb-4 text-xs">
                    Listening Hub &bull; MAO Media &bull; Real Estate &bull;
                    Lagos & Global
                  </p>
                  <Link
                    href={siteConfig.bookingHref}
                    onClick={() => setOpen(false)}
                    className="border-ink bg-ink text-paper flex w-full items-center justify-center gap-2 border py-3 font-mono text-xs tracking-wider uppercase"
                  >
                    <span className="bg-mao-red size-2 rounded-full" />
                    Book a Listening Session
                  </Link>
                </div>
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </header>
  );
}
