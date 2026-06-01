"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SendIcon from "@/components/icons/send-icon";

export function HomeNewsletter() {
  const t = useTranslations("home");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-20" style={{ background: "var(--gradient-newsletter)" }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <SendIcon size={32} color="white" className="mx-auto mb-5" />
        <h2 className="text-h2 text-ivoire mb-4">{t("newsletter_title")}</h2>
        <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(250,247,242,0.8)" }}>
          {t("newsletter_subtitle")}
        </p>

        {submitted ? (
          <div className="bg-sauge/20 border border-sauge/30 rounded-xl px-6 py-5">
            <p className="text-sauge-light font-medium">
              {t("newsletter_success")}
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
              className="flex-1 h-12 px-5 rounded-full text-sm outline-none transition-colors focus:border-or"
              style={{
                background: "rgba(250,247,242,0.1)",
                border: "1px solid rgba(250,247,242,0.2)",
                color: "#FAF7F2",
              }}
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
