'use client';

import { PointType } from '@/api/types';
import { FadeText } from '@/components/animation/FadeText';
import { InView } from '@/components/animation/InView';
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
import { AdvantageCard } from './advantage-card';

type Props = {
  title: string;
  description: string;
  content: PointType[];
};

export const ChooseUs = (props: Props) => {
  const { title, description, content } = props;
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
    slidesPerGroup: 4,
    autoHeight: true,
    grabCursor: true,
    loop: false,
    speed: 600,
    navigation: false,
    keyboard: { enabled: true },
    autoplay: { enabled: true, delay: 2000, pauseOnMouseEnter: true },
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
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
    },
  };

  return (
    <div className="container">
      <div className="mb-[48px]">
        <FadeText
          framerProps={{
            show: { transition: { delay: 0.3 } },
          }}
          direction="down"
          content={
            <Typography
              variant="h3"
              className="mb-4 text-center font-bold text-[#2D2525] md:mb-6"
            >
              {title}
            </Typography>
          }
        />
        <FadeText
          framerProps={{
            show: { transition: { delay: 0.3 } },
          }}
          direction="up"
          content={
            <Typography variant="h5" className="text-center text-[#2D2525]">
              {description}
            </Typography>
          }
        />
      </div>

      <div className="mx-auto hidden grid-cols-1 px-4 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-0 lg:grid-cols-4 lg:gap-6 md:[&>div:nth-child(2n+1)]:mt-[70px] lg:[&>div:nth-child(2n+1)]:mt-[110px]">
        {content.map((advantage, index) => (
          <InView
            key={index}
            variants={{
              hidden: {
                opacity: 0,
                y: -100,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            viewOptions={{ margin: '0px 0px -250px 0px' }}
          >
            <AdvantageCard
              title={advantage.title}
              description={advantage.description || ''}
              imageSrc={advantage.icon || ''}
              bgColor={advantage.color || ''}
              hoverAnimation={
                index === 0
                  ? 'bounce'
                  : index === 1
                    ? 'scale'
                    : index === 2
                      ? 'pulse'
                      : 'slide'
              }
            />
          </InView>
        ))}
      </div>

      <div className="block md:hidden">
        <Swiper className="swiper-hero" {...swiperParameters}>
          {content.map((advantage, index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide-9183 swiper-slide-hero transform transition hover:scale-105"
            >
              <AdvantageCard
                key={index}
                title={advantage.title}
                description={advantage.description || ''}
                imageSrc={advantage.icon || ''}
                bgColor={advantage.color || ''}
                hoverAnimation={
                  index === 0
                    ? 'bounce'
                    : index === 1
                      ? 'scale'
                      : index === 2
                        ? 'pulse'
                        : 'slide'
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <PaginationBullets
          slideCount={content.length}
          activeIndex={activeIndex}
          onBulletClick={handleBulletClick}
        />
      </div>
    </div>
  );
};
