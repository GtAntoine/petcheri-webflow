import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { SITE_STATS, BOOKING_URL } from "@/lib/site-stats";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedCardHorizontal } from "@/components/ui/animated-card-horizontal";
import { routing } from "@/i18n/routing";
import { ILLUSTRATIONS, PHOTOS } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";
import SparklesIcon from "@/components/icons/sparkles-icon";
import HeartHandshakeIcon from "@/components/icons/heart-handshake-icon";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import UsersIcon from "@/components/icons/users-icon";
import TrophyIcon from "@/components/icons/trophy-icon";
import GraduationCapIcon from "@/components/icons/graduation-cap-icon";
import HeartIcon from "@/components/icons/heart-icon";
import PawPrintIcon from "@/components/icons/paw-print-icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("devenir_petsitter.meta_title"),
    description: t("devenir_petsitter.meta_description", { sittersNetwork: SITE_STATS.sittersNetwork }),
    alternates: buildAlternates("/devenir-petsitter", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DevenirPetsitterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const AVANTAGES = [
    { Icon: SparklesIcon,       title: t("devenir_petsitter.avan_liberte_title"),    desc: t("devenir_petsitter.avan_liberte_desc") },
    { Icon: ShieldCheckIcon,    title: t("devenir_petsitter.avan_assurance_title"),  desc: t("devenir_petsitter.avan_assurance_desc") },
    { Icon: UsersIcon,          title: t("devenir_petsitter.avan_communaute_title"), desc: t("devenir_petsitter.avan_communaute_desc", { sittersNetwork: SITE_STATS.sittersNetwork }) },
    { Icon: GraduationCapIcon,  title: t("devenir_petsitter.avan_formation_title"),  desc: t("devenir_petsitter.avan_formation_desc") },
    { Icon: TrophyIcon,         title: t("devenir_petsitter.avan_visibilite_title"), desc: t("devenir_petsitter.avan_visibilite_desc") },
    { Icon: HeartHandshakeIcon, title: t("devenir_petsitter.avan_suivi_title"),      desc: t("devenir_petsitter.avan_suivi_desc") },
  ];

  const PROFILS = [
    { Icon: PawPrintIcon,      title: t("devenir_petsitter.prof_passionnes_title"), desc: t("devenir_petsitter.prof_passionnes_desc") },
    { Icon: GraduationCapIcon, title: t("devenir_petsitter.prof_pros_title"),       desc: t("devenir_petsitter.prof_pros_desc") },
    { Icon: HeartIcon,         title: t("devenir_petsitter.prof_reconversion_title"), desc: t("devenir_petsitter.prof_reconversion_desc") },
  ];

  const ETAPES = [
    { num: "01", title: t("devenir_petsitter.etape_1_title"), desc: t("devenir_petsitter.etape_1_desc") },
    { num: "02", title: t("devenir_petsitter.etape_2_title"), desc: t("devenir_petsitter.etape_2_desc") },
    { num: "03", title: t("devenir_petsitter.etape_3_title"), desc: t("devenir_petsitter.etape_3_desc") },
    { num: "04", title: t("devenir_petsitter.etape_4_title"), desc: t("devenir_petsitter.etape_4_desc") },
  ];

  const TEMOIGNAGES = [
    { quote: t("devenir_petsitter.temo_1_quote"), author: t("devenir_petsitter.temo_1_author"), detail: t("devenir_petsitter.temo_1_detail") },
    { quote: t("devenir_petsitter.temo_2_quote"), author: t("devenir_petsitter.temo_2_author"), detail: t("devenir_petsitter.temo_2_detail") },
    { quote: t("devenir_petsitter.temo_3_quote"), author: t("devenir_petsitter.temo_3_author"), detail: t("devenir_petsitter.temo_3_detail") },
  ];

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("devenir_petsitter.hero_badge")}
        title={
          <>
            {t("devenir_petsitter.hero_title")}{" "}
            <span className="text-accent">{t("devenir_petsitter.hero_title_accent")}</span>
          </>
        }
        subtitle={t("devenir_petsitter.hero_subtitle", { sittersNetwork: SITE_STATS.sittersNetwork })}
        ctas={[
          { label: t("devenir_petsitter.hero_cta_primary"), href: BOOKING_URL, external: true, primary: true },
          { label: t("devenir_petsitter.hero_cta_secondary"), href: "#avantages" },
        ]}
        image={ILLUSTRATIONS.heroPetsitter}
        imageAlt={t("devenir_petsitter.hero_image_alt")}
        trustBadges={[t("devenir_petsitter.trust_1", { sittersNetwork: SITE_STATS.sittersNetwork }), t("devenir_petsitter.trust_2"), t("devenir_petsitter.trust_3")]}
        variant="warm"
      />

      {/* Stats strip */}
      <section className="py-10 bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: `${SITE_STATS.sittersNetwork}+`, label: t("devenir_petsitter.stats_1_label") },
              { value: "80%",   label: t("devenir_petsitter.stats_2_label") },
              { value: `${SITE_STATS.googleRating.toLocaleString("fr-FR")}/5`, label: t("devenir_petsitter.stats_3_label") },
              { value: "9M€",   label: t("devenir_petsitter.stats_4_label") },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="font-normal leading-none"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)", color: "#E8705A" }}
                >
                  {value}
                </span>
                <span className="text-sm text-[--color-muted-foreground]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("devenir_petsitter.avan_label")}
            title={t("devenir_petsitter.avan_title")}
            subtitle={t("devenir_petsitter.avan_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AVANTAGES.map(({ Icon, title, desc }) => (
              <AnimatedCard key={title} Icon={Icon} className="p-7 flex flex-col gap-4">
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

      {/* Profils recherchés */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label={t("devenir_petsitter.profils_label")}
                title={t("devenir_petsitter.profils_title")}
                subtitle={t("devenir_petsitter.profils_subtitle")}
                align="left"
                className="mb-8"
              />
              <div className="flex flex-col gap-4">
                {PROFILS.map(({ Icon, title, desc }) => (
                  <AnimatedCardHorizontal key={title} Icon={Icon}>
                    <h3
                      className="text-[--color-chocolat] font-medium"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)" }}
                    >
                      {title}
                    </h3>
                    <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
                  </AnimatedCardHorizontal>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[PHOTOS.chouchouteur2, PHOTOS.chouchouteur5, PHOTOS.chouchouteur6, PHOTOS.chouchouteur7].map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image src={src} alt="Chouchouteur Petcheri" fill className="object-cover" sizes="25vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="section-padding bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("devenir_petsitter.etapes_label")}
            title={t("devenir_petsitter.etapes_title")}
            subtitle={t("devenir_petsitter.etapes_subtitle")}
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ETAPES.map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col gap-4">
                <span
                  className="font-normal text-[--color-or]"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1 }}
                >
                  {num}
                </span>
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignage chouchouteur */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden max-h-[520px]">
              <Image
                src={PHOTOS.chouchouteur9}
                alt="Chouchouteur Petcheri"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div
                className="absolute -bottom-0 left-0 right-0 p-6"
                style={{ background: "linear-gradient(to top, rgba(44,24,16,0.85) 0%, transparent 100%)" }}
              >
                <p className="text-white/90 text-sm italic leading-relaxed">
                  &ldquo;{t("devenir_petsitter.temo_main_quote")}&rdquo;
                </p>
                <p className="text-white/60 text-xs mt-2">{t("devenir_petsitter.temo_main_author")}</p>
              </div>
            </div>
            <div>
              <SectionHeader
                label={t("devenir_petsitter.temo_label")}
                title={t("devenir_petsitter.temo_title")}
                subtitle={t("devenir_petsitter.temo_subtitle", { sittersNetwork: SITE_STATS.sittersNetwork })}
                align="left"
                className="mb-8"
              />
              <div className="space-y-4">
                {TEMOIGNAGES.map(({ quote, author, detail }) => (
                  <div key={author} className="p-5 rounded-xl bg-[--color-ivoire] border border-[--color-border]">
                    <p className="text-sm text-[--color-chocolat] italic leading-relaxed mb-3">&ldquo;{quote}&rdquo;</p>
                    <div>
                      <p className="text-xs font-semibold text-[--color-chocolat]">{author}</p>
                      <p className="text-xs text-[--color-muted-foreground]">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title={t("devenir_petsitter.banner_title")}
        subtitle={t("devenir_petsitter.banner_subtitle")}
        primaryCta={{ label: t("devenir_petsitter.banner_primary"), href: BOOKING_URL, external: true }}
        secondaryCta={{ label: t("devenir_petsitter.banner_secondary"), href: "/contact" }}
      />

      <Footer />
    </>
  );
}
