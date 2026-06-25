"use client";
import {
  motion,
  type Transition,
  useInView,
  type UseInViewOptions,
  type Variant,
} from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface InViewProps {
  children: ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
}

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function InView({
  children,
  variants = defaultVariants,
  transition,
  viewOptions,
}: InViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    ...viewOptions,
    margin: viewOptions?.margin || "0px 0px -100px 0px",
  });

  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(true);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Create reversed variants for scrolling up
  const reversedVariants = {
    hidden: {
      ...variants.hidden,
      x: isVariantWithXAndY(variants.hidden) ? -variants.hidden.x : undefined,
      y: isVariantWithXAndY(variants.hidden) ? -variants.hidden.y : undefined,
    },
    visible: variants.visible,
  };

  const activeVariants = scrollingDown ? variants : reversedVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={activeVariants}
      transition={{
        ...transition,
        type: "tween",
        duration: 0.5,
        ease: "easeInOut",
      }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>
  );
}

function isVariantWithXAndY(variant: Variant): variant is Variant & { x: number; y: number } {
  return "x" in variant && "y" in variant;
}