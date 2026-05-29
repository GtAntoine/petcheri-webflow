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
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[--color-or] mb-3">
          {label}
        </span>
      )}
      <h2 className={cn("text-h2 text-[--color-chocolat] max-w-2xl", titleClassName)}>
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
