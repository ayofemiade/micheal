# Creative Audit — the current homepage

**Method.** I served the production build and looked at it in a real browser (Edge, 1440×900 and 390×844), scrolling section by section, then compared what I saw with the brief and with the photographs actually available. This is a judgement of the rendered result, not the code.

**Verdict.** The homepage is competent and generic. It is tidy, accessible and honest in structure, but it has no point of view. Strip out the photographs and the name and it could belong to a coach, a consultant or an architect. That is the failure.

---

## 1. Why it feels generic

### 1.1 There is no visual concept

"One person. Three expressions of purpose." appears in the copy and nowhere in the design. Visually, the three expressions are three cards. The idea was announced, never built.

### 1.2 Every section is the same section

Open any section and you get the same recipe:

1. small tracked eyebrow (often monospace caps)
2. a two‑line serif H2 whose last word is italic terracotta
3. a grey paragraph pushed to the right column
4. a grid of bordered boxes

This is repeated in Pillars, Journey, Selected Work, Listening Hub and Closing. The italic‑last‑word device appears in **six** headings. Sections are interchangeable, which is exactly what you said.

### 1.3 The hero is a template

- Two columns: headline left, portrait right. The conventional split I said I'd avoid.
- The portrait sits in a **framed rounded card with a header bar** ("SEGUN MICHAEL — LISTEN · CREATE · BUILD"). The white studio backdrop is now a visible white rectangle on cream. In an earlier iteration the portrait dissolved into the page; my last rewrite **threw that away** and replaced it with the more generic composition. That was a regression and I should have caught it.
- Four tiers of text compete before the eye reaches a button: headline → serif sub‑headline → sans paragraph → a three‑item index row. Two of them say the same thing.
- A caption set over the photograph ("Personal Brand & Ecosystem…") is nearly illegible orange‑on‑photo. It exists only to fill the card.

### 1.4 Typography has no personality

Instrument Serif + Manrope is the default "premium editorial" pairing. I applied one recipe at one scale everywhere. Tiny, tracked, uppercase mono labels are sprinkled on everything (a current AI‑editorial cliché), and monospace was never in my own design system document. Nothing in the type responds to the subject: a photographer, a listener, a builder.

### 1.5 The palette is borrowed

Ivory, sand, brown, terracotta is the stock "warm editorial" palette. It is unrelated to the photography, which is **high‑key white studio** and **saturated red / green / blue** commissioned work. The only genuine brand colour in the workspace is the red MAO mark (sampled at about `#A70405`). I never used it.

### 1.6 The imagery is flattened

- Pillars: one panel uses `interior-lounge.jpg`, a **432×660 furniture photograph, upscaled**, not Segun, not his work, visibly soft. The other two are Segun in near‑identical crops. Three cards, one treatment.
- Selected Work: his strongest asset (dramatic, saturated, skilfully lit portraits) is shrunk into six identical 4:5 tiles, a catalogue grid. No scale, no sequence, no tension.
- Nothing about the photographer's craft (framing, selecting, light) shapes the interface, even though the assets are the strongest idea available. See the new direction.

### 1.7 No transitions, no rhythm

Sections change background with a hard cut. Containers are centred at 1360px throughout. Layout vocabulary is: bordered box, chip, hairline. There is no overlap, no scale shift, no moment where the page surprises you.

### 1.8 Motion is decoration

A hero entrance plus one identical fade‑up on every block. No scroll‑linked behaviour, no image interaction, no hover that says anything. Movement does not carry the story.

---

## 2. Content I over‑reached on (must be removed)

The brief says: _do not invent services, biography, claims._ In the last pass I wrote copy that does exactly that. I am listing it plainly.

| Where                   | What I wrote                                                                                                                                                                  | Problem                                                                                                              |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| Selected Work "ledger"  | "V&M Partnership Work — jointly coordinated property and project engagements delivered in partnership"; "Completed Commissions"; "prepared for upcoming real estate mandates" | **Unverified.** Nothing confirms partnership engagements, completed status or mandates.                              |
| Journey                 | Three "chapters" implying Segun began with listening, moved to media, then contracting                                                                                        | **Invented chronology.**                                                                                             |
| Introduction            | Three "principles" and the line "Observer · Storyteller · Builder"                                                                                                            | Invented self‑description.                                                                                           |
| Pillars / Listening Hub | "one‑to‑one reflective conversations", "confidential", "leave with greater calm… steadier sense of your next step"                                                            | Invented **service format** and implied **outcomes** (the brief forbids unsupported claims about the Listening Hub). |
| Pillars (Real Estate)   | "Disciplined, transparent execution", "property stewardship"                                                                                                                  | Unsupported claims.                                                                                                  |
| Footer                  | One‑line role descriptions for each venture                                                                                                                                   | Slightly beyond confirmed wording.                                                                                   |

What remains defensible: the three expressions and their names, MAO Media / Inspire Network as an editorial platform, MAO Contractors for renovation planning and project coordination, and the non‑therapy disclaimer.

---

## 3. Engineering problems I should have caught

- **Fonts depend on the network at build and dev time.** During this audit, with `.next` cleared and a flaky connection, the dev server crashed: `Can't resolve '@vercel/turbopack-next/internal/font/google/font'` plus repeated "issue establishing a connection" for `fonts.gstatic.com`. This is the "1 Issue" badge visible in your screenshot. Fonts must be **self‑hosted** (`next/font/local`).
- `DESIGN_SYSTEM.md` does not match the implementation (sizes, tokens, the unused mono). Documentation drifted; it will be rewritten from the new system, not patched.
- An upscaled low‑resolution asset shipped in a hero‑adjacent section.
- I verified "no overflow, no console errors" and treated that as quality. It was only correctness.

---

## 4. What was worth keeping

- The honesty architecture: holding routes, no fake socials, the non‑therapy notice, excluded family/brand imagery.
- Accessibility basics: skip link, focus states, dialog menu, reduced‑motion handling, semantic headings.
- Optimised image pipeline and data‑driven content files.
- The _technique_ of multiplying a white‑backdrop portrait into the page colour (used well in the earlier cover composition).

---

## 5. What must fundamentally change

1. **Start from one idea that the layout itself performs**, not a paragraph that describes it.
2. **Make the photography the system.** Segun is a photographer with a full studio shoot of himself. That is a design language, not just content.
3. **Give each section its own composition and behaviour**, while sharing one grammar.
4. **A palette derived from the photographs and the MAO mark**, not from "editorial" defaults.
5. **Type with a point of view**, used sparingly, with real hierarchy.
6. **Motion that carries the idea** (image interaction, scroll as progression), with a static, complete fallback.
7. **Cut every unverified sentence.** Say less, say only what is confirmed.
8. **Self‑host fonts; keep the build offline‑safe.**
