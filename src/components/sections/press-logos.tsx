import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PRESS } from "@/lib/assets";

const PRESS_ITEMS = [
  { name: "Gala",           src: PRESS.gala,          width: 70,  height: 28 },
  { name: "Marie Claire",   src: PRESS.marieClaire,   width: 100, height: 28 },
  { name: "Europe 1",       src: PRESS.europe1,       width: 80,  height: 28 },
  { name: "Envoyé Spécial", src: PRESS.envoyeSpecial, width: 90,  height: 28 },
];

interface PressLogosProps {
  variant?: "light" | "dark";
  className?: string;
}

export function PressLogos({ variant = "light", className }: PressLogosProps) {
  const t = useTranslations("common");

  return (
    <section
      className={cn(
        "py-12 border-y border-[--color-border]",
        variant === "dark" ? "bg-transparent" : "bg-white",
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-6">
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: variant === "dark" ? "rgba(255,255,255,0.4)" : "var(--color-muted)" }}
        >
          {t("press_title")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {PRESS_ITEMS.map((item) => (
            <div
              key={item.name}
              className={cn(
                "transition-all duration-300",
                variant === "light"
                  ? "opacity-40 grayscale hover:opacity-80 hover:grayscale-0"
                  : "opacity-30 brightness-0 invert hover:opacity-55"
              )}
            >
              <Image
                src={item.src}
                alt={item.name}
                width={item.width}
                height={item.height}
                className="h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
