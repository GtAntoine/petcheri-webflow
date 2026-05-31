"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import PawPrintIcon from "@/components/icons/paw-print-icon";

const PETCHERI_APP = "https://app.petcheri.com";

// ─── Paw shapes ───────────────────────────────────────────────────────────────

function PawShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="white"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="50" cy="66" rx="23" ry="19" />
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
  const pawRef = useRef<{ startAnimation: () => void; stopAnimation: () => void }>(null);

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

        {/* Button — hover triggers paw animation across the whole element */}
        <a
          href={PETCHERI_APP}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => pawRef.current?.startAnimation()}
          onMouseLeave={() => pawRef.current?.stopAnimation()}
          className="inline-flex items-center gap-2.5 bg-white text-[--color-chocolat] font-semibold rounded-full px-9 py-3.5 text-base shadow-sm hover:shadow-md cursor-pointer transition-all duration-300"
        >
          {t("cta_book")}
          <PawPrintIcon
            ref={pawRef}
            size={18}
            color="var(--color-or)"
            className="pointer-events-none"
          />
        </a>

        <p className="mt-6 text-sm text-white/60">
          {t("cta_note")}
        </p>

      </div>
    </section>
  );
}
