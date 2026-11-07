# Real Estate: content gaps

**Decision, 2026-11-07:** publish with what exists. The company for two projects, project details and assessment terms are not available, so they stay off the page. The name stays "V and M Property" as in the approved copy, so the V&M Properties logo stays held back. The after photographs are used as they are for now. Everything below remains open and can be added later.

The page can be built with these open, but the items marked **Before publishing** should be confirmed first. Nothing below has been guessed on the page: a missing fact is simply not shown.

## Projects

| Item | Status |
| :-- | :-- |
| Which projects are approved for display | Three are shown. The user confirmed on 2026-11-07 that the photographs in `real estate pic/` are Segun's work |
| **Before publishing:** company for the split-level house and the single-story home | Unknown: MAO client work or V and M work. Only the kitchen is confirmed as MAO Contractors, so the page shows no company for these two. The folder also held the V&M Properties logo, which may mean they are V&M work |
| **Before publishing:** rights to the after photographs | The after photographs of those two properties are listing copies, one with a listing mark. Marks were cropped for layout, which does not settle the rights. Ask who took them, and get originals |
| Publication permission from property owners | Unknown |
| Exact project descriptions and scope | Not supplied |
| General locations | Not supplied. Never show street addresses |
| Dates | Not supplied. Photo metadata shows when pictures were taken (Dec 2024 to Aug 2025), not project dates, so none are published |
| Segun's exact role on each project | Not supplied |
| Supported results | Not supplied |
| Budget or timing figures | Not supplied; add only when documented and approved |
| Which projects are V and M work, and which are proposed planning work | Not supplied |

## Services

| Item | Status |
| :-- | :-- |
| **Before publishing:** assessment deliverables | The approved copy says "can include"; confirm what is actually offered |
| **Before publishing:** assessment fee and turnaround | Not supplied; copy says these are agreed first |
| Reporting arrangements | Not supplied |
| Permitted scope of coordination, including any licensing limits where the work is offered | Not supplied |
| Whether "Planning work on proposed projects" is acceptable wording | Written for this page; pending approval |

## Partnership

| Item | Status |
| :-- | :-- |
| **Before publishing:** the venture's name | The approved copy says "V and M Property"; the logo says "V&M PROPERTIES". The logo is held back until this is settled, on the user's decision of 2026-11-07 |
| Public display name for Haven Hill | Used as supplied; confirm |
| V and M Property website | Not supplied. Set `partnership.url` in `src/data/real-estate.ts` and the name becomes a link |

## Contact

Contact is built. The buttons send people to:

- `/contact?enquiry=mao-contractors#inquiry` (both Discuss a Property Project buttons)
- `/contact?enquiry=mao-contractors&topic=renovation-assessment#inquiry` (Ask About a Renovation Assessment)

MAO Contractors is selected on arrival, and assessment inquiries are identified on the form and in the email. Delivery needs the settings in section 9l of IMPLEMENTATION_REPORT.md.
