import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/effect-coverflow';
import 'swiper/css/keyboard';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useIsMobile } from '../contact/contact';
import { PaginationBullets } from '@/components/ui/PaginationBullets';
import { Autoplay } from 'swiper/modules';

interface UnlockPowerSliderProps {
  children: React.ReactNode;
}

export const UnlockPowerSlider: React.FC<UnlockPowerSliderProps> = ({
  children,
}) => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const childrenArray = React.Children.toArray(children);
  const slideCount = childrenArray.length;

  const handleBulletClick = (index: number) => {
    if (swiperRef) {
      swiperRef.slideTo(index);
    }
  };

  return (
    <div className="relative">
      <Swiper
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        slidesPerView="auto"
        centeredSlides={true}
        autoHeight={true}
        spaceBetween={20}
        modules={[Autoplay]}
        className="custom-swiper !h-auto"
        grabCursor
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        simulateTouch={true}
        loop={false}
        resistance={true}
        resistanceRatio={0.85}
        watchSlidesProgress={true}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide
            key={index}
            className="!h-auto !w-[calc(100vw-40px)] max-w-[650px] sm:!w-[650px]"
          >
            <div className="h-fit w-full">{child}</div>
          </SwiperSlide>
        ))}
      </Swiper>

      <PaginationBullets
        slideCount={slideCount}
        activeIndex={activeIndex}
        onBulletClick={handleBulletClick}
      />
    </div>
  );
};
