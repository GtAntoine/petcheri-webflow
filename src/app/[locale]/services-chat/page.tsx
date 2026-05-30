import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { ILLUSTRATIONS } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import SparklesIcon from "@/components/icons/sparkles-icon";
import GraduationCapIcon from "@/components/icons/graduation-cap-icon";
import HeartIcon from "@/components/icons/heart-icon";
import TruckIcon from "@/components/icons/truck-icon";
import type { ComponentType } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("services_chat.meta_title"),
    description: t("services_chat.meta_description"),
    alternates: buildAlternates("/services-chat", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SERVICES: ReadonlyArray<{
  Icon: ComponentType<{ size?: number; color?: string }>;
  title: string;
  desc: string;
  href: string;
  cta: string;
}> = [
  {
    Icon: ShieldCheckIcon,
    title: "Visite & garde",
    desc: "Visite à domicile, garde chez vous ou en famille d'accueil — selon les habitudes de votre chat et vos contraintes.",
    href: "/garde-chat",
    cta: "Découvrir",
  },
  {
    Icon: SparklesIcon,
    title: "Toilettage",
    desc: "Brossage approfondi, coupe délicate, nettoyage des yeux et oreilles, griffes — par des toiletteurs spécialisés chats.",
    href: "/toilettage",
    cta: "Découvrir",
  },
  {
    Icon: GraduationCapIcon,
    title: "Comportement & éducation",
    desc: "Votre chat griffe les meubles, panique au moindre bruit ou refuse de partager l'espace ? Nos comportementalistes ont les réponses.",
    href: "/comportement-education",
    cta: "Découvrir",
  },
  {
    Icon: HeartIcon,
    title: "Bien-être & soins",
    desc: "Massage, ostéopathie, reiki, naturopathie — des soins alternatifs pour l'équilibre physique et émotionnel de votre chat.",
    href: "/bien-etre",
    cta: "Découvrir",
  },
  {
    Icon: TruckIcon,
    title: "Transport",
    desc: "Trajet chez le vétérinaire, le toiletteur ou chez un proche — nos chauffeurs animaliers transportent votre chat en toute sécurité.",
    href: "/transport",
    cta: "Découvrir",
  },
] as const;

export default async function ServicesChatPage({
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
        badge={t("services_chat.hero_badge")}
        title={
          <>
            {t("services_chat.hero_title")}{" "}
            <span className="text-accent">{t("services_chat.hero_title_accent")}</span>
          </>
        }
        subtitle={t("services_chat.hero_subtitle")}
        ctas={[
          { label: "Trouver un chouchouteur", href: "https://app.petcheri.com", external: true, primary: true },
          { label: "Voir la garde de chats", href: "/garde-chat" },
        ]}
        image={ILLUSTRATIONS.catSitting}
        imageAlt="Services pour chats Petcheri"
        trustBadges={["Spécialistes félins", "Assurance AXA incluse", "7j/7"]}
        variant="warm"
      />

      {/* Services grid */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Nos services"
            title="Une conciergerie complète pour votre chat"
            subtitle="De la garde au bien-être, on s'occupe de tout ce dont votre chat a besoin — même de ce qu'il ne réclame pas encore."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div key={svc.title} className="card-base p-7 flex flex-col gap-4">
                <svc.Icon size={28} color="#E8705A" />
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                >
                  {svc.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed flex-1">{svc.desc}</p>
                <Link
                  href={svc.href as Parameters<typeof Link>[0]["href"]}
                  className="flex items-center gap-1.5 text-sm font-semibold mt-auto transition-colors"
                  style={{ color: "#E8705A" }}
                >
                  {svc.cta}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Votre chat a des exigences. Nous avons les chouchouteurs."
        subtitle="Des spécialistes félins partout en France, disponibles 7j/7. Réservez en quelques minutes."
        primaryCta={{ label: "Trouver un chouchouteur", href: "https://app.petcheri.com", external: true }}
        secondaryCta={{ label: "Services pour NAC", href: "/services-nac" }}
      />

      <Footer />
    </>
  );
}
