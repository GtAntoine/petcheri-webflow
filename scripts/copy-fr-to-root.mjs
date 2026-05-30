/**
 * Post-build script: copies out/fr/* to out/ root.
 *
 * With localePrefix: "as-needed", next-intl generates links WITHOUT /fr/ for
 * the default locale (e.g. /qui-sommes-nous instead of /fr/qui-sommes-nous).
 * But static export puts the files under out/fr/. This script bridges the gap
 * so that /qui-sommes-nous resolves to the correct file on static hosts.
 */

import { cpSync, existsSync, readdirSync } from "fs";
import { join } from "path";

const OUT = "out";
const FR = join(OUT, "fr");

// When Netlify uses @netlify/plugin-nextjs, the build outputs to .next/ (SSR/SSG mode)
// and never creates out/. The plugin handles locale routing natively — skip gracefully.
if (!existsSync(FR)) {
  console.log("out/fr not found — skipping (Netlify SSR mode, locale routing handled by runtime).");
  process.exit(0);
}

const entries = readdirSync(FR);
for (const entry of entries) {
  // Skip next-intl internal metadata blobs
  if (entry.startsWith("__next.")) continue;

  const src = join(FR, entry);
  const dst = join(OUT, entry);

  cpSync(src, dst, { recursive: true, force: true });
  console.log(`  copied  fr/${entry}  →  ${entry}`);
}

console.log("\n✓ French pages copied to out/ root — clean URLs ready.\n");
