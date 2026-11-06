import { listening, type Photo } from "./home";
import { siteConfig } from "./site";

/**
 * About page content: "Holds". One verb, three objects, read from what his
 * hands are doing in real photographs.
 *
 * Two voices. The large lines are the page's, and marked `// pending` for
 * Segun's approval. Everything first-person is the copy supplied for this page
 * (2026-11-06), used VERBATIM: do not edit, tidy or paraphrase it. Nothing
 * beyond what it says may be claimed (docs/CREATIVE_AUDIT.md §1.1).
 */

const img = (name: string) => `/images/home/${name}.jpg`;

export const about = {
  title: "About",
  description:
    "Born in Lagos, Nigeria, Segun Michael holds space through Listening Hub, holds a camera through MAO Media, and holds projects together through MAO Contractors.",

  /** He lowers the camera. The two frames are registered in scripts/optimize-images.mjs. */
  lookBack: {
    heading: "About Segun Michael",
    first: "Usually, he’s the one looking.", // pending
    second: "This time, look back.", // pending
    cue: "Lower the camera",
    raised: {
      src: img("about-lens"),
      alt: "Segun Michael sitting by a tall window in a denim shirt, holding a camera up at his chest and looking straight at you.",
      width: 2400,
      height: 1600,
    } satisfies Photo,
    lowered: {
      src: img("about-lowered"),
      alt: "The same moment, the camera now lowered to his knee, smiling slightly.",
      width: 2400,
      height: 1600,
    } satisfies Photo,
  },

  who: {
    eyes: {
      src: img("about-eyes"),
      alt: "A close black-and-white crop of Segun Michael’s eyes, looking directly at you.",
      width: 1332,
      height: 306,
    } satisfies Photo,
    name: "Segun Michael.",
    heading: "A little about me",
    story:
      "I was born in Lagos, Nigeria, where my love of music, art, and craft grew into a passion for photography and creative communication. After moving to the United States, I developed a focus on construction estimating and real estate project management.",
    path: "My path has crossed different fields, but curiosity about people and how things come together has remained constant.",
  },

  holdsIntro: "Look at what he holds.", // pending

  space: {
    word: "Holds space.", // pending
    heading: "Listening to people",
    lead: "I value conversations where people can be honest without feeling pressured to perform or arrive with everything figured out.",
    body: "Through personal conversations and radio work, I have learned how much can emerge when someone has room to speak, reflect, and hear themselves more clearly. Listening Hub brings that approach into a one-to-one conversation, with space to explore a question, consider a decision or simply be heard.",
    notice: listening.notice,
    link: { label: "Inside the Listening Hub", href: "/listening-hub" },
    photo: {
      src: img("about-space"),
      alt: "His hands clasped and still on a white table, in black and white.",
      width: 2400,
      height: 1613,
    } satisfies Photo,
  },

  camera: {
    word: "Holds a camera.", // pending
    heading: "Giving stories expression",
    work: "My creative experience includes portrait and event photography, documentary storytelling, marketing concepts, design, voiceovers, and radio production. I have contributed to projects for businesses, nonprofit organizations, churches, and advertising agencies.",
    // His second paragraph, in order, its first sentence set large.
    lead: "I particularly enjoy discovering the person behind a portrait and the human story within an organization’s work.",
    homes: "MAO Media is the home for my creative services. Inspire Network brings together stories and reflections that encourage purposeful living.",
    link: { label: "Inside Media & Communication", href: "/media-communication" },
    photo: {
      src: img("about-camera"),
      alt: "Both of his hands around a camera raised to his eye, framed in a doorway.",
      width: 2400,
      height: 2749,
    } satisfies Photo,
  },

  together: {
    word: ["Holds it", "together."], // pending
    heading: "Bringing projects together",
    body: [
      "My real estate experience includes restoration, residential renovation, investment projects, and development planning.",
      "Through MAO Contractors and collaborative property projects, I help organize the people, information, and decisions needed to move work forward. I enjoy understanding how the pieces fit together and following through on the details.",
    ],
    link: { label: "Inside Real Estate", href: "/real-estate" },
    photo: {
      src: img("about-arms"),
      alt: "His arms folded in a navy blazer, the cuff buttons catching the light.",
      width: 2400,
      height: 1411,
    } satisfies Photo,
  },

  /** The approved "One person. Three expressions of purpose.", said in this page's terms. */
  onePair: ["Three things to hold.", "One pair of hands."], // pending

  /** His words, exactly. No family photographs, and nothing added around this line. */
  family: "Family is central to my life. My wife, Olajumoke, and I have two children.",

  yourTurn: {
    heading: "Enough about him.", // pending
    question: "What are you holding?", // pending
    doors: [
      { ask: "Something you need to say", go: "Book a Listening Session", href: siteConfig.bookingHref, booking: true }, // pending
      { ask: "A story worth telling", go: "Media & Communication", href: "/media-communication", booking: false }, // pending
      { ask: "A place that needs work", go: "Real Estate", href: "/real-estate", booking: false }, // pending
    ],
    other: { label: "Or simply get in touch", href: "/contact" },
    photo: {
      src: img("about-you"),
      alt: "Segun Michael smiling and pointing straight at you, his hand soft and close to the lens.",
      width: 2400,
      height: 2083,
    } satisfies Photo,
  },
} as const;
