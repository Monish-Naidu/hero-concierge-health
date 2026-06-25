import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HomeStickyFeaturesImageProps {
  src: string;
  className?: string;
}

export const HomeStickyFeaturesImage: React.FC<
  HomeStickyFeaturesImageProps
> = ({ src, className }) => {
  if (!src || src.trim() === '') {
    return null;
  }

  return (
    <div
      className={cn(
        'h-[550px] w-[680px] overflow-hidden rounded-md',
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5 },
        }}
        className="h-full w-full"
      >
        <Image
          src={src}
          alt={src}
          width={680}
          height={550}
          className="h-full w-full rounded-[32px] object-cover"
        />
      </motion.div>
    </div>
  );
};
