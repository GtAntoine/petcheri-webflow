"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { PARIS_ZONES } from "@/lib/zones-data";

const OTHER_CITIES = [
  { name: "Lyon",      href: "/garde-animaux/lyon" },
  { name: "Marseille", href: "/garde-animaux/marseille" },
  { name: "Bordeaux",  href: "/garde-animaux/bordeaux" },
  { name: "Toulouse",  href: "/garde-animaux/toulouse" },
  { name: "Lille",     href: "/garde-animaux/lille" },
  { name: "Nantes",    href: "/garde-animaux/nantes" },
];

export function FooterZones() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <div className="mt-12 pt-8 border-t border-[--color-ivoire]/10">
      <p className="text-xs font-semibold uppercase tracking-widest text-[--color-or] mb-4">
        Garde d&apos;animaux en France
      </p>
      <div className="flex flex-wrap items-start gap-x-6 gap-y-3">

        {/* Paris — dropdown ouvert au survol, fermé avec délai pour traverser le gap */}
        <div className="relative">
          <button
            className="flex items-center gap-1 text-sm text-[--color-ivoire]/70 hover:text-[--color-or] transition-colors font-medium"
            onMouseEnter={() => { cancelClose(); setOpen(true); }}
            onMouseLeave={scheduleClose}
            aria-expanded={open}
            aria-haspopup="true"
          >
            Paris
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div
              className="absolute bottom-full left-0 mb-2 z-50 bg-[--color-ivoire] border border-[--color-border] rounded-xl p-4 grid grid-cols-4 gap-x-5 gap-y-1.5 min-w-[300px] shadow-xl"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              {/* Pont invisible pour combler le gap mb-2 */}
              <div className="absolute top-full left-0 h-2 w-full" aria-hidden />

              {PARIS_ZONES.map((z) => (
                <a
                  key={z.arrondissement}
                  href={`/garde-animaux-paris/${z.arrondissement}`}
                  className="text-xs text-[--color-muted-foreground] hover:text-[--color-rouge] transition-colors whitespace-nowrap"
                >
                  {z.arrondissement}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Autres villes */}
        {OTHER_CITIES.map((city) => (
          <a
            key={city.name}
            href={city.href}
            className="text-sm text-[--color-ivoire]/50 hover:text-[--color-ivoire]/80 transition-colors"
          >
            {city.name}
          </a>
        ))}
      </div>
    </div>
  );
}
