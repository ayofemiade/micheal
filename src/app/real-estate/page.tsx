import type { Metadata } from "next";
import { realEstatePage } from "@/data/real-estate";
import { Assessment, Coordination, Discuss, Intro, Partnership, Planning, Projects } from "@/components/realestate/Sheets";
import "./real-estate.css";

export const metadata: Metadata = {
  title: { absolute: "Real Estate and MAO Contractors | Segun Michael" },
  description: realEstatePage.description,
  openGraph: {
    title: "Real Estate and MAO Contractors | Segun Michael",
    description: realEstatePage.description,
    images: [{ url: realEstatePage.projects.kitchen.after.src, width: 2400, height: 1600, alt: "A MAO Contractors kitchen renovation" }],
  },
};

/**
 * Real Estate: "The Drawing Set". Set like construction documents: visible
 * drafting lines, exact alignment, plain facts. Still by design: no pinned
 * scenes and nothing revealed by scrolling.
 */
export default function RealEstatePage() {
  return (
    <div className="re-page">
      <Intro />
      <Assessment />
      <Coordination />
      <Planning />
      <Projects />
      <Partnership />
      <Discuss />
    </div>
  );
}
