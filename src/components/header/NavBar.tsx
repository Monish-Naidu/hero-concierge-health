'use client';

import { ServiceCardType } from '@/api/types';
import QuickContactModal from './QuickContactModal';
import { usePathname } from 'next/navigation';
import { Phone, MessageSquare, Send, Menu, X } from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the drawer on Escape; lock body scroll while open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div className={cn('relative z-50 block w-full px-4 py-3 xl:hidden')} suppressHydrationWarning>
      {/* Top bar: logo · Get a Callback · hamburger */}
      <div className="flex w-full items-center justify-between gap-2" suppressHydrationWarning>
        <div className="min-w-0 shrink">{Logo}</div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            onClick={() => setIsContactModalOpen(true)}
            className="flex items-center gap-2 rounded-[40px] border border-[#A86A45] bg-[#A86A45] px-3.5 py-2.5 text-[13px] font-bold text-white shadow-custom-green sm:px-5 sm:text-[15px]"
            style={{
              background:
                'radial-gradient(163.33% 163.33% at 50% 100%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 100%, rgba(255, 255, 255, 0) 100%), #A86A45',
              backgroundBlendMode: 'overlay, normal',
            }}
          >
            <Send size={16} className="sm:size-[18px]" />
            <span className="sm:hidden">Callback</span>
            <span className="hidden sm:inline">Get a Callback</span>
          </Button>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Slide-in drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="fixed right-0 top-0 z-[999] flex h-full w-[82%] max-w-[340px] flex-col bg-ink p-6 shadow-[0_0_60px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Menu
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links (tapping any link closes the drawer) */}
              <nav
                className="mt-8 flex flex-col gap-3 text-[18px]"
                onClick={() => setMenuOpen(false)}
              >
                {children}
              </nav>

              <div className="my-6 h-px bg-white/10" />

              {/* Call / Text quick actions */}
              <div className="flex flex-col gap-2">
                <a
                  href="tel:+13124654653"
                  className="flex items-center gap-3 rounded-[14px] bg-white/5 p-3 transition-colors hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A86A45]/25 text-[#D8BFA6]">
                    <Phone size={18} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[14px] font-bold text-white">Call us</span>
                    <span className="text-[12px] text-white/55">+1 (312) 465-4653</span>
                  </span>
                </a>
                <a
                  href="sms:+13124654653"
                  className="flex items-center gap-3 rounded-[14px] bg-white/5 p-3 transition-colors hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A86A45]/25 text-[#D8BFA6]">
                    <MessageSquare size={18} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[14px] font-bold text-white">Text us</span>
                    <span className="text-[12px] text-white/55">+1 (312) 465-4653</span>
                  </span>
                </a>
              </div>

              <Button
                onClick={() => {
                  setMenuOpen(false);
                  setIsContactModalOpen(true);
                }}
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-[40px] bg-[#A86A45] px-6 py-4 text-[16px] font-bold text-white shadow-custom-green"
              >
                <Send size={18} /> Get a Callback
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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