import type { Pillar } from "@/types/content";

export const pillars: readonly Pillar[] = [
  {
    id: "listening-hub",
    index: "01",
    verb: "Listen",
    domain: "Human Connection",
    entity: "The Listening Hub",
    title: "Listening Hub",
    line: "Space to speak. Room to think.",
    description:
      "A calm, confidential space centred around supportive listening, unhurried conversation, and personal reflection.",
    highlights: [
      "One-to-one reflective conversations",
      "Unhurried, judgement-free listening",
      "Non-clinical personal clarity",
    ],
    href: "/listening-hub",
    cta: "Explore Listening Hub",
    image: {
      src: "/images/editorial/interior-lounge.jpg",
      alt: "Warm, quiet lounge armchair and ottoman illuminated by soft ambient lamp light.",
      width: 432,
      height: 660,
      objectPosition: "50% 45%",
    },
  },
  {
    id: "media",
    index: "02",
    verb: "Create",
    domain: "Creative Expression",
    entity: "MAO Media · Inspire Network",
    title: "Media & Communication",
    line: "Stories deserve to be told well.",
    description:
      "Photography, visual direction, and thoughtful editorial communication that capture character, dignity, and ideas with clarity.",
    highlights: [
      "MAO Media photography & visual storytelling",
      "Inspire Network editorial platform & essays",
      "Creative direction & brand communication",
    ],
    href: "/media-communication",
    cta: "Explore Media",
    image: {
      src: "/images/portraits/segun-camera.jpg",
      alt: "Segun Michael holding a Canon camera up to his eye beside a sunlit window.",
      width: 1333,
      height: 2000,
      objectPosition: "50% 24%",
    },
  },
  {
    id: "real-estate",
    index: "03",
    verb: "Build",
    domain: "Practical Execution",
    entity: "MAO Contractors",
    title: "Real Estate",
    line: "Turning property possibilities into practical progress.",
    description:
      "Structured renovation planning, property stewardship, and practical project coordination from initial scope to physical execution.",
    highlights: [
      "Renovation scoping & spatial planning",
      "MAO Contractors project coordination",
      "Disciplined, transparent execution",
    ],
    href: "/real-estate",
    cta: "Explore Real Estate",
    image: {
      src: "/images/portraits/segun-property.jpg",
      alt: "Segun Michael in a tailored navy blazer and light blue shirt with arms crossed.",
      width: 1400,
      height: 1960,
      objectPosition: "50% 8%",
    },
  },
] as const;
