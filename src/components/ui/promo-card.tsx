"use client";

import { useState } from "react";
import NextImage from "next/image";
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
      <div className="card-base flex items-center gap-4 px-3 py-4 hover:shadow-[--shadow-card-hover] transition-all duration-300">
        {/* Logo */}
        <div className="relative w-14 h-14 rounded-xl bg-[--color-creme] flex items-center justify-center shrink-0 overflow-hidden border border-[--color-border]">
          <NextImage src={promo.logoUrl} alt={promo.partnerName} fill className="object-contain p-1.5" sizes="56px" />
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

  // Default card (for nos-bons-plans page + homepage)
  return (
    <div className="card-base flex flex-col overflow-hidden hover:shadow-[--shadow-card-hover] hover:-translate-y-1 transition-all duration-300">

      {/* Full-width logo banner — fixed height so next/image can optimise */}
      <div className="relative w-full h-36 bg-[--color-creme] overflow-hidden">
        <NextImage
          src={promo.logoUrl}
          alt={promo.partnerName}
          fill
          className="p-4 object-contain"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
        />
        {/* Category badge — top right */}
        <span
          className="absolute top-3 right-3 text-[10px] font-semibold rounded-full px-2.5 py-1"
          style={{ background: style.bg, color: style.text }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle"
            style={{ background: style.dot }}
          />
          {promo.category}
        </span>
      </div>

      {/* Body */}
      <div className="px-3 pb-3 flex flex-col flex-1 gap-2">
        <h3 className="text-sm font-semibold text-[--color-chocolat]">{promo.partnerName}</h3>
        <p className="text-xs text-[--color-muted-foreground] leading-relaxed flex-1 line-clamp-2">
          {promo.description}
        </p>

        {/* Offer highlight */}
        <div
          className="rounded-lg px-3 py-2 mt-1"
          style={{ background: "linear-gradient(135deg, #fde0d4, #fdeee7)" }}
        >
          <p className="text-xs font-semibold text-[--color-chocolat]">{promo.offer}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 pb-5 flex items-center gap-2">
        {/* Code copy */}
        {promo.code ? (
          <button
            onClick={copyCode}
            className="flex-1 flex items-center justify-between bg-[--color-creme] border border-[--color-border] rounded-lg px-3 py-2 hover:border-[--color-or] transition-colors group"
          >
            <code className="text-xs font-mono font-semibold text-[--color-chocolat] tracking-wider">
              {promo.code}
            </code>
            <span className="flex items-center gap-1 text-[10px] text-[--color-muted-foreground] group-hover:text-[--color-chocolat] transition-colors">
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-500" />
                  <span className="text-emerald-600">Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="cursor-pointer w-3 h-3" />
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
          className="inline-flex items-center gap-1 text-xs font-semibold rounded-lg px-4 py-2 text-white hover:brightness-110 hover:shadow-md transition-all shrink-0"
          style={{ background: "#E8705A" }}
        >
          Profiter
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
