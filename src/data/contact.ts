/**
 * Contact: "1:1". Approved copy: do not change its meaning. Only `errors` and
 * `assessmentNote` were written for the build, and need Segun's approval.
 *
 * Never promise a response deadline, a session or a booking here. Listening Hub
 * booking and general inquiries are separate: the form never books anything.
 */

export const areas = [
  { value: "mao-media", label: "MAO Media creative project" },
  { value: "mao-contractors", label: "MAO Contractors property project" },
  { value: "inspire-network", label: "Inspire Network collaboration" },
  { value: "listening-hub", label: "Listening Hub question" },
  { value: "other", label: "Other" },
] as const;

export type AreaValue = (typeof areas)[number]["value"];

/** A reason for writing that sits inside an area, not a sixth option. */
export const ASSESSMENT = "renovation-assessment";

export function areaLabel(value: string) {
  return areas.find((a) => a.value === value)?.label ?? null;
}

type Param = string | string[] | undefined;

/**
 * Reads /contact?enquiry=…&topic=… into the form's starting point. Anything
 * unknown is ignored, so a mistyped or old link is simply a plain visit.
 */
export function contextFromQuery({ enquiry, topic }: { enquiry?: Param; topic?: Param }) {
  const area = typeof enquiry === "string" && areaLabel(enquiry) ? (enquiry as AreaValue) : null;
  return { area, assessment: area === "mao-contractors" && topic === ASSESSMENT };
}

export const contact = {
  title: "Contact Segun Michael",
  description:
    "Start a conversation with Segun Michael about a creative project, a property project or a collaboration, or find the way to book a Listening Session.",
  intro: {
    heading: "Let’s start with a conversation",
    body: "For a creative project, a property project, or a collaboration, tell me a little about what you have in mind and the support you are looking for. For renovation inquiries, let me know whether you need an initial assessment or help coordinating an active project.",
    photo: {
      src: "/images/home/ct-hand.jpg",
      width: 2400,
      height: 3360,
      alt: "Segun Michael smiling, in a cream shirt, reaching one open hand out towards you.",
    },
  },
  hub: {
    heading: "Looking for Listening Hub",
    body: "You can choose a session time directly through the booking calendar. A few brief questions will help me prepare for our conversation.",
  },
  inquiry: {
    heading: "Send an inquiry",
    body: "Choose the area that best fits your inquiry. A brief message is enough to begin.",
    name: "Your name",
    email: "Your email",
    area: "Area of interest",
    message: "What would you like to discuss?",
    prompt:
      "For project inquiries, include your location, current stage, and preferred timing if known. For Listening Hub questions, please avoid sharing sensitive personal details here.",
    submit: "Send Inquiry",
    sending: "Sending",
    success: "Thank you for getting in touch. Your inquiry has been received, and I’ll respond using the email address you provided.",
    assessmentNote: "About a renovation assessment", // pending
    errors: {
      // pending
      name: "Please enter your name.",
      email: "Please enter your email address.",
      emailFormat: "Please enter a valid email address.",
      message: "Please tell me what you would like to discuss.",
      long: "This is a little too long. Please shorten it.",
      failed: "Your inquiry could not be sent. Nothing you wrote has been lost, so please try again.",
    },
  },
};
