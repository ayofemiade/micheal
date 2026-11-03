# Segun Michael — Design System (`The Human Editorial`)

## 1. Design Philosophy & Direction

The visual system for **Segun Michael** translates the core brand architecture—_One person. Three expressions of purpose._—into an editorial, tactile, and deeply human digital experience.

### Core Tenets

1. **Editorial Authority over Template Decoration:** Layouts draw from print monographs, architectural journals, and literary magazines rather than SaaS landing pages or motivational speaker templates.
2. **Warmth & Restraint:** Warm Ivory (`#F5F1E9`) and Sand (`#E6DED1`) provide a sunlit, paper-like foundation; Charcoal (`#292923`) anchors reading contrast and frames high-intimacy moments (such as the Listening Hub sanctuary).
3. **Typography as Architecture:** Contrast between **Instrument Serif** (display & editorial voice, using its italic for emotional inflection) and **Manrope** (structural, geometric, humanist sans-serif for body copy, wayfinding, and metadata) drives hierarchy without visual clutter.
4. **Authentic Photography:** Genuine portraits of Segun Michael and authentic portfolio assets from the workspace are treated with respect—never distorted, never replaced by stock people, and always given intentional framing and breathing room.

---

## 2. Colour System & Contrast Governance

All colour tokens are defined in `src/app/globals.css` via Tailwind CSS v4's `@theme` directive. Because the base Olive (`#8B806B`) and Terracotta (`#A66F4D`) accent values are mid-tones (3.45:1 and 3.73:1 on Warm Ivory), contrast-verified darker tokens are used whenever those hues carry small or body-sized text on light backgrounds, and a luminous terracotta token is used on dark Charcoal surfaces.

| Token                      | Hex       | Role                                               | Verified WCAG Contrast                               |
| :------------------------- | :-------- | :------------------------------------------------- | :--------------------------------------------------- |
| `--color-ivory`            | `#F5F1E9` | Primary page canvas                                | —                                                    |
| `--color-sand`             | `#E6DED1` | Secondary warm surface & card ground               | —                                                    |
| `--color-charcoal`         | `#292923` | Primary ink & dark sanctuary surface               | **12.98:1** on Ivory / **10.96:1** on Sand (AAA)     |
| `--color-charcoal-deep`    | `#1E1E1A` | Deepest editorial ground (Closing & Footer)        | **14.84:1** on Ivory (AAA)                           |
| `--color-olive`            | `#8B806B` | Muted architectural rules, borders, accents        | Graphical / large display only                       |
| `--color-olive-deep`       | `#6B6150` | Secondary metadata & muted text on light grounds   | **5.40:1** on Ivory / **4.56:1** on Sand (AA)        |
| `--color-terracotta`       | `#A66F4D` | Warm clay display italic & graphical accent        | Large display text (`>=24px`)                        |
| `--color-terracotta-deep`  | `#84543A` | Interactive links, eyebrows & focus rings on light | **5.12:1** on Ivory / **4.52:1** on Sand (AA)        |
| `--color-terracotta-light` | `#D9A27E` | Warm accent & interactive highlight on Charcoal    | **6.56:1** on Charcoal / **7.50:1** on Deep (AA/AAA) |
| `--color-terracotta-wash`  | `#DCAE8F` | Warm tonal surface accent (Listening Hub)          | —                                                    |
| `--color-olive-wash`       | `#CDC4AE` | Grounded tonal surface accent (Real Estate)        | —                                                    |

### Surface Rhythm Across the Homepage

1. **Header & Hero:** Warm Ivory (`#F5F1E9`) with warm architectural framing and subtle sand/olive hairlines.
2. **Introduction (About Segun):** Sand (`#E6DED1`) — tactile warmth that separates the cover from the biography.
3. **Three Expressions of Purpose:** Warm Ivory (`#F5F1E9`) canvas with distinct editorial identity treatments per expression.
4. **Personal Journey:** Sand (`#E6DED1`) — calm, reflective narrative progression.
5. **Selected Work:** Warm Ivory (`#F5F1E9`) — gallery-like neutrality so photography commands attention.
6. **Listening Hub Feature:** Charcoal (`#292923`) — an intimate, quiet evening sanctuary that signals emotional safety and primary conversion focus.
7. **Closing Statement & Footer:** Deep Charcoal (`#1E1E1A`) — unified, grounded conclusion.

---

## 3. Typography System

Loaded via `next/font/google` in `src/app/layout.tsx` with `display: "swap"` and bound to CSS variables `--font-instrument` and `--font-manrope`.

### Font Families

- **Display & Editorial Headings (`--font-display`):** `Instrument Serif` (`400` normal and `400` italic).
- **Body, UI & Wayfinding (`--font-sans`):** `Manrope` (variable `400`–`700`).

### Fluid Type Scale & Utilities

