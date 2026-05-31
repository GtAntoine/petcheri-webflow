import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { PressLogos } from "@/components/sections/press-logos";
import { routing } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { SITE_STATS, fmtFR, BOOKING_URL, GOOGLE_REVIEW_URL } from "@/lib/site-stats";
import { Star } from "lucide-react";
import MessageSquareIcon from "@/components/icons/message-square-icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("vos_avis.meta_title"),
    description: t("vos_avis.meta_description"),
    alternates: buildAlternates("/vos-avis", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const TESTIMONIALS = [
  {
    text: "Petcheri a trouvé la personne parfaite pour notre golden en moins de 24h. Suivi impeccable, photos régulières — on partait serein. Je ne ferai jamais autrement.",
    author: "Marie-Laure D.",
    pet: "Sirius, Golden Retriever",
    service: "Garde à domicile",
    rating: 5,
  },
  {
    text: "Ce qui m'a séduit, c'est le niveau d'exigence. Les chouchouteurs sont vraiment certifiés, l'assurance est réelle, et l'équipe répond en quelques minutes. Du vrai sur-mesure.",
    author: "Thomas A.",
    pet: "Luna, Siberian Husky",
    service: "Garde de nuit",
    rating: 5,
  },
  {
    text: "Mon chat est casanier et stressé. La chouchouteuse a pris le temps de le rencontrer avant, de comprendre ses habitudes. Il était parfaitement à l'aise à notre retour.",
    author: "Sophie C.",
    pet: "Mochi, British Shorthair",
    service: "Garde de chat",
    rating: 5,
  },
  {
    text: "La promenade avec rapport de sortie et photos en temps réel, c'est exactement ce qu'il me fallait. Mon border collie rentre épuisé et heureux. Merci Petcheri !",
    author: "Émilie R.",
    pet: "Pixel, Border Collie",
    service: "Promenade",
    rating: 5,
  },
  {
    text: "Après une opération du genou, notre labrador avait besoin de soins très spécifiques. La chouchouteuse connaissait parfaitement les protocoles post-op. Remarquable.",
    author: "Bertrand L.",
    pet: "Noisette, Labrador",
    service: "Garde post-opératoire",
    rating: 5,
  },
  {
    text: "On a utilisé Petcheri pour le transport de notre lapin nain chez le vétérinaire. Prise en charge douce, retour rapide avec compte-rendu. On recommande sans hésiter.",
    author: "Anaïs M.",
    pet: "Caramel, Lapin nain",
    service: "Transport NAC",
    rating: 5,
  },
  {
    text: "Notre chienne avait des troubles d'anxiété de séparation. En 3 séances avec le comportementaliste Petcheri, elle a retrouvé un équilibre incroyable. Une vraie expertise.",
    author: "Clément V.",
    pet: "Zélie, Beagle",
    service: "Comportement & éducation",
    rating: 5,
  },
  {
    text: "Le toilettage à domicile c'est un luxe dont on ne peut plus se passer ! La toiletteuse est patiente, professionnelle et Cosmo ressort comme un prince.",
    author: "Nathalie B.",
    pet: "Cosmo, Caniche",
    service: "Toilettage",
    rating: 5,
  },
  {
    text: "Je suis très exigeante pour mon chien. Petcheri est le seul service qui a répondu à ce niveau d'exigence — sélection des profils, assurance, suivi. Enfin du sérieux.",
    author: "Isabelle F.",
    pet: "Romeo, Bouledogue français",
    service: "Garde à domicile",
    rating: 5,
  },
] as const;

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[--color-or] text-[--color-or]" />
      ))}
    </div>
  );
}

export default async function VosAvisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-28 pb-16 px-6"
        style={{ background: "linear-gradient(135deg, #fde0d4 0%, #fdeee7 45%, #fdf6f2 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-or] mb-4 block">
            {t("vos_avis.hero_badge")}
          </span>
          <h1
            className="text-[--color-chocolat] mb-6 font-normal"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.15 }}
          >
            {t("vos_avis.hero_title")}{" "}
            <span className="text-accent">{t("vos_avis.hero_title_accent")}</span>
          </h1>
          <p className="text-lead mb-10">
            {t("vos_avis.hero_subtitle")}
          </p>

          {/* Google badge */}
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 border border-[--color-border] shadow-sm">
            {/* Google G icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <span
                  className="font-normal text-[--color-chocolat]"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", lineHeight: 1 }}
                >
                  {SITE_STATS.googleRating.toLocaleString("fr-FR")}
                </span>
                <StarRow count={5} />
              </div>
              <span className="text-xs text-[--color-muted-foreground]">
                {SITE_STATS.googleReviewCount} avis Google
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b border-[--color-border]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: `${SITE_STATS.googleRating.toLocaleString("fr-FR")}/5`, label: t("vos_avis.stat_1_label") },
              { value: `${fmtFR(SITE_STATS.familiesServed)}+`,                 label: t("vos_avis.stat_2_label") },
              { value: `${SITE_STATS.satisfactionRate}%`,                       label: t("vos_avis.stat_3_label") },
              { value: `${fmtFR(SITE_STATS.servicesDone)}+`,                    label: t("vos_avis.stat_4_label") },
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

      {/* Testimonials grid */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("vos_avis.temo_label")}
            title={t("vos_avis.temo_title")}
            subtitle={t("vos_avis.temo_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((item, i) => (
              <div key={i} className="card-base p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <MessageSquareIcon size={22} color="var(--color-or)" className="opacity-50 shrink-0 mt-0.5" />
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
                    style={{ background: "#fde0d4", color: "#E8705A" }}
                  >
                    {item.service}
                  </span>
                </div>
                <p className="text-[--color-chocolat] leading-relaxed italic text-sm flex-1">
                  &ldquo;{item.text}&rdquo;
                </p>
                <StarRow count={item.rating} />
                <div className="flex items-center gap-3 pt-1 border-t border-[--color-border]">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
                    style={{ background: "#C0432D" }}
                  >
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[--color-chocolat]">{item.author}</p>
                    <p className="text-xs text-[--color-muted-foreground]">{item.pet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laisser un avis */}
      <section className="py-14 bg-white border-y border-[--color-border]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p
            className="text-[--color-chocolat] font-normal mb-3"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
          >
            {t("vos_avis.share_title")}
          </p>
          <p className="text-sm text-[--color-muted-foreground] mb-6 leading-relaxed">
            {t("vos_avis.share_desc")}
          </p>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
            style={{ background: "#C0432D" }}
          >
            {t("vos_avis.share_btn")}
          </a>
        </div>
      </section>

      {/* Presse */}
      <PressLogos />

      <CtaBanner
        title={t("vos_avis.banner_title")}
        subtitle={t("vos_avis.banner_subtitle")}
        primaryCta={{ label: t("vos_avis.banner_primary"), href: BOOKING_URL, external: true }}
        secondaryCta={{ label: t("vos_avis.banner_secondary"), href: "/qui-sommes-nous" }}
      />

      <Footer />
    </>
  );
}
