/**
 * GuaranteesSection — section "Nos garanties" réutilisable.
 *
 * Utilisée sur :
 *   - /garde-animaux/[ville]
 *   - /garde-animaux-paris/[arrondissement]
 *
 * Chaque page construit le tableau `guarantees` avec les traductions
 * de son propre namespace (garde_ville.* ou garde_paris.*) puis passe
 * les chaînes déjà traduites à ce composant.
 *
 * Usage :
 *   <GuaranteesSection
 *     label={t("garde_ville.guarantees_label")}
 *     title={t("garde_ville.guarantees_title")}
 *     subtitle={t("garde_ville.guarantees_subtitle")}
 *     guarantees={GUARANTEES}
 *   />
 */

import { AnimatedCard } from "@/components/ui/animated-card";
import { SectionHeader } from "@/components/sections/section-header";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIconComponent = any;

export interface Guarantee {
  Icon: AnyIconComponent;
  title: string;
  desc: string;
}

interface GuaranteesSectionProps {
  label: string;
  title: string;
  subtitle?: string;
  guarantees: Guarantee[];
  /** Classe CSS supplémentaire sur la <section> */
  className?: string;
}

export function GuaranteesSection({
  label,
  title,
  subtitle,
  guarantees,
  className,
}: GuaranteesSectionProps) {
  return (
    <section className={`section-padding bg-[--color-ivoire] ${className ?? ""}`}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label={label}
          title={title}
          subtitle={subtitle}
          className="mb-12"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map(({ Icon, title: gTitle, desc }) => (
            <AnimatedCard
              key={gTitle}
              Icon={Icon}
              iconColor="var(--color-rouge)"
              iconBg="var(--color-creme)"
              iconSize={22}
              iconStrokeWidth={1.5}
              className="p-7 flex flex-col items-center gap-4 text-center"
            >
              <h3
                className="text-[--color-chocolat] font-medium"
                style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem" }}
              >
                {gTitle}
              </h3>
              <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
