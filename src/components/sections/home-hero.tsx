"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Star } from "lucide-react";
import { PHOTOS } from "@/lib/assets";

const PETCHERI_APP = "https://app.petcheri.com";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function HomeHero() {
  const t = useTranslations("home");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[--color-ivoire]">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-chocolat) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative gold circle */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[--color-or]/8 blur-[80px] pointer-events-none" />
      <div className="absolute -left-20 bottom-0 w-[400px] h-[400px] rounded-full bg-[--color-sauge]/10 blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0, ease: EASE }}
          >
            <Badge variant="or" className="mb-6">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
              400 prestataires certifiés · Assurance AXA
            </Badge>
          </motion.div>

          <motion.h1
            className="text-display text-[--color-chocolat] mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            {t("hero_title")}
          </motion.h1>

          <motion.p
            className="text-lead mb-10 max-w-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            {t("hero_subtitle")}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            <Button variant="or" size="lg" asChild>
              <a href={PETCHERI_APP} target="_blank" rel="noopener noreferrer">
                {t("hero_cta")}
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/qui-sommes-nous">
                {t("hero_secondary_cta")}
              </Link>
            </Button>
          </motion.div>

          {/* Social proof row */}
          <motion.div
            className="flex items-center gap-6 mt-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-[--color-creme] border-2 border-white flex items-center justify-center text-xs font-medium text-[--color-chocolat]"
                >
                  {["ML", "SC", "AT", "PR"][i - 1]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[--color-or] text-[--color-or]" />
                ))}
              </div>
              <p className="text-xs text-[--color-muted-foreground]">
                4,9/5 · Plus de 1 200 avis clients
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: image */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[--shadow-card-hover]">
            <Image
              src={PHOTOS.moodboard1}
              alt="Un animal heureux avec son chouchouteur Petcheri"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 50vw, 600px"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[--color-chocolat]/20 to-transparent" />
          </div>

          {/* Floating badge */}
          <motion.div
            className="absolute -left-8 bottom-12 bg-white rounded-xl shadow-[--shadow-card-hover] px-5 py-4 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="w-10 h-10 rounded-full bg-[--color-sauge]/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[--color-sauge-dark]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[--color-chocolat]">Assurance AXA</p>
              <p className="text-xs text-[--color-muted-foreground]">Incluse dans chaque service</p>
            </div>
          </motion.div>

          {/* Gold accent ring */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-2 border-[--color-or]/30" />
        </motion.div>
      </div>
    </section>
  );
}
