"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEventHandler, ReactNode } from "react";
import { siteConfig } from "@/data/site";

/**
 * The site-wide "book" links. With a calendar set they all open it. Until then
 * they lead to the Listening Hub page, or to its booking section when already there.
 */
export function BookingLink({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
}) {
  const here = usePathname() === "/listening-hub";
  if (siteConfig.bookingCalendarUrl) {
    return (
      <a href={siteConfig.bookingCalendarUrl} target="_blank" rel="noopener" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={here ? "#book" : siteConfig.bookingHref} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
