import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import "./globals.css";

const fraunces = localFont({
  src: [
    {
      path: "../../public/fonts/fraunces-roman.woff2",
      style: "normal",
    },
    {
      path: "../../public/fonts/fraunces-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

const instrumentSans = localFont({
  src: [
    {
      path: "../../public/fonts/instrument-sans-roman.woff2",
      style: "normal",
    },
    {
      path: "../../public/fonts/instrument-sans-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-instrument",
  display: "swap",
});

const ibmPlexMono = localFont({
  src: [
    {
      path: "../../public/fonts/ibm-plex-mono-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ibm-plex-mono-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Segun Michael — Creative Director, Listener & Builder",
    template: `%s — ${siteConfig.name}`,
  },
  description:
    "The personal portfolio of Segun Michael — listening sessions, media production via MAO Media, and real estate project coordination.",
  openGraph: {
    type: "website",
    locale: "en",
    siteName: siteConfig.name,
    title: "Segun Michael — Creative Director, Listener & Builder",
    description: "A life shaped by people, stories, places, and possibilities.",
    images: [
      {
        url: "/images/portraits/segun-hero-bw.jpg",
        width: 1600,
        height: 2240,
        alt: "Segun Michael, authentic portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Segun Michael — Creative Director, Listener & Builder",
    description: "A life shaped by people, stories, places, and possibilities.",
    images: ["/images/portraits/segun-hero-bw.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ECE9E3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-paper text-ink selection:bg-mao-red selection:text-paper min-h-screen font-sans antialiased">
        <a
          href="#main"
          className="bg-ink text-paper fixed top-3 left-3 z-[100] -translate-y-20 rounded px-4 py-2 font-mono text-xs tracking-wider uppercase transition-transform focus:translate-y-0"
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
