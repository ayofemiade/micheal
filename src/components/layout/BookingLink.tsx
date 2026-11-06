"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEventHandler, ReactNode } from "react";
import { siteConfig } from "@/data/site";

/**
 * The site-wide "book" links. Everywhere else they lead to the Listening Hub
 * page, so people understand it first. On that page they go to its booking
 * section, rather than reloading the page they are already on.
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
  const here = usePathname() === siteConfig.bookingHref;
  return (
    <Link href={here ? "#book" : siteConfig.bookingHref} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
