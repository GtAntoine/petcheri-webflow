import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { SITE_STATS } from "@/lib/site-stats";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { ILLUSTRATIONS, PHOTOS, PRESS, AWARDS } from "@/lib/assets";
import HeartHandshakeIcon from "@/components/icons/heart-handshake-icon";
import SparklesIcon from "@/components/icons/sparkles-icon";
import SearchIcon from "@/components/icons/search-icon";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import { AnimatedCard } from "@/components/ui/animated-card";
import { StatsCounter } from "@/components/sections/stats-counter";
import { buildAlternates } from "@/lib/seo";
import { HomeNewsletter } from "@/components/sections/home-newsletter";
import { HomeBlog } from "@/components/sections/home-blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("qui_sommes_nous.meta_title"),
    description: t("qui_sommes_nous.meta_description", { sittersNetwork: SITE_STATS.sittersNetwork }),
    alternates: buildAlternates("/qui-sommes-nous", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function QuiSommesNousPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const VALUES = [
    { Icon: HeartHandshakeIcon, title: t("qui_sommes_nous.val_confiance_title"),   desc: t("qui_sommes_nous.val_confiance_desc") },
    { Icon: SparklesIcon,       title: t("qui_sommes_nous.val_excellence_title"),  desc: t("qui_sommes_nous.val_excellence_desc") },
    { Icon: SearchIcon,         title: t("qui_sommes_nous.val_transparence_title"),desc: t("qui_sommes_nous.val_transparence_desc") },
    { Icon: ShieldCheckIcon,    title: t("qui_sommes_nous.val_securite_title"),    desc: t("qui_sommes_nous.val_securite_desc") },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-28 pb-20 px-6"
        style={{ background: "var(--gradient-about-hero)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-or] mb-4 block">
                {t("qui_sommes_nous.hero_badge")}
              </span>
              <h1
                className="text-[--color-chocolat] mb-6 font-normal"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.15 }}
              >
                {t("qui_sommes_nous.hero_title")}{" "}
                <span className="text-accent">{t("qui_sommes_nous.hero_title_accent")}</span>
              </h1>
              <p className="text-lead mb-8">
                {t("qui_sommes_nous.hero_subtitle")}
              </p>
              <div className="flex flex-wrap gap-6">
                {[
                  { value: t("qui_sommes_nous.hero_stat_1_value", { sittersNetwork: SITE_STATS.sittersNetwork }), label: t("qui_sommes_nous.hero_stat_1_label") },
                  { value: t("qui_sommes_nous.hero_stat_2_value"), label: t("qui_sommes_nous.hero_stat_2_label") },
                  { value: `${SITE_STATS.googleRating.toLocaleString("fr-FR")}/5`, label: t("qui_sommes_nous.hero_stat_3_label") },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col">
                    <span
                      className="font-normal text-[--color-chocolat]"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)", lineHeight: 1 }}
                    >
                      {value}
                    </span>
                    <span className="text-sm text-[--color-muted-foreground] mt-1">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={ILLUSTRATIONS.heroAbout}
                alt={t("qui_sommes_nous.hero_image_alt")}
                fill
                className="object-cover"
                sizes="50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Notre histoire — Mélanie */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={ILLUSTRATIONS.about}
                  alt={t("qui_sommes_nous.histoire_image_alt")}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              {/* Floating quote */}
              <div
                className="absolute -bottom-6 -right-6 card-base p-5 max-w-[240px]"
                style={{ background: "var(--gradient-quote-pink)" }}
              >
                <p className="text-sm font-medium text-[--color-chocolat] leading-relaxed">
                  &ldquo;{t("qui_sommes_nous.histoire_floating_quote")}&rdquo;
                </p>
                <p className="text-sm text-[--color-muted-foreground] mt-2">{t("qui_sommes_nous.histoire_floating_author")}</p>
              </div>
            </div>

            <div>
              <SectionHeader
                label={t("qui_sommes_nous.histoire_label")}
                title={t("qui_sommes_nous.histoire_title")}
                align="left"
                className="mb-6"
              />
              <div className="space-y-4 text-sm text-[--color-muted-foreground] leading-relaxed">
                <p>{t("qui_sommes_nous.histoire_p1")}</p>
                <p>{t("qui_sommes_nous.histoire_p2")}</p>
                <p>{t("qui_sommes_nous.histoire_p3")}</p>
                <p className="font-medium text-[--color-chocolat]">{t("qui_sommes_nous.histoire_p4")}</p>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-[--color-creme]">
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">
                  &ldquo;{t("qui_sommes_nous.histoire_quote")}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 valeurs */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("qui_sommes_nous.values_label")}
            title={t("qui_sommes_nous.values_title")}
            subtitle={t("qui_sommes_nous.values_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ Icon, title, desc }) => (
              <AnimatedCard key={title} Icon={Icon} className="p-7 flex flex-col gap-4 text-center items-center">
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Nos chouchouteurs */}
      <section className="section-padding" style={{ background: "linear-gradient(160deg, var(--color-chocolat) 0%, var(--color-chocolat-light) 100%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] mb-4 block" style={{ color: "#E8705A" }}>
                {t("qui_sommes_nous.network_badge")}
              </span>
              <h2
                className="text-white mb-6 font-normal"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.2 }}
              >
                {t("qui_sommes_nous.network_title")}
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                {t("qui_sommes_nous.network_p1")}
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { value: t("qui_sommes_nous.network_stat_1_value", { sittersNetwork: SITE_STATS.sittersNetwork }), label: t("qui_sommes_nous.network_stat_1_label") },
                  { value: t("qui_sommes_nous.network_stat_2_value"), label: t("qui_sommes_nous.network_stat_2_label") },
                  { value: t("qui_sommes_nous.network_stat_3_value"), label: t("qui_sommes_nous.network_stat_3_label") },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span
                      className="font-normal"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)", color: "#E8705A", lineHeight: 1 }}
                    >
                      {value}
                    </span>
                    <span className="text-white/60 text-xs leading-snug">{label}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                {t("qui_sommes_nous.network_p2")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[PHOTOS.chouchouteur1, PHOTOS.chouchouteur2, PHOTOS.chouchouteur3, PHOTOS.chouchouteur4].map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image src={src} alt="Chouchouteur Petcheri" fill className="object-cover" sizes="25vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Récompenses */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("qui_sommes_nous.awards_label")}
            title={t("qui_sommes_nous.awards_title")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                logo: AWARDS.pepitesTech,
                alt:  "Pépites du Tech",
                title: t("qui_sommes_nous.award_1_title"),
                date:  t("qui_sommes_nous.award_1_date"),
                desc:  t("qui_sommes_nous.award_1_desc"),
              },
              {
                logo: AWARDS.purina,
                alt:  "Purina by Nestlé",
                title: t("qui_sommes_nous.award_2_title"),
                date:  t("qui_sommes_nous.award_2_date"),
                desc:  t("qui_sommes_nous.award_2_desc"),
              },
            ].map(({ logo, alt, title, date, desc }) => (
              <div
                key={alt}
                className="card-base p-7 flex flex-col gap-4 text-center items-center"
                style={{ background: "var(--gradient-quote-pink)" }}
              >
                <div className="h-16 w-full flex items-center justify-center">
                  <Image src={logo} alt={alt} width={120} height={64} className="object-contain max-h-16" />
                </div>
                <div>
                  <p
                    className="text-[--color-chocolat] font-medium mb-1"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem" }}
                  >
                    {title}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: "#E8705A" }}>{date}</p>
                </div>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <StatsCounter variant="dark" />

    

      {/* Presse */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("qui_sommes_nous.press_label")}
            title={t("qui_sommes_nous.press_title")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { logo: PRESS.marieClaire, alt: "Marie Claire", quote: t("qui_sommes_nous.press_marie_claire_quote"), href: "https://www.marieclaire.fr/adresses-incontournables/tout-pour-le-toutou/" },
              { logo: PRESS.gala,        alt: "Gala",         quote: t("qui_sommes_nous.press_gala_quote"),         href: "https://www.moncarnet-gala.fr/articles/view/TOUT-POUR-LE-TOUTOU" },
              { logo: PRESS.luxuryPlace, alt: "Luxury Place", quote: t("qui_sommes_nous.press_luxury_quote"),       href: "https://luxury-place.fr/2023/11/09/tout-pour-le-toutou-revolutionner-les-services-pour-animaux-de-compagnie-en-france/" },
            ].map(({ logo, alt, quote, href }) => (
              <a key={alt} href={href} target="_blank" rel="noopener noreferrer" className="card-base p-4 flex flex-col items-center gap-5 text-center hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all">
                <div className="h-30 flex items-center justify-center">
                  <Image src={logo} alt={alt} width={120} height={40} className="object-contain" />
                </div>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed italic flex-1">
                  &ldquo;{quote}&rdquo;
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <HomeBlog locale={locale} />

      <HomeNewsletter />

      <CtaBanner
        title={t("qui_sommes_nous.banner_title")}
        subtitle={t("qui_sommes_nous.banner_subtitle")}
        primaryCta={{ label: t("qui_sommes_nous.banner_primary"), href: "/devenir-petsitter" }}
        secondaryCta={{ label: t("qui_sommes_nous.banner_secondary"), href: "/nos-services" }}
      />

      <Footer />
    </>
  );
}
