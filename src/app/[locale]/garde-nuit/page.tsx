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

const FORMULES = [
  {
    title: "Soirée",
    duration: "Jusqu'à 23h",
    desc: "Un chouchouteur reste chez vous ou accueille votre chien pour la soirée. Idéal pour un dîner au restaurant, une soirée ou un spectacle en toute sérénité.",
    includes: ["Repas du soir", "Sortie nocturne", "Rapport photo"],
  },
  {
    title: "Nuit complète",
    duration: "Du soir au matin",
    desc: "Votre chien dort dans un foyer chaleureux ou est gardé chez lui par un chouchouteur qui passe la nuit sur place. Il se réveille reposé, pas seul.",
    includes: ["Repas du soir et du matin", "Sortie matinale", "Rapport détaillé", "Mises à jour si besoin"],
  },
  {
    title: "Week-end",
    duration: "2 à 3 nuits",
    desc: "Votre petite escapade est méritée. Confiez votre chien pour le week-end et partez l'esprit léger. Nos chouchouteurs s'occupent de tout.",
    includes: ["Tous repas", "Promenades quotidiennes", "Photos régulières", "Ligne dédiée en cas d'urgence"],
  },
] as const;

const REASSURANCE = [
  {
    Icon: MessageSquareIcon,
    label: "Photos & rapports",
    desc: "Votre chouchouteur vous envoie des nouvelles régulièrement.",
  },
  {
    Icon: ShieldCheckIcon,
    label: "Couvert par AXA",
    desc: "Assurance professionnelle 9 000 000 € sur chaque prestation.",
  },
  {
    Icon: SendIcon,
    label: "Ligne d'urgence",
    desc: "Une équipe disponible 7j/7 pour toute question ou imprévu.",
  },
] as const;

export default async function GardeNuitPage({
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
        badge={t("garde_nuit.hero_badge")}
        title={
          <>
            {t("garde_nuit.hero_title")}{" "}
            <span className="text-accent">{t("garde_nuit.hero_title_accent")}</span>
          </>
        }
        subtitle={t("garde_nuit.hero_subtitle")}
        ctas={[
          { label: "Trouver un chouchouteur", href: "https://prettyform.addxt.com/a/form/?vf=1FAIpQLSdwrFAcP9eRFGoVCs4BqNtZD7Iqc-uW7UjRduB-NcfR10qxTQ", external: true, primary: true },
          { label: "Garde de journée aussi", href: "/garde-journee" },
        ]}
        image={ILLUSTRATIONS.gardeNuit}
        imageAlt="Chien gardé la nuit"
        trustBadges={["Chouchouteurs certifiés", "Assurance AXA incluse", "Disponible 7j/7"]}
        variant="warm"
      />

      {/* Formules */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Nos formules"
            title="Selon la durée de votre absence"
            subtitle="Une soirée, une nuit ou un week-end entier — la formule s'adapte à vos plans, pas l'inverse."
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
              href="https://prettyform.addxt.com/a/form/?vf=1FAIpQLSdwrFAcP9eRFGoVCs4BqNtZD7Iqc-uW7UjRduB-NcfR10qxTQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
              style={{ background: "#E8705A" }}
            >
              Réserver une garde de nuit
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
                label="Votre tranquillité d'esprit"
                title="Vous partez. Il reste. Tout le monde est heureux."
                subtitle="Pas de cage, pas de chenil : votre chien vit dans un foyer chaleureux ou reste dans son environnement habituel avec quelqu'un à ses côtés."
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
        title="Partez serein, votre chien est entre de bonnes mains"
        subtitle="Des chouchouteurs certifiés dans toute la France, disponibles 7j/7. Réservez en quelques minutes."
        primaryCta={{ label: "Trouver un chouchouteur", href: "https://prettyform.addxt.com/a/form/?vf=1FAIpQLSdwrFAcP9eRFGoVCs4BqNtZD7Iqc-uW7UjRduB-NcfR10qxTQ", external: true }}
        secondaryCta={{ label: "Garde de chats aussi", href: "/garde-chat" }}
      />

      <Footer />
    </>
  );
}
