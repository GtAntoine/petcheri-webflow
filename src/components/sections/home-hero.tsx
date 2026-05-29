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
    <section className="relative min-h-screen flex items-center bg-[--color-ivoire]">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0, ease: EASE }}
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
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {t("hero_title")}
          </motion.h1>

          <motion.p
            className="text-lead mb-10 max-w-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            {t("hero_subtitle")}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
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

          {/* Social proof */}
          <motion.div
            className="flex items-center gap-6 mt-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
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
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={PHOTOS.moodboard1}
              alt="Un animal heureux avec son chouchouteur Petcheri"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 50vw, 600px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
