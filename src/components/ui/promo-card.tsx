"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import type { Promotion, PromoCategory } from "@/lib/promotions";

// ─── Category colors ─────────────────────────────────────────────────────────

const CATEGORY_STYLES: Record<PromoCategory, { bg: string; text: string; dot: string }> = {
  Alimentation: { bg: "#DCFCE7", text: "#166534", dot: "#22C55E" },
  Santé:        { bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444" },
  Accessoires:  { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  Assurance:    { bg: "#DBEAFE", text: "#1E40AF", dot: "#3B82F6" },
  Compléments:  { bg: "#EDE9FE", text: "#5B21B6", dot: "#8B5CF6" },
};

// ─── PromoCard ───────────────────────────────────────────────────────────────

interface PromoCardProps {
  promo: Promotion;
  /** "inline" = compact horizontal card for blog articles */
  variant?: "default" | "inline";
}

export function PromoCard({ promo, variant = "default" }: PromoCardProps) {
  const [copied, setCopied] = useState(false);
  const style = CATEGORY_STYLES[promo.category];

  function copyCode() {
    if (!promo.code) return;
    navigator.clipboard.writeText(promo.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (variant === "inline") {
    return (
      <div className="card-base flex items-center gap-4 px-5 py-4 hover:shadow-[--shadow-card-hover] transition-all duration-300">
        {/* Logo */}
        <div className="w-14 h-14 rounded-xl bg-[--color-creme] flex items-center justify-center shrink-0 overflow-hidden border border-[--color-border]">
          <img src={promo.logoUrl} alt={promo.partnerName} className="w-12 h-12 object-contain" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-sm font-semibold text-[--color-chocolat]">{promo.partnerName}</p>
            <span
              className="text-[10px] font-semibold rounded-full px-2 py-0.5"
              style={{ background: style.bg, color: style.text }}
            >
              {promo.category}
            </span>
          </div>
          <p className="text-sm font-medium" style={{ color: "#E8705A" }}>{promo.offer}</p>
          {promo.code && (
            <button
              onClick={copyCode}
              className="mt-1 inline-flex items-center gap-1.5 text-xs text-[--color-muted-foreground] hover:text-[--color-chocolat] transition-colors"
            >
              <code className="bg-[--color-creme] rounded px-1.5 py-0.5 font-mono tracking-wide">
                {promo.code}
              </code>
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            </button>
          )}
        </div>

        {/* CTA */}
        <a
          href={promo.partnerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold rounded-full px-4 py-2 text-white hover:brightness-110 transition-all"
          style={{ background: "#E8705A" }}
          onClick={(e) => e.stopPropagation()}
        >
          J&apos;en profite
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  // Default card (for nos-bons-plans page)
  return (
    <div className="card-base flex flex-col overflow-hidden hover:shadow-[--shadow-card-hover] hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div className="w-16 h-16 rounded-2xl bg-[--color-creme] flex items-center justify-center overflow-hidden border border-[--color-border]">
          <img src={promo.logoUrl} alt={promo.partnerName} className="w-14 h-14 object-contain" />
        </div>
        <span
          className="text-xs font-semibold rounded-full px-3 py-1"
          style={{ background: style.bg, color: style.text }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle"
            style={{ background: style.dot }}
          />
          {promo.category}
        </span>
      </div>

      {/* Body */}
      <div className="px-6 pb-4 flex flex-col flex-1 gap-2">
        <h3 className="text-base font-semibold text-[--color-chocolat]">{promo.partnerName}</h3>
        <p className="text-sm text-[--color-muted-foreground] leading-relaxed flex-1">
          {promo.description}
        </p>

        {/* Offer highlight */}
        <div
          className="rounded-xl px-4 py-3 mt-1"
          style={{ background: "linear-gradient(135deg, #fde0d4, #fdeee7)" }}
        >
          <p className="text-sm font-semibold text-[--color-chocolat]">{promo.offer}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 flex items-center gap-3">
        {/* Code copy */}
        {promo.code ? (
          <button
            onClick={copyCode}
            className="flex-1 flex items-center justify-between bg-[--color-creme] border border-[--color-border] rounded-xl px-4 py-2.5 hover:border-[--color-or] transition-colors group"
          >
            <code className="text-sm font-mono font-semibold text-[--color-chocolat] tracking-wider">
              {promo.code}
            </code>
            <span className="flex items-center gap-1 text-xs text-[--color-muted-foreground] group-hover:text-[--color-chocolat] transition-colors">
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600">Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copier
                </>
              )}
            </span>
          </button>
        ) : (
          <div className="flex-1" />
        )}

        {/* CTA */}
        <a
          href={promo.partnerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold rounded-xl px-5 py-2.5 text-white hover:brightness-110 hover:shadow-md transition-all shrink-0"
          style={{ background: "#E8705A" }}
        >
          Profiter
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
