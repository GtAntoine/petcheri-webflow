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
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--color-muted]">
        {t("press_title")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {PRESS_ITEMS.map((item) => (
          <div
            key={item.name}
            className={cn(
              "transition-opacity duration-300 hover:opacity-80",
              variant === "light" ? "opacity-40" : "opacity-30"
            )}
          >
            <Image
              src={item.src}
              alt={item.name}
              width={item.width}
              height={item.height}
              className={cn(
                "h-7 w-auto object-contain",
                variant === "dark" && "brightness-0 invert"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
