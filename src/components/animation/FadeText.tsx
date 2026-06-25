'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { ReactNode, useMemo, useRef } from 'react';

type FadeTextProps = {
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  framerProps?: Variants;
  content: ReactNode;
};

export function FadeText({
  direction = 'up',
  className,
  framerProps = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { type: 'spring' } },
  },
  content,
}: FadeTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const directionOffset = useMemo(() => {
    const map = { up: 10, down: -10, left: -10, right: 10 };
    return map[direction];
  }, [direction]);

  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';

  const FADE_ANIMATION_VARIANTS = useMemo(() => {
    const { hidden, show, ...rest } = framerProps as {
      [name: string]: { [name: string]: number; opacity: number };
    };

    return {
      ...rest,
      hidden: {
        ...(hidden ?? {}),
        opacity: hidden?.opacity ?? 0,
        [axis]: hidden?.[axis] ?? directionOffset,
      },
      show: {
        ...(show ?? {}),
        opacity: show?.opacity ?? 1,
        [axis]: show?.[axis] ?? 0,
      },
    };
  }, [directionOffset, axis, framerProps]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      variants={FADE_ANIMATION_VARIANTS}
    >
      <motion.span className={className}>{content}</motion.span>
    </motion.div>
  );
}