| Utility     | Font Family      | Weight | Fluid Size (`clamp`)                          | Line Height | Letter Spacing | Usage                                |
| :---------- | :--------------- | :----- | :-------------------------------------------- | :---------- | :------------- | :----------------------------------- |
| `t-display` | Instrument Serif | `400`  | `clamp(3.25rem, 5.6vw + 1rem, 6.75rem)`       | `0.94`      | `-0.025em`     | Hero primary headline                |
| `t-h1`      | Instrument Serif | `400`  | `clamp(2.5rem, 3.8vw + 1rem, 4.75rem)`        | `0.98`      | `-0.022em`     | Major section statements             |
| `t-h2`      | Instrument Serif | `400`  | `clamp(2rem, 2.8vw + 0.9rem, 3.5rem)`         | `1.04`      | `-0.018em`     | Section & feature headings           |
| `t-h3`      | Instrument Serif | `400`  | `clamp(1.625rem, 1.5vw + 1rem, 2.375rem)`     | `1.1`       | `-0.014em`     | Pillar titles & narrative chapters   |
| `t-lead`    | Manrope          | `400`  | `clamp(1.0625rem, 0.35vw + 0.98rem, 1.25rem)` | `1.65`      | `-0.005em`     | Lead paragraphs & introductions      |
| `t-body`    | Manrope          | `400`  | `1rem` (`16px`)                               | `1.7`       | `0em`          | Standard narrative copy              |
| `t-small`   | Manrope          | `400`  | `0.875rem` (`14px`)                           | `1.6`       | `0.005em`      | Captions, disclaimers, metadata      |
| `t-label`   | Manrope          | `600`  | `0.75rem` (`12px`)                            | `1.35`      | `0.12em`       | Section indices & wayfinding kickers |

### Measure (Line Length) Rules

- **Display headings:** `10ch`–`18ch`
- **Lead & body copy:** `38ch`–`62ch` (never full-bleed across 12 columns)
- **Captions & metadata:** `28ch`–`48ch`

---

## 4. Layout, Grid & Spacing System

- **Max Content Width (`--content-max`):** `1360px` (`85rem`), centred with fluid horizontal gutters `--gutter: clamp(1.25rem, 4vw, 3.25rem)`.
- **Grid Architecture:** 12-column CSS Grid on desktop (`lg:grid-cols-12`) with `gap-x-8` to `gap-x-10`, collapsing to a 6-column or 2-column grid on tablet (`md`) and single-column narrative flow on mobile.
- **Vertical Section Rhythm (`section-y`):** `clamp(5rem, 4rem + 5.5vw, 9rem)` vertical padding, paired with subtle `1px` architectural hairlines (`border-charcoal/10` on light, `border-ivory/12` on dark) where structural separation adds clarity.
- **Header Height (`--header-h`):** `4.75rem` (`76px`).

---

## 5. Image Ratios & Art Direction Rules

1. **Hero Portrait (`potrait/IMG_2543c.jpg` → `/images/portraits/segun-hero.jpg`):**
   - Aspect ratio `4:5` / `5:6` vertical editorial frame on desktop and mobile.
   - Treated with a warm studio tone curve so the studio background harmonizes with the Warm Ivory & Sand editorial frame—never stretched or cropped through the face or hands.
2. **Portrait & Documentary Photography (`potrait/IMG_1982c.jpg`, `IMG_2518.jpg`, `IMG_2486.jpg`):**
   - Used intentionally: `IMG_1982c.jpg` (Segun by the window with camera) anchors the personal introduction / creative lens; `IMG_2518.jpg` (Segun seated, leaning in to listen) anchors the Listening Hub sanctuary; `IMG_2486.jpg` (Segun in tailored navy blazer) represents grounded project execution.
   - No portrait is duplicated across adjacent sections.
3. **Selected Work Portfolio (`website gallery/` → `/images/media/*` & `/images/real-estate/*`):**
   - Uses `4:5` (vertical portrait) and `3:2` (horizontal editorial) aspect ratios with `overflow-hidden` frames and subtle `scale-[1.03]` hover transitions (`1100ms`, `--ease-editorial`).

---

## 6. Interactive Components & States

### Buttons (`src/components/ui/Button.tsx`)

- **Primary (`solid`):** Charcoal pill (`bg-charcoal text-ivory`), transitioning smoothly to Deep Terracotta (`hover:bg-terracotta-deep`) with a subtle `4px` trailing arrow shift.
- **Warm Accent (`terracotta`):** Used on dark surfaces (`bg-terracotta-light text-charcoal hover:bg-ivory`), echoing the warm CTA prominence in the design reference.
- **Outline (`outlineLight`):** `border-ivory/35 text-ivory hover:bg-ivory hover:text-charcoal`.
- **Editorial Link (`link` / `linkLight`):** Bottom hairline rule with animated arrow shift (`min-h-11` for touch target compliance).

### Focus & Accessibility States

- `:focus-visible` uses a `2px solid` outline (`--color-terracotta-deep` on light, `--color-terracotta-light` on dark) with a `3px` offset.
- All interactive controls meet or exceed `44×44px` minimum touch target guidelines.

---

## 7. Motion Principles

1. **Single Responsibility per Library:**
   - **GSAP (`useGSAP`):** Choreographs the hero entrance timeline (staggered line mask reveals, portrait settle, and supporting copy fade).
   - **Motion (`motion/react`):** Handles scroll-triggered `whileInView` section reveals (`Reveal.tsx`), interactive filter/tab transitions, and `AnimatePresence` mobile navigation drawer lifecycle.
   - **CSS Transitions:** Handles hover states, border reveals, and focus rings (`--ease-editorial: cubic-bezier(0.22, 1, 0.36, 1)`).
2. **Reduced Motion Guarantee:**
   - Both CSS (`@media (prefers-reduced-motion: reduce)`) and JS (`gsap.matchMedia` and `useReducedMotion`) bypass motion when the user prefers reduced motion, rendering all content immediately at full opacity.
