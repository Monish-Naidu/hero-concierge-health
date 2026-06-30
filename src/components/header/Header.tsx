'use client';

import { ServiceCardType } from '@/api/types';
import { CallbackButton } from '@/components/ui/CallbackButton';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { SiteMenu } from './SiteMenu';

export interface HeaderProps {
  sticky?: boolean;
  variant?: 'default' | 'centered';
  Logo: ReactNode;
  services?: ServiceCardType[];
}

export const Header = ({ Logo, services = [] }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Transparent over the dark home hero; solid bar once scrolled or on light inner pages.
  const solidBar = isScrolled || !isHome;

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'fixed left-0 right-0 top-0 z-[60] w-full transition-colors duration-300',
        solidBar ? 'bg-[#2D2525]/90 backdrop-blur-md' : 'bg-transparent'
      )}
      suppressHydrationWarning
    >
      <div className="container mx-auto flex w-full items-center justify-between gap-3 px-4 py-3 lg:py-4">
        {Logo}
        <div className="flex items-center gap-2 sm:gap-3">
          <CallbackButton
            label="Contact Hero"
            className="px-4 py-2.5 text-[14px] sm:px-6 sm:text-[16px]"
          />
          <SiteMenu services={services} />
        </div>
      </div>
    </motion.header>
  );
};
