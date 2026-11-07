/**
 * Media & Communication: "The Issue". Approved copy, 2026-11-06: keep its
 * meaning. Inspire Network and MAO Media are separate things; never merge them.
 *
 * Portfolio captions state only what is known: the subject and the kind of work.
 * `year` and `role` stay null until Segun supplies them, and nothing is shown for
 * a null. Do not guess, and do not write outcomes or case-study stories.
 */

const img = (name: string) => `/images/home/${name}.jpg`;

export interface Shot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const shot = (name: string, width: number, height: number, alt: string): Shot => ({ src: img(name), width, height, alt });

/** One real audio file per clip, with a title. Nothing renders until clips exist. */
export interface AudioClip {
  title: string;
  description: string;
  src: string;
}

/** Where "Discuss a Creative Project" goes. Contact reads `enquiry` once its form exists. */
export const mediaEnquiryHref = "/contact?enquiry=mao-media";
export const inspireEnquiryHref = "/contact?enquiry=inspire-network";

export const media = {
  title: "Media & Communication",
  description:
    "Photography, creative concepts and voice for people and organizations through MAO Media, with stories, articles and audio shared through Inspire Network.",

  hero: {
    title: "Media & Communication",
    heading: ["Tell the story.", "Show what matters."],
    body: "My media work takes two forms: creative projects for individuals and organizations through MAO Media, and stories, articles, and audio shared through Inspire Network.",
    invite: "Whether you are here to commission a project or explore something to read or listen to, start below.",
    photo: shot("media-hero", 5184, 3456, "A woman in a bright red top against a deep crimson backdrop, hands resting together, smiling gently."),
  },

  mao: {
    heading: "MAO Media",
    statement: "Photography and creative communication for people and organizations.",
    body: "I bring together photography, documentary storytelling, voice, and creative concepts to help people express who they are and what their work means.",
    index: [
      { label: "Photography and visual storytelling", href: "#photography" },
      { label: "Creative concepts and content", href: "#concepts" },
      { label: "Voice and audio production", href: "#voice" },
    ],
  },

  photography: {
    heading: "Photography and visual storytelling",
    body: "Portraits are a particular interest: creating images that convey something of the person, beyond how they look. My experience also includes weddings and events, organizational and documentary photography, and visual content for brands and communication campaigns.",
    lead: shot("media-profile", 6240, 4160, "A bearded man in glasses and a black roll-neck, in profile against a white backdrop."),
    sofa: shot("media-sofa", 5184, 3456, "A woman in a grey jumper resting her head against a red leather sofa, looking away and smiling."),
    green: shot("mao-green", 1067, 1600, "A pregnant woman in a flowing green gown, in profile, against a painted botanical backdrop."),
    overhead: shot("media-overhead", 3456, 5184, "A couple photographed from above, he in pale blue, she in a blue dress and white headwrap, laughing up at the camera."),
    keys: shot("media-keys", 6240, 4160, "A man in glasses seated at a keyboard, photographed from above on a wooden floor."),
    crown: shot("media-crown", 1350, 750, "A woman wearing a crown of flowers, touching her ear, against dark green leaves."),
    braids: shot("media-braids", 774, 430, "A woman with long braids falling across one side of her face, smiling, against a dark backdrop."),
    drum: shot("media-drum", 700, 933, "Black-and-white photograph of a boy carrying a drum through a street gathering."),
    bride: shot("mao-bride", 700, 1050, "Black-and-white photograph of a bride in her gown by a window, a small page boy in a tuxedo at her side."),
  },

  concepts: {
    heading: "Creative concepts and content",
    body: "I have developed ideas and materials for campaigns and organizational storytelling, working independently and alongside advertising agencies. That experience includes design, print materials, billboards, and content shaped around an audience and message.",
    brochure: [
      shot("media-lw1", 3300, 1650, "A Leatherworld brochure spread: an orange leather armchair beside a logo and a grid of furniture photographs."),
      shot("media-lw3", 3300, 1650, "A Leatherworld brochure spread: red dining chairs beside a page headed Who We Are."),
      shot("media-lw4", 3300, 1650, "A Leatherworld brochure spread: a close view of a tufted black leather sofa beside a page headed What We Do."),
    ],
    stationery: [
      shot("media-lh1", 2480, 3508, "A Leatherworld letterhead back in purple, with a yellow armchair."),
      shot("media-lh2", 2480, 3508, "A Leatherworld letterhead back in red, with an orange bowl."),
      shot("media-lh3", 2480, 3508, "A Leatherworld letterhead back in grey, with a black leather sofa."),
    ],
    caption: "Leatherworld. Brochure and stationery.",
  },

  voice: {
    heading: "Voice and audio production",
    body: "My experience includes voiceovers, dramatized storytelling, radio programs, audiobook and devotional audio, and contributions to advertising jingles.",
    statement: "I enjoy using voice and sound to give a message warmth, character, and presence.",
    clips: [] as AudioClip[],
  },

  selected: {
    heading: "Selected creative work",
    projects: [
      {
        id: "coke",
        name: "Coca-Cola",
        kind: "Product and campaign photography",
        year: null as string | null,
        role: null as string | null,
        relationship: "Commissioned work",
        shots: [
          shot("media-coke-trio", 5184, 3456, "Three Coca-Cola bottles labelled John, Zainab and Samuel, with lights blurred behind them at night."),
          shot("media-coke-bag", 5184, 3456, "A Coca-Cola bottle labelled Sekinat in front of a red handbag, outdoors."),
          shot("media-coke-park", 5184, 3456, "A woman sitting cross-legged on grass, holding a Coca-Cola and a phone with earphones."),
          shot("media-coke-flat", 5184, 3456, "A Coca-Cola bottle labelled Azizat laid on dark wood among jewellery and a tablet."),
          shot("media-coke-ball", 5184, 3456, "A football balanced under an arm with a Coca-Cola can labelled Winner, against a red backdrop."),
        ],
      },
      {
        id: "orijin",
        name: "Orijin",
        kind: "Product photography",
        year: null as string | null,
        role: null as string | null,
        relationship: "Commissioned work",
        shots: [
          shot("media-or-shirt", 3888, 2592, "An Orijin can laid on a green patterned shirt with coral beads, a watch and a wallet."),
          shot("media-or-hand", 3888, 2592, "A hand with beaded bracelets holding up a can of Orijin Zero against black."),
          shot("media-or-blue", 3888, 2592, "An Orijin can in the foreground, with blue lights blurred behind it."),
        ],
      },
      {
        id: "weddings",
        name: "Weddings",
        kind: "Wedding photography",
        year: null as string | null,
        role: null as string | null,
        relationship: null as string | null,
        shots: [
          shot("media-wed-veil", 3888, 1970, "A bride and groom touching foreheads outdoors, the bride in a lace veil."),
          shot("media-wed-blue", 2352, 2509, "A couple in royal blue traditional attire and headwear, the groom kissing the bride's cheek."),
          shot("media-wed-garden", 2592, 3110, "A groom embracing a bride in a white lace gown in a garden."),
        ],
      },
    ],
  },

  discuss: {
    heading: "Discuss a creative project",
    body: "Tell me what you want to create, who it is for, and when you need it. We can discuss the scope and whether MAO Media is the right fit.",
    cta: "Discuss a Creative Project",
  },

  /**
   * Approved copy, verbatim. Articles and audio stay hidden until selections are
   * confirmed: authorship, title, date and destination for articles; which
   * recordings belong to Inspire Network for audio. One to three of each. Keep
   * commissioned client work in the MAO Media portfolio.
   */
  inspire: {
    heading: "Inspire Network",
    tagline: "Stories and conversations that encourage purposeful living",
    intro: [
      "I created Inspire Network to encourage a generation toward positive living through storytelling and audio content.",
      "It brings together my interest in personal stories, reflection, and the experiences and choices that shape our lives. Its roots include radio programming and dramatized storytelling.",
    ],
    articles: {
      heading: "Articles and reflections",
      body: "Written stories and reflections offering encouragement and a fresh perspective on everyday life.",
      items: [] as { title: string; author: string; date: string; href: string; archive: boolean }[],
    },
    audio: {
      heading: "From the audio archive",
      body: "Explore earlier audio work, including storytelling and reflections created to encourage and engage listeners.",
      items: [] as { title: string; src: string }[],
    },
    // Future intent. No Subscribe or Listen to the Podcast until a live show or feed exists.
    next: {
      heading: "The next chapter",
      body: "My vision for Inspire Network includes a podcast with interviews, conversations, and short reflections. I would like to revisit some written ideas in audio and make room for people to share their own experiences and perspectives.",
    },
    collaborate: {
      heading: "Have a story or collaboration in mind",
      body: "If you would like to contribute to a conversation or discuss an Inspire Network collaboration, I would be glad to hear from you.",
      cta: "Discuss an Inspire Network Collaboration",
    },
  },
};
