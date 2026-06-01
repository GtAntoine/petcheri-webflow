"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface HomeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HomeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// Whole house lifts on hover, door "opens" (scaleX squish)
const HOUSE_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, -4, 0, -2, 0],
    transition: { duration: 0.55, ease: "easeInOut" },
  },
};

const DOOR_VARIANTS: Variants = {
  normal: { scaleX: 1 },
  animate: {
    scaleX: [1, 0.25, 1],
    transition: { duration: 0.4, ease: "easeInOut", delay: 0.18 },
  },
};

const HomeIcon = forwardRef<HomeIconHandle, HomeIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, color = "currentColor", strokeWidth = 2, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start("animate");
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start("normal");
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          viewBox="0 0 24 24"
          width={size}
          style={{ overflow: "visible" }}
        >
          {/* House body + roof lifted together */}
          <motion.g
            animate={controls}
            initial="normal"
            variants={HOUSE_VARIANTS}
            style={{ transformOrigin: "12px 22px" }}
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            {/* Door — scaleX squish to simulate opening */}
            <motion.path
              d="M9 22V12h6v10"
              animate={controls}
              initial="normal"
              variants={DOOR_VARIANTS}
              style={{ transformOrigin: "12px 17px" }}
            />
          </motion.g>
        </svg>
      </div>
    );
  },
);

HomeIcon.displayName = "HomeIcon";
export default HomeIcon;
