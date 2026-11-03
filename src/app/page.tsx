import { PullBack } from "@/components/home/PullBack";
import { ListeningSection } from "@/components/home/ListeningSection";
import { MediaSection } from "@/components/home/MediaSection";
import { RealEstateSection } from "@/components/home/RealEstateSection";
import { ClosingSection } from "@/components/home/ClosingSection";

/**
 * Homepage: "Near to Far". The page pulls back, then walks back in.
 * 01 Pull-back (1:1 → 1:∞) · 02 Listening Hub (1:1) · 03 Media (1:10)
 * 04 Real Estate (1:100) · 05 Closing (back to 1:1).
 * Journey is omitted until real milestones are supplied.
 */
export default function HomePage() {
  return (
    <>
      <PullBack />
      <ListeningSection />
      <MediaSection />
      <RealEstateSection />
      <ClosingSection />
    </>
  );
}
