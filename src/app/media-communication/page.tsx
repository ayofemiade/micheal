import type { Metadata } from "next";
import { media } from "@/data/media";
import { Cover } from "@/components/media/Cover";
import { Mao } from "@/components/media/Mao";
import { Selected } from "@/components/media/Selected";
import { Inspire } from "@/components/media/Inspire";
import "./media.css";

export const metadata: Metadata = {
  title: media.title,
  description: media.description,
  openGraph: {
    title: "Media & Communication · Segun Michael",
    description: media.description,
    images: [{ url: media.hero.photo.src, width: 5184, height: 3456, alt: "Portrait by MAO Media" }],
  },
};

/**
 * Media & Communication: "The Issue". Composed like a printed magazine: a cover,
 * then spreads built around the work. Still by design: no pinned scenes and
 * nothing revealed by scrolling (the user's decision on the Listening Hub).
 */
export default function MediaCommunicationPage() {
  return (
    <div className="media-page">
      <Cover />
      <Mao />
      <Selected />
      <Inspire />
    </div>
  );
}
