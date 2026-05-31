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
import { BOOKING_URL } from "@/lib/site-stats";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("garde_chat.meta_title"),
    description: t("garde_chat.meta_description"),
    alternates: buildAlternates("/garde-chat", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function GardeChatPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const FORMULES = [
    { title: t("garde_chat.form_visite_title"), desc: t("garde_chat.form_visite_desc"), ideal: t("garde_chat.form_visite_ideal") },
    { title: t("garde_chat.form_garde_dom_title"), desc: t("garde_chat.form_garde_dom_desc"), ideal: t("garde_chat.form_garde_dom_ideal") },
    { title: t("garde_chat.form_garde_chez_title"), desc: t("garde_chat.form_garde_chez_desc"), ideal: t("garde_chat.form_garde_chez_ideal") },
    { title: t("garde_chat.form_pension_title"), desc: t("garde_chat.form_pension_desc"), ideal: t("garde_chat.form_pension_ideal") },
  ];

  const INCLUS = [
    t("garde_chat.inclus_1"),
    t("garde_chat.inclus_2"),
    t("garde_chat.inclus_3"),
    t("garde_chat.inclus_4"),
    t("garde_chat.inclus_5"),
    t("garde_chat.inclus_6"),
  ];

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("garde_chat.hero_badge")}
        title={
          <>
            {t("garde_chat.hero_title")}{" "}
            <span className="text-accent">{t("garde_chat.hero_title_accent")}</span>
          </>
        }
        subtitle={t("garde_chat.hero_subtitle")}
        ctas={[
          { label: t("garde_chat.hero_cta_primary"), href: BOOKING_URL, external: true, primary: true },
          { label: t("garde_chat.hero_cta_secondary"), href: "/services-chat" },
        ]}
        image={ILLUSTRATIONS.catSitting}
        imageAlt={t("garde_chat.hero_image_alt")}
        trustBadges={[t("garde_chat.trust_1"), t("garde_chat.trust_2"), t("garde_chat.trust_3")]}
        variant="warm"
      />

      {/* Formules */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("garde_chat.formules_label")}
            title={t("garde_chat.formules_title")}
            subtitle={t("garde_chat.formules_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {FORMULES.map((f) => (
              <div key={f.title} className="card-base p-7 flex flex-col gap-3">
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{f.desc}</p>
                <span
                  className="text-xs font-semibold mt-auto px-3 py-1 rounded-full self-start"
                  style={{ background: "#fde0d4", color: "#E8705A" }}
                >
                  {f.ideal}
                </span>
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
              {t("garde_chat.form_btn")}
            </a>
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label={t("garde_chat.inclus_label")}
                title={t("garde_chat.inclus_title")}
                subtitle={t("garde_chat.inclus_subtitle")}
                align="left"
                className="mb-8"
              />
              <ul className="space-y-4">
                {INCLUS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: "#E8705A" }}
                    >
                      ✓
                    </span>
                    <span className="text-sm text-[--color-muted-foreground] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={PHOTOS.chouchouteur3}
                alt="Chouchouteur spécialisé chats Petcheri"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title={t("garde_chat.banner_title")}
        subtitle={t("garde_chat.banner_subtitle")}
        primaryCta={{ label: t("garde_chat.banner_primary"), href: BOOKING_URL, external: true }}
        secondaryCta={{ label: t("garde_chat.banner_secondary"), href: "/services-chat" }}
      />

      <Footer />
    </>
  );
}
