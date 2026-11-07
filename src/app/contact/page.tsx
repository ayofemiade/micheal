import Image from "next/image";
import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { BookButton } from "@/components/listening/BookButton";
import { contact, contextFromQuery } from "@/data/contact";
import { hub } from "@/data/listening-hub";
import "./contact.css";

export const metadata: Metadata = {
  title: { absolute: contact.title },
  description: contact.description,
  // Every ?enquiry= link is this one page.
  alternates: { canonical: "/contact" },
  openGraph: {
    title: contact.title,
    description: contact.description,
    images: [{ url: contact.intro.photo.src, width: 2400, height: 3360, alt: contact.intro.photo.alt }],
  },
};

type Search = Promise<Record<string, string | string[] | undefined>>;

/** Only this reads the link, so the rest of the page stays static. */
async function Inquiry({ search }: { search: Search }) {
  const { area, assessment } = contextFromQuery(await search);
  return <InquiryForm key={`${area}-${assessment}`} area={area} assessment={assessment} />;
}

/**
 * Contact: "1:1". The site opens close, pulls back to 1:∞, and ends here at
 * life size: one person reaching out to another. The Listening Hub route stays
 * its own band, because booking and inquiries are separate workflows.
 */
export default function ContactPage({ searchParams }: { searchParams: Search }) {
  const { intro, hub: route, inquiry } = contact;
  return (
    <div className="ct-page">
      <section aria-labelledby="ct-title" className="ct-intro">
        <div className="ct-intro-copy">
          <h1 id="ct-title" className="ct-title">
            {intro.heading}
          </h1>
          <p className="ct-intro-body">{intro.body}</p>
        </div>
        <div className="ct-intro-photo">
          <Image
            src={intro.photo.src}
            alt={intro.photo.alt}
            width={intro.photo.width}
            height={intro.photo.height}
            sizes="(max-width: 1023px) 100vw, 44vw"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>

      <section aria-labelledby="ct-hub" className="ct-hub">
        <div className="shell ct-hub-grid">
          <h2 id="ct-hub" className="ct-heading">
            {route.heading}
          </h2>
          <div>
            <p>{route.body}</p>
            <div className="mt-6">
              <BookButton waiting={hub.book.waiting} onCyan />
            </div>
          </div>
        </div>
      </section>

      <section id="inquiry" aria-labelledby="ct-inquiry" className="ct-inquiry shell">
        <div className="ct-inquiry-head">
          <h2 id="ct-inquiry" className="ct-heading">
            {inquiry.heading}
          </h2>
          <p>{inquiry.body}</p>
        </div>
        <Suspense fallback={<InquiryForm area={null} assessment={false} />}>
          <Inquiry search={searchParams} />
        </Suspense>
      </section>
    </div>
  );
}
