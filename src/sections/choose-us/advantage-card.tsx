'use client';

import { Typography } from '@/components/ui/Typography';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';

interface AdvantageCardProps {
  title: string;
  description: string;
  imageSrc: string;
  bgColor: string;
  hoverAnimation: 'bounce' | 'scale' | 'pulse' | 'slide';
}

const imageVariants = {
  bounce: {
    initial: { y: 0 },
    hover: {
      y: [0, -10, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 0.5 },
    },
  },
  // Using scale instead of spin
  scale: {
    initial: { scale: 1 },
    hover: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.8, repeat: Infinity, repeatDelay: 0.5 },
    },
  },
  pulse: {
    initial: { scale: 1 },
    hover: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.8, repeat: Infinity, repeatDelay: 0.5 },
    },
  },
  slide: {
    initial: { x: 0 },
    hover: {
      x: [0, 10, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 0.5 },
    },
  },
};

export const AdvantageCard: FC<AdvantageCardProps> = ({
  title,
  description,
  imageSrc,
  bgColor,
  hoverAnimation,
}) => {
  return (
    <motion.div
      className={cn(
        'relative flex h-[550px] flex-col items-center justify-between overflow-hidden rounded-[200px] px-6 pt-[86px] sm:h-[600px] lg:rounded-[150px] lg:pt-[64px] xl:w-[300px] 2xl:w-[328px]',
      )}
      style={{ backgroundColor: bgColor }}
      initial="initial"
      whileHover="hover"
    >
      {/* Main text */}
      <div className="relative z-10 flex flex-grow flex-col items-center text-center">
        <Typography
          variant="h5"
          className="mb-3 text-center !text-[24px] font-extrabold uppercase text-white [text-shadow:2px_2px_10px_rgba(0,0,0,0.25)]"
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          className="text-center !text-[18px] font-medium text-white"
        >
          {description}
        </Typography>
      </div>

      {/* Background watermark text */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 flex justify-center">
        <Typography className="whitespace-pre-wrap text-center !text-[100px] font-bold leading-tight text-white opacity-10">
          {title}
        </Typography>
      </div>

      {/* Icon at the bottom with hover animation */}
      {imageSrc && (
        <motion.div
          className="relative z-10"
          variants={imageVariants[hoverAnimation]}
        >
          <Image
            src={imageSrc}
            alt={title}
            width={300}
            height={290}
            className="card-img object-contain"
          />
        </motion.div>
      )}
    </motion.div>
  );
};
