# Skills: research and application

**Stage 1 of 2 (research and direction).** This file records which skills exist, which I actually read, what was installed, and how each one changes the work. Where a skill was not used, or could not be installed, it says so.

---

## 1. Where skills live in this environment

I searched for skill locations instead of assuming one folder.

| Location | What is there | Notes |
| :-- | :-- | :-- |
| `.claude/skills/` (project) | 35 skills | Includes **frontend-design**. Does not include ui-ux-pro-max. |
| `.agent/skills/` (project, Antigravity) | 35 skills | Includes **ui-ux-pro-max** (with its Python search engine and CSV data). Does not include frontend-design. Otherwise identical to `.claude/skills/` (checked with `diff -rq`). |
| `~/.claude/skills/synced/` (user) | built-in-browser, chrome-browser, computer-use, deep-research, docs, google-workspace, import-memory, morning, pdf, skill-creator | General-purpose. None is relevant to web design. |
| `~/.agents/skills/find-skills` (user) | Skills-registry search (`npx skills find`) | Used to look for the missing skills (§3). |
| `~/.gemini/antigravity/` | Antigravity's own state | No skills directory. |
| `node_modules/next/dist/docs/` | Next.js 16.4.4 documentation, bundled | Not a skill, but `AGENTS.md` makes it mandatory reading before writing code. Treated as the Next.js authority. |

---

## 2. Requested skills: status

| # | Requested | Found as | Read? | Status |
| :-- | :-- | :-- | :-- | :-- |
| 1 | Frontend Design | `.claude/skills/frontend-design` | Fully | Selected: governs the creative bar |
| 2 | UI/UX Pro Max | `.agent/skills/ui-ux-pro-max` | Fully, and **ran** its search engine (§4.2) | Selected for UX rules only; its style output was rejected |
| 3 | Motion / Animation | `animation-designer`, `motion-framer` | Structure, plus the sections on reduced motion, layout and performance | Selected |
| 4 | GSAP | `gsap-scrolltrigger` (with `references/`) | Structure, plus React (`useGSAP`), pinning, scrub, `matchMedia`, cleanup, pitfalls | Selected: primary motion engine |
| 5 | Next.js / React | **Not installed.** Equivalent found: `vercel-labs/agent-skills@vercel-react-best-practices` | Read its full rule index from source | **Install blocked** (§3) |
| 6 | Responsive Web Design | **Not installed.** Candidates: `wshobson/agents@responsive-design` and others | Not read | Not pursued. Responsive guidance is already covered by `modern-web-design`, ui-ux-pro-max (breakpoints 375/768/1024/1440) and the a11y skill (reflow). A fourth source would duplicate them. |
| 7 | Web Accessibility | **Not installed.** Equivalent: `addyosmani/web-quality-skills@accessibility` (WCAG 2.2) | Read from source | **Install blocked** (§3) |
| 8 | Web Performance | **Not installed.** Equivalent: `addyosmani/web-quality-skills@performance` and `@core-web-vitals` | Read from source | **Install blocked** (§3) |

### Other skills inspected because they could change the work

| Skill | Verdict | Why |
| :-- | :-- | :-- |
| `modern-web-design` | **Selected** (principles only) | Performance budgets, scrollytelling, cursor UX and reduced-motion patterns. Its glassmorphism and "AI personalisation" sections are rejected. |
| `web3d-integration-patterns` | Read, not selected | Useful only if a direction needs WebGL. Direction C *could* use WebGL for the zoom; I concluded DOM transforms are enough (see NEW_CREATIVE_DIRECTION §6). |
| `locomotive-scroll`, `barba-js` | Rejected | Smooth-scroll hijacking and page transitions add weight and hurt accessibility. GSAP ScrollTrigger on native scroll covers the need. |
| `lightweight-3d-effects` (Vanta, Zdog, Tilt) | Rejected | Decorative depth effects are exactly the generic pattern the brief forbids. |
| `animated-component-libraries` (Magic UI, React Bits) | Rejected | Pre-made animated components produce the "template" look we are trying to escape. |
| `threejs-*`, `react-three-fiber`, `babylonjs`, `playcanvas`, `pixijs`, `aframe`, `spline`, `rive`, `lottie`, `animejs`, `react-spring-physics` | Skimmed descriptions only, not read | None is justified by any direction. Kept out to avoid conflicting tools. |

