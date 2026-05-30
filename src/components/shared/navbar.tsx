"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UI } from "@/lib/assets";
import { Menu, X, ChevronDown } from "lucide-react";

const PETCHERI_APP = "https://app.petcheri.com";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-white/40 backdrop-blur-md border-b border-[--color-border]",
        scrolled && "shadow-sm"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={UI.logo}
            alt="Petcheri"
            width={140}
            height={40}
            priority
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-[--color-chocolat] hover:text-[--color-or] transition-colors">
              {t("services")}
              <ChevronDown
                className={cn("w-4 h-4 transition-transform duration-200", servicesOpen && "rotate-180")}
              />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                <div className="bg-white border border-[--color-border] rounded-xl shadow-[--shadow-card-hover] p-2 min-w-[200px]">
                  {[
                    { href: "/services-chien" as const, label: t("services_dog") },
                    { href: "/services-chat" as const, label: t("services_cat") },
                    { href: "/services-nac" as const, label: t("services_nac") },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-[--color-chocolat] hover:bg-[--color-ivoire] hover:text-[--color-or] rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {[
            { href: "/qui-sommes-nous" as const, label: t("about") },
            { href: "/entreprises" as const, label: t("for_business") },
            { href: "/blog" as const, label: t("blog") },
            { href: "/nos-bons-plans" as const, label: "Bons plans" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-[--color-or]"
                  : "text-[--color-chocolat] hover:text-[--color-or]"
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* Ressources dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button className={cn(
              "flex items-center gap-1 text-sm font-medium transition-colors",
              ["/vip-club", "/vos-avis", "/devenir-petsitter", "/luxury-hotels"].includes(pathname)
                ? "text-[--color-or]"
                : "text-[--color-chocolat] hover:text-[--color-or]"
            )}>
              Découvrir
              <ChevronDown
                className={cn("w-4 h-4 transition-transform duration-200", resourcesOpen && "rotate-180")}
              />
            </button>
            {resourcesOpen && (
              <div className="absolute top-full right-0 pt-2 z-50">
                <div className="bg-white border border-[--color-border] rounded-xl shadow-[--shadow-card-hover] p-2 min-w-[210px]">
                  {[
                    { href: "/vip-club" as const,          label: t("vip"),              emoji: "👑" },
                    { href: "/vos-avis" as const,          label: t("reviews"),          emoji: "⭐" },
                    { href: "/luxury-hotels" as const,     label: "Luxury Hotels",       emoji: "🏨" },
                    { href: "/devenir-petsitter" as const, label: t("become_petsitter"), emoji: "🐾" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg transition-colors",
                        pathname === item.href
                          ? "text-[--color-or] bg-[--color-ivoire]"
                          : "text-[--color-chocolat] hover:bg-[--color-ivoire] hover:text-[--color-or]"
                      )}
                    >
                      <span>{item.emoji}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href={pathname}
            locale={otherLocale}
            className="text-xs font-medium text-[--color-muted] hover:text-[--color-or] transition-colors uppercase tracking-wider"
          >
            {t("language")}
          </Link>
          <Button variant="or" size="sm" asChild>
            <a href={PETCHERI_APP} target="_blank" rel="noopener noreferrer">
              {t("book")}
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-[--color-chocolat]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[--color-ivoire] border-t border-[--color-border] px-6 py-4 flex flex-col gap-4">
          {[
            { href: "/nos-services" as const,      label: t("services") },
            { href: "/services-chien" as const,    label: t("services_dog") },
            { href: "/services-chat" as const,     label: t("services_cat") },
            { href: "/services-nac" as const,      label: t("services_nac") },
            { href: "/qui-sommes-nous" as const,   label: t("about") },
            { href: "/entreprises" as const,       label: t("for_business") },
            { href: "/blog" as const,              label: t("blog") },
            { href: "/nos-bons-plans" as const,    label: "Bons plans 🎁" },
            { href: "/vip-club" as const,          label: `${t("vip")} 👑` },
            { href: "/vos-avis" as const,          label: `${t("reviews")} ⭐` },
            { href: "/luxury-hotels" as const,     label: "Luxury Hotels 🏨" },
            { href: "/devenir-petsitter" as const, label: t("become_petsitter") },
            { href: "/contact" as const,           label: t("contact") },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[--color-chocolat] hover:text-[--color-or]"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button variant="or" size="md" className="mt-2" asChild>
            <a href={PETCHERI_APP} target="_blank" rel="noopener noreferrer">
              {t("book")}
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
