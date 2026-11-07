/**
 * Real Estate page: "The Drawing Set". Approved copy, 2026-11-07: do not change
 * its meaning. See docs/REAL_ESTATE_CONTENT_GAPS.md before publishing additions.
 *
 * Never add project names, addresses, dates, budgets, results, roles or
 * credentials that have not been supplied. Keep MAO Contractors client work,
 * V and M Property work and proposed planning work distinct. No brokerage,
 * property management, investment advice or financial-return promises.
 */

const img = (name: string) => `/images/home/${name}.jpg`;

export interface Picture {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const pic = (name: string, width: number, height: number, alt: string): Picture => ({ src: img(name), width, height, alt });

/** Contact reads these, selects MAO Contractors and identifies assessment requests. */
export const propertyEnquiryHref = "/contact?enquiry=mao-contractors#inquiry";
export const assessmentEnquiryHref = "/contact?enquiry=mao-contractors&topic=renovation-assessment#inquiry";

export interface Fact {
  label: string;
  value: string;
}

export const realEstatePage = {
  title: "Real Estate",
  description:
    "Project management and consulting through MAO Contractors: renovation assessments, renovation and project coordination for residential property investors.",

  intro: {
    title: "Real Estate",
    heading: "Project management and consulting through MAO Contractors",
    body: [
      "Renovating an investment property means managing scope, costs, contractors, and timing alongside your other responsibilities. Through MAO Contractors, I help residential property investors plan renovations and coordinate the work, drawing on experience in estimating, restoration, and renovation and resale projects.",
      "Whether you are evaluating a property or already have a renovation underway, we can identify the support you need and agree on a clear scope.",
    ],
    cta: "Discuss a Property Project",
    photo: pic("re-hero", 2400, 3000, "The renovated kitchen in daylight: a dark brown peninsula, pale wood-effect floor and wide windows onto trees."),
  },

  assessment: {
    heading: "Understanding the work ahead",
    lead: "Start with a renovation assessment to get a clearer view of the work ahead.",
    // One approved sentence, set one item to a line. Read in order, it is unchanged.
    opening: "An agreed assessment can include",
    items: ["a property walkthrough,", "a preliminary renovation budget,", "key project risks and unknowns,", "and an estimated timeline."],
    close: "We agree on the scope, fee, and turnaround before work begins.",
    cta: "Ask About a Renovation Assessment",
  },

  coordination: {
    heading: "Renovation and project coordination",
    lead: "For investors who need ongoing support, I can help coordinate contractors, track budgets and schedules, and follow up on decisions.",
    body: "The agreed scope can include regular progress updates and a record of changes to the work, so you can see what is happening and where your input is needed.",
    photo: pic("re-portrait", 2400, 3360, "Black-and-white portrait of Segun Michael in a blazer, arms folded, looking straight at you."),
  },

  planning: {
    heading: "Development planning",
    label: "Planning work on proposed projects", // pending
    body: "I have also supported planning and coordination for proposed multifamily projects, including communication with engineers and city officials. This has strengthened my attention to requirements, project information, and the decisions needed before work can advance.",
  },

  projects: {
    heading: "Selected property projects",
    // No company is shown on the first and third until it is confirmed.
    split: {
      title: "Split-level house",
      facts: [{ label: "Project type", value: "Residential renovation" }] as Fact[],
      before: pic("re-split-before", 2400, 1800, "The split-level house before renovation: weathered red siding and worn shutters behind overgrown brush and bare trees."),
      after: pic("re-house", 2400, 1500, "The same house after renovation: grey siding above red brick, white shutters and a clear lawn under snow."),
      insideBefore: pic("re-inside-before", 2400, 3200, "Inside the house before renovation: the floor gone down to bare earth and debris, with wood-panelled walls and a stained ceiling."),
      insideAfter: pic("re-inside-after", 1536, 1112, "The interior after renovation: dark cabinets along one wall, a black range and refrigerator, wood-look flooring and a slim ceiling fan."),
    },
    kitchen: {
      title: "Kitchen renovation",
      facts: [
        { label: "Project type", value: "Residential renovation" },
        { label: "Company", value: "MAO Contractors" },
      ] as Fact[],
      before: pic("re-before", 952, 635, "The kitchen before renovation: cabinet doors removed, bare shelving, a floral wallpaper border and a worn patterned vinyl floor."),
      after: pic("re-after", 2400, 1600, "The same kitchen after renovation: dark brown cabinets, a marble-effect splashback, a pale wood-effect floor and wide windows onto trees."),
    },
    single: {
      title: "Single-story home",
      facts: [{ label: "Project type", value: "Residential renovation" }] as Fact[],
      before: pic("re-single-before", 2400, 1800, "The single-story home before renovation: streaked white siding, faded shutters and long grass against the skirting."),
      after: pic("re-single-after", 1536, 1152, "The same home after renovation: clean siding, bright pink shutters, a brick foundation, wooden steps and a mown lawn."),
    },
  },

  partnership: {
    heading: "Property partnerships",
    body: "MAO Contractors partnered with Haven Hill to form V and M Property, extending our real estate work through a shared venture.",
    from: ["MAO Contractors", "Haven Hill"],
    formed: "V and M Property",
    /** The verified website. Stays plain text until supplied. */
    url: null as string | null,
  },

  discuss: {
    heading: "Discuss your project",
    body: "Tell me where the property is, whether you are evaluating it or already renovating, and what you need help with. If you have a target start date or a specific concern about scope, costs, or coordination, include that too.",
    cta: "Discuss a Property Project",
  },
};
