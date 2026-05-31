import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const PETCHERI_APP = "https://app.petcheri.com";

// ─── Large decorative paw shape ───────────────────────────────────────────────

function PawShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="white"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main pad */}
      <ellipse cx="50" cy="66" rx="23" ry="19" />
      {/* Toe pads */}
      <ellipse cx="21" cy="44" rx="10.5" ry="9" />
      <ellipse cx="40" cy="31" rx="10.5" ry="9" />
      <ellipse cx="61" cy="31" rx="10.5" ry="9" />
      <ellipse cx="79" cy="44" rx="10.5" ry="9" />
    </svg>
  );
}

// ─── HomeCta ──────────────────────────────────────────────────────────────────

export function HomeCta() {
  const t = useTranslations("home");

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(120deg, #E8705A 0%, #F0A84E 100%)" }}
    >
      {/* Decorative paw prints — right side */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <PawShape className="absolute w-72 h-72 opacity-[0.13] right-[-2rem] top-1/2 -translate-y-1/2" />
        <PawShape className="absolute w-52 h-52 opacity-[0.10] right-48 -top-8 rotate-[20deg]" />
        <PawShape className="absolute w-52 h-52 opacity-[0.10] right-36 -bottom-8 -rotate-[15deg]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">

        <h2
          className="font-bold text-white mb-5"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.15,
          }}
        >
          {t("cta_title")}
        </h2>

        <p
          className="mb-10 max-w-md mx-auto text-white/80"
          style={{ lineHeight: 1.7 }}
        >
          {t("cta_subtitle")}
        </p>

        <a href={PETCHERI_APP} target="_blank" rel="noopener noreferrer">
          <Button variant="white" size="lg" className="font-semibold gap-2">
            {t("cta_book")}
            <span aria-hidden="true">🐾</span>
          </Button>
        </a>

        <p className="mt-6 text-sm text-white/60">
          {t("cta_note")}
        </p>

      </div>
    </section>
  );
}
