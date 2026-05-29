"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-or] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[--color-chocolat] text-[--color-ivoire] hover:bg-[--color-chocolat-light] shadow-sm hover:shadow-md",
        or:
          "bg-[--color-or] text-[--color-chocolat] hover:bg-[--color-or-light] shadow-[--shadow-or] hover:shadow-md font-semibold",
        outline:
          "border border-[--color-chocolat] text-[--color-chocolat] bg-transparent hover:bg-[--color-chocolat] hover:text-[--color-ivoire]",
        "outline-or":
          "border border-[--color-or] text-[--color-or] bg-transparent hover:bg-[--color-or] hover:text-[--color-chocolat]",
        ghost:
          "text-[--color-chocolat] hover:bg-[--color-ivoire-dark]",
        link:
          "text-[--color-or] underline-offset-4 hover:underline p-0 h-auto rounded-none",
        white:
          "bg-white text-[--color-chocolat] hover:bg-[--color-ivoire] shadow-sm hover:shadow-md",
      },
      size: {
        sm: "h-9 px-5 text-xs",
        md: "h-11 px-7 text-sm",
        lg: "h-13 px-9 text-base",
        xl: "h-15 px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
