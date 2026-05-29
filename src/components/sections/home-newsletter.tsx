"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function HomeNewsletter() {
  const t = useTranslations("home");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-[--color-chocolat] py-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <Mail className="w-8 h-8 text-[--color-or] mx-auto mb-5" />
        <h2 className="text-h2 text-[--color-ivoire] mb-4">{t("newsletter_title")}</h2>
        <p className="text-[--color-ivoire]/60 text-sm leading-relaxed mb-10">
          {t("newsletter_subtitle")}
        </p>

        {submitted ? (
          <div className="bg-[--color-sauge]/20 border border-[--color-sauge]/30 rounded-xl px-6 py-5">
            <p className="text-[--color-sauge-light] font-medium">
              Merci ! Vous êtes bien inscrit.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter_placeholder")}
              required
              className="flex-1 h-12 px-5 rounded-full bg-[--color-ivoire]/10 border border-[--color-ivoire]/20 text-[--color-ivoire] placeholder:text-[--color-ivoire]/40 text-sm outline-none focus:border-[--color-or] transition-colors"
            />
            <Button variant="or" size="md" type="submit">
              {t("newsletter_cta")}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
