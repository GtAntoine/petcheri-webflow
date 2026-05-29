import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col", align === "center" && "items-center text-center", className)}>
      {label && (
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-or] mb-3">
          {label}
        </span>
      )}
      <h2
        className={cn("text-[--color-chocolat] max-w-2xl font-normal", titleClassName)}
        style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.2 }}
      >
        {title}
      </h2>
      {align === "center" && <div className="divider-or mt-4" />}
      {subtitle && (
        <p className={cn("text-lead mt-4 max-w-xl", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
