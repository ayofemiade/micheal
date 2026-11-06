import { listening, type Photo } from "./home";
import { siteConfig } from "./site";

/**
 * About page content: "Holds". One verb, three objects, read from what his
 * hands are doing in real photographs.
 *
 * Rules (docs/CREATIVE_AUDIT.md §1.1): no invented history, dates, beliefs,
 * family, clients or results. Service descriptions repeat approved homepage
 * wording. Lines marked `// pending` are written for this page and await
 * Segun's approval.
 */

const img = (name: string) => `/images/home/${name}.jpg`;

export const about = {
  title: "About",
  description:
    "Segun Michael holds space through the Listening Hub, holds a camera through MAO Media, and holds projects together through MAO Contractors. One person. Three expressions of purpose.",

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
    positioning: "I listen, create and bring ideas to life across conversations, media and real estate.",
    aside: "On paper, that reads like three different jobs. In person, it’s one way of paying attention.", // pending
    /**
     * Segun's own words, when he supplies them. Nothing renders until this is
     * set: a real sentence from him belongs here, never a written-for-him one.
     */
    ownWords: null as string | null,
  },

  holdsIntro: "Look at what he holds.", // pending

  space: {
    word: "Holds space.", // pending
    label: "Listening Hub · human connection",
    body: listening.body,
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
    label: "Media & Communication · creative expression",
    body: "Through MAO Media, he photographs people: portraits, weddings and studio work. Inspire Network is his editorial platform.",
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
    label: "Real Estate · practical execution",
    body: "Through MAO Contractors, he works on renovation planning and project coordination.",
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
