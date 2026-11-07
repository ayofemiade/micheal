import type { Metadata } from "next";
import { hub } from "@/data/listening-hub";
import { Welcome } from "@/components/listening/Welcome";
import { Thoughts } from "@/components/listening/Thoughts";
import { Shaped } from "@/components/listening/Shaped";
import { Pause } from "@/components/listening/Pause";
import { Role } from "@/components/listening/Role";
import { Book } from "@/components/listening/Book";
import "./listening-hub.css";

export const metadata: Metadata = {
  title: { absolute: "Listening Hub | Segun Michael" },
  description: hub.description,
  openGraph: {
    title: "Listening Hub | Segun Michael",
    description: hub.description,
    images: [{ url: hub.hero.photo.src, width: 2400, height: 3360, alt: "Segun Michael" }],
  },
};

/**
 * Listening Hub: "Making room". The page is still: it scrolls normally and
 * every word is simply there. Its sections step from day into evening. Only the
 * hero's headline moves, once, on arrival. Do not add scroll scenes here.
 * 01 The other chair · 02 Thoughts · 03 A conversation shaped around you
 * 04 The pause · 05 My role · 06 Book a session.
 * Two booking buttons only, both the same BookButton.
 */
export default function ListeningHubPage() {
  return (
    <>
      <Welcome />
      <Thoughts />
      <Shaped />
      <Pause />
      <Role />
      <Book />
    </>
  );
}
