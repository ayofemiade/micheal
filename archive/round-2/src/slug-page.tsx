import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { holdingPages, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return Object.keys(holdingPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = holdingPages[slug];
  return title ? { title, robots: { index: false, follow: true } } : {};
}

/**
 * Holding page for routes that are linked from the homepage but not built yet.
 * It says so plainly rather than pretending the page exists.
 */
export default async function HoldingPage({ params }: { params: Params }) {
  const { slug } = await params;
  const title = holdingPages[slug];
  if (!title) notFound();

  return (
    <section className="bg-ivory flex min-h-[80svh] items-center pt-[var(--header-h)]">
      <Container className="py-24">
        <p className="t-label text-terracotta-deep">{siteConfig.name}</p>
        <h1 className="t-h1 mt-5 max-w-[14ch]">{title}</h1>
        <p className="t-lead text-charcoal/80 mt-6 max-w-[34rem]">
          This page is being prepared and isn&rsquo;t available yet.
          {slug === "listening-hub" &&
            " The booking journey will begin here once it is ready."}
        </p>
        <div className="mt-10">
          <Button href="/">Back to home</Button>
        </div>
      </Container>
    </section>
  );
}
