"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Star } from "lucide-react";
import { PHOTOS } from "@/lib/assets";

const PETCHERI_APP = "https://app.petcheri.com";
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ANIMALS = [
  { label: "Chien",        emoji: "🐶", href: "/services-chien" as const },
  { label: "Chat",         emoji: "🐱", href: "/services-chat"  as const },
  { label: "Autre animal", emoji: "🐰", href: "/services-nac"   as const },
];

export function HomeHero() {
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
            Disponible 7j/7 partout en France
          </motion.div>

          {/* Main title — "chouchoute" highlighted */}
          <motion.h1
            className="text-display text-[--color-chocolat] mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            La conciergerie qui{" "}
            <span style={{ color: "#E8705A" }}>chouchoute</span>{" "}
            votre animal
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lead mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            Services ultra-personnalisés pour animaux de compagnie partout en
            France : garde, promenades, toilettage, transport, comportement,
            bien-être, et bien d&apos;autres&hellip;
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
              style={{ background: "#E8705A" }}
            >
              Réserver maintenant
            </a>
            <Link
              href="/nos-services"
              className="inline-flex items-center gap-2 rounded-full border-2 px-7 py-3 text-sm font-semibold text-[--color-chocolat] bg-white/70 hover:bg-white transition-all duration-200"
              style={{ borderColor: "#E8705A" }}
            >
              Voir tous nos services
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
              1 200 avis
            </span>
          </motion.div>

          {/* Animal selector */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
          >
            <p className="text-[11px] font-semibold tracking-widest text-[--color-muted-foreground] uppercase mb-3">
              Mon compagnon est un :
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
            {[
              "Chouchouteurs vérifiés",
              "Assurance incluse",
              "Sans engagement",
            ].map((label) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className="text-emerald-500 font-bold text-base leading-none">✓</span>
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — polaroid collage ── */}
        <motion.div
          className="relative hidden lg:flex items-center justify-center h-[520px]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          {/* Warm blob background */}
          <div
            className="absolute inset-8 rounded-[60%_40%_55%_45%/50%_55%_45%_50%]"
            style={{ background: "#f5ddd0" }}
          />

          {/* Photo 1 — back, rotated left */}
          <div
            className="absolute z-10 shadow-xl"
            style={{ transform: "rotate(-8deg) translate(-30px, 40px)" }}
          >
            <div className="bg-white p-2 pb-8 rounded-sm w-48">
              <div className="relative w-full aspect-square overflow-hidden rounded-sm">
                <Image
                  src={PHOTOS.moodboard2}
                  alt="Animal chouchouté"
                  fill
                  className="object-cover"
                  sizes="200px"
                  priority
                />
              </div>
              <p
                className="text-[10px] text-center mt-2 text-[--color-chocolat]/50 italic"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Malka, chouchoutée par Mélanie
              </p>
            </div>
          </div>

          {/* Photo 2 — front, rotated right */}
          <div
            className="absolute z-20 shadow-2xl"
            style={{ transform: "rotate(4deg) translate(40px, -30px)" }}
          >
            <div className="bg-white p-2 pb-8 rounded-sm w-52">
              <div className="relative w-full aspect-square overflow-hidden rounded-sm">
                <Image
                  src={PHOTOS.moodboard1}
                  alt="Animal chouchouté"
                  fill
                  className="object-cover"
                  sizes="220px"
                  priority
                />
              </div>
              <p
                className="text-[10px] text-center mt-2 text-[--color-chocolat]/50 italic"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                chouchouté par Louise
              </p>
            </div>
          </div>

          {/* Heart emoji */}
          <div className="absolute z-30 text-2xl" style={{ top: "52%", left: "32%" }}>
            ❤️
          </div>

          {/* Stat card — families */}
          <motion.div
            className="absolute top-6 right-4 bg-white rounded-2xl shadow-lg px-5 py-3 z-30"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p className="text-2xl font-bold leading-none" style={{ color: "#E8705A" }}>
              2 347
            </p>
            <p className="text-xs text-[--color-muted-foreground] mt-0.5">
              Familles accompagnées
            </p>
          </motion.div>

          {/* Stat card — satisfaction */}
          <motion.div
            className="absolute bottom-10 left-4 bg-white rounded-2xl shadow-lg px-5 py-3 z-30"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="text-2xl font-bold leading-none" style={{ color: "#4BBFAA" }}>
              98%
            </p>
            <p className="text-xs text-[--color-muted-foreground] mt-0.5">
              Taux de satisfaction
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
