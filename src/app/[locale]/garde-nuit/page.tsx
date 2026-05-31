import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { ILLUSTRATIONS, PHOTOS } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";
import MessageSquareIcon from "@/components/icons/message-square-icon";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import SendIcon from "@/components/icons/send-icon";
import { BOOKING_URL } from "@/lib/site-stats";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("garde_nuit.meta_title"),
    description: t("garde_nuit.meta_description"),
    alternates: buildAlternates("/garde-nuit", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function GardeNuitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const FORMULES = [
    {
      title: t("garde_nuit.form_soiree_title"),
      duration: t("garde_nuit.form_soiree_duration"),
      desc: t("garde_nuit.form_soiree_desc"),
      includes: [t("garde_nuit.form_soiree_i1"), t("garde_nuit.form_soiree_i2"), t("garde_nuit.form_soiree_i3")],
    },
    {
      title: t("garde_nuit.form_nuit_title"),
      duration: t("garde_nuit.form_nuit_duration"),
      desc: t("garde_nuit.form_nuit_desc"),
      includes: [t("garde_nuit.form_nuit_i1"), t("garde_nuit.form_nuit_i2"), t("garde_nuit.form_nuit_i3"), t("garde_nuit.form_nuit_i4")],
    },
    {
      title: t("garde_nuit.form_weekend_title"),
      duration: t("garde_nuit.form_weekend_duration"),
      desc: t("garde_nuit.form_weekend_desc"),
      includes: [t("garde_nuit.form_weekend_i1"), t("garde_nuit.form_weekend_i2"), t("garde_nuit.form_weekend_i3"), t("garde_nuit.form_weekend_i4")],
    },
  ];

  const REASSURANCE = [
    { Icon: MessageSquareIcon, label: t("garde_nuit.rea_photos_label"), desc: t("garde_nuit.rea_photos_desc") },
    { Icon: ShieldCheckIcon, label: t("garde_nuit.rea_axa_label"), desc: t("garde_nuit.rea_axa_desc") },
    { Icon: SendIcon, label: t("garde_nuit.rea_urgence_label"), desc: t("garde_nuit.rea_urgence_desc") },
  ];

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("garde_nuit.hero_badge")}
        title={
          <>
            {t("garde_nuit.hero_title")}{" "}
            <span className="text-accent">{t("garde_nuit.hero_title_accent")}</span>
          </>
        }
        subtitle={t("garde_nuit.hero_subtitle")}
        ctas={[
          { label: t("garde_nuit.hero_cta_primary"), href: BOOKING_URL, external: true, primary: true },
          { label: t("garde_nuit.hero_cta_secondary"), href: "/garde-journee" },
        ]}
        image={ILLUSTRATIONS.gardeNuit}
        imageAlt={t("garde_nuit.hero_image_alt")}
        trustBadges={[t("garde_nuit.trust_1"), t("garde_nuit.trust_2"), t("garde_nuit.trust_3")]}
        variant="warm"
      />

      {/* Formules */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("garde_nuit.formules_label")}
            title={t("garde_nuit.formules_title")}
            subtitle={t("garde_nuit.formules_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-3 gap-6">
            {FORMULES.map((f) => (
              <div key={f.title} className="card-base p-7 flex flex-col gap-4">
                <div className="flex items-end justify-between">
                  <h3
                    className="text-[--color-chocolat] font-medium"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                  >
                    {f.title}
                  </h3>
                  <span
                    className="text-xs font-semibold px-3 py-0.5 rounded-full"
                    style={{ background: "#fde0d4", color: "#E8705A" }}
                  >
                    {f.duration}
                  </span>
                </div>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{f.desc}</p>
                <ul className="mt-auto space-y-1.5">
                  {f.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[--color-muted-foreground]">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#E8705A" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
              style={{ background: "#E8705A" }}
            >
              {t("garde_nuit.form_btn")}
            </a>
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label={t("garde_nuit.reassurance_label")}
                title={t("garde_nuit.reassurance_title")}
                subtitle={t("garde_nuit.reassurance_subtitle")}
                align="left"
                className="mb-8"
              />
              <div className="space-y-4">
                {REASSURANCE.map(({ Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "#fde0d4" }}
                    >
                      <Icon size={18} color="#E8705A" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[--color-chocolat]">{label}</p>
                      <p className="text-sm text-[--color-muted-foreground]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={PHOTOS.moodboard6}
                alt="Chien paisible avec son chouchouteur"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title={t("garde_nuit.banner_title")}
        subtitle={t("garde_nuit.banner_subtitle")}
        primaryCta={{ label: t("garde_nuit.banner_primary"), href: BOOKING_URL, external: true }}
        secondaryCta={{ label: t("garde_nuit.banner_secondary"), href: "/garde-chat" }}
      />

      <Footer />
    </>
  );
}
