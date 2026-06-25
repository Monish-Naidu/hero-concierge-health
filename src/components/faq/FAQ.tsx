'use client';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { A11y, Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/effect-coverflow';
import 'swiper/css/keyboard';
import 'swiper/css/navigation';
import { FadeText } from '../animation/FadeText';
import { Typography } from '../ui/Typography';
import { FAQItem } from './FAQItem';

type Props = {
  title: string;
  content: { q: string; a: string }[];
};

export default function FAQ(props: Props) {
  const { content, title } = props;

  const swiperParameters = {
    modules: [A11y, Keyboard, Navigation],
    slidesPerView: 4,
    // effect: "coverflow",
    slidesPerGroupAuto: false,
    slidesPerGroup: 4,
    autoHeight: true,
    grabCursor: true,
    loop: true,
    speed: 600,
    navigation: false,
    keyboard: { enabled: true },
    lazy: { enabled: true },
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
    // Add breakpoints for responsiveness
    breakpoints: {
      // when screen width >= 320px (typical mobile)
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      // when screen width >= 640px (slightly larger mobile/small tablet)
      640: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
      // when screen width >= 1024px (desktop)
      1024: {
        slidesPerView: 3,
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
            className="mb-4 text-center font-bold text-[#2D2525] md:mb-6"
          >
            {title}
          </Typography>
        }
      />

      <LayoutGroup>
        <div className="container hidden xl:block">
          <AnimatePresence>
            {content
              .filter((item) => item.a && item.a.trim() !== '')
              .slice(0, 10)
              .map((item) => (
                <motion.div
                  key={item.q}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <FAQItem item={item} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        <div className="container block xl:hidden">
          <Swiper className="swiper-infuse" {...swiperParameters}>
            {content
              .filter((item) => item.a && item.a.trim() !== '')
              .map((item) => (
                <SwiperSlide
                  key={item.q}
                  className="swiper-slide-9183 swiper-slide-infuse transform transition hover:scale-105"
                >
                  <div className="mb-[20px] rounded-[35px] bg-[#F1F8FF] p-10 pb-8">
                    <div className="flex cursor-pointer items-center justify-between">
                      <h3 className="text-[21px] font-semibold text-[#000a2d] xl:text-[29px]">
                        {item.q}
                      </h3>
                    </div>
                    <p className="mt-2 text-[17px] font-normal text-[#42526B] xl:text-2xl">
                      {item.a}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            <div className="flex justify-center">
              <button
                type="button"
                className="inline-flex items-center gap-4 rounded-[48px] border-4 border-[#A86A45] bg-white px-[30px] py-[10px] text-center text-[21px] font-semibold text-[#A86A45] xl:text-2xl"
              >
                <svg
                  width="24"
                  height="32"
                  viewBox="0 0 24 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.11174 0.5543C5.88545 0.639182 5.75973 0.887766 5.79745 1.14241C5.82888 1.33037 5.99231 1.51832 6.7969 2.29439L7.75864 3.22203H0.36018L0.17789 3.39786C-0.123832 3.68889 -0.016972 4.17393 0.379037 4.30731C0.517326 4.35582 1.70535 4.37401 4.16941 4.37401H7.75235L6.76547 5.33197C5.66544 6.39906 5.62144 6.49001 5.94202 6.85379C6.07403 7.01143 6.14946 7.04174 6.36318 7.04174C6.62718 7.04174 6.64604 7.02355 8.17979 5.53811C9.02838 4.71354 9.74497 3.97991 9.76383 3.91322C9.78897 3.84046 9.7764 3.70708 9.73868 3.61007C9.66325 3.40999 6.91005 0.711939 6.64604 0.578552C6.45746 0.481544 6.31289 0.47548 6.11174 0.5543Z"
                    fill="#A86A45"
                  />
                  <path
                    d="M14.9308 1.40919C14.5159 1.5062 13.9565 1.8336 13.6548 2.15494C13.4788 2.34896 12.4102 4.07086 10.7947 6.7689C5.93574 14.8994 6.14946 14.5478 5.96717 14.6205C5.76602 14.6993 5.50201 14.6205 5.40772 14.4447C5.36372 14.3659 5.33858 13.6383 5.33858 12.3954C5.33858 10.1824 5.30086 9.90349 4.89228 9.10923C4.27627 7.90269 2.96252 7.09025 1.59849 7.07812C1.02648 7.07812 0.806475 7.15694 0.423038 7.51466C-0.0358296 7.93301 -0.0106862 7.47222 0.00817137 15.4754L0.0270289 22.654L0.171604 23.3088C1.08305 27.4741 4.26998 30.536 8.55065 31.3666C9.1541 31.4818 9.4621 31.5 10.493 31.5C11.5742 31.5 11.813 31.4757 12.5107 31.3363C15.2765 30.7724 17.6211 29.2749 19.1549 27.0801C19.4252 26.6981 23.4796 19.9378 23.7247 19.471C24.303 18.3554 23.9447 16.9851 22.8887 16.2575C22.4801 15.9726 21.8641 15.7725 21.3989 15.7725H21.0721L21.1287 15.439C21.2921 14.4265 20.6698 13.2867 19.6892 12.8137C19.268 12.6076 18.6143 12.4682 18.3189 12.5227L18.1177 12.5591L18.1492 12.2681C18.2749 10.9888 17.1434 9.69735 15.7542 9.54577L15.3331 9.49727L16.5651 7.43584C18.0863 4.88937 18.1429 4.78629 18.2246 4.26487C18.3063 3.77983 18.2057 3.17353 17.9732 2.73093C17.7343 2.28226 17.2063 1.80935 16.6971 1.57895C16.3137 1.40919 16.1628 1.37887 15.7102 1.36068C15.4148 1.35462 15.0691 1.37281 14.9308 1.40919ZM16.2823 2.66423C16.4834 2.76731 16.6908 2.93101 16.7914 3.07046C17.024 3.3918 17.1309 3.89503 17.0428 4.22243C17.0051 4.35582 15.6977 6.59308 14.1388 9.19412C12.2405 12.3711 11.3101 13.9778 11.3101 14.093C11.3101 14.2022 11.3793 14.3295 11.4924 14.4447C11.725 14.669 12.0456 14.6812 12.2782 14.4811C12.3662 14.4083 12.8502 13.6504 13.3531 12.8016C13.8622 11.9528 14.3336 11.1889 14.4091 11.11C14.4845 11.0312 14.6919 10.9039 14.8617 10.8251C15.9303 10.334 17.1183 11.201 16.9423 12.3408C16.9108 12.5106 16.5903 13.1108 15.9177 14.2264C14.8239 16.0514 14.7674 16.1969 15.1005 16.4758C15.352 16.682 15.6977 16.6759 15.9114 16.4516C15.9994 16.3606 16.3451 15.821 16.6783 15.2571C17.3509 14.1112 17.5709 13.8808 18.0863 13.7353C18.9538 13.4928 19.7961 14.0203 19.9532 14.8994C20.0161 15.2996 19.8966 15.6027 19.1235 16.8881C18.7275 17.549 18.388 18.1795 18.3692 18.2887C18.3189 18.5797 18.608 18.8768 18.9349 18.8768C19.2555 18.8768 19.3623 18.7737 19.8086 18.028C20.3429 17.1549 20.6761 16.9245 21.4052 16.9245C22.3984 16.9245 23.115 18.0219 22.6938 18.895C22.5053 19.2891 18.4509 26.0311 18.1114 26.5162C16.7977 28.3897 14.7171 29.7114 12.297 30.2146C11.4296 30.3905 9.61296 30.4087 8.77066 30.245C4.82942 29.4749 1.86879 26.498 1.2842 22.7207C1.20248 22.1811 1.18991 21.1019 1.18991 15.239C1.18991 7.70867 1.16477 8.19372 1.56078 8.19372C1.80593 8.19372 2.40937 8.35742 2.71109 8.50293C3.08196 8.68482 3.59111 9.16986 3.79854 9.53365C4.11912 10.1036 4.14427 10.3037 4.14427 12.4378C4.14427 13.5898 4.16941 14.4993 4.20713 14.6327C4.24484 14.7539 4.36427 14.9843 4.47742 15.148C5.04314 15.9544 6.33803 16.015 7.01062 15.2632C7.13633 15.1298 8.8398 12.3348 10.801 9.06073C12.7559 5.78669 14.4468 3.02195 14.5474 2.91282C14.9874 2.46415 15.6914 2.36715 16.2823 2.66423Z"
                    fill="#A86A45"
                  />
                </svg>
                Swipe Right
              </button>
            </div>
          </Swiper>
        </div>
      </LayoutGroup>
    </>
  );
}
