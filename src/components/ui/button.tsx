"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-or disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-chocolat text-ivoire hover:bg-chocolat-light shadow-sm hover:shadow-md",
        or:
          "bg-or text-chocolat hover:bg-or-light shadow-or hover:shadow-md font-semibold",
        outline:
          "border border-chocolat text-chocolat bg-transparent hover:bg-chocolat hover:text-ivoire",
        "outline-or":
          "border border-or text-or bg-transparent hover:bg-or hover:text-chocolat",
        ghost:
          "text-chocolat hover:bg-ivoire-dark",
        link:
          "text-or underline-offset-4 hover:underline p-0 h-auto rounded-none",
        white:
          "bg-white text-chocolat hover:bg-ivoire shadow-sm hover:shadow-md",
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