---

## 3. Installation: first blocked, now installed

I searched the registry with `npx skills find`. These were the strongest matches, from reputable sources, MIT licensed, with no overlap with what is installed:

| Package | Fills the gap for |
| :-- | :-- |
| `vercel-labs/agent-skills` → `vercel-react-best-practices` | Next.js / React (70 rules: bundle size, RSC serialisation, re-renders, hydration) |
| `addyosmani/web-quality-skills` → `accessibility` | WCAG 2.2 audit workflow |
| `addyosmani/web-quality-skills` → `performance`, `core-web-vitals` | Budgets, LCP/INP/CLS diagnosis |

I read each `SKILL.md` from GitHub first, then ran `npx skills add … --copy -y` into `.claude/skills` and `.agent/skills`. **The environment's permission classifier denied the command.** Nothing was installed and I did not try to get around the block.

**Update (2026-11-03): installed after your approval.** I ran `npx skills add … --copy -y` again.
- **Installed to:** `.claude/skills/` and `.agents/skills/` (the CLI's Antigravity target). I mirrored them to `.agent/skills/`, where this project's other Antigravity skills live.
- **Pinned by** `skills-lock.json`, which records the GitHub source and a content hash.
- **Contents checked:** Markdown only (rules and references), no executable scripts.
- **Status:** all four now load as available skills: `vercel-react-best-practices`, `accessibility`, `performance` and `core-web-vitals`.

---

## 4. How each skill influenced the work

### 4.1 frontend-design: the creative bar
- It requires **one bold, committed direction** with a single unforgettable idea. That is why each of the three directions is built on one idea, not a style mix.
- It bans generic fonts and convergent choices. The round-1 stack (Fraunces / Instrument Sans / IBM Plex Mono) is *dropped*, because it had become the site's "default". Each new direction has its own type system.
- "Match implementation complexity to the vision." This decided which motion each direction gets: maximal for C, restrained for B.

### 4.2 ui-ux-pro-max: UX rules yes, style no
I ran `search.py "personal brand portfolio photographer editorial listening real estate" --design-system`. It returned *Exaggerated Minimalism*, Cinzel / Josefin Sans and a **blue `#2563EB` CTA**. The typeface was matched on the keyword "real estate". **I rejected all of that output:** it is a generic answer driven by keyword matching, and Cinzel would make Segun look like a property brochure.

What I keep, because it is correct and checkable:
- Responsive targets: **375 / 768 / 1024 / 1440**.
- Text contrast ≥ 4.5:1 and visible focus states.
- From `--domain ux`: honour `prefers-reduced-motion`; **never force scroll effects**; animate **one or two key elements per view**; no infinite decorative loops; ease-out for entrances.

These rules are why every direction defines a static, reduced-motion version of its key moment.

### 4.3 gsap-scrolltrigger: the motion engine
- Use `useGSAP` with a scoped container for React-safe cleanup. Round 1 already used `@gsap/react`, and that stays.
- Use `gsap.matchMedia()` (the skill's "conditional animations") to give desktop, mobile and reduced motion **separate timelines**, not one timeline with patches.
- Pitfalls to design around: nesting ScrollTriggers inside timelines; several tweens fighting over one element; animating layout properties instead of transforms.
- **Checked in `node_modules`:** GSAP 3.15 ships **SplitText, Flip and Observer** in the free package. SplitText makes the typographic transitions feasible without a paid plugin.

### 4.4 motion-framer and animation-designer: the interaction layer
- Motion for React handles **component-state** motion: menu, hover and focus states, `AnimatePresence` exits. GSAP handles **scroll-linked choreography**. One owner per element, so they never compete.
- Use `useReducedMotion` in every Motion component. Animate transform and opacity only. Use `layoutId` sparingly.

### 4.5 modern-web-design
- Performance first: LCP < 2.5 s, INP < 200 ms, CLS < 0.1.
- Custom cursors: only with rAF, only on fine pointers, never as the only affordance.

### 4.6 vercel-react-best-practices (read, not installed)
Applied as rules for Stage 2:
- **Server components by default.** Only the animated islands are client components.
- `bundle-dynamic-imports`: load the scroll-sequence island with `next/dynamic` after the hero is painted.
- `server-serialization`: pass minimal props to client islands, not whole data arrays.
- `rerender-use-ref-transient-values`: scroll and pointer values live in refs and GSAP, never in React state.
- `rendering-hydration-no-flicker`: the first frame of the hero is server-rendered HTML that is **already the finished composition**, so motion only enhances it.

### 4.7 accessibility, performance, core-web-vitals (read, not installed)
- WCAG 2.2 AA: 4.5:1 text and 3:1 UI contrast; focus visible and **not obscured** (2.4.11, which matters for sticky headers); pointer-target size; reflow at 320 px.
- Animated scroll scenes **must not hide content from assistive technology**. The DOM order carries the full narrative even when visuals are pinned.
- Budgets: above-the-fold images < 500 KB, fonts < 100 KB, JS < 300 KB compressed.
- The hero portrait is the LCP element. It needs a discoverable `<img>` with `fetchpriority="high"` and must not be revealed by JS. Round 1 faded the hero in with JS, which delays LCP.
- **Measure, don't guess.** Stage 2 will record Lighthouse and trace numbers before and after.

### 4.8 Next.js 16 bundled docs (mandatory per AGENTS.md)
Read before writing Stage 2 code: fonts (`next/font/local`), images, and the `Image` API reference. Two version-specific facts changed the code:
- **`priority` is deprecated in Next 16.** Use `fetchPriority="high"` / `loading="eager"`, which is what the LCP images use.
- **`images.qualities` is required.** It was already set to `[75, 85]`.

---

## 5. Stage 2: how the skills were actually applied

| Skill | Concrete effect in the build |
| :-- | :-- |
| frontend-design | One committed idea (distance) governs every section. No generic cards. Distinctive faces (Zodiak, Switzer) replace round 2's stack. |
| ui-ux-pro-max | Reviewed at 375 / 768 / 1024 / 1440. One or two animated elements per view. Reduced motion respected. Visible focus. |
| gsap-scrolltrigger | Scrubbed camera on native scroll; `invalidateOnRefresh`; separate trigger for header tone; per-component `gsap.context` cleanup; SplitText with `mask` and `autoSplit`. |
| motion-framer | Used first for the mobile menu, then **removed after measurement** (42 KB, 87% unused). A CSS transition replaced it. The skill's own reduced-motion and transform-only rules still shaped the CSS version. |
| vercel-react-best-practices | Server components by default. Client islands only for motion. GSAP dynamically imported after idle. Derived state instead of setState-in-effect (the header menu). Passive scroll listeners with rAF. |
| accessibility | Reading-order headings in the pinned scene. Focus moves the camera so nothing focusable is invisible. `aria-current` ruler. Contrast computed for every token pair, which caught a 2.51:1 failure (fixed). Lighthouse a11y 100. |
| performance / core-web-vitals | Measured before and after (mobile 54 → 82). LCP subparts read from the trace instead of guessed. An experiment that didn't help (font preload) was reverted. |

Results and evidence: [IMPLEMENTATION_REPORT.md](./IMPLEMENTATION_REPORT.md).
