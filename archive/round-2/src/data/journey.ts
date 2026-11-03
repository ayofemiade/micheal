import type { JourneyChapter } from "@/types/content";

/**
 * Section 05 — Personal Journey Data
 * Uses only verified brand and ecosystem truths—no invented years, awards,
 * institutions, or unverified milestones. Each chapter has a `phase` field
 * that displays the thematic progression now and can be replaced with
 * confirmed chronological years whenever supplied by Segun Michael.
 */
export const journeyChapters: readonly JourneyChapter[] = [
  {
    index: "I",
    phase: "Foundation · Human Connection",
    expression: "The Listening Hub",
    title: "Starting with the discipline of attentive listening",
    narrative:
      "Long before any creative frame or project plan takes shape, meaningful work begins with listening—giving another person unhurried attention, space to articulate their thoughts, and room to reflect with clarity.",
    ecosystemNote:
      "Anchored in the Listening Hub: a dedicated space for supportive conversation and reflection.",
  },
  {
    index: "II",
    phase: "Expression · Visual & Editorial Craft",
    expression: "MAO Media · Inspire Network",
    title: "Giving form to human stories and ideas",
    narrative:
      "Listening naturally leads to expression. Through photography, portraiture, and editorial communication, the focus expanded to capturing human dignity on camera and articulating thoughtful perspectives through writing and media.",
    ecosystemNote:
      "Expressed through MAO Media (photography & visual commissions) and Inspire Network (editorial platform).",
  },
  {
    index: "III",
    phase: "Execution · Space & Project Stewardship",
    expression: "MAO Contractors",
    title: "Translating vision into organised physical reality",
    narrative:
      "Ideas and conversations also belong in the physical world. Applying the same attentiveness and structured communication to renovation planning and real estate coordination ensures projects move from possibility to practical execution.",
    ecosystemNote:
      "Executed through MAO Contractors: renovation planning and real estate project coordination.",
  },
] as const;
