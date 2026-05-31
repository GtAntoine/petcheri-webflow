import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("services_nac.meta_title"),
    description: t("services_nac.meta_description"),
    alternates: buildAlternates("/services-nac", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Species labels — no emoji per AGENTS.md (no itshover equivalent exists)
const ANIMAUX = [
  "Lapins",
  "Rongeurs",
  "Reptiles",
  "Oiseaux",
  "Poissons",
  "Hérissons",
  "Autres NAC",
] as const;

const SERVICES = [
  {
    title: "Visite à domicile",
    desc: "Un chouchouteur spécialisé passe chez vous pour nourrir votre animal, nettoyer son habitat (cage, terrarium, aquarium), et s'assurer de son bien-être. Votre NAC reste dans son environnement familier.",
  },
  {
    title: "Garde à domicile",
    desc: "Un chouchouteur s'installe chez vous pour toute la durée de votre absence. Présence et soins continus pour les animaux nécessitant une vigilance particulière.",
  },
  {
    title: "Garde chez le chouchouteur",
    desc: "Votre NAC est accueilli chez un spécialiste équipé pour l'espèce. Idéal pour les animaux qui s'adaptent bien aux déplacements.",
  },
  {
    title: "Transport & accompagnement",
    desc: "Déplacement chez le vétérinaire, le spécialiste ou lors d'un changement de domicile — en toute sécurité et avec les précautions adaptées à chaque espèce.",
  },
  {
    title: "Bien-être & soins",
    desc: "Soins courants, entretien de l'habitat, monitoring comportemental et accès à nos vétérinaires partenaires spécialisés NAC si nécessaire.",
  },
] as const;

export default async function ServicesNacPage({
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

      <PageHero
        badge={t("services_nac.hero_badge")}
        title={
          <>
            {t("services_nac.hero_title")}{" "}
            <span className="text-accent">{t("services_nac.hero_title_accent")}</span>
          </>
        }
        subtitle={t("services_nac.hero_subtitle")}
        ctas={[
          { label: "Trouver un chouchouteur NAC", href: "https://prettyform.addxt.com/a/form/?vf=1FAIpQLSdwrFAcP9eRFGoVCs4BqNtZD7Iqc-uW7UjRduB-NcfR10qxTQ", external: true, primary: true },
          { label: "Nos autres services", href: "/nos-services" },
        ]}
        trustBadges={["Spécialistes NAC", "Assurance AXA incluse", "Vétérinaires partenaires"]}
        variant="warm"
      />

      {/* Animaux — text-only pills */}
      <section className="py-10 bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {ANIMAUX.map((label) => (
              <span
                key={label}
                className="px-4 py-2 rounded-full text-sm font-medium text-[--color-chocolat] bg-white border border-[--color-border]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Nos services NAC"
            title="Des soins adaptés à chaque espèce"
            subtitle="Pas question d'improviser avec un reptile ou un lapin. Nos chouchouteurs spécialisés connaissent les besoins spécifiques de chaque espèce."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div key={svc.title} className="card-base p-7 flex flex-col gap-3">
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                >
                  {svc.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{svc.desc}</p>
              </div>
            ))}
            {/* CTA card */}
            <div
              className="p-7 flex flex-col gap-4 rounded-2xl items-start justify-end"
              style={{ background: "linear-gradient(135deg, #fde0d4, #fdeee7)" }}
            >
              <p
                className="text-[--color-chocolat] font-medium"
                style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem" }}
              >
                Vous ne trouvez pas votre espèce ?
              </p>
              <p className="text-sm text-[--color-muted-foreground]">
                Contactez-nous — nous avons certainement le chouchouteur qu'il vous faut.
              </p>
              <Link
                href="/contact"
                className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: "#E8705A" }}
              >
                Nous contacter
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Votre NAC mérite des soins à la hauteur de sa singularité"
        subtitle="Des spécialistes formés, des vétérinaires disponibles, une assurance incluse. Petcheri, aussi pour les animaux hors du commun."
        primaryCta={{ label: "Trouver un chouchouteur NAC", href: "https://prettyform.addxt.com/a/form/?vf=1FAIpQLSdwrFAcP9eRFGoVCs4BqNtZD7Iqc-uW7UjRduB-NcfR10qxTQ", external: true }}
        secondaryCta={{ label: "Services pour chats", href: "/services-chat" }}
      />

      <Footer />
    </>
  );
}
