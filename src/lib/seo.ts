import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://petcheri.com";

export type PathKey = keyof typeof routing.pathnames;
type LocaleMap = Record<string, string>;

function resolveLocalePath(
  paths: string | LocaleMap,
  locale: string
): string {
  if (typeof paths === "string") return paths;
  return paths[locale] ?? paths[routing.defaultLocale] ?? "/";
}

/**
 * Generates Next.js `metadata.alternates` with:
 *  - `canonical` = URL for the current locale
 *  - `languages` = hreflang map for all locales + x-default
 *
 * Respects next-intl's `localePrefix: "as-needed"` convention:
 * the default locale (fr) has no prefix, other locales get `/<locale>/`.
 */
export function buildAlternates(
  key: PathKey,
  locale: string
): NonNullable<Metadata["alternates"]> {
  const paths = routing.pathnames[key] as string | LocaleMap;
  const languages: Record<string, string> = {};

  for (const loc of routing.locales) {
    const path = resolveLocalePath(paths, loc);
    const prefix = loc === routing.defaultLocale ? "" : `/${loc}`;
    languages[loc] = `${BASE_URL}${prefix}${path}`;
  }

  // x-default → default locale (French)
  languages["x-default"] = languages[routing.defaultLocale];

  const currentPath = resolveLocalePath(paths, locale);
  const currentPrefix = locale === routing.defaultLocale ? "" : `/${locale}`;

  return {
    canonical: `${BASE_URL}${currentPrefix}${currentPath}`,
    languages,
  };
}
