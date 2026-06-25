'use client';

import { ServiceCardType } from '@/api/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ServicesDropdownProps {
  services: ServiceCardType[];
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  buttonRef?: React.RefObject<HTMLElement>;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export const ServicesDropdown = ({
  services,
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
  buttonRef,
}: ServicesDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !buttonRef?.current || !mounted) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      const button = buttonRef.current;
      if (!button || typeof window === 'undefined') return;

      const buttonRect = button.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 16; // Відступ від країв екрана
      
      // Визначаємо ширину dropdown
      let dropdownWidth = 850;
      if (viewportWidth < 640) dropdownWidth = viewportWidth - 32;
      else if (viewportWidth < 768) dropdownWidth = 600;
      else if (viewportWidth < 1280) dropdownWidth = 750;
      
      // Переконуємось, що ширина не більша за екран
      dropdownWidth = Math.min(dropdownWidth, viewportWidth - padding * 2);

      // Рахуємо центр кнопки
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      
      // Рахуємо лівий край так, щоб центр dropdown збігався з центром кнопки
      let left = buttonCenterX - dropdownWidth / 2;
      
      // Clamping: не даємо вийти за лівий край
      if (left < padding) {
        left = padding;
      }
      
      // Clamping: не даємо вийти за правий край
      if (left + dropdownWidth > viewportWidth - padding) {
        left = viewportWidth - padding - dropdownWidth;
      }

      const gap = 8;
      let top = buttonRect.bottom + gap;

      // Якщо знизу мало місця, відкриваємо вгору (опціонально, але корисно)
      const estimatedHeight = 400;
      if (top + estimatedHeight > viewportHeight && buttonRect.top > estimatedHeight) {
        top = buttonRect.top - estimatedHeight - gap;
      }

      setPosition({
        top,
        left,
        width: dropdownWidth,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, { passive: true });

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isOpen, mounted, buttonRef]);

  if (!mounted) return null;

  const dropdownContent = (
    <AnimatePresence>
      {isOpen && position && (
        <motion.div
          ref={dropdownRef}
          data-services-dropdown
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed z-[9999]"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: `${position.width}px`,
            maxWidth: 'calc(100vw - 32px)',
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Невидимий місток зверху, щоб закрити щілину між кнопкою та меню */}
          <div 
            className="absolute left-0 right-0 h-4 pointer-events-auto" 
            style={{ top: '-12px' }}
          />
          
          <div 
            className="relative rounded-[32px] p-[2px]"
            style={{
              background: 'linear-gradient(135deg, rgba(168,106,69,0.2) 0%, rgba(168,106,69,0.1) 50%, rgba(168,106,69,0.2) 100%)',
            }}
          >
            <div 
              className="overflow-auto rounded-[30px] border border-[#A86A45]/30 bg-white p-4 shadow-[0_20px_60px_rgba(168,106,69,0.2)] backdrop-blur-xl md:p-6"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FFFE 100%)',
                maxHeight: 'calc(100vh - 100px)',
              }}
            >
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                {services.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <Link href={service.link || '#'} className="block" onClick={onClose}>
                      <div className="relative overflow-hidden rounded-[20px] border-2 border-[#A86A45]/10 bg-white p-[2px] transition-all duration-300 group-hover:border-[#A86A45]/40">
                        <div className="relative overflow-hidden rounded-[18px]">
                          {service.image && (
                            <div className="relative h-24 w-full md:h-32">
                              <Image
                                src={service.image}
                                alt={service.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          )}
                          <div className="p-3">
                            <h3 className="mb-1 text-sm font-bold text-[#A86A45] md:text-base">
                              {service.name}
                            </h3>
                            <p className="mb-2 line-clamp-2 text-[10px] text-[#2D2525]/70 md:text-xs">
                              {service.description}
                            </p>
                            <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#A86A45] md:text-xs">
                              Explore <ArrowRight size={12} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(dropdownContent, document.body);
};
