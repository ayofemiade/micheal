export interface NavItem {
  label: string;
  href: string;
}

export interface PhotoAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Pillar {
  id: "listening-hub" | "media" | "real-estate";
  index: string;
  verb: string;
  domain: string;
  entity: string;
  title: string;
  line: string;
  description: string;
  highlights: readonly string[];
  href: string;
  cta: string;
  image: PhotoAsset & { objectPosition: string };
}

export interface WorkItem extends PhotoAsset {
  id: string;
  title: string;
  category: "mao-media" | "partnership" | "planning";
  categoryLabel: string;
  provenance: string;
  summary: string;
}

export interface JourneyChapter {
  index: string;
  phase: string;
  expression: string;
  title: string;
  narrative: string;
  ecosystemNote: string;
}
