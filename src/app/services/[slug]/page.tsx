'use client';

import FAQ from '@/components/faq/FAQ';
import { Loader } from '@/components/loader/Loader';
import { ChooseUs, HeroSection } from '@/sections';
import { Benefits } from '@/sections/benefits/benefits';
import { Contact } from '@/sections/contact/contact';
import { FeaturedServices } from '@/sections/featured-services/featured-services';
import { FeaturedServicesPages } from '@/components/featured-services-pages/FeaturedServicesPages';
import { Journey } from '@/sections/journey/journey';
import { OtherServices } from '@/sections/other-services/other-services';
import { Partners } from '@/sections/partners/partners';
import UnlockPower from '@/sections/unlock-power-slider/unlock-power';
import { useParams } from 'next/navigation';
import { useEffect, useState, useMemo, useRef } from 'react';
import { structureData } from '@/data/structure';

type ServiceSection = {
  id: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  points?:
    | string[]
    | {
        title: string;
        image: string;
      }[];
  description?: string;
  content?: string;
  steps?: {
    icon: string;
    title: string;
    description: string;
  }[];
  address?: string;
  mapLink?: string;
  directionsText?: string;
  partners?: {
    name: string;
    logo: string;
  }[];
  contact: {
    email: string;
    address: string;
    phone: string;
  };
  map: string;
  disclaimer: string;
  questions: {
    q: string;
    a: string;
  }[];
  services: {
    name: string;
    image: string;
    description: string;
    pointsTitle: string;
    points: string[];
    ctaText: string;
    link: string;
  }[];
};

type ServiceData = {
  slug: string;
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    video?: string;
  };
  sections: ServiceSection[];
};

