# Design Spec — Decor Systems-inspired Portfolio

Source reference: https://decorsystems.com.au/
Captured: 2026-05-18. Verified against live CSS, app JS bundle, and rendered HTML.

This is the design system for the alternative portfolio in `Website - Portfolio 2`. Treat it as a build spec, not a style guide — every token below is observed on the live site, not invented.

---

## 1. Color palette

All values were extracted from the live app bundle (`app-09bb3d06c7953aa5afc4.js`). Names are mine (Decor does not expose semantic names).

### Brand / surface
| Role | Hex | Notes |
|---|---|---|
| Ink (primary text & brand) | `#3A3A1F` | Dark olive-khaki. Most-used color. Use for body copy, headings, primary UI ink. |
| Paper (page background) | `#FFFFFF` | Pure white. |
| Off-paper | `#F2F2F2` | Subtle section backgrounds, form fields. |
| Deep ink | `#16160e` / `#000000` | Reserve for highest-contrast moments only. |

### Accent rotation (used for product/project category cues)
| Hex | Suggested use |
|---|---|
| `#CF6C4F` | Terracotta — primary accent / CTAs |
| `#CFCFB0` | Warm beige — supporting band, image mat |
| `#CCA99F` | Blush — soft section break |
| `#A7B6C4` | Pale slate-blue — alt section |
| `#3a7685` | Teal — deeper accent |
| `#291A16` | Dark brown — heavy accent |
| `#042442` | Deep navy — alt heavy accent |

### System
| Hex | Role |
|---|---|
| `#219653` | Success |
| `#EB5757` / `#AA0000` | Error |
| `#808080` | Disabled / meta text |

**Palette character:** earthy, architect-friendly. Dark olive on white, with terracotta + beige + blush + slate as a quiet rotation across sections. No bright primaries, no gradients.

---

## 2. Typography

Three families are loaded (`/fonts/font.css`):

| Family | Role | Notes |
|---|---|---|
| `NHaasGroteskDSPro` | Display headings | Neue Haas Grotesk Display — tighter, more refined letterforms for large sizes. |
| `NHaasGroteskTXPro` | Body, UI | Neue Haas Grotesk Text — optimized for paragraph sizes. |
| `ABCMonumentGroteskMono` | Labels, metadata, fire ratings, tags | Monospace for technical / spec callouts. |

These are licensed fonts. For development, either license via Linotype + Pangram Pangram, or substitute self-hosted fallbacks (e.g. `Inter` for text/display, `JetBrains Mono` for the mono labels) and swap later.

### Scale (fluid, observed)
Decor uses fluid sizing via `calc()` against viewport width. The dominant pattern is:

```css
font-size: calc(35px + (65 - 35) * ((100vw - 320px) / (1920 - 320)));
/* = 35px at 320vw, scales to 65px at 1920vw */
```

Useful pattern to reuse:
```css
--fluid-display: clamp(35px, calc(35px + 30 * ((100vw - 320px) / 1600)), 65px);
--fluid-h1:      clamp(28px, calc(28px + 20 * ((100vw - 320px) / 1600)), 48px);
--fluid-h2:      clamp(22px, calc(22px + 14 * ((100vw - 320px) / 1600)), 36px);
--fluid-body:    16px; /* fixed */
--fluid-meta:    12px; /* mono labels */
```

A hero variant uses `font-size: 8.5vw` for the largest editorial moment.

### Letter-spacing & weight
- Display / headings: `letter-spacing: 0.03em` (slightly tight, premium)
- Mono labels / small caps: `letter-spacing: 0.05em` + uppercase
- Body: default tracking
- Weights observed: 400 (regular) only — the look is achieved through *size and color*, not weight contrast.

---

## 3. Layout & grid

- **Single mobile breakpoint:** `480px`. Everything above is treated as one fluid desktop range (sized via the `calc()` pattern above), everything below uses the `@media (max-width: 480px)` overrides.
- **Page content max-width:** ~1400px, gutters scale with viewport.
- **Vertical rhythm:** large — sections separated by ~80–120px of whitespace.
- **Grid pattern:** product/project teasers in 3-up to 5-up depending on viewport; falls to 1-up under 480px.
- **No traditional 12-col bootstrap grid** — bespoke flex/CSS-grid per section.

---

