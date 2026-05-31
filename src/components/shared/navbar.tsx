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

type MegaItem = { href: string; icon: string; title: string; desc?: string };
type SoinItem  = { href: string; title: string };

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

function MegaCol({
  label,
  emoji,
  items,
  pathname,
  onClose,
}: {
  label: string;
  emoji: string;
  items: MegaItem[];
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
            onClick={onClose}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-start gap-2.5 px-3 py-2 rounded-lg transition-colors",
              active ? "bg-[--color-creme]" : "hover:bg-[--color-ivoire]"
            )}
          >
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
  const t = useTranslations("nav");
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

  // ── Translated mega-menu data ──────────────────────────────────────────────
  const megaChiens: MegaItem[] = [
    { href: "/garde-chien",    icon: ICONS.dog,         title: t("mega.garde_domicile"),    desc: t("mega.garde_domicile_desc") },
    { href: "/garde-journee",  icon: ICONS.ctSleep,     title: t("mega.garde_journee"),     desc: t("mega.garde_journee_desc") },
    { href: "/garde-nuit",     icon: ICONS.sleep,       title: t("mega.garde_nuit"),        desc: t("mega.garde_nuit_desc") },
    { href: "/services-chien", icon: ICONS.walking2,    title: t("mega.promenade"),         desc: t("mega.promenade_desc") },
  ];
  const megaChats: MegaItem[] = [
    { href: "/garde-chat",    icon: ICONS.ctCat, title: t("mega.visite_garde"),  desc: t("mega.visite_garde_desc") },
    { href: "/services-chat", icon: ICONS.cat,   title: t("mega.soins_chat"),    desc: t("mega.soins_chat_desc") },
  ];
  const megaNac: MegaItem[] = [
    { href: "/services-nac", icon: ICONS.nac,         title: t("mega.visite_garde_nac"),    desc: t("mega.visite_garde_nac_desc") },
    { href: "/bien-etre",    icon: ICONS.care,        title: t("mega.bien_etre"),            desc: t("mega.bien_etre_desc") },
    { href: "/transport",    icon: ICONS.ctTransport, title: t("mega.transport"),             desc: t("mega.transport_desc") },
  ];
  const megaSoins: SoinItem[] = [
    { href: "/toilettage",             title: t("mega.toilettage") },
    { href: "/comportement-education", title: t("mega.comportement") },
    { href: "/bien-etre",              title: t("mega.bien_etre") },
    { href: "/transport",              title: t("mega.transport") },
  ];

  const allHrefs = [...megaChiens, ...megaChats, ...megaNac, ...megaSoins].map((i) => i.href);
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
        {t("services")}
        <ChevronDown
          className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id="nav-mega-services"
          ref={menuRef}
          aria-labelledby="nav-mega-services-btn"
          onKeyDown={handleMenuKeyDown}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
        >
          <div
            className="rounded-2xl overflow-hidden bg-white"
            style={{
              border: "1px solid var(--color-border)",
              boxShadow: "0 12px 48px rgba(44,24,16,0.14)",
              width: "clamp(580px, 50vw, 720px)",
            }}
          >
            {/* 3-column grid: Chiens | Chats | NAC */}
            <div className="grid grid-cols-3 divide-x divide-[--color-border] p-2">
              <MegaCol label={t("mega.col_chiens")} emoji="🐕" items={megaChiens} pathname={pathname} onClose={close} />
              <div className="px-1">
                <MegaCol label={t("mega.col_chats")} emoji="🐱" items={megaChats} pathname={pathname} onClose={close} />
              </div>
              <div className="px-1">
                <MegaCol label={t("mega.col_nac")} emoji="🐇" items={megaNac} pathname={pathname} onClose={close} />
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
                {t("mega.soins_section")}
              </span>
              {megaSoins.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as Parameters<typeof Link>[0]["href"]}

                  onClick={close}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
                    pathname === item.href
                      ? "bg-[#fde0d4] text-[#E8705A]"
                      : "bg-white text-[--color-chocolat] hover:bg-[--color-creme] hover:text-[#E8705A] border border-[--color-border]"
                  )}
                >
                  {item.title}
                </Link>
              ))}
              <Link
                href="/nos-services"

                onClick={close}
                className="ml-auto flex items-center gap-1 text-xs font-semibold text-[#E8705A] hover:text-[--color-or] transition-colors shrink-0"
              >
                {t("mega.see_all")}
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); setServicesOpen(false); }, [pathname]);

  const otherLocale = locale === "fr" ? "en" : "fr";

  // ── Mega items for the mobile accordion ──────────────────────────────────
  const megaChiens: MegaItem[] = [
    { href: "/garde-chien",    icon: ICONS.dog,         title: t("mega.garde_domicile"),    desc: t("mega.garde_domicile_desc") },
    { href: "/garde-journee",  icon: ICONS.ctSleep,     title: t("mega.garde_journee"),     desc: t("mega.garde_journee_desc") },
    { href: "/garde-nuit",     icon: ICONS.sleep,       title: t("mega.garde_nuit"),        desc: t("mega.garde_nuit_desc") },
    { href: "/services-chien", icon: ICONS.walking2,    title: t("mega.promenade"),         desc: t("mega.promenade_desc") },
  ];
  const megaChats: MegaItem[] = [
    { href: "/garde-chat",    icon: ICONS.ctCat, title: t("mega.visite_garde"),  desc: t("mega.visite_garde_desc") },
    { href: "/services-chat", icon: ICONS.cat,   title: t("mega.soins_chat"),    desc: t("mega.soins_chat_desc") },
  ];
  const megaNac: MegaItem[] = [
    { href: "/services-nac", icon: ICONS.nac,         title: t("mega.visite_garde_nac"),    desc: t("mega.visite_garde_nac_desc") },
    { href: "/bien-etre",    icon: ICONS.care,        title: t("mega.bien_etre"),            desc: t("mega.bien_etre_desc") },
    { href: "/transport",    icon: ICONS.ctTransport, title: t("mega.transport"),             desc: t("mega.transport_desc") },
  ];
  const megaSoins: SoinItem[] = [
    { href: "/toilettage",             title: t("mega.toilettage") },
    { href: "/comportement-education", title: t("mega.comportement") },
    { href: "/bien-etre",              title: t("mega.bien_etre") },
    { href: "/transport",              title: t("mega.transport") },
  ];

  const DECOUVRIR_ITEMS: DropdownItem[] = [
    { href: "/vip-club",          label: t("vip"),              emoji: "👑" },
    { href: "/vos-avis",          label: t("reviews"),          emoji: "⭐" },
    { href: "/luxury-hotels",     label: t("luxury_hotels"),    emoji: "🏨" },
    { href: "/devenir-petsitter", label: t("become_petsitter"), emoji: "🐾" },
  ];

  const NAV_LINKS = [
    { href: "/qui-sommes-nous", label: t("about") },
    { href: "/entreprises",     label: t("for_business") },
    { href: "/blog",            label: t("blog") },
    { href: "/nos-bons-plans",  label: t("bons_plans") },
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
        aria-label={t("aria_main")}
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
        <div className="hidden lg:flex items-center gap-8">
          <MegaMenuServices pathname={pathname} />

          {NAV_LINKS.map((item) => (
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
            >
              {item.label}
            </Link>
          ))}

          <DropdownMenu
            id="nav-decouvrir-dropdown"
            label={t("discover")}
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
          aria-label={isOpen ? t("aria_close") : t("aria_open")}
        >
          {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-[--color-ivoire] border-t border-[--color-border] px-5 py-4 flex flex-col gap-1"
          role="navigation"
          aria-label={t("aria_mobile")}
        >
          {/* ── Nos services accordion ── */}
          <button
            onClick={() => setServicesOpen((v) => !v)}
            aria-expanded={servicesOpen}
            className="flex items-center justify-between w-full py-2.5 text-sm font-semibold text-[--color-chocolat]"
          >
            {t("services")}
            <ChevronDown
              className={cn("w-4 h-4 transition-transform duration-200 text-[--color-muted]", servicesOpen && "rotate-180")}
              aria-hidden="true"
            />
          </button>

          {servicesOpen && (
            <div className="mb-2 rounded-xl bg-white border border-[--color-border] overflow-hidden divide-y divide-[--color-border]">
              {/* Chiens */}
              <div className="px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "var(--color-or)" }}>
                  🐕 {t("mega.col_chiens")}
                </p>
                <div className="flex flex-col gap-0.5">
                  {megaChiens.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as Parameters<typeof Link>[0]["href"]}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={cn("text-sm py-1.5 transition-colors", pathname === item.href ? "text-[#E8705A] font-medium" : "text-[--color-chocolat]")}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              {/* Chats */}
              <div className="px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "var(--color-or)" }}>
                  🐱 {t("mega.col_chats")}
                </p>
                <div className="flex flex-col gap-0.5">
                  {megaChats.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as Parameters<typeof Link>[0]["href"]}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={cn("text-sm py-1.5 transition-colors", pathname === item.href ? "text-[#E8705A] font-medium" : "text-[--color-chocolat]")}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              {/* NAC */}
              <div className="px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "var(--color-or)" }}>
                  🐇 {t("mega.col_nac")}
                </p>
                <div className="flex flex-col gap-0.5">
                  {megaNac.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as Parameters<typeof Link>[0]["href"]}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={cn("text-sm py-1.5 transition-colors", pathname === item.href ? "text-[#E8705A] font-medium" : "text-[--color-chocolat]")}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              {/* Soins */}
              <div className="px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "var(--color-muted)" }}>
                  {t("mega.soins_section")}
                </p>
                <div className="flex flex-col gap-0.5">
                  {megaSoins.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as Parameters<typeof Link>[0]["href"]}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={cn("text-sm py-1.5 transition-colors", pathname === item.href ? "text-[#E8705A] font-medium" : "text-[--color-chocolat]")}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Top-level links ── */}
          {([
            { href: "/qui-sommes-nous", label: t("about") },
            { href: "/entreprises",     label: t("for_business") },
            { href: "/blog",            label: t("blog") },
            { href: "/nos-bons-plans",  label: t("bons_plans") },
            { href: "/vip-club",        label: t("vip") },
            { href: "/vos-avis",        label: t("reviews") },
            { href: "/luxury-hotels",   label: t("luxury_hotels") },
            { href: "/devenir-petsitter", label: t("become_petsitter") },
            { href: "/contact",         label: t("contact") },
          ] as const).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "py-2.5 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-[--color-or]"
                  : "text-[--color-chocolat] hover:text-[--color-or]"
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <Button variant="or" size="md" className="mt-3" asChild>
            <a href={PETCHERI_APP} target="_blank" rel="noopener noreferrer">
              {t("book")}
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
