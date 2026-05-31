import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { PHOTOS } from "@/lib/assets";
import GraduationCapIcon from "@/components/icons/graduation-cap-icon";
import PartyPopperIcon from "@/components/icons/party-popper-icon";
import HandHeartIcon from "@/components/icons/hand-heart-icon";
import PawPrintIcon from "@/components/icons/paw-print-icon";
import HeartHandshakeIcon from "@/components/icons/heart-handshake-icon";
import { AnimatedCard } from "@/components/ui/animated-card";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("vip_club.meta_title"),
    description: t("vip_club.meta_description"),
    alternates: buildAlternates("/vip-club", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function VipClubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const BENEFITS = [
    {
      Icon: GraduationCapIcon,
      title: t("vip_club.ben_ateliers_title"),
      desc: t("vip_club.ben_ateliers_desc"),
    },
    {
      Icon: PartyPopperIcon,
      title: t("vip_club.ben_invitations_title"),
      desc: t("vip_club.ben_invitations_desc"),
    },
    {
      Icon: HandHeartIcon,
      title: t("vip_club.ben_cadeaux_title"),
      desc: t("vip_club.ben_cadeaux_desc"),
    },
    {
      Icon: PawPrintIcon,
      title: t("vip_club.ben_rencontres_title"),
      desc: t("vip_club.ben_rencontres_desc"),
    },
    {
      Icon: HeartHandshakeIcon,
      title: t("vip_club.ben_associations_title"),
      desc: t("vip_club.ben_associations_desc"),
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-28 pb-20 px-6"
        style={{ background: "linear-gradient(135deg, #fde0d4 0%, #fdeee7 45%, #fdf6f2 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-medium text-[--color-chocolat] shadow-sm mb-6">
                <span className="text-base">👑</span>
                Very Important Pet
              </div>
              <h1
                className="text-[--color-chocolat] mb-6 font-normal"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.15 }}
              >
                Le{" "}
                <span className="text-accent">VIP Club</span>
                <br />
                <span className="text-[--color-muted-foreground]" style={{ fontSize: "0.65em" }}>
                  Very Important Pet
                </span>
              </h1>
              <p className="text-lead mb-8">
                {t("vip_club.hero_desc")}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
                style={{ background: "#E8705A" }}
              >
                {t("vip_club.hero_cta")}
              </a>
            </div>

            <div className="relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={PHOTOS.vipInvitation}
                  alt="VIP Club Petcheri"
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-5 -left-5 card-base px-5 py-4 flex items-center gap-3"
              >
                <PawPrintIcon size={22} color="#E8705A" />
                <div>
                  <p className="text-sm font-semibold text-[--color-chocolat]">{t("vip_club.badge_title")}</p>
                  <p className="text-xs text-[--color-muted-foreground]">{t("vip_club.badge_subtitle")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("vip_club.benefits_label")}
            title={t("vip_club.benefits_title")}
            subtitle={t("vip_club.benefits_subtitle")}
            className="mb-12"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.slice(0, 3).map(({ Icon, title, desc }) => (
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

          <div className="grid sm:grid-cols-2 gap-6 mt-6 max-w-3xl mx-auto">
            {BENEFITS.slice(3).map(({ Icon, title, desc }) => (
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

      {/* L'esprit du club */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label={t("vip_club.mission_label")}
                title={t("vip_club.mission_title")}
                align="left"
                className="mb-6"
              />
              <div className="space-y-4 text-sm text-[--color-muted-foreground] leading-relaxed">
                <p>{t("vip_club.mission_p1")}</p>
                <p>{t("vip_club.mission_p2")}</p>
                <p>{t("vip_club.mission_p3")}</p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
                  style={{ background: "#E8705A" }}
                >
                  {t("vip_club.mission_join")}
                </a>
                <a
                  href="/nos-services"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-[--color-chocolat] border border-[--color-border] hover:border-[--color-chocolat] transition-colors bg-white"
                >
                  {t("vip_club.mission_services")}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                PHOTOS.moodboard1,
                PHOTOS.moodboard2,
                PHOTOS.moodboard5,
                PHOTOS.moodboard6,
              ].map((src, i) => (
                <div key={i} className={`relative rounded-xl overflow-hidden ${i === 0 ? "aspect-square" : i === 1 ? "aspect-[3/4]" : i === 2 ? "aspect-[3/4]" : "aspect-square"}`}>
                  <Image
                    src={src}
                    alt="VIP Club Petcheri"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title={t("vip_club.banner_title")}
        subtitle={t("vip_club.banner_subtitle")}
        primaryCta={{ label: t("vip_club.banner_primary"), href: "/contact" }}
        secondaryCta={{ label: t("vip_club.banner_secondary"), href: "/qui-sommes-nous" }}
      />

      <Footer />
    </>
  );
}