## 4. Page structure (homepage flow to mirror)

1. **Header** — logo left, horizontal nav center/right, contact CTA + sample-cart on the far right. Sticky on scroll.
2. **Hero** — short editorial tagline, single accreditation badge. No image carousel; minimal.
3. **Products teaser** — 5-card row (image + category + spec metadata in mono).
4. **Selected works** — 3 projects, each with a small image cluster + architect attribution.
5. **CTA band** — "Specialist Advice at Speed", phone + email buttons.
6. **Products grid (full)** — repeat grid + "View All Products" link.
7. **Resources / inspiration** — 3 article cards (image, date, title, CTA).
8. **Newsletter signup band.**
9. **Footer** — nav links, contact, social, legal.

For a *portfolio* adaptation: map `Products → Disciplines`, `Selected works → Selected projects`, `Resources → Writing/Articles`. The skeleton stays.

---

## 5. Navigation

- Plain text links, dark olive (`#3A3A1F`) on white, no underline, no color on hover (likely a subtle opacity or weight shift — verify when building).
- Phone number anchored in header as the primary CTA-by-presence.
- Mobile: hamburger toggle ("Menu/Close" text swap).
- Breadcrumbs appear on detail pages, mono-styled.

---

## 6. Imagery

- **Aspect ratios:** hero/carousel 16:9; product cards roughly 1:1 or 4:3; project images mix portrait and landscape.
- **Caption pattern:** title → category → architect, stacked below the image, left-aligned, generous spacing.
- **No filters or color overlays** on images — they carry the warmth, the UI stays neutral.
- **Lazy-loaded** via `gatsby-image-wrapper` — for our Next.js port, use `next/image` with `placeholder="blur"`.

---

## 7. Interaction patterns

- Transitions are subtle: opacity / position only, ~250–500ms ease.
- Page transitions handled by Gatsby `tl-wrapper` (a sliding wrapper) — Next.js equivalent: a simple fade via `framer-motion` or `view-transitions` API.
- Hover on cards: presumed mild lift/opacity change (not loud).
- Scroll: no parallax; nothing aggressive. The site is quiet.

---

## 8. Component vocabulary

| Component | Spec |
|---|---|
| **Primary button** | Solid `#3A3A1F` background, white text, mono label, generous horizontal padding, no border-radius or very small (~2px). |
| **Secondary button** | Outline `#3A3A1F` on white, same typography. |
| **Card** | No shadow. Image on top, then 1 line title (display), 1 line category (mono uppercase), optional spec line (mono). Separated by white-space, not borders. |
| **Tag / spec label** | Mono, uppercase, ~12px, letter-spacing 0.05em. Used for fire ratings, NRC values, categories. |
| **Form input** | Underline-only style (no box), label above in mono uppercase. |
| **Badge** | Square, image-based (e.g. Supply Nation). Treat as a logo not a UI chip. |

---

## 9. Tone (one paragraph)

Quiet, architectural, premium. The voice is "we know what we're doing, here's the work." Warmth comes from the material palette and image content, not the UI — the chrome itself stays disciplined: monochrome ink on white, mono labels for spec data, lots of whitespace, no decoration. For a portfolio, this means: let the projects be the color, keep the surrounding interface as a neutral frame.

---

## 10. Build notes (Next.js / this repo)

- The existing repo is Next.js (App Router based on prior commits). Keep that stack.
- Add the three fonts via `next/font/local` (or substitute Inter + JetBrains Mono initially).
- Establish design tokens as CSS custom properties on `:root` in `globals.css` — use the color table in §1 and the fluid-size variables in §2 verbatim.
- Build a single `<SectionBand>` primitive that handles the alternating accent backgrounds — Decor's whole look depends on these soft color bands between sections.
- The existing horizontal-scroll Architecture page (see recent commits) is an *editorial* device — keep it as one option, but the Decor structure is mostly *vertical* with strong whitespace. Don't force horizontal scroll onto every page.

---

## 11. Open questions / gaps

- Exact hover micro-interactions — not derivable from static HTML. Confirm by inspecting the live site in DevTools when implementing each component.
- Form validation styling — only structure is visible from the bundle.
- Real font licensing — Neue Haas Grotesk + ABC Monument Grotesk are paid. Decide license vs. fallback before launch.
