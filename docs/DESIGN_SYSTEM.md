# Design system: "Near to Far"

The system behind the homepage. The concept and reasoning are in [NEW_CREATIVE_DIRECTION.md](./NEW_CREATIVE_DIRECTION.md); what was built and measured is in [IMPLEMENTATION_REPORT.md](./IMPLEMENTATION_REPORT.md). Tokens live in [`src/app/globals.css`](../src/app/globals.css).

**The idea in one line:** *People. Stories. Places. Possibilities.* are four distances from the same person: 1:1, 1:10, 1:100 and 1:∞. Every section belongs to one of those distances.

---

## Colour

| Token | Hex | Role | Contrast (measured) |
| :-- | :-- | :-- | :-- |
| `studio` | `#FAFAFA` | The white of his studio backdrop. 1:1 sections (hero start, Listening Hub, Closing). | ink 17.35:1 |
| `paper` | `#F5F3EE` | Default ground: 1:10 and 1:100 sections, footer. | ink 16.33:1 |
| `ink` | `#14161A` | Text, primary CTA ground. | |
| `ink-2` | `#4A4E57` | Secondary text. | 7.52:1 on paper, 7.99:1 on studio |
| `cyan` | `#1B3463` | Prussian blue: cyanotype and blueprint. Drawings, footer, the 1:∞ exposure. | 11.02:1 both ways with paper |
| `mao` | `#A70405` | **MAO red: the booking action only.** | 7.11:1 on paper |

**Rules**
- **MAO red never sits on cyan** (1.55:1). On cyan, the CTA inverts to paper with a paper or cyan mark (`cta-on-cyan`).
- Red marks *booking*. Other actions use `cta-plain` (same shape, no mark) or `link-quiet`.
- Small text set via opacity must still pass 4.5:1. The ruler's inactive state uses 65% (5.39:1 on paper, 5.61:1 on cyan). 40% failed at 2.51:1 and was corrected.

## Typography

| Role | Face | Setting |
| :-- | :-- | :-- |
| The four words | **Zodiak** 300 | `t-word`: clamp(60px, 10.6vw, 168px), tracking −0.04em, leading 0.86 |
| Section statements | **Zodiak** 300 | `t-statement`: clamp(40px, 5.6vw, 92px), tracking −0.03em, balanced wrap |
| Body | **Switzer** 400 | 17px / 1.55; lead paragraphs 18px |
| Scale labels | **Switzer** 500 | `t-scale`: 12px, uppercase, +0.06em, tabular figures |
| Scale ratio box | Switzer, tabular | `ratio`: 1:1 · 1:10 · 1:100 · 1:∞ in a hairline box |

- **No monospace anywhere.** No italic-last-word device. No invented metadata.
- Fonts: Indian Type Foundry via Fontshare, **ITF Free Font License v2.0**. Commercial use and self-hosting are allowed. The files must ship **unmodified** (no subsetting or conversion) and must **not be redistributed**. Keep the repository private, or have whoever deploys it download their own copy from fontshare.com.

## Space and grid

- The side gutter is `--gutter`: clamp(20px, 3.4vw, 44px), applied with `shell`.
- 12 columns from `lg`. Sections are composed by distance, not by a shared template:
  - **1:1** sections: one image filling 7 columns, edge to edge, plus 5 columns of text.
  - **1:10**: a statement beside a bleeding photograph, then a horizontally scrolling print wall.
  - **1:100**: statement and text in one row; then the drawing (9 columns) and portrait (3 columns) sharing one floor line.

## Imagery

- Only Segun's real photographs and genuine MAO Media frames. No stock, no generated people, no composites.
- The studio backdrop (≈ 245–252 RGB) meets `studio` (#FAFAFA) without a visible box. On desktop, the Listening Hub photo has a feathered left edge to hide the remaining seam.
- The room is an **illustrative elevation drawing**: no dimensions, no figures, always labelled *"Line drawing for illustration. Not a real project."*
- Derivatives come from `node scripts/optimize-images.mjs`. Originals are never served.

## Motion

| Motion | Where | Engine | Notes |
| :-- | :-- | :-- | :-- |
| The camera (pull-back) | Hero | GSAP ScrollTrigger, scrub 0.7 | Log-scale zoom, transform only, native scroll |
| The exposure | Hero 1:100 → 1:∞ | clip-path | Cyan rises up the frame; no muddy colour blend |
| Line reveal | Listening Hub heading only | GSAP SplitText, once | "Reading as an event", used once |
| Line draw | Real Estate room | GSAP, `stroke-dashoffset` with `pathLength=1`, once | |
| Push-in | Closing photograph | GSAP scrub | The camera's return to 1:1 |
| Print lift | Media wall | CSS transform on hover | |
| Menu | Mobile | CSS clip-path | |

- **Easing:** `--ease-camera` = cubic-bezier(0.22, 1, 0.36, 1).
- **Reduced motion:** the camera *cuts* between the four distances. There is no line reveal, line draw or push-in, and CSS transitions are reduced to ~0.
- **GSAP loads after the browser is idle** (`src/lib/gsap.ts`), so animation never delays first render.

## Components

| File | Purpose |
| :-- | :-- |
| `components/home/PullBack.tsx` (server) + `PullBackMotion.tsx` (client) | The hero scene and its camera |
| `components/home/scene.ts` | Camera maths. **Must match** the `.pullback-*` CSS and the face crop in `scripts/optimize-images.mjs` |
| `components/home/RoomDrawing.tsx` | The illustrative room and ground grid |
| `components/home/{Listening,Media,RealEstate,Closing}Section.tsx` | Sections 02–05 |
| `components/motion/{LineReveal,DrawOn,PushIn}.tsx` | The three motion islands |
| `components/layout/{Header,Footer}.tsx` | Fixed header; title-block footer |
| `data/site.ts`, `data/home.ts` | All copy. `// pending` marks lines awaiting Segun's approval |