export default function SingleService(): JSX.Element {
  const { slug }: { slug: string } = useParams();
  const [service, setService] = useState<ServiceData | null>(null);
  const [homeData, setHomeData] = useState<any>(null);
  const [servicesData, setServicesData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [otherServicesData, setOtherServicesData] = useState<any>(null);
  const hasProcessedImages = useRef(false);

  // Map service links to service slugs (constant, moved outside to avoid recreation)
  const serviceLinkToSlug: { [key: string]: string } = {
    '/services/hormone-optimization': 'hormone-optimization',
    '/services/weight-optimization': 'weight-optimization',
    '/services/nad-therapy': 'nad-therapy',
    '/services/sexual-health': 'sexual-health',
    '/services/aesthetics': 'aesthetics',
  };

  useEffect(() => {
    const loadServiceData = () => {
      try {
        setIsLoading(true);

        // Use structureData directly instead of API calls
        const serviceData = structureData.services?.[slug as keyof typeof structureData.services] as ServiceData | undefined;
        
        if (serviceData) {
          setService(serviceData);
          setServicesData(structureData.services as any);
        } else {
          setError(`Service with identifier "${slug}" not found`);
        }

        if (structureData.home) {
          setHomeData(structureData.home);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load service data'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadServiceData();
  }, [slug]);

  // Get other services from home section "unlock-power" (memoized to prevent recreation)
  const otherServicesDataRaw = useMemo(() => {
    return homeData?.sections?.find(
      (section: any) => section.id === 'unlock-power'
    );
  }, [homeData]);

  // Dynamically select random images from benefits sections for Other Services (changes every 20 minutes)
  useEffect(() => {
    // Prevent infinite loop by checking if we've already processed
    if (hasProcessedImages.current) {
      return;
    }

    if (!otherServicesDataRaw || !servicesData) {
      setOtherServicesData(otherServicesDataRaw);
      return;
    }

    hasProcessedImages.current = true;

    const STORAGE_KEY = 'other_services_images';
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
      const servicesWithCachedImages = otherServicesDataRaw.services?.map((service: any) => {
        const cachedImage = cachedImages![service.link];
        if (cachedImage) {
          return {
            ...service,
            image: cachedImage,
          };
        }
        return service;
      });

      setOtherServicesData({
        ...otherServicesDataRaw,
        services: servicesWithCachedImages,
      });
      return;
    }

    // Generate new images
    const newImages: { [key: string]: string } = {};
    const servicesWithDynamicImages = otherServicesDataRaw.services?.map((service: any) => {
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

    setOtherServicesData({
      ...otherServicesDataRaw,
      services: servicesWithDynamicImages,
    });
  }, [otherServicesDataRaw, servicesData]);

  // Reset the flag when slug changes
  useEffect(() => {
    hasProcessedImages.current = false;
  }, [slug]);

  // Get SEO data for this service (must be before conditional returns)
  const seoData = useMemo(() => {
    if (!structureData.seo) {
      return null;
    }
    const seoKey = slug as keyof typeof structureData.seo;
    return structureData.seo[seoKey] || structureData.seo['hormone-optimization'];
  }, [slug]);

  // Set SEO metadata
  useEffect(() => {
    if (!seoData || typeof window === 'undefined') return;

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
    updateMetaTag('twitter:card', seoData.twitterCard);
    updateMetaTag('twitter:title', seoData.twitterTitle);
    updateMetaTag('twitter:description', seoData.twitterDescription);
    updateMetaTag('twitter:image', seoData.twitterImage);

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

  const getSectionDataById = (id: string) => {
    if (!service?.sections) return null;
    return service.sections.find((section) => section.id === id);
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center" suppressHydrationWarning>
        <div className="text-center" suppressHydrationWarning>
          <Loader />
        </div>
      </main>
    );
  }

  if (error || !service) {
    return (
      <main className="flex min-h-screen items-center justify-center" suppressHydrationWarning>
        <div className="text-center" suppressHydrationWarning>
          <h2 className="text-2xl font-bold text-red-500" suppressHydrationWarning>Error</h2>
          <p suppressHydrationWarning>{error || ''}</p>
        </div>
      </main>
    );
  }

  const problemStatement = getSectionDataById('problem-statement');
  const partnersData = getSectionDataById('partners-in-wellness');
  const journeyData = getSectionDataById('cta');
  const contactData = getSectionDataById('new-location');
  const faqData = getSectionDataById('faq');
  const unlockPowerData = getSectionDataById('unlock-the-power');
  const benefits = getSectionDataById('benefits');

  return (
    <main suppressHydrationWarning>
      <section id="home" suppressHydrationWarning>
        <HeroSection
          title={service.hero?.title || ''}
          subtitle={service.hero?.subtitle || ''}
          description={service.hero?.description || ''}
          btnText={service.hero?.ctaText || ''}
          video={service.hero?.video}
          content={[]}
        />
      </section>

      <section
        id="problem-statement"
        className="relative mb-[60px] pt-[60px] flex w-full flex-col justify-start"
      >
        <FeaturedServicesPages
          title={problemStatement?.title || ''}
          content={
            problemStatement?.points?.map((point) => {
              if (
                typeof point === 'object' &&
                point !== null &&
                'title' in point
              ) {
                return {
                  name: point.title || '',
                  description: '',
                  pointsTitle: '',
                  points: [],
                  ctaText: '',
                  link: '',
                  image: point.image || '',
                };
              } else {
                return {
                  name: point as string,
                  description: '',
                  pointsTitle: '',
                  points: [],
                  ctaText: '',
                  link: '',
                  image: '',
                };
              }
            }) || []
          }
        />
      </section>

      {unlockPowerData ? (
        <section
          id="unlock-power"
          className="mb-12 flex flex-col gap-8 sm:mb-16 md:mb-20"
        >
          <UnlockPower unlockPowerData={unlockPowerData} />
        </section>
      ) : null}

      <section id="benefits" className="mb-12 sm:mb-16 md:mb-20">
        <Benefits
          title={benefits?.title || ''}
          description={benefits?.description || ''}
          points={
            (benefits?.points as { title: string; image: string }[])?.filter(
              (point) => point && point.title && point.image
            ) || []
          }
        />
      </section>

      <section id="expertise" className="mb-12 sm:mb-16 md:mb-20">
        <Partners
          title={partnersData?.title || ''}
          description={partnersData?.description || ''}
          content={partnersData?.content}
          ctaText={partnersData?.ctaText || ''}
          partners={partnersData?.partners || []}
        />
      </section>

      <section id="faq" className="mx-auto mb-12 pb-6 pt-6 sm:mb-16 md:mb-20">
        <FAQ title={faqData?.title || ''} content={faqData?.questions || []} />
      </section>

      <section className="mb-12 sm:mb-16 md:mb-20 lg:mb-[100px]">
        <Journey
          title={journeyData?.title || ''}
          subtitle={journeyData?.subtitle || ''}
          content={journeyData?.content || []}
          btnText={journeyData?.ctaText || ''}
        />
      </section>

      <section className="mb-12 sm:mb-16 md:mb-20 lg:mb-[100px]">
        <OtherServices
          title="Other Services"
          content={
            otherServicesData?.services?.filter(
              (service: any) => service.link !== `/services/${slug}`
            ) || []
          }
        />
      </section>

      <section className="mb-12 sm:mb-16 md:mb-20">
        <Contact
          title={contactData?.title || ''}
          subtitle={contactData?.subtitle || ''}
          description={contactData?.description || ''}
          address={contactData?.address || ''}
          mapLink={contactData?.mapLink || ''}
          directionsText={contactData?.directionsText || ''}
          footerData={contactData?.contact}
          disclaimer={contactData?.disclaimer || ''}
          map={contactData?.map || ''}
        />
      </section>
    </main>
  );
}
