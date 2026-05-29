"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export type PageHeroCta = {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
};

interface PageHeroProps {
  badge?: string;
  title: React.ReactNode;
  subtitle: string;
  ctas?: PageHeroCta[];
  image?: string;
  imageAlt?: string;
  trustBadges?: string[];
  /** "warm" = peach gradient (service pages), "ivoire" = flat cream (info pages) */
  variant?: "warm" | "ivoire";
}

export function PageHero({
  badge,
  title,
  subtitle,
  ctas = [],
  image,
  imageAlt = "",
  trustBadges = [],
  variant = "warm",
}: PageHeroProps) {
  const bg =
    variant === "warm"
      ? "linear-gradient(135deg, #fde0d4 0%, #fdeee7 45%, #fdf6f2 100%)"
      : undefined;

  return (
    <section
      className={`relative overflow-hidden pt-28 pb-16 ${variant === "ivoire" ? "bg-[--color-ivoire]" : ""}`}
      style={bg ? { background: bg } : undefined}
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          {badge && (
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-medium text-[--color-chocolat] shadow-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              {badge}
            </motion.span>
          )}

          <motion.h1
            className="text-display text-[--color-chocolat] mb-5 leading-[1.1]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-lead mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
          >
            {subtitle}
          </motion.p>

          {ctas.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            >
              {ctas.map((cta) =>
                cta.external ? (
                  <a
                    key={cta.label}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:brightness-110 ${
                      cta.primary
                        ? "text-white"
                        : "bg-white/70 hover:bg-white border-2 text-[--color-chocolat]"
                    }`}
                    style={
                      cta.primary
                        ? { background: "#E8705A" }
                        : { borderColor: "#E8705A" }
                    }
                  >
                    {cta.label}
                    {cta.primary && <ArrowRight className="w-4 h-4" />}
                  </a>
                ) : (
                  <Link
                    key={cta.label}
                    href={cta.href as Parameters<typeof Link>[0]["href"]}
                    className={`inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200 ${
                      cta.primary
                        ? "text-white shadow-md hover:shadow-lg hover:brightness-110"
                        : "bg-white/70 hover:bg-white border-2 text-[--color-chocolat]"
                    }`}
                    style={
                      cta.primary
                        ? { background: "#E8705A" }
                        : { borderColor: "#E8705A" }
                    }
                  >
                    {cta.label}
                    {cta.primary && <ArrowRight className="w-4 h-4" />}
                  </Link>
                )
              )}
            </motion.div>
          )}

          {trustBadges.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[--color-chocolat]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
            >
              {trustBadges.map((label) => (
                <span key={label} className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold text-base leading-none">✓</span>
                  {label}
                </span>
              ))}
            </motion.div>
          )}
        </div>

        {/* Image */}
        {image && (
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1280px) 50vw, 600px"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
