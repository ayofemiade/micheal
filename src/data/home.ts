/**
 * Homepage content for "Near to Far".
 *
 * Rules (see docs/CREATIVE_AUDIT.md §1.1): every sentence traces to the brief
 * or to Segun. Captions describe what the photograph shows. No invented dates,
 * codes, camera data, locations, service formats or outcomes.
 *
 * COPY STATUS: lines marked `// pending` are descriptive copy written for the
 * design and are awaiting Segun's approval (decision 5 in
 * docs/NEW_CREATIVE_DIRECTION.md).
 */

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** A print hung in the scene, in world units (the portrait print is 140 wide). */
export interface ScenePrint extends Photo {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  caption: string;
}

const img = (name: string) => `/images/home/${name}.jpg`;

/**
 * `sizes` for photographs shown twice on the page (a hero print and again in a
 * section). Both places must use the same string, so the browser picks the same
 * file for both and downloads it once (mismatched sizes downloaded every MAO
 * frame twice on phones: ~560 KB extra on 3x screens).
 */
export const SIZES = {
  maoPrint: "(max-width: 639px) 80vw, 520px",
  kitchen: "(max-width: 639px) 100vw, (max-width: 1023px) 58vw, 46vw",
} as const;

export const portrait: Photo = {
  src: img("portrait"),
  alt: "Segun Michael, arms crossed, smiling, in a cream mandarin-collar shirt against a white studio backdrop.",
  width: 1429,
  height: 2000,
};

/** Exact crop of the portrait (world rect 30,2 → 80×68). Built by scripts/optimize-images.mjs. */
export const face: Photo = {
  src: img("face"),
  alt: "Segun Michael, close up, smiling.",
  width: 2400,
  height: 2041,
};

/** Genuine MAO Media frames (all carry the MAO mark or come from the MAO set). */
export const maoPrints: readonly ScenePrint[] = [
  { id: "headwrap", src: img("mao-headwrap"), width: 774, height: 430, x: -245, y: -5, w: 90, h: 50, caption: "Portrait", alt: "A smiling woman in a green headwrap and green top against a grey studio backdrop." },
  { id: "bride", src: img("mao-bride"), width: 700, height: 1050, x: -245, y: 60, w: 90, h: 135, caption: "Wedding morning", alt: "Black-and-white photograph of a bride in her gown by a window, a small page boy in a tuxedo at her side." },
  { id: "green", src: img("mao-green"), width: 1067, height: 1600, x: -140, y: -30, w: 110, h: 165, caption: "Maternity portrait", alt: "A pregnant woman in a flowing green gown, in profile, against a painted botanical backdrop." },
  { id: "blue", src: img("mao-blue"), width: 1200, height: 1600, x: -140, y: 150, w: 110, h: 147, caption: "Traditional wedding", alt: "A couple in royal blue traditional attire and headwear, the groom kissing the bride's cheek." },
  { id: "red", src: img("mao-red"), width: 1600, height: 1067, x: 165, y: 0, w: 165, h: 110, caption: "Studio portrait", alt: "A woman in a red top against a deep crimson studio backdrop, hands resting together." },
  { id: "sofa", src: img("mao-sofa"), width: 1600, height: 1067, x: 165, y: 125, w: 150, h: 100, caption: "Portrait", alt: "A smiling woman in a grey jumper resting her head against a red leather sofa." },
  { id: "gele", src: img("mao-gele"), width: 700, height: 1050, x: 345, y: -20, w: 80, h: 120, caption: "Portrait", alt: "A woman in a gold gele and lace, wearing coral beads, seated in an ornate chair." },
  { id: "wed", src: img("mao-wed"), width: 1600, height: 1067, x: 330, y: 120, w: 135, h: 90, caption: "Wedding portrait", alt: "A bride and groom touching foreheads outdoors, the bride in a lace veil." },
  { id: "couple", src: img("mao-couple"), width: 1067, height: 1600, x: 480, y: 10, w: 90, h: 135, caption: "Wedding portrait", alt: "A groom embracing a bride in a white lace gown in a garden." },
];

/**
 * Places, full screen. Approved for use by the user (2026-11-06). Captions and
 * copy describe only what it shows; never publish an address.
 */
