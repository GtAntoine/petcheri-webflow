"use client";

interface PillItem {
  label: string;
  /** Internal filter key. Falls back to `label` when omitted (backward-compatible). */
  value?: string;
  count?: number;
}

interface CategoryPillsProps {
  items: PillItem[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * CategoryPills — filtre par catégorie réutilisable.
 * Utilisé dans /blog et /nos-bons-plans.
 * Affiche un count optionnel entre parenthèses.
 *
 * `value` (optionnel) sépare la clé interne du libellé affiché.
 * `active` et `onChange` utilisent toujours `value ?? label`.
 */
export function CategoryPills({ items, active, onChange, className }: CategoryPillsProps) {
  return (
    <div className={`flex items-center gap-2 flex-wrap justify-center ${className ?? ""}`}>
      {items.map(({ label, value, count }) => {
        const key = value ?? label;
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
            style={
              isActive
                ? { background: "var(--color-rouge-light)", color: "#fff", boxShadow: "0 2px 8px rgba(232,112,90,0.35)" }
                : { background: "#fff", color: "var(--color-chocolat)", border: "1px solid var(--color-border)" }
            }
          >
            {label}{count !== undefined ? ` (${count})` : ""}
          </button>
        );
      })}
    </div>
  );
}
