import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[--color-ivoire-dark] text-[--color-chocolat]",
        or: "bg-[--color-or]/15 text-[--color-or-dark] border border-[--color-or]/30",
        sauge: "bg-[--color-sauge]/15 text-[--color-sauge-dark] border border-[--color-sauge]/30",
        chocolat: "bg-[--color-chocolat] text-[--color-ivoire]",
        outline: "border border-[--color-border] text-[--color-muted-foreground]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
