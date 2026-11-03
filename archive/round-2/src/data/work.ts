import type { WorkItem } from "@/types/content";

/**
 * Section 06 — Selected Work Data
 * Strictly uses genuine photography from the workspace (`website gallery/`)
 * and explicitly distinguishes provenance categories as required by the brief:
 * - MAO client work (genuine commissioned photography)
 * - V&M partnership work / Proposed development planning (explicitly distinguished
 *   in the portfolio ledger below without fabricating completed property photos).
 */
export const workItems: readonly WorkItem[] = [
  {
    id: "mao-maternity-editorial",
    src: "/images/media/mao-portrait-green.jpg",
    alt: "Studio portrait of a woman in profile wearing a flowing green gown against a painted botanical backdrop.",
    width: 1333,
    height: 2000,
    title: "Botanical Studio Portraiture",
    category: "mao-media",
    categoryLabel: "MAO Media · Client Work",
    provenance: "MAO Media Commission",
    summary:
      "Controlled studio lighting and sculptural composition for fine-art personal portraiture.",
  },
  {
    id: "mao-candid-red",
    src: "/images/media/mao-portrait-red.jpg",
    alt: "Warm candid portrait of a smiling woman resting on a red leather sofa, bearing the MAO Media mark.",
    width: 2000,
    height: 1333,
    title: "Warmth & Character Study",
    category: "mao-media",
    categoryLabel: "MAO Media · Client Work",
    provenance: "MAO Media Commission",
    summary:
      "Intimate, unhurried portrait session focused on natural expression and emotional ease.",
  },
  {
    id: "mao-matrimonial-garden",
    src: "/images/media/mao-wedding-portrait.jpg",
    alt: "Groom in a navy suit embracing a bride in a white lace gown outdoors, bearing the MAO Media mark.",
    width: 1333,
    height: 2000,
    title: "Matrimonial Documentary Portrait",
    category: "mao-media",
    categoryLabel: "MAO Media · Client Work",
    provenance: "MAO Media Commission",
    summary:
      "Natural-light bridal and couple portraiture documenting milestone family moments.",
  },
  {
    id: "mao-traditional-blue",
    src: "/images/media/mao-couple-blue.jpg",
    alt: "Overhead editorial portrait of a couple in royal blue traditional attire.",
    width: 1333,
    height: 2000,
    title: "Cultural Attire & Perspective Study",
    category: "mao-media",
    categoryLabel: "MAO Media · Client Work",
    provenance: "MAO Media Commission",
    summary:
      "Elevated overhead framing celebrating colour, heritage, and connection.",
  },
  {
    id: "mao-crimson-studio",
    src: "/images/media/mao-studio-red.jpg",
    alt: "Portrait of a woman in red against a tonal crimson studio backdrop.",
    width: 2000,
    height: 1333,
    title: "Monochrome Crimson Study",
    category: "mao-media",
    categoryLabel: "MAO Media · Client Work",
    provenance: "MAO Media Commission",
    summary:
      "Tonal colour study pairing subject wardrobe and studio backdrop for editorial impact.",
  },
  {
    id: "mao-matrimonial-closeup",
    src: "/images/media/mao-wedding-closeup.jpg",
    alt: "Close-up portrait of a bride and groom touching foreheads outdoors, bearing the MAO Media mark.",
    width: 2000,
    height: 1333,
    title: "Quiet Connection — Bridal Close-Up",
    category: "mao-media",
    categoryLabel: "MAO Media · Client Work",
    provenance: "MAO Media Commission",
    summary: "Documentary stillness captured in the middle of a celebration.",
  },
] as const;

export interface PracticeDistinction {
  code: string;
  category: string;
  venture: string;
  statusBadge: string;
  description: string;
}

/**
 * Explicit provenance ledger distinguishing MAO client work, V&M partnership
 * work, and proposed development planning—ensuring proposed projects are
 * never misrepresented as completed builds.
 */
export const practiceDistinctions: readonly PracticeDistinction[] = [
  {
    code: "01 / MAO MEDIA",
    category: "MAO Client Work",
    venture: "MAO Media & Inspire Network",
    statusBadge: "Completed Commissions",
    description:
      "Original portrait, documentary, wedding, and studio photography commissioned through MAO Media, alongside editorial publishing via Inspire Network.",
  },
  {
    code: "02 / PARTNERSHIP",
    category: "V&M Partnership Work",
    venture: "Collaborative Property & Project Scope",
    statusBadge: "Partnership Attribution",
    description:
      "Jointly coordinated property and project engagements delivered in partnership, attributed transparently to distinguish shared scope from solo commissions.",
  },
  {
    code: "03 / DEVELOPMENT PLANNING",
    category: "Proposed Development Planning",
    venture: "MAO Contractors",
    statusBadge: "Planning & Pre-Construction Scope",
    description:
      "Renovation scoping, spatial feasibility, and proposed development planning prepared for upcoming real estate mandates—presented strictly as planning work rather than completed construction.",
  },
] as const;
