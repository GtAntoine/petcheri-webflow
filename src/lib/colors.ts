/**
 * Petcheri design tokens — single source of truth for all colors & gradients.
 *
 * These values MUST stay in sync with the CSS variables defined in globals.css (@theme + :root).
 * Use these constants in inline styles; reference the CSS vars via var(--color-*) in className.
 */

// ── Base palette ──────────────────────────────────────────────────────────────
export const COLORS = {
  ivoire:         "#FAF7F2",
  ivoireDark:     "#F0EBE1",
  chocolat:       "#2C1810",
  chocolatLight:  "#4A2E22",
  or:             "#C9A96E",
  orLight:        "#DFC08A",
  orDark:         "#A8834A",
  sauge:          "#8B9D77",
  saugeLight:     "#A8BA94",
  saugeDark:      "#6E7D5E",
  creme:          "#F5EDD8",
  navy:           "#0E1B30",
  navyLight:      "#16294A",

  // Rouge (CTA / accent fort)
  rouge:          "#C0432D",
  rougeDark:      "#8B2016",
  rougeLight:     "#E8705A",  // also used as .text-accent

  // Semantic
  muted:          "#9E8B7A",
  mutedForeground:"#7A6A5A",
  border:         "#E8DFD0",
} as const;

// ── Gradients ─────────────────────────────────────────────────────────────────
export const GRADIENTS = {
  /** Main CTA / newsletter — dark red to coral */
  rouge:       "linear-gradient(135deg, #8B2016 0%, #C0432D 60%, #D4522F 100%)",
  newsletter:  "linear-gradient(135deg, #8B2016 0%, #C0432D 55%, #E8705A 100%)",

  /** Page hero backgrounds */
  hero:        "linear-gradient(160deg, #FFF9F0 0%, #FFECD2 40%, #fce4ec 70%, #E8E4F0 100%)",
  aboutHero:   "linear-gradient(135deg, #fde0d4 0%, #fdeee7 45%, #fdf6f2 100%)",

  /** Section backgrounds */
  navy:        `linear-gradient(160deg, ${COLORS.navy} 0%, ${COLORS.navyLight} 100%)`,
  serviceCard: "linear-gradient(135deg, #FFF9F0 0%, #FFF0E8 100%)",

  /** Floating quote cards */
  quotePink:   "linear-gradient(135deg, #fde0d4, #fdeee7)",
} as const;
