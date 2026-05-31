import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { UI } from "@/lib/assets";
import { FooterSocial } from "./footer-social";
import { FooterPawPrint } from "./footer-paw-print";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[--color-chocolat] text-[--color-ivoire]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src={UI.logo}
              alt="Petcheri"
              width={130}
              height={38}
              className="h-9 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm text-[--color-ivoire]/70 leading-relaxed mb-6">
              {t("tagline")}
            </p>
            <FooterSocial />
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[--color-or] mb-5">
              {t("services_title")}
            </p>
            <ul className="space-y-3">
              {[
                { href: "/services-chien" as const, label: nav("services_dog") },
                { href: "/services-chat" as const, label: nav("services_cat") },
                { href: "/services-nac" as const, label: nav("services_nac") },
                { href: "/garde-chien" as const, label: "Garde de chien" },
                { href: "/comportement-education" as const, label: "Comportement & Éducation" },
                { href: "/toilettage" as const, label: "Toilettage" },
                { href: "/transport" as const, label: "Transport" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[--color-ivoire]/70 hover:text-[--color-ivoire] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[--color-or] mb-5">
              {t("company_title")}
            </p>
            <ul className="space-y-3">
              {[
                { href: "/qui-sommes-nous" as const, label: nav("about") },
                { href: "/vip-club" as const, label: nav("vip") },
                { href: "/entreprises" as const, label: nav("for_business") },
                { href: "/luxury-hotels" as const, label: nav("luxury_hotels") },
                { href: "/devenir-petsitter" as const, label: nav("become_petsitter") },
                { href: "/nos-bons-plans" as const, label: nav("partners") },
                { href: "/blog" as const, label: nav("blog") },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[--color-ivoire]/70 hover:text-[--color-ivoire] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[--color-or] mb-5">
              {t("legal_title")}
            </p>
            <ul className="space-y-3">
              {[
                { href: "/mentions-legales", label: t("mentions") },
                { href: "/privacy-policy", label: t("privacy") },
                { href: "/terms", label: t("terms") },
                { href: "/cookies", label: t("cookies") },
                { href: "/assurance", label: t("insurance") },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-[--color-ivoire]/70 hover:text-[--color-ivoire] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Trust badges */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-2 text-xs text-[--color-ivoire]/50">
                <span className="w-4 h-4 rounded-full bg-[--color-sauge]/30 flex items-center justify-center text-[--color-sauge]">✓</span>
                400 prestataires certifiés
              </div>
              <div className="flex items-center gap-2 text-xs text-[--color-ivoire]/50">
                <span className="w-4 h-4 rounded-full bg-[--color-sauge]/30 flex items-center justify-center text-[--color-sauge]">✓</span>
                Assurance AXA incluse
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[--color-ivoire]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[--color-ivoire]/40">
            © {year} Petcheri. {t("rights")}
          </p>
          <div className="flex items-center gap-2 text-xs text-[--color-ivoire]/40">
            <span className="flex items-center gap-1.5">
              Made in Paris with love <FooterPawPrint />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
