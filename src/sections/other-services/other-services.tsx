'use client';

import { FadeText } from '@/components/animation/FadeText';
import { HomeStickyFeaturesImage } from '@/components/sticky-scroll/HomeStickyFeaturesImage';
import { HomeStickyFeaturesSection } from '@/components/sticky-scroll/HomeStickyFeaturesSection';
import { Typography } from '@/components/ui/Typography';
import { PaginationBullets } from '@/components/ui/PaginationBullets';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/effect-coverflow';
import 'swiper/css/keyboard';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { A11y, Autoplay, Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { useIsMobile } from '../contact/contact';

type Props = {
  title: string;
  content: {
    name: string;
    description: string;
    pointsTitle: string;
    points: string[];
    ctaText: string;
    link: string;
    image: string;
  }[];
};

export const OtherServices = (props: Props) => {
  const { title, content } = props;
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<any>(null);

  const handleBulletClick = (index: number) => {
    if (swiperRef) {
      swiperRef.slideTo(index);
    }
  };

  const swiperParameters = {
    modules: [A11y, Keyboard, Navigation, Autoplay],
    slidesPerView: 4,
    slidesPerGroupAuto: false,
    slidesPerGroup: 1,
    autoHeight: true,
    grabCursor: true,
    loop: false,
    speed: 600,
    navigation: false,
    keyboard: { enabled: true },
    lazy: { enabled: true },
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
    onSwiper: setSwiperRef,
    onSlideChange: (swiper: any) => setActiveIndex(swiper.activeIndex),
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
      490: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
    },
  };

  return (
    <>
      <FadeText
        framerProps={{
          show: { transition: { delay: 0.3 } },
        }}
        direction="down"
        content={
          <Typography
            variant="h3"
            className="mb-4 text-center text-[28px] font-bold text-[#2D2525] md:mb-6 md:text-[32px] xl:text-[48px]"
          >
            {title}
          </Typography>
        }
      />
      <Swiper className="custom-swiper container" {...swiperParameters}>
        {content.map((section, index) => (
          <SwiperSlide
            key={index}
            className="flex items-start justify-center px-4 pb-8"
          >
            <HomeStickyFeaturesSection
              title={section.name}
              description={section.description}
              content={section.points}
              btnText={section.ctaText || ''}
              slug={section.link || ''}
              isAbsolute={false}
            >
              {section.image && (
              <HomeStickyFeaturesImage
                className="h-auto w-auto md:w-[400px] xl:h-[550px] xl:w-[680px]"
                src={section.image}
              />
              )}
            </HomeStickyFeaturesSection>
          </SwiperSlide>
        ))}
      </Swiper>

      <PaginationBullets
        slideCount={content.length}
        activeIndex={activeIndex}
        onBulletClick={handleBulletClick}
      />
    </>
  );
};
