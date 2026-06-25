import { useEffect, useRef } from 'react';
import { HomeStickyFeaturesImage } from './HomeStickyFeaturesImage';
import { HomeStickyFeaturesSection } from './HomeStickyFeaturesSection';
import { StickySections } from './StickySections';
import { StickySectionsContainerProps } from './types';

export function StickySectionsContainer({
  content,
}: StickySectionsContainerProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stickySectionsRef = useRef<StickySections | null>(null);
  const isInViewRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isInViewRef.current = entry.isIntersecting;

        if (entry.isIntersecting && !stickySectionsRef.current) {
          stickySectionsRef.current = new StickySections(
            containerRef.current!,
            sectionRef.current!
          );
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-20% 0px -10% 0px',
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      stickySectionsRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleScroll = () => {
      if (isInViewRef.current) {
        requestAnimationFrame(() => {
          stickySectionsRef.current?.handleSections();
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative scroll-smooth"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      <div
        ref={sectionRef}
        className="container relative mx-auto px-5 lg:min-h-[var(--stick-items)]"
      >
        <div className="space-y-12 lg:sticky lg:top-0 lg:h-screen lg:space-y-0">
          {content.map((section, index) => (
            <div key={index} style={{ scrollSnapAlign: 'start' }}>
              <HomeStickyFeaturesSection
                title={section.title}
                content={section.content}
                btnText={section.btnText || ''}
                description={section.description || ''}
                slug={section.slug || ''}
                isAbsolute={true}
              >
                <HomeStickyFeaturesImage src={section.image} />
              </HomeStickyFeaturesSection>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
