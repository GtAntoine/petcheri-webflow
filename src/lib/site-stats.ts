/**
 * site-stats.ts — Source unique de vérité pour les chiffres clés et les URLs.
 *
 * Mettre à jour ICI suffit à propager partout sur le site.
 */

// ─── URLs ─────────────────────────────────────────────────────────────────────

/** Formulaire de réservation (CTAs primaires) */
export const BOOKING_URL =
  "https://prettyform.addxt.com/a/form/?vf=1FAIpQLSdwrFAcP9eRFGoVCs4BqNtZD7Iqc-uW7UjRduB-NcfR10qxTQ";

/** Espace client (connexion / dashboard) */
export const DASHBOARD_URL = "https://www.petcheri-app.com/customer/dashboard";

/** Lien direct pour déposer un avis Google */
export const GOOGLE_REVIEW_URL = "https://g.page/r/CSdvs9XGJTgXEBI/review";

/** Fiche Google Business (affichage des avis) */
export const GOOGLE_PROFILE_URL = "https://www.google.com/search?kgmid=/g/11r2hj5nvj&hl=fr-FR&q=Pet+Cheri&shndl=30&shem=lcuae&source=sh/x/loc/osrp/m5/3&kgs=2cf17060661bede9";

/** Formulaire de rappel téléphonique (page Entreprises) */
export const CALLBACK_URL = "https://forms.gle/qq4CHf8M1Pc1M7Bx8";

// ─── Stats ────────────────────────────────────────────────────────────────────

export const SITE_STATS = {
  /** Note moyenne Google (sur 5) */
  googleRating:      4.9,
  /** Nombre d'avis Google */
  googleReviewCount: 246,
  /** Taux de satisfaction clients (%) */
  satisfactionRate:  98,
  /** Familles accompagnées */
  familiesServed:    2347,
  /** Chouchouteurs vérifiés dans le réseau */
  sittersCount:      350,
  /** Prestations réalisées */
  servicesDone:      15_000,
  /** Prestataires certifiés (affiché "400+") */
  sittersNetwork:    400,
} as const;

// ─── Formatage ────────────────────────────────────────────────────────────────

/** Formate un nombre en style FR : 15000 → "15 000", 2347 → "2 347" */
export function fmtFR(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n);
}

/** Formate un nombre en style EN : 15000 → "15,000", 2347 → "2,347" */
export function fmtEN(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

/** Formate selon la locale next-intl courante ("fr" ou "en") */
export function fmtLocale(n: number, locale: string): string {
  return locale === "fr" ? fmtFR(n) : fmtEN(n);
}
