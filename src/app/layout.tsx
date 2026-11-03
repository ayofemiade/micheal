import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import "./globals.css";

/*
 * Zodiak and Switzer: Indian Type Foundry via Fontshare, ITF Free Font
 * License v2.0. Commercial use and self-hosting are permitted. The files must
 * ship unmodified (no subsetting or conversion) and must not be redistributed
 * outside this website. Keep the repository private.
 */
const zodiak = localFont({
  src: "./fonts/zodiak-variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-zodiak",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

const switzer = localFont({
  src: "./fonts/switzer-variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-switzer",
  display: "swap",
  fallback: ["ui-sans-serif", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: siteConfig.title, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: "/images/home/portrait.jpg", width: 1429, height: 2000, alt: "Segun Michael" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/home/portrait.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
};

/** Marks JS as available before first paint, so scroll scenes size correctly without layout shift. */
const jsFlag = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${zodiak.variable} ${switzer.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className="bg-paper text-ink min-h-screen">
        <a
          href="#main"
          className="bg-ink text-paper fixed top-3 left-3 z-[100] -translate-y-24 px-4 py-2.5 text-sm transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
