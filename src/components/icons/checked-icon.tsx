"use client";

import { forwardRef, useImperativeHandle, useCallback } from "react";
import { motion, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CheckedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CheckedIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const CheckedIcon = forwardRef<CheckedIconHandle, CheckedIconProps>(
  ({ size = 24, color = "currentColor", strokeWidth = 2, className = "" }, ref) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(scope.current, { scale: 1.1 }, { duration: 0.1, ease: "easeInOut" });
      animate(".check-icon", { pathLength: 0 }, { duration: 0.1 });
      await animate(".check-icon", { pathLength: 1 }, { duration: 0.4, ease: "easeOut" });
      animate(scope.current, { scale: 1 }, { duration: 0.2, ease: "easeInOut" });
    }, [animate, scope]);

    const stop = useCallback(() => {
      animate(scope.current, { scale: 1 }, { duration: 0.2 });
    }, [animate, scope]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        onHoverStart={start}
        onHoverEnd={stop}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("cursor-pointer", className)}
        style={{ transformOrigin: "center" }}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        {/* Circle */}
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        {/* Animated checkmark */}
        <motion.path
          className="check-icon"
          d="M9 12l2 2l4 -4"
          initial={{ pathLength: 1 }}
          style={{ pathLength: 1 }}
        />
      </motion.svg>
    );
  },
);

CheckedIcon.displayName = "CheckedIcon";
export default CheckedIcon;
