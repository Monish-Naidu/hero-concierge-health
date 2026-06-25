'use client';

import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { cn } from '@/utils/cn';
import { ServiceCardType } from '@/api/types';
import { useState, useEffect, useRef } from 'react';
import { ServicesDropdown } from './ServicesDropdown';
import { ChevronDown } from 'lucide-react';

type HeaderLinkProps = {
  href: string;
  name: string;
  isActive?: boolean;
  services?: ServiceCardType[];
};

export const HeaderLink = ({
  href,
  name,
  isActive,
  services,
}: HeaderLinkProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isServicesLink = name.toLowerCase() === 'services';
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLSpanElement>(null);
  const lastOpenTimeRef = useRef<number>(0);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    if (typeof window === 'undefined') return;
    const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    
    if (isServicesLink && services && services.length > 0 && !isTouchDevice) {
      clearCloseTimeout();
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window === 'undefined') return;
    const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    
    if (isServicesLink && !isTouchDevice) {
      // Додаємо невелику затримку перед закриттям
      clearCloseTimeout();
      closeTimeoutRef.current = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 150);
    }
  };

  useEffect(() => {
    return () => clearCloseTimeout();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Don't close if dropdown was just opened (within last 300ms)
      const timeSinceOpen = Date.now() - lastOpenTimeRef.current;
      if (timeSinceOpen < 300) {
        return;
      }
      
      // Check if click is outside container
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        // Also check if click is inside the dropdown (for mobile portal)
        const target = event.target as HTMLElement;
        const dropdownElement = document.querySelector('[data-services-dropdown]');
        
        if (dropdownElement && dropdownElement.contains(target)) {
          return; // Don't close if clicking inside dropdown
        }
        
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      // Add delay to prevent immediate close on mobile
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
        document.addEventListener('touchstart', handleClickOutside, true);
        document.addEventListener('click', handleClickOutside, true);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside, true);
        document.removeEventListener('touchstart', handleClickOutside, true);
        document.removeEventListener('click', handleClickOutside, true);
      };
    }
  }, [isDropdownOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => {
    if (isServicesLink && services && services.length > 0) {
      // Prevent default to avoid navigation
      e.preventDefault();
      e.stopPropagation();
      
      // Always toggle on click (works for both touch and mouse)
      lastOpenTimeRef.current = Date.now();
      setIsDropdownOpen((prev) => !prev);
      return;
    }

    if (href.startsWith('/#')) {
      e.preventDefault();
      
      if (typeof window === 'undefined') return;
      
      const sectionId = href.split('/#')[1];
      const section = document.getElementById(sectionId);

      if (section) {
        const offset = 200;
        const topPosition =
          section.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: topPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent event propagation, but don't toggle here
    // Toggle is handled in onClick to ensure consistent behavior
    if (isServicesLink && services && services.length > 0) {
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Typography
        as="h5"
        className={cn(
          'group relative text-nowrap text-[16px] font-bold text-white transition-colors',
          isActive ? 'text-accent-soft' : 'hover:text-accent-soft'
        )}
      >
        {isServicesLink && services && services.length > 0 ? (
          <span
            ref={buttonRef}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick(e as any);
            }}
            className="flex items-center gap-1 cursor-pointer touch-manipulation select-none"
            role="button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            {name}
            <ChevronDown
              size={16}
              className={cn(
                'transition-transform duration-200',
                isDropdownOpen && 'rotate-180'
              )}
            />
          </span>
        ) : (
          <Link
            href={href}
            onClick={handleClick}
            className="flex items-center gap-1 touch-manipulation"
          >
            {name}
          </Link>
        )}

        {/* Styled "line" using scaleX */}
        <span
          className={cn(
            'pointer-events-none absolute bottom-[-4px] left-0 h-[4px] w-full rounded bg-accent-soft',
            'origin-right scale-x-0 transition-transform duration-300 ease-in-out group-hover:origin-left group-hover:scale-x-100',
            isActive && 'origin-left scale-x-100'
          )}
        />
      </Typography>

      {/* Services Dropdown */}
      {isServicesLink && services && (
        <ServicesDropdown
          services={services}
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          buttonRef={buttonRef}
          containerRef={containerRef}
        />
      )}
    </div>
  );
};
