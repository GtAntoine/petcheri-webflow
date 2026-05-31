import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

// ─── Paw print SVG tiling background ─────────────────────────────────────────

const PAW_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><ellipse cx="40" cy="50" rx="13" ry="10" fill="rgba(250,247,242,0.07)"/><ellipse cx="22" cy="36" rx="6" ry="5" fill="rgba(250,247,242,0.07)"/><ellipse cx="34" cy="28" rx="6" ry="5" fill="rgba(250,247,242,0.07)"/><ellipse cx="46" cy="28" rx="6" ry="5" fill="rgba(250,247,242,0.07)"/><ellipse cx="58" cy="36" rx="6" ry="5" fill="rgba(250,247,242,0.07)"/></svg>`;
const PAW_BG = `url("data:image/svg+xml,${encodeURIComponent(PAW_SVG)}")`;

const PETCHERI_APP = "https://app.petcheri.com";

// ─── HomeCta ──────────────────────────────────────────────────────────────────

export function HomeCta() {
  const t = useTranslations("home");

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "#2C1810" }}
    >
      {/* Paw print tiling */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: PAW_BG,
          backgroundSize: "80px 80px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">

        {/* Decorative paw icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[--color-or]/20 mb-8">
          <svg
            className="w-7 h-7 text-[--color-or]"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M4.5 9a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm5-3a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm5 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm5 3a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM12 22c-3.866 0-7-2.686-7-6 0-2.21 1.343-4.133 3.354-5.22a3.48 3.48 0 0 0 1.297-1.224l.349-.582a2 2 0 0 1 4 0l.35.582a3.48 3.48 0 0 0 1.296 1.224C17.657 11.867 19 13.79 19 16c0 3.314-3.134 6-7 6Z" />
          </svg>
        </div>

        <h2
          className="font-normal text-[--color-ivoire] mb-5"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.15,
          }}
        >
          {t("cta_title")}
        </h2>

        <p
          className="mb-10 max-w-lg mx-auto"
          style={{ color: "rgba(250,247,242,0.65)", lineHeight: 1.7 }}
        >
          {t("cta_subtitle")}
        </p>

        <a href={PETCHERI_APP} target="_blank" rel="noopener noreferrer">
          <Button variant="white" size="lg">
            {t("cta_book")}
          </Button>
        </a>

        <p className="mt-6 text-xs" style={{ color: "rgba(250,247,242,0.4)" }}>
          {t("cta_note")}
        </p>

      </div>
    </section>
  );
}
