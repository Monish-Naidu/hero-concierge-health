import { motion } from "framer-motion";
import { cn } from "@/plugins/booking-modal/utils/cn";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "rounded" | "circular";
  animate?: boolean;
}

export function Skeleton({ className, variant = "default", animate = true }: SkeletonProps) {
  const baseClasses = "bg-gradient-to-r from-sectionColor via-white/50 to-sectionColor bg-[length:200%_100%]";
  
  const variantClasses = {
    default: "rounded",
    rounded: "rounded-lg",
    circular: "rounded-full",
  };

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      animate={animate ? {
        backgroundPosition: ["200% 0%", "-200% 0%"],
      } : {}}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

