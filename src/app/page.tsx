'use client';

import { Loader } from '@/components/loader/Loader';
import { AboutSection, HeroSection } from '@/sections';
import { Contact } from '@/sections/contact/contact';
import { CareApproach } from '@/sections/care-approach/care-approach';
import { ClinicGallery } from '@/sections/clinic-gallery/clinic-gallery';
import { Differentiator } from '@/sections/differentiator/differentiator';
import { FeaturedServices } from '@/sections/featured-services/featured-services';
import { MembershipTeaser } from '@/sections/membership-teaser/membership-teaser';
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
  const featuredServicesDataRaw = getDataSectionById('unlock-power');
  const contactData = getDataSectionById('new-location');
  const footerData = getDataSectionById('footer');

  // Featured services render their curated images directly from structure.ts.

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
      <main className={`w-full overflow-x-hidden transition-opacity duration-500 ${showLoader && loading ? 'opacity-0' : 'opacity-100'}`}>
        <section id="home">
          <HeroSection
            title={hero?.title}
            shortTitle={hero?.short_title}
            description={hero?.subtitle}
            btnText={hero?.ctaText}
            video={hero?.video}
          />
        </section>

        {/* Differentiator overlaps the interactive "How we care" section — hidden on mobile to reduce scroll */}
        <section id="why-us" className="my-12 hidden sm:my-16 md:block lg:my-28">
          <Differentiator />
        </section>

        <section id="about-us" className="my-12 sm:my-16 lg:my-28">
          <AboutSection
            title={aboutUsData?.title || ''}
            content={aboutUsData?.content || []}
            ctaText={aboutUsData?.ctaText || ''}
            offers={aboutUsData?.['exclusive-offers'] || []}
          />
        </section>

        <section id="how-we-care" className="my-12 sm:my-16 lg:my-28">
          <CareApproach />
        </section>

        <section id="unlock-power" className="my-12 sm:my-16 lg:my-28">
          <FeaturedServices
            title={featuredServicesDataRaw?.title || ''}
            content={featuredServicesDataRaw?.services || []}
          />
        </section>

        <section className="my-12 sm:my-16 lg:my-28">
          <MembershipTeaser />
        </section>

        <section id="visit" className="my-12 sm:my-16 lg:my-28">
          <ClinicGallery />
        </section>

        <section className="mb-[50px] mt-12 sm:mt-16 lg:mt-28">
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
