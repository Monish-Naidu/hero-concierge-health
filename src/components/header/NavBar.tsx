'use client';

import { ServiceCardType } from '@/api/types';
import QuickContactModal from './QuickContactModal';
import { usePathname } from 'next/navigation';
import { Phone, MessageSquare, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { cn } from '@/utils/cn';
import { LogoLink } from '../ui/LogoLink';
import { Header } from './Header';
import { HeaderLink } from './HeaderLink';
import { structureData } from '@/data/structure';

const NavBarContent = ({
  variant = 'default',
  sticky,
}: {
  variant: 'default' | 'centered';
  sticky: boolean;
}) => {
  // Store the name of the active section
  const [activeSection, setActiveSection] = useState('');
  const [menuItems, setMenuItems] = useState<
    Array<{ name: string; href: string }>
  >([]);
  const [servicesData, setServicesData] = useState<ServiceCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const isServicePage = pathname.startsWith('/services/');
  const slug = isServicePage ? pathname.split('/').pop() : null;

  // Map service links to service slugs
  const serviceLinkToSlug: { [key: string]: string } = {
    '/services/hormone-optimization': 'hormone-optimization',
    '/services/weight-optimization': 'weight-optimization',
    '/services/nad-therapy': 'nad-therapy',
    '/services/sexual-health': 'sexual-health',
    '/services/aesthetics': 'aesthetics',
  };

  useEffect(() => {
    const loadData = () => {
      try {
        setLoading(true);

        // Use structureData directly instead of API calls
        const homeData = structureData.home;
        const servicesDataFromStructure = structureData.services;

        if (homeData) {
          const featuredServicesDataRaw = homeData.sections.find(
            (s: any) => s.id === 'unlock-power'
          );

          if (featuredServicesDataRaw?.services && servicesDataFromStructure) {
            // Dynamically select random images from benefits sections (changes every 20 minutes)
            const STORAGE_KEY = 'header_services_images';
            const CACHE_DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds

            // Check if we have cached images and if they're still valid
            const cachedData = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
            let cachedImages: { [key: string]: string } | null = null;
            let lastUpdateTime: number | null = null;

            if (cachedData) {
              try {
                const parsed = JSON.parse(cachedData);
                cachedImages = parsed.images || null;
                lastUpdateTime = parsed.timestamp || null;
              } catch (e) {
                // Invalid cache, ignore
              }
            }

            const now = Date.now();
            const shouldUpdate = !lastUpdateTime || (now - lastUpdateTime) >= CACHE_DURATION;

            let servicesWithImages = featuredServicesDataRaw.services;

            if (!shouldUpdate && cachedImages) {
              // Use cached images
              servicesWithImages = featuredServicesDataRaw.services.map((service: any) => {
                const cachedImage = cachedImages![service.link];
                if (cachedImage) {
                  return {
                    ...service,
                    image: cachedImage,
                  };
                }
                return service;
              });
            } else {
              // Generate new images
              const newImages: { [key: string]: string } = {};
              servicesWithImages = featuredServicesDataRaw.services.map((service: any) => {
                const serviceSlug = serviceLinkToSlug[service.link];
                if (!serviceSlug || !servicesDataFromStructure[serviceSlug]) {
                  return service;
                }

                const serviceData = servicesDataFromStructure[serviceSlug];
                const benefitsSection = serviceData.sections?.find((section: any) => section.id === 'benefits');
                
                if (benefitsSection?.points && Array.isArray(benefitsSection.points) && benefitsSection.points.length > 0) {
                  // Filter points that have images
                  const pointsWithImages = benefitsSection.points.filter((point: any) => 
                    point?.image && typeof point.image === 'string'
                  );
                  
                  if (pointsWithImages.length > 0) {
                    // Randomly select one image
                    const randomIndex = Math.floor(Math.random() * pointsWithImages.length);
                    const selectedPoint = pointsWithImages[randomIndex];
                    
                    newImages[service.link] = selectedPoint.image;
                    
                    return {
                      ...service,
                      image: selectedPoint.image,
                    };
                  }
                }

                return service;
              });

              // Save to localStorage
              if (typeof window !== 'undefined') {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                  images: newImages,
                  timestamp: now,
                }));
              }
            }

            setServicesData(servicesWithImages);
          }
        }

        const headers = structureData.headers || [];

        let selectedHeader = null;

        if (pathname === '/') {
          selectedHeader = headers.find((h: any) => h.id === 'home-header');
        } else if (isServicePage) {
          selectedHeader = headers.find((h: any) => 
            h.pages?.some((page: string) => pathname.startsWith(page))
          );
        }

        if (selectedHeader?.menu) {
          const items = selectedHeader.menu.map(
            (item: { label: string; link: string }) => ({
              name: item.label,
              href: item.link,
            })
          );
          setMenuItems(items);
        } else if (headers.length > 0 && headers[0]?.menu) {
          const items = headers[0].menu.map(
            (item: { label: string; link: string }) => ({
              name: item.label,
              href: item.link,
            })
          );
          setMenuItems(items);
        }
      } catch (error) {
        console.error('Error loading header data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [pathname, isServicePage]);

  useEffect(() => {
    if (!menuItems.length) return;

    const hashLinks = menuItems.filter((link) => link.href.includes('#'));
    const sectionIds = hashLinks.map((link) => link.href.split('#')[1]);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      let currentSectionId = '';

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;

          if (
            scrollPosition >= elementTop &&
            scrollPosition < elementTop + elementHeight
          ) {
            currentSectionId = sectionId;
            break;
          }
        }
      }

      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuItems]);

  if (loading || !menuItems.length) {
    return (
      <Header
        Logo={<LogoLink />}
        variant={variant}
        sticky={sticky}
        lastItem={''}
        desktopItems={<></>}
        mobileItems={<></>}
      />
    );
  }
  return (
    <>
      <Header
        Logo={<LogoLink />}
        variant={variant}
        sticky={sticky}
        lastItem={menuItems[menuItems.length - 1]?.name || ''}
        desktopItems={
          <>
            {menuItems.slice(0, -1).map((link) => (
              <HeaderLink
                key={link.name}
                href={link.href}
                name={link.name}
                isActive={
                  link.href.includes('#') &&
                  link.href.split('#')[1] === activeSection
                }
                services={
                  link.name.toLowerCase() === 'services'
                    ? servicesData
                    : undefined
                }
              />
            ))}
          </>
        }
        mobileItems={
          <>
            {menuItems.slice(0, -1).map((link) => (
              <HeaderLink
                key={link.name}
                href={link.href}
                name={link.name}
                isActive={
                  link.href.includes('#') &&
                  link.href.split('#')[1] === activeSection
                }
                services={
                  link.name.toLowerCase() === 'services'
                    ? servicesData
                    : undefined
                }
              />
            ))}
          </>
        }
        activeSection={activeSection}
      />
    </>
  );
};

// Mobile Header Component
export const MobileHeader = ({
  Logo,
  children,
  activeSection,
}: {
  Logo: React.ReactNode;
  children: React.ReactNode;
  activeSection?: string;
}) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const phoneButtonRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!navRef.current || !activeSection) return;

    const allLinks = navRef.current.querySelectorAll('a');
    let foundLink: Element | null = null;

    for (let i = 0; i < allLinks.length; i++) {
      const href = allLinks[i].getAttribute('href');
      if (href === `/#${activeSection}`) {
        foundLink = allLinks[i];
        break;
      }
    }

    if (foundLink && foundLink.parentElement) {
      foundLink.parentElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeSection]);

  return (
    <div className={cn('container relative z-50 block px-4 py-2 xl:hidden')} suppressHydrationWarning>
      <div className="w-full items-center gap-2 px-0 pb-4 pt-2 flex-row-between" suppressHydrationWarning>
        {Logo}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative" ref={phoneButtonRef}>
            <motion.button
              onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
              animate={{
                boxShadow: [
                  '0 0 0 0px rgba(168,106,69, 0)',
                  '0 0 0 8px rgba(168,106,69, 0.2)',
                  '0 0 0 0px rgba(168,106,69, 0)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1px] border-[#A86A45] bg-[#A86A45] text-white shadow-custom-green transition-all hover:scale-105 sm:h-[50px] sm:w-[50px] md:h-[60px] md:w-[60px]"
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
                className="flex items-center justify-center"
              >
                <Phone size={18} color="white" className="sm:hidden" />
                <Phone size={22} color="white" className="hidden sm:block md:hidden" />
                <Phone size={28} color="white" className="hidden md:block" />
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {isPhoneDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-full mt-2 z-[9999] flex min-w-[200px] -translate-x-1/2 flex-col overflow-hidden rounded-[20px] border border-[#A86A45]/30 bg-white p-1.5 shadow-[0_10px_30px_rgba(168,106,69,0.2)] backdrop-blur-xl sm:min-w-[240px] sm:left-auto sm:right-0 sm:translate-x-0 sm:p-2"
                >
                  <a
                    href="tel:+13124654653"
                    className="flex items-center gap-2 rounded-[14px] p-2 transition-colors hover:bg-[#A86A45]/10 sm:gap-3 sm:rounded-[16px] sm:p-3"
                    onClick={() => setIsPhoneDropdownOpen(false)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#A86A45]/20 text-[#A86A45] sm:h-10 sm:w-10">
                      <Phone size={16} className="sm:size-[20px]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#2D2525] sm:text-sm">Call Us</span>
                      <span className="text-[10px] text-[#2D2525]/60 sm:text-xs">+1 (312) 465-4653</span>
                    </div>
                  </a>
                  <a
                    href="sms:+13124654653"
                    className="flex items-center gap-2 rounded-[14px] p-2 transition-colors hover:bg-[#A86A45]/10 sm:gap-3 sm:rounded-[16px] sm:p-3"
                    onClick={() => setIsPhoneDropdownOpen(false)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#A86A45]/20 text-[#A86A45] sm:h-10 sm:w-10">
                      <MessageSquare size={16} className="sm:size-[20px]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#2D2525] sm:text-sm">Text Message</span>
                      <span className="text-[10px] text-[#2D2525]/60 sm:text-xs">+1 (312) 465-4653</span>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Button
              onClick={() => setIsContactModalOpen(true)}
              className="group relative flex items-center gap-2 overflow-hidden rounded-[56px] border-[1px] border-[#A86A45] bg-[#A86A45] px-[15px] py-[15px] text-[14px] font-bold text-white shadow-custom-green [text-shadow:2px_2px_10px_rgba(0,0,0,0.25)] sm:px-[20px] sm:py-[20px] sm:text-[16px] md:p-[30px] md:text-[24px]"
              style={{
                background:
                  'radial-gradient(163.33% 163.33% at 50% 100%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 100%, rgba(255, 255, 255, 0) 100%), #A86A45',
                backgroundBlendMode: 'overlay, normal',
              }}
            >
              <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 3,
                }}
                style={{ skewX: -20 }}
              />
              <Send size={18} className="relative z-10 sm:size-[22px] md:size-[28px]" />
              <span className="relative z-10">Get a Callback</span>
            </Button>
          </motion.div>
        </div>
      </div>
      <nav
        ref={navRef}
        className={cn(
          'no-scrollbar grow gap-[25px] overflow-x-auto flex-row-around lg:gap-[44px]'
        )}
        style={{
          overflowY: 'visible',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '10px',
        }}
      >
        {children}
      </nav>
      <QuickContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export const NavBar = (props: {
  variant: 'default' | 'centered';
  sticky: boolean;
}) => {
  return <NavBarContent {...props} />;
};