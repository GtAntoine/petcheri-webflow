"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UI, ICONS } from "@/lib/assets";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

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

// ─── MegaMenuServices ─────────────────────────────────────────────────────────

const MEGA_CHIENS = [
  { href: "/garde-chien",   icon: ICONS.dog,      title: "Garde à domicile",    desc: "Chez vous, dans ses habitudes" },
  { href: "/garde-journee", icon: ICONS.care,     title: "Garde de journée",    desc: "Le temps d'une longue journée" },
  { href: "/garde-nuit",    icon: ICONS.ctSleep,  title: "Garde de nuit",       desc: "Chez vous ou chez un chouchouteur" },
  { href: "/services-chien",icon: ICONS.walking2, title: "Promenade",           desc: "Sorties solo ou en groupe" },
] as const;

const MEGA_CHATS = [
  { href: "/garde-chat",    icon: ICONS.ctCat,    title: "Visite & garde",      desc: "À domicile ou chez un chouchouteur" },
  { href: "/services-chat", icon: ICONS.cat,      title: "Tous les services",   desc: "Toilettage, comportement…" },
] as const;

const MEGA_NAC = [
  { href: "/services-nac",  icon: ICONS.nac,      title: "Visite & garde NAC",  desc: "Lapins, rongeurs, reptiles…" },
] as const;

const MEGA_SOINS = [
  { href: "/toilettage",              icon: ICONS.ctGrooming,   title: "Toilettage" },
  { href: "/comportement-education",  icon: ICONS.ctEducation,  title: "Comportement" },
  { href: "/bien-etre",               icon: ICONS.care,         title: "Bien-être & soins" },
  { href: "/transport",               icon: ICONS.ctTransport,  title: "Transport" },
] as const;

type MegaItem = { href: string; icon: string; title: string; desc?: string };

function MegaCol({
  label,
  emoji,
  items,
  pathname,
  onClose,
}: {
  label: string;
  emoji: string;
  items: readonly MegaItem[];
  pathname: string;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 px-3 pb-2 pt-1">
        <span aria-hidden="true" className="text-base leading-none">{emoji}</span>
        <span
          className="text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{ color: "var(--color-or)" }}
        >
          {label}
        </span>
      </div>
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href as Parameters<typeof Link>[0]["href"]}
            role="listitem"
            onClick={onClose}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-start gap-2.5 px-3 py-2 rounded-lg transition-colors",
              active ? "bg-[--color-creme]" : "hover:bg-[--color-ivoire]"
            )}
          >
            <div
              className="shrink-0 mt-0.5 flex items-center justify-center rounded-md"
              style={{
                width: 30,
                height: 30,
                background: active ? "#fde0d4" : "var(--color-ivoire)",
              }}
            >
              <Image
                src={item.icon}
                alt=""
                aria-hidden="true"
                width={16}
                height={16}
                className="opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ width: 16, height: 16, objectFit: "contain" }}
              />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span
                className={cn(
                  "text-sm font-semibold leading-snug transition-colors",
                  active ? "text-[#E8705A]" : "text-[--color-chocolat] group-hover:text-[#E8705A]"
                )}
              >
                {item.title}
              </span>
              {item.desc && (
                <span className="text-xs text-[--color-muted-foreground] leading-snug">
                  {item.desc}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function MegaMenuServices({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const openAndFocusFirst = useCallback(() => {
    setOpen(true);
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
      if (e.key === "Escape") close();
    },
    [openAndFocusFirst, close]
  );

  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        close();
        btnRef.current?.focus();
      }
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

  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
  }, []);

  const allHrefs = [...MEGA_CHIENS, ...MEGA_CHATS, ...MEGA_NAC, ...MEGA_SOINS].map((i) => i.href);
  const isActive = allHrefs.some((href) => pathname === href);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={handleBlur}
    >
      <button
        ref={btnRef}
        id="nav-mega-services-btn"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="nav-mega-services"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleButtonKeyDown}
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors",
          isActive ? "text-[--color-or]" : "text-[--color-chocolat] hover:text-[--color-or]"
        )}
      >
        Nos services
        <ChevronDown
          className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id="nav-mega-services"
          ref={menuRef}
          role="list"
          aria-labelledby="nav-mega-services-btn"
          onKeyDown={handleMenuKeyDown}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
        >
          <div
            className="rounded-2xl overflow-hidden bg-white"
            style={{
              border: "1px solid var(--color-border)",
              boxShadow: "0 12px 48px rgba(44,24,16,0.14)",
              width: "clamp(560px, 48vw, 680px)",
            }}
          >
            {/* 3-column grid: Chiens | Chats | NAC */}
            <div className="grid grid-cols-3 divide-x divide-[--color-border] p-2">
              <MegaCol label="Chiens" emoji="🐕" items={MEGA_CHIENS} pathname={pathname} onClose={close} />
              <div className="px-1">
                <MegaCol label="Chats" emoji="🐱" items={MEGA_CHATS} pathname={pathname} onClose={close} />
              </div>
              <div className="px-1">
                <MegaCol label="NAC" emoji="🐇" items={MEGA_NAC} pathname={pathname} onClose={close} />
              </div>
            </div>

            {/* Soins & services strip */}
            <div
              className="px-4 py-2.5 flex items-center gap-1 flex-wrap"
              style={{ background: "var(--color-ivoire)", borderTop: "1px solid var(--color-border)" }}
            >
              <span
                className="text-[10px] font-bold uppercase tracking-[0.16em] mr-2 shrink-0"
                style={{ color: "var(--color-muted)" }}
              >
                Soins & services
              </span>
              {MEGA_SOINS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as Parameters<typeof Link>[0]["href"]}
                  role="listitem"
                  onClick={close}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                    pathname === item.href
                      ? "bg-[#fde0d4] text-[#E8705A]"
                      : "bg-white text-[--color-chocolat] hover:bg-[--color-creme] hover:text-[#E8705A] border border-[--color-border]"
                  )}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    width={13}
                    height={13}
                    className="opacity-60"
                    style={{ width: 13, height: 13, objectFit: "contain" }}
                  />
                  {item.title}
                </Link>
              ))}
              <Link
                href="/nos-services"
                role="listitem"
                onClick={close}
                className="ml-auto flex items-center gap-1 text-xs font-semibold text-[#E8705A] hover:text-[--color-or] transition-colors shrink-0"
              >
                Tout voir
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
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
          <MegaMenuServices pathname={pathname} />

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
            { href: "/nos-services",            label: t("services") },
            { href: "/garde-chien",             label: "Garde à domicile" },
            { href: "/garde-chat",              label: "Chats & NAC" },
            { href: "/garde-journee",           label: "Garde de journée" },
            { href: "/garde-nuit",              label: "Garde de nuit" },
            { href: "/services-chien",          label: "Promenade" },
            { href: "/toilettage",              label: "Toilettage" },
            { href: "/comportement-education",  label: "Comportement & éducation" },
            { href: "/transport",               label: "Transport" },
            { href: "/qui-sommes-nous",         label: t("about") },
            { href: "/entreprises",             label: t("for_business") },
            { href: "/blog",                    label: t("blog") },
            { href: "/nos-bons-plans",          label: "Bons plans" },
            { href: "/vip-club",                label: t("vip") },
            { href: "/vos-avis",                label: t("reviews") },
            { href: "/luxury-hotels",           label: "Luxury Hotels" },
            { href: "/devenir-petsitter",       label: t("become_petsitter") },
            { href: "/contact",                 label: t("contact") },
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
