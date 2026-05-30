"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface PageHeroCenteredProps {
  /** Short pill badge above the title (e.g. "18 articles & guides") */
  badge?: string;
  /** Title — pass a fragment with an accent <span> for the coral highlight */
  title: ReactNode;
  /** Lead paragraph below the title */
  subtitle: string;
}

/**
 * Centered page hero — warm peach gradient, max-w-2xl, no image.
 * Use for listing pages (blog, bons plans) and utility pages (contact).
 *
 * Usage:
 *   <PageHeroCentered
 *     badge="18 articles & guides"
 *     title={<>Le blog <span style={{ color: "#E8705A" }}>Petcheri</span></>}
 *     subtitle="Conseils d'experts…"
 *   />
 */
export function PageHeroCentered({ badge, title, subtitle }: PageHeroCenteredProps) {
  return (
    <section
      className="pt-28 pb-16 px-6"
      style={{
        background: "linear-gradient(135deg, #fde0d4 0%, #fdeee7 45%, #fdf6f2 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-medium text-[--color-chocolat] shadow-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            {badge}
          </motion.div>
        )}

        <motion.h1
          className="text-h1 text-[--color-chocolat] mb-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-lead"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
