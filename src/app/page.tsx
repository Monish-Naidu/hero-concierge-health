'use client';

import { Loader } from '@/components/loader/Loader';
import { AboutSection, ChooseUs, HeroSection } from '@/sections';
import { Contact } from '@/sections/contact/contact';
import { Differentiator } from '@/sections/differentiator/differentiator';
import { HowItWorks } from '@/sections/how-it-works/how-it-works';
import { FeaturedServices } from '@/sections/featured-services/featured-services';
import { MembershipTeaser } from '@/sections/membership-teaser/membership-teaser';
import UnlockPower from '@/sections/unlock-power-slider/unlock-power';
import { useEffect, useState } from 'react';
import { structureData } from '@/data/structure';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [homeData, setHomeData] = useState<any>(null);
  const [servicesData, setServicesData] = useState<any>(null);

  useEffect(() => {
    const loadData = () => {
      try {
        setLoading(true);
        
        // Use structureData directly instead of API calls
        if (structureData.home) {
          setHomeData(structureData.home);
        }

        if (structureData.services) {
          setServicesData(structureData.services);
        }

        setLoading(false);
        // Wait a bit for smooth transition
        setTimeout(() => {
          setShowLoader(false);
        }, 500);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        setShowLoader(false);
      }
    };

    loadData();
  }, []);

  const getDataSectionById = (id: string) => {
    if (!homeData) return null;
    return homeData?.sections.find((s: any) => s.id === id);
  };

  if (error) return <p className="p-10 text-center">Error: {error.message}</p>;

  const hero = homeData?.hero;
  const aboutUsData = getDataSectionById('membership-signup');
  const chooseUsData = getDataSectionById('why-choose-us');
  const featuredServicesDataRaw = getDataSectionById('unlock-power');
  const contactData = getDataSectionById('new-location');
  const footerData = getDataSectionById('footer');

  // Map service links to service slugs
  const serviceLinkToSlug: { [key: string]: string } = {
    '/services/hormone-optimization': 'hormone-optimization',
    '/services/weight-optimization': 'weight-optimization',
    '/services/nad-therapy': 'nad-therapy',
    '/services/sexual-health': 'sexual-health',
    '/services/aesthetics': 'aesthetics',
  };

  // Dynamically select random images from benefits sections (changes every 20 minutes)
  const [featuredServicesData, setFeaturedServicesData] = useState<any>(null);

  useEffect(() => {
    if (!featuredServicesDataRaw || !servicesData) {
      setFeaturedServicesData(featuredServicesDataRaw);
      return;
    }

    const STORAGE_KEY = 'featured_services_images';
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

    if (!shouldUpdate && cachedImages) {
      // Use cached images
      const servicesWithCachedImages = featuredServicesDataRaw.services?.map((service: any) => {
        const cachedImage = cachedImages![service.link];
        if (cachedImage) {
          return {
            ...service,
            image: cachedImage,
          };
        }
        return service;
      });

      setFeaturedServicesData({
        ...featuredServicesDataRaw,
        services: servicesWithCachedImages,
      });
      return;
    }

    // Generate new images
    const newImages: { [key: string]: string } = {};
    const servicesWithDynamicImages = featuredServicesDataRaw.services?.map((service: any) => {
      const serviceSlug = serviceLinkToSlug[service.link];
      if (!serviceSlug || !servicesData[serviceSlug]) {
        return service;
      }

      const serviceData = servicesData[serviceSlug];
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

    setFeaturedServicesData({
      ...featuredServicesDataRaw,
      services: servicesWithDynamicImages,
    });
  }, [featuredServicesDataRaw, servicesData]);

  // Get SEO data
  const seoData = structureData.seo?.home || {
    title: "Hero Concierge Health | Chicago Concierge Medicine for Men & Women",
    description: "Chicago's premier concierge health group for men and women — real telehealth backed by an actual clinic in Lakeview. Hormones, weight, sexual health, NAD, and aesthetics under one roof.",
    keywords: "concierge medicine Chicago, hormone optimization men and women, menopause Chicago, GLP-1 weight loss, NAD therapy, sexual health, aesthetics botox, telehealth Chicago, concierge clinic",
    ogTitle: "Hero Concierge Health | Chicago Concierge Medicine for Men & Women",
    ogDescription: "Concierge care that meets you online and in person. Sign up for a free consultation and enjoy member benefits.",
    ogImage: "https://heromenshealth.com/images/hero-bg.jpg",
    ogUrl: "https://heromenshealth.com/",
    twitterCard: "summary_large_image",
    twitterTitle: "Hero Concierge Health | Chicago Concierge Medicine for Men & Women",
    twitterDescription: "Real telehealth backed by an actual Chicago clinic — concierge medicine for men and women.",
    twitterImage: "https://heromenshealth.com/images/hero-bg.jpg",
    canonical: "https://heromenshealth.com/",
  };

  // Set SEO metadata
  useEffect(() => {
    if (!seoData) return;

    // Set document title
    document.title = seoData.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update meta tags
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords);
    updateMetaTag('og:title', seoData.ogTitle, true);
    updateMetaTag('og:description', seoData.ogDescription, true);
    updateMetaTag('og:image', seoData.ogImage, true);
    updateMetaTag('og:url', seoData.ogUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', "Hero Concierge Health", true);
    updateMetaTag('twitter:card', seoData.twitterCard);
    updateMetaTag('twitter:title', seoData.twitterTitle);
    updateMetaTag('twitter:description', seoData.twitterDescription);
    updateMetaTag('twitter:image', seoData.twitterImage);
    updateMetaTag('twitter:site', '@HeroConcierge');
    updateMetaTag('twitter:creator', '@HeroConcierge');

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seoData.canonical);

    // Add structured data
    if (seoData.structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(seoData.structuredData);
    }
  }, [seoData]);

  return (
    <>
      {showLoader && (
        <div 
          className="fixed inset-0 z-[100] transition-opacity duration-500" 
          style={{ opacity: loading ? 1 : 0, pointerEvents: loading ? 'auto' : 'none' }}
          suppressHydrationWarning
        >
          <Loader />
        </div>
      )}
      {/* Main page content */}
      <main className={`transition-opacity duration-500 ${showLoader && loading ? 'opacity-0' : 'opacity-100'}`}>
        <section id="home">
          <HeroSection
            title={hero?.title}
            shortTitle={hero?.short_title}
            description={hero?.subtitle}
            btnText={hero?.ctaText}
            video={hero?.video}
          />
        </section>

        <section id="why-us" className="my-20 lg:my-28">
          <Differentiator />
        </section>

        <section id="how-it-works" className="my-20 lg:my-28">
          <HowItWorks />
        </section>

        <section id="about-us" className="my-20 lg:my-28">
          <AboutSection
            title={aboutUsData?.title || ''}
            content={aboutUsData?.content || []}
            ctaText={aboutUsData?.ctaText || ''}
            offers={aboutUsData?.['exclusive-offers'] || []}
          />
        </section>

        {chooseUsData && chooseUsData.title ? (
          <section id="why-choose" className="mb-12 flex flex-col gap-8 sm:mb-16 md:mb-20 lg:mb-[70px] mt-8 sm:mt-14 lg:mt-28">
            <UnlockPower unlockPowerData={chooseUsData as any} />
        </section>
        ) : null}

        <section
          id="unlock-power"
          className="relative mb-[60px] flex min-h-[calc(100vh-40px)] w-full flex-col justify-start"
        >
          <FeaturedServices
            title={featuredServicesData?.title || ''}
            content={featuredServicesData?.services || []}
          />
        </section>

        <section className="my-20 lg:my-28">
          <MembershipTeaser />
        </section>

        <section className="mb-[50px] mt-20 lg:mt-28">
          <Contact
            title={contactData?.title || ''}
            subtitle={contactData?.subtitle || ''}
            description={contactData?.description || ''}
            address={contactData?.address || ''}
            mapLink={contactData?.mapLink || ''}
            directionsText={contactData?.directionsText || ''}
            footerData={footerData?.contact}
            map={contactData?.map || ''}
            disclaimer={contactData?.disclaimer || ''}
          />
        </section>
      </main>
    </>
  );
}
