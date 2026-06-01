"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PARIS_ZONES } from "@/lib/zones-data";

const OTHER_CITIES = [
  { name: "Lyon",      href: "/garde-animaux-lyon" },
  { name: "Marseille", href: "/garde-animaux-marseille" },
  { name: "Bordeaux",  href: "/garde-animaux-bordeaux" },
  { name: "Toulouse",  href: "/garde-animaux-toulouse" },
  { name: "Lille",     href: "/garde-animaux-lille" },
  { name: "Nantes",    href: "/garde-animaux-nantes" },
];

export function FooterZones() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-12 pt-8 border-t border-[--color-ivoire]/10">
      <p className="text-xs font-semibold uppercase tracking-widest text-[--color-or] mb-4">
        Garde d&apos;animaux en France
      </p>
      <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
        {/* Paris with hover dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button className="flex items-center gap-1 text-sm text-[--color-ivoire]/70 hover:text-[--color-or] transition-colors font-medium">
            Paris
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <div className="absolute bottom-full left-0 mb-2 z-50 bg-[#3d2218] border border-[--color-ivoire]/10 rounded-xl p-4 grid grid-cols-4 gap-x-5 gap-y-1.5 min-w-[300px] shadow-xl">
              {PARIS_ZONES.map((z) => (
                <a
                  key={z.arrondissement}
                  href={`/garde-animaux-paris/${z.arrondissement}`}
                  className="text-xs text-[--color-ivoire]/60 hover:text-[--color-or] transition-colors whitespace-nowrap"
                >
                  {z.arrondissement}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Other cities */}
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
