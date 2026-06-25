'use client';

import QuickContactModal from './QuickContactModal';
import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, Send } from 'lucide-react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { MobileHeader } from './NavBar';

const headerVariants = cva('mx-auto container', {
  variants: {
    variant: {
      default: '',
      centered: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface HeaderProps extends VariantProps<typeof headerVariants> {
  sticky?: boolean;
  Logo: ReactNode;
  mobileItems: ReactNode;
  desktopItems: ReactNode;
  lastItem: string;
  activeSection?: string;
}

export const Header = ({
  Logo,
  sticky,
  variant,
  mobileItems,
  desktopItems,
  activeSection,
  lastItem,
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const phoneButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (phoneButtonRef.current && !phoneButtonRef.current.contains(event.target as Node)) {
        setIsPhoneDropdownOpen(false);
      }
    };

    if (isPhoneDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPhoneDropdownOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
        className={cn(
          'fixed left-0 right-0 top-0 z-[50] mx-auto w-full transition-all lg:max-w-[1200px] xl:max-w-[1340px] 2xl:max-w-[1630px]',
          sticky && variant === 'centered' && 'lg:top-3',
          isScrolled &&
            variant === 'centered' &&
            'bg-[#2D2525]/80 backdrop-blur-[8px] lg:rounded-[96px] lg:bg-[#2D2525] lg:backdrop-blur-none'
        )}
        suppressHydrationWarning
      >
        <div
          className={cn(
            'container hidden xl:block',
            headerVariants({ variant })
          )}
          suppressHydrationWarning
        >
          <div className="w-full gap-2 px-0 py-4 flex-row-start" suppressHydrationWarning>
            {Logo}
            <nav className="grow gap-3 flex-row-center lg:gap-[44px]">
              {desktopItems}
            </nav>
            <div className="flex items-center gap-4">
              <div className="relative" ref={phoneButtonRef}>
                <motion.button
                  onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                  animate={{
                    boxShadow: [
                      '0 0 0 0px rgba(168,106,69, 0)',
                      '0 0 0 12px rgba(168,106,69, 0.2)',
                      '0 0 0 0px rgba(168,106,69, 0)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-[1px] border-[#A86A45] bg-[#A86A45] text-white shadow-custom-green transition-all hover:scale-110"
                  style={{
                    background:
                      'radial-gradient(163.33% 163.33% at 50% 100%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 100%, rgba(255, 255, 255, 0) 100%), #A86A45',
                    backgroundBlendMode: 'overlay, normal',
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 10, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    <Phone size={28} color="white" />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {isPhoneDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-4 flex min-w-[240px] flex-col overflow-hidden rounded-[24px] border border-[#A86A45]/30 bg-white p-2 shadow-[0_20px_60px_rgba(168,106,69,0.2)] backdrop-blur-xl"
                    >
                      <a
                        href="tel:+13124654653"
                        className="flex items-center gap-3 rounded-[16px] p-3 transition-colors hover:bg-[#A86A45]/10"
                        onClick={() => setIsPhoneDropdownOpen(false)}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A86A45]/20 text-[#A86A45]">
                          <Phone size={20} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#2D2525]">Call Us</span>
                          <span className="text-sm font-semibold text-[#2D2525]/60">+1 (312) 465-4653</span>
                        </div>
                      </a>
                      <a
                        href="sms:+13124654653"
                        className="flex items-center gap-3 rounded-[16px] p-3 transition-colors hover:bg-[#A86A45]/10"
                        onClick={() => setIsPhoneDropdownOpen(false)}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A86A45]/20 text-[#A86A45]">
                          <MessageSquare size={20} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#2D2525]">Text Message</span>
                          <span className="text-sm font-semibold text-[#2D2525]/60">+1 (312) 465-4653</span>
                        </div>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {lastItem ? (
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Button
                    className="group relative flex items-center gap-3 overflow-hidden rounded-[56px] border-[1px] border-[#A86A45] bg-[#A86A45] px-[30px] py-[15px] text-[23px] font-bold text-white shadow-custom-green [text-shadow:2px_2px_10px_rgba(0,0,0,0.25)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(168,106,69,0.5)]"
                    style={{
                      height: '60px',
                      background:
                        'radial-gradient(163.33% 163.33% at 50% 100%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 100%, rgba(255, 255, 255, 0) 100%), #A86A45',
                      backgroundBlendMode: 'overlay, normal',
                    }}
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    <motion.div
                      className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatDelay: 1.5,
                      }}
                      style={{ skewX: -20 }}
                    />
                    <Send size={24} className="relative z-10 transition-transform group-hover:scale-110" />
                    <span className="relative z-10">{lastItem}</span>
                  </Button>
                </motion.div>
              ) : null}
            </div>
          </div>
        </div>
        <MobileHeader Logo={Logo} activeSection={activeSection}>
          {mobileItems}
        </MobileHeader>
      </motion.header>
      <QuickContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};
