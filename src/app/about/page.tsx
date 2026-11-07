import type { Metadata } from "next";
import { about } from "@/data/about";
import { LookBack } from "@/components/about/LookBack";
import { Who } from "@/components/about/Who";
import { Holds } from "@/components/about/Holds";
import { OnePair } from "@/components/about/OnePair";
import { YourTurn } from "@/components/about/YourTurn";
import "./about.css";

export const metadata: Metadata = {
  title: { absolute: "About Segun Michael" },
  description: about.description,
  openGraph: {
    title: "About Segun Michael",
    description: about.description,
    images: [{ url: about.lookBack.raised.src, width: 2400, height: 1600, alt: "Segun Michael" }],
  },
};

/**
 * About: "Holds". The homepage steps back from him; this page comes in.
 * 01 He lowers the camera · 02 You look back · 03 What he holds
 * 04 One pair of hands · 05 Your turn.
 */
export default function AboutPage() {
  return (
    <>
      <LookBack />
      <Who />
      <Holds />
      <OnePair />
      <YourTurn />
    </>
  );
}
