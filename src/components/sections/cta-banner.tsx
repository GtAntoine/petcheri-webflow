"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface CtaBannerProps {
  title: string;
  subtitle?: string;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
}

export function CtaBanner({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: CtaBannerProps) {
  return (
    <section
      className="py-20 px-6 text-center"
      style={{
        background: "linear-gradient(135deg, #fde0d4 0%, #fdeee7 55%, #fdf6f2 100%)",
      }}
    >
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-h1 text-[--color-chocolat] mb-4">{title}</h2>
        {subtitle && (
          <p className="text-lead mb-10">{subtitle}</p>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          {primaryCta.external ? (
            <a
              href={primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-200"
              style={{ background: "#C0432D" }}
            >
              {primaryCta.label}
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <Link
              href={primaryCta.href as Parameters<typeof Link>[0]["href"]}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-200"
              style={{ background: "#C0432D" }}
            >
              {primaryCta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {secondaryCta &&
            (secondaryCta.external ? (
              <a
                href={secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 px-8 py-3.5 text-sm font-semibold text-[--color-chocolat] bg-white/70 hover:bg-white transition-all duration-200"
                style={{ borderColor: "#E8705A" }}
              >
                {secondaryCta.label}
              </a>
            ) : (
              <Link
                href={secondaryCta.href as Parameters<typeof Link>[0]["href"]}
                className="inline-flex items-center gap-2 rounded-full border-2 px-8 py-3.5 text-sm font-semibold text-[--color-chocolat] bg-white/70 hover:bg-white transition-all duration-200"
                style={{ borderColor: "#E8705A" }}
              >
                {secondaryCta.label}
              </Link>
            ))}
        </div>
      </motion.div>
    </section>
  );
}
