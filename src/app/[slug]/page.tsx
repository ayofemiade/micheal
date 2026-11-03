import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { holdingPages, siteConfig } from "@/data/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return Object.keys(holdingPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const title = holdingPages[slug];
  return title ? { title, robots: { index: false, follow: true } } : {};
}

/**
 * Holding page for routes linked from the homepage but not built yet.
 * It says so plainly rather than pretending the page exists.
 */
export default async function HoldingPage({ params }: { params: Params }) {
  const { slug } = await params;
  const title = holdingPages[slug];
  if (!title) notFound();

  return (
    <section className="shell flex min-h-[86svh] flex-col justify-end pt-[var(--header-h)] pb-16">
      <p className="t-scale text-ink-2">{siteConfig.name}</p>
      <h1 className="t-word mt-5">{title}</h1>
      <p className="text-ink-2 mt-8 max-w-[38ch] text-lg">
        This page is being prepared and isn&rsquo;t available yet.
        {slug === "listening-hub" && " The booking journey will begin here once it is ready."}
      </p>
      <div className="mt-10">
        <Link href="/" className="cta cta-plain">
          Back to home
        </Link>
      </div>
    </section>
  );
}
