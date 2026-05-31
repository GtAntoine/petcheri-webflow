"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Star } from "lucide-react";
import { PHOTOS } from "@/lib/assets";

const PETCHERI_APP = "https://app.petcheri.com";
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function HomeHero() {
  const t = useTranslations("home");

  const ANIMALS = [
    { label: t("hero_animal_dog"),   emoji: "🐶", href: "/services-chien" as const },
    { label: t("hero_animal_cat"),   emoji: "🐱", href: "/services-chat"  as const },
    { label: t("hero_animal_other"), emoji: "🐰", href: "/services-nac"   as const },
  ];

  const TRUST_BADGES = [
    t("hero_trust_verified"),
    t("hero_trust_insured"),
    t("hero_trust_free"),
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fde0d4 0%, #fdeee7 45%, #fdf6f2 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full">

        {/* ── LEFT COLUMN ── */}
        <div>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-medium text-[--color-chocolat] shadow-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            {t("hero_badge")}
          </motion.div>

          {/* Main title — accent word highlighted */}
          <motion.h1
            className="text-display text-[--color-chocolat] mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            {t("hero_title_before")}{" "}
            <span className="text-accent">{t("hero_title_accent")}</span>{" "}
            {t("hero_title_after")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lead mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            {t("hero_subtitle_detail")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          >
            <a
              href={PETCHERI_APP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg hover:brightness-110"
              style={{ background: "#C0432D" }}
            >
              {t("hero_cta_book")}
            </a>
            <Link
              href="/nos-services"
              className="inline-flex items-center gap-2 rounded-full border-2 px-7 py-3 text-sm font-semibold text-[--color-chocolat] bg-white/70 hover:bg-white transition-all duration-200"
              style={{ borderColor: "#E8705A" }}
            >
              {t("hero_cta_services")}
            </Link>
          </motion.div>

          {/* Stars */}
          <motion.div
            className="flex items-center gap-2 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
          >
            <span className="font-semibold text-[--color-chocolat]">4,9</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-[--color-muted-foreground]">
              {t("hero_reviews_count")}
            </span>
          </motion.div>

          {/* Animal selector */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
          >
            <p className="text-[11px] font-semibold tracking-widest text-[--color-muted-foreground] uppercase mb-3">
              {t("hero_animals_label")}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {ANIMALS.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="inline-flex items-center gap-2 bg-white border-2 border-transparent hover:border-[#E8705A] rounded-full px-5 py-2.5 text-sm font-semibold text-[--color-chocolat] shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-base">{a.emoji}</span>
                  {a.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[--color-chocolat]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
          >
            {TRUST_BADGES.map((label) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className="text-emerald-500 font-bold text-base leading-none">✓</span>
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — single large photo ── */}
        <motion.div
          className="relative hidden lg:flex items-center justify-center h-[520px]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          {/* Full-column photo */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={PHOTOS.moodboard1}
              alt="Animal chouchouté par Louise"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 50vw, 600px"
              priority
            />
            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent pt-10 pb-4 px-5">
              <p
                className="text-xs text-white/80 italic"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {t("hero_photo_caption_2")}
              </p>
            </div>
          </div>

          {/* Stat card — families */}
          <motion.div
            className="absolute top-4 right-4 bg-white rounded-2xl shadow-lg px-5 py-3 z-10"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p className="text-2xl font-bold leading-none" style={{ color: "var(--color-chocolat)" }}>
              {t("hero_stat_families_count")}
            </p>
            <p className="text-xs text-[--color-muted-foreground] mt-0.5">
              {t("hero_stat_families_label")}
            </p>
          </motion.div>

          {/* Stat card — satisfaction */}
          <motion.div
            className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-lg px-5 py-3 z-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="text-2xl font-bold leading-none" style={{ color: "var(--color-chocolat)" }}>
              98%
            </p>
            <p className="text-xs text-[--color-muted-foreground] mt-0.5">
              {t("hero_stat_satisfaction_label")}
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
