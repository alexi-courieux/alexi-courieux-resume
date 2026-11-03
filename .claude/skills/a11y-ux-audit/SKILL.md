---
name: a11y-ux-audit
description: Audit and improve accessibility (WCAG 2.2 AA), UX and UI of this React + MUI resume site. Use when asked to review, fix or polish components, modals, navigation, colors, motion or responsive behavior.
---

# Accessibility / UX / UI audit

Stack: React 18, MUI 6, Emotion, GSAP, i18next (multi-language), Vite.

## Process
1. Read the target components in `src/`. For live checks, use the Playwright MCP: run `npm run dev`, open the page, take an accessibility snapshot, and test at 320px, 768px and 1280px widths.
2. Check each area below; report findings by severity (blocker / major / minor) with `file:line`.
3. Fix the issues, then run `npm run lint` and `npm run build`.

## Checklist
**Semantics & structure**: one `<h1>`, ordered headings, landmarks (`header/nav/main/footer`), `lang` on `<html>` updated when i18n language changes, lists for lists, buttons vs links used correctly.

**Keyboard & focus**: every interactive element reachable and operable by keyboard; visible `:focus-visible` indicator (3:1 contrast); skip-to-content link; modals trap focus, close on Esc, and return focus to the trigger; no positive `tabIndex`.

**Names & ARIA**: icon-only buttons have `aria-label` (translated via i18n); decorative icons `aria-hidden`; flags/images have meaningful `alt` or empty `alt=""`; dialogs use `aria-labelledby`/`aria-describedby`; prefer native semantics over ARIA.

**Color & contrast**: text 4.5:1 (large text 3:1), UI components and focus rings 3:1; never convey info by color alone; verify both light/dark themes if present.

**Motion**: respect `prefers-reduced-motion` for GSAP and CSS transitions (disable or shorten parallax, scroll animations, auto-moving content).

**Responsive & touch**: no horizontal scroll at 320px; touch targets at least 24x24px (aim 44x44); do not disable zoom; text resizable to 200%; reflow at 400% zoom.

**i18n**: all user-facing strings (including aria-labels) come from translations; layout survives longer strings; language switcher is labeled and announces its state.

**UX/UI polish**: clear visual hierarchy, consistent spacing/typography scale, obvious primary actions, loading/empty/error states, contact links (mailto/tel) clearly labeled, print stylesheet sanity for a resume.

**Performance as UX**: image dimensions set, lazy loading below the fold, fonts with `font-display: swap`, no layout shift.

## Output
Short prioritized list, then the applied fixes. Do not restyle beyond the issues found unless asked; for larger visual redesigns use the `frontend-design` skill.
