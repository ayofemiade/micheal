import { HeroProofSheet } from "@/components/sections/HeroProofSheet";
import { EditorialCaptionSection } from "@/components/sections/EditorialCaptionSection";
import { ThreeExpressionsProof } from "@/components/sections/ThreeExpressionsProof";
import { DarkroomListeningSection } from "@/components/sections/DarkroomListeningSection";
import { LightTableSection } from "@/components/sections/LightTableSection";
import { BlueprintRealEstateSection } from "@/components/sections/BlueprintRealEstateSection";
import { ClosingInvitationSection } from "@/components/sections/ClosingInvitationSection";

export default function HomePage() {
  return (
    <>
      {/* 01: The Hero Proof Sheet (Interactive contact frames + confirmed B&W hero IMG_2543) */}
      <HeroProofSheet />

      {/* 02: The Caption (Authentic personal provenance & philosophy) */}
      <EditorialCaptionSection />

      {/* 03: The Three Expressions (Listen / Create / Build asymmetric contact strip) */}
      <ThreeExpressionsProof />

      {/* 04: The Darkroom (The Listening Sanctuary with red safelight atmosphere) */}
      <DarkroomListeningSection />

      {/* 05: The Light Table (Original curated MAO Media photography) */}
      <LightTableSection />

      {/* 06: The Blueprint (Real estate renovation planning via MAO Contractors) */}
      <BlueprintRealEstateSection />

      {/* 07: The Closing Invitation (Reaching portrait & direct connections) */}
      <ClosingInvitationSection />
    </>
  );
}
