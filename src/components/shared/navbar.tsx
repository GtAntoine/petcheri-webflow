"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UI } from "@/lib/assets";
import { Menu, X, ChevronDown } from "lucide-react";

const PETCHERI_APP = "https://app.petcheri.com";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DropdownItem {
  href: string;
  label: string;
  emoji?: string;
}

// ─── DropdownMenu ─────────────────────────────────────────────────────────────

/**
 * Disclosure-pattern dropdown (WAI-ARIA Authoring Practices).
 * - Keyboard: Enter/Space/↓ ouvre et focus le 1er item
 * - Escape ferme et remet le focus sur le bouton déclencheur
 * - Tab hors du menu ferme automatiquement (onBlur container)
 * - Mouse: hover ouvre/ferme (UX desktop classique conservé)
 */
function DropdownMenu({
  id,
  label,
  items,
  align = "left",
  pathname,
}: {
  id: string;
  label: string;
  items: DropdownItem[];
  align?: "left" | "right";
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const openAndFocusFirst = useCallback(() => {
    setOpen(true);
    // Defer focus until dropdown is rendered
    requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });
  }, []);

  const handleButtonKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        openAndFocusFirst();
      }
      if (e.key === "Escape") {
        close();
      }
    },
    [openAndFocusFirst, close]
  );

  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        close();
        btnRef.current?.focus();
      }
      // Arrow navigation
      const links = Array.from(
        menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []
      );
      const idx = links.indexOf(document.activeElement as HTMLAnchorElement);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        links[(idx + 1) % links.length]?.focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        links[(idx - 1 + links.length) % links.length]?.focus();
      }
    },
    [close]
  );

  // Close when focus moves outside the container
  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  }, []);

  const isActive = items.some((item) => pathname === item.href);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={handleBlur}
    >
      <button
        ref={btnRef}
        id={`${id}-btn`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleButtonKeyDown}
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors",
          isActive ? "text-[--color-or]" : "text-[--color-chocolat] hover:text-[--color-or]"
        )}
      >
        {label}
        <ChevronDown
          className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={id}
          ref={menuRef}
          role="list"
          aria-labelledby={`${id}-btn`}
          onKeyDown={handleMenuKeyDown}
          className={cn(
            "absolute top-full pt-2 z-50",
            align === "right" ? "right-0" : "left-1/2 -translate-x-1/2"
          )}
        >
          <div className="bg-white border border-[--color-border] rounded-xl shadow-[--shadow-card-hover] p-2 min-w-[210px]">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href as Parameters<typeof Link>[0]["href"]}
                role="listitem"
                onClick={close}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg transition-colors",
                  pathname === item.href
                    ? "text-[--color-or] bg-[--color-ivoire]"
                    : "text-[--color-chocolat] hover:bg-[--color-ivoire] hover:text-[--color-or]"
                )}
              >
                {item.emoji && <span aria-hidden="true">{item.emoji}</span>}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const otherLocale = locale === "fr" ? "en" : "fr";

  const SERVICES_ITEMS: DropdownItem[] = [
    { href: "/services-chien", label: t("services_dog") },
    { href: "/services-chat", label: t("services_cat") },
    { href: "/services-nac", label: t("services_nac") },
  ];

  const DECOUVRIR_ITEMS: DropdownItem[] = [
    { href: "/vip-club",          label: t("vip"),              emoji: "👑" },
    { href: "/vos-avis",          label: t("reviews"),          emoji: "⭐" },
    { href: "/luxury-hotels",     label: "Luxury Hotels",       emoji: "🏨" },
    { href: "/devenir-petsitter", label: t("become_petsitter"), emoji: "🐾" },
  ];

  const NAV_LINKS = [
    { href: "/qui-sommes-nous", label: t("about") },
    { href: "/entreprises",     label: t("for_business") },
    { href: "/blog",            label: t("blog") },
    { href: "/nos-bons-plans",  label: "Bons plans" },
  ] as const;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-white/40 backdrop-blur-md border-b border-[--color-border]",
        scrolled && "shadow-sm"
      )}
    >
      <nav
        aria-label="Navigation principale"
        className="max-w-7xl mx-auto px-6 flex items-center justify-between h-18"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Petcheri — Accueil">
          <Image
            src={UI.logo}
            alt=""
            aria-hidden="true"
            width={140}
            height={40}
            priority
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8" role="list" aria-label="Liens principaux">
          <DropdownMenu
            id="nav-services-dropdown"
            label={t("services")}
            items={SERVICES_ITEMS}
            align="left"
            pathname={pathname}
          />

          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="listitem"
              aria-current={pathname === item.href ? "page" : undefined}
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

          <DropdownMenu
            id="nav-decouvrir-dropdown"
            label="Découvrir"
            items={DECOUVRIR_ITEMS}
            align="right"
            pathname={pathname}
          />
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href={pathname}
            locale={otherLocale}
            aria-label={`Changer la langue en ${otherLocale === "en" ? "anglais" : "français"}`}
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
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-[--color-ivoire] border-t border-[--color-border] px-6 py-4 flex flex-col gap-4"
          role="navigation"
          aria-label="Menu mobile"
        >
          {([
            { href: "/nos-services",      label: t("services") },
            { href: "/services-chien",    label: t("services_dog") },
            { href: "/services-chat",     label: t("services_cat") },
            { href: "/services-nac",      label: t("services_nac") },
            { href: "/qui-sommes-nous",   label: t("about") },
            { href: "/entreprises",       label: t("for_business") },
            { href: "/blog",              label: t("blog") },
            { href: "/nos-bons-plans",    label: "Bons plans" },
            { href: "/vip-club",          label: t("vip") },
            { href: "/vos-avis",          label: t("reviews") },
            { href: "/luxury-hotels",     label: "Luxury Hotels" },
            { href: "/devenir-petsitter", label: t("become_petsitter") },
            { href: "/contact",           label: t("contact") },
          ] as const).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-[--color-or]"
                  : "text-[--color-chocolat] hover:text-[--color-or]"
              )}
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
