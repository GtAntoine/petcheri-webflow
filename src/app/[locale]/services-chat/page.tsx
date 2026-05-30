import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { ILLUSTRATIONS } from "@/lib/assets";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services pour chats — Petcheri",
  description:
    "Garde, visite à domicile, toilettage, comportement et bien-être pour votre chat. Des chouchouteurs spécialisés félins sélectionnés par nos vétérinaires.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SERVICES = [
  {
    emoji: "🏠",
    title: "Visite & garde",
    desc: "Visite à domicile, garde chez vous ou en famille d'accueil — selon les habitudes de votre chat et vos contraintes.",
    href: "/garde-chat",
    cta: "Découvrir",
  },
  {
    emoji: "✂️",
    title: "Toilettage",
    desc: "Brossage approfondi, coupe délicate, nettoyage des yeux et oreilles, griffes — par des toiletteurs spécialisés chats.",
    href: "/toilettage",
    cta: "Découvrir",
  },
  {
    emoji: "🎓",
    title: "Comportement & éducation",
    desc: "Votre chat griffe les meubles, panique au moindre bruit ou refuse de partager l'espace ? Nos comportementalistes ont les réponses.",
    href: "/comportement-education",
    cta: "Découvrir",
  },
  {
    emoji: "💚",
    title: "Bien-être & soins",
    desc: "Massage, ostéopathie, reiki, naturopathie — des soins alternatifs pour l'équilibre physique et émotionnel de votre chat.",
    href: "/bien-etre",
    cta: "Découvrir",
  },
  {
    emoji: "🚗",
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

  return (
    <>
      <Navbar />

      <PageHero
        badge="🐱 Services pour chats"
        title={
          <>
            Tout ce que votre chat{" "}
            <span className="text-accent">daigne accepter</span>
          </>
        }
        subtitle="Garde, toilettage, comportement, bien-être et transport — une conciergerie complète au service de votre félin exigeant. Chaque chouchouteur est sélectionné et validé par nos vétérinaires partenaires."
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
                <span className="text-3xl" aria-hidden="true">{svc.emoji}</span>
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