export const house: Photo = {
  src: img("re-house"),
  alt: "A two-storey house in red brick and grey siding under a deep blue winter sky, with snow across the lawn.",
  width: 2400,
  height: 1500,
};

/** The first screen says who he is and everything he does. */
export const hero = {
  heading: ["I’m Segun", "Michael."],
  body: "I listen, create and bring ideas to life across conversations, media and real estate.",
  // Shown in place of the columns below where they do not fit.
  ventures: "Through the Listening Hub, MAO Media, Inspire Network and MAO Contractors.",
  rows: [
    { tag: "People", name: "Listening Hub", href: "/listening-hub", does: "Supportive listening and unhurried conversation." },
    { tag: "Stories", name: "Media & Communication", href: "/media-communication", does: "Portraits, weddings and studio work through MAO Media. Inspire Network, my editorial platform." },
    { tag: "Places", name: "Real Estate", href: "/real-estate", does: "Renovation planning and project coordination through MAO Contractors." },
  ],
};

export const chapters = [
  {
    ratio: "1:1",
    label: "Listening Hub · human connection",
    word: "People.",
    body: "Up close, it starts with listening: a calm space for unhurried conversation and personal reflection.", // pending
  },
  {
    ratio: "1:10",
    label: "MAO Media · Inspire Network · creative expression",
    word: "Stories.",
    body: "Step back from one face and you find the others: portraits, weddings and studio work, made through MAO Media.", // pending
  },
  {
    ratio: "1:100",
    label: "MAO Contractors · practical execution",
    word: "Places.",
    body: "Step back again and there’s a house. Renovation planning and project coordination, through MAO Contractors.", // pending
  },
  {
    ratio: "1:∞",
    label: "What comes next",
    word: "Possibilities.",
    body: "One person. Three expressions of purpose.",
  },
] as const;

export const listening = {
  photo: {
    src: img("listen"),
    alt: "Segun Michael seated at a white table, hands clasped, leaning in and smiling.",
    width: 1571,
    height: 2200,
  } satisfies Photo,
  heading: ["Space to speak.", "Room to think."],
  body: "The Listening Hub is a calm space for supportive listening, unhurried conversation and personal reflection.",
  notice:
    "The Listening Hub offers supportive conversation. It is not therapy, counselling or clinical treatment, and it is not a substitute for professional care.",
};

export const media = {
  photo: {
    src: img("window"),
    alt: "Segun Michael seated by a tall window in a denim shirt, holding a camera, smiling.",
    width: 2400,
    height: 1600,
  } satisfies Photo,
  heading: "Stories deserve to be told well.",
  body: "Through MAO Media, Segun photographs people: portraits, weddings and studio work.", // pending
  inspire: "Inspire Network is his editorial platform.",
};

export const realEstate = {
  photo: {
    src: img("blazer"),
    alt: "Segun Michael in a navy blazer and light blue shirt, arms crossed.",
    width: 1429,
    height: 2000,
  } satisfies Photo,
  heading: "The same attention, at the scale of a room.", // pending
  body: "Through MAO Contractors, Segun works on renovation planning and project coordination.",
  // A MAO Contractors renovation (confirmed by the client, 2026-11-03). Captions
  // describe only what the photographs show; no address, dates or costs.
  project: {
    before: {
      src: img("re-before"),
      alt: "The kitchen before renovation: cabinet doors removed, bare shelving, a floral wallpaper border and a worn patterned vinyl floor.",
      width: 952,
      height: 635,
    } satisfies Photo,
    after: {
      src: img("re-after"),
      alt: "The same kitchen after renovation: cabinets refinished in dark brown with their doors refitted, a marble-effect splashback, a pale wood-effect floor and wide windows onto trees.",
      width: 2400,
      height: 1600,
    } satisfies Photo,
    caption: "One kitchen, before and after. A MAO Contractors renovation.",
  },
};

export const closing = {
  photo: {
    src: img("reach"),
    alt: "Segun Michael smiling and reaching one hand toward the camera, the hand soft and close in the foreground.",
    width: 1714,
    height: 2400,
  } satisfies Photo,
  heading: "Every meaningful connection begins with a conversation.",
};
