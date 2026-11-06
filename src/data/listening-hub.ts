import type { Photo } from "./home";

/**
 * Listening Hub page: "Making room".
 *
 * The wording below is the approved copy, 2026-11-06. Do not change its meaning,
 * promises or terms. Do not add service details, prices, policies, outcomes,
 * qualifications or testimonials.
 */

const img = (name: string) => `/images/home/${name}.jpg`;

/**
 * UNCONFIRMED. Leave null until Segun confirms them; the line renders only when
 * both are set. Example of the finished sentence, not of the facts:
 * "Sessions last [duration] and take place [format]."
 */
export const sessionDetails: { duration: string | null; format: string | null } = {
  duration: null,
  format: null,
};

export const hub = {
  title: "Listening Hub",
  description:
    "You do not need to have everything figured out before you begin a conversation. Listening Hub offers supportive listening and reflection conversations with Segun Michael.",

  hero: {
    eyebrow: "Listening Hub",
    heading: ["Space to speak.", "Room to think."],
    lead: "You do not need to have everything figured out before you begin a conversation.",
    offer:
      "Listening Hub offers an opportunity to talk openly, process what you are experiencing, and explore what matters to you with someone who will listen attentively and without judgment.",
    clauses: ["You may be facing a decision,", "navigating a change,", "or carrying thoughts you have not had room to express."],
    heard: "You may simply want to be heard.",
    reach: {
      src: img("hub-reach"),
      alt: "Segun Michael leaning in and smiling, both arms reaching toward you, his hands soft and close to the lens.",
      width: 2400,
      height: 3360,
    } satisfies Photo,
    photo: {
      src: img("hub-table"),
      alt: "Segun Michael sitting across a table from you, hands clasped, leaning in with an open smile.",
      width: 2400,
      height: 3360,
    } satisfies Photo,
  },

  shaped: {
    heading: "A conversation shaped around you",
    intro: "Our conversation begins with what you need. You can use the time to:",
    // Choices, not steps: never number them.
    options: [
      "Talk through a situation at your own pace.",
      "Explore thoughts or feelings that have been difficult to put into words.",
      "Consider what matters most in a decision.",
      "Notice assumptions, questions, or possibilities.",
      "Identify a next step, if you are ready.",
    ],
  },

  pause: {
    first: "There is no requirement to leave with an action plan.",
    second: "Being heard can be valuable in itself.",
  },

  role: {
    heading: "My role",
    statement: "I’m your thought partner in conversation:",
    how: "I listen carefully, ask questions, and reflect back what I’m hearing.",
    body: "You decide what you want to explore and how far you want to take the conversation. We can take time to understand what you are carrying, consider different perspectives, or explore the next step when you are ready.",
    who: "Segun Michael",
    more: { label: "More about Segun", href: "/about" },
    photo: {
      src: img("hub-window"),
      alt: "Segun Michael in a denim shirt, seated by a window in soft daylight, looking at you with a gentle smile.",
      width: 2400,
      height: 2815,
    } satisfies Photo,
  },

  book: {
    heading: "Book a session",
    how: "Choose a time that works for you using the booking calendar. A few brief questions will help me prepare. A short response is enough; you do not need to explain everything before we meet.",
    contribution: {
      label: "Contribution",
      text: "There is no required fee during this introductory period. After your session, you may choose to make a voluntary contribution. You are equally welcome whether or not you contribute.",
    },
    nature: {
      label: "What this is",
      text: "These are supportive listening and reflection conversations, rather than mental health treatment.",
      // From the notice already approved for the homepage.
      care: "They are not a substitute for professional care.",
    },
    session: { label: "The session" },
    waiting: "The booking calendar is being set up and will open here soon.", // pending
    print: {
      src: img("hub-print"),
      alt: "A blue cyanotype print of his hands, clasped and at rest on the table.",
      width: 2400,
      height: 1613,
    } satisfies Photo,
  },
} as const;
