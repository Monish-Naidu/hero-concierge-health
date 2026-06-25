'use client';

import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { EffectFade, Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from './Button';
import { Typography } from './Typography';

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
    image: string;
    btnText: string;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const totalSlides = content.length;

  return (
    <div className="relative w-full">
      <div className="flex">
        <div className="sticky bottom-[10%] left-0 top-[10%] z-0 hidden h-screen w-[40px] items-center justify-center bg-[#A86A45] lg:flex xl:w-[90px] 2xl:w-[120px]">
          <div className="-rotate-90 transform text-nowrap font-bold uppercase tracking-wider text-white">
            <Typography variant="h4" className="text-center text-white">
              Featured Services:
            </Typography>
          </div>
        </div>
        <div className="flex-1">
          <div
            className="sticky top-0 h-screen w-full overflow-hidden"
            style={{
              scrollSnapType: 'y mandatory',
              scrollSnapStop: 'always',
            }}
          >
            <Swiper
              modules={[Pagination, EffectFade, Mousewheel]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              pagination={{
                clickable: true,
                bulletActiveClass:
                  'swiper-pagination-bullet-active !bg-[#A86A45]',
              }}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                thresholdDelta: 20,
                releaseOnEdges: true,
              }}
              speed={800}
              direction="vertical"
              className="h-full w-full"
              onSlideChange={(swiper) => setActiveCard(swiper.activeIndex)}
              slidesPerView={1}
              allowTouchMove={true}
              noSwiping={true}
              resistance={false}
              watchOverflow={true}
            >
              {content.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="h-full"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="flex h-full items-center justify-center">
                    <div className="container">
                      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
                        <div
                          className={cn(
                            'h-[500px] w-[680px] overflow-hidden rounded-md',
                            contentClassName
                          )}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              transition: { duration: 0.5 },
                            }}
                            className="h-full w-full"
                          >
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.title}
                                width={687}
                                height={550}
                                className="h-full w-full rounded-[32px] object-cover lg:w-[400px] xl:w-[580px]"
                              />
                            )}
                          </motion.div>
                        </div>

                        <div className="relative">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: {
                                duration: 0.8,
                                ease: 'easeOut',
                              },
                            }}
                          >
                            <Typography variant="h4" className="mb-[40px]">
                              {item.title}
                            </Typography>
                            <Typography
                              variant="h5"
                              className="mb-7 text-[#79738B]"
                            >
                              {item.description}
                            </Typography>
                            <Typography
                              variant="h5"
                              className="mb-4 text-[#79738B]"
                            >
                              Benefits:
                            </Typography>
                            <ul className="mb-10 space-y-2">
                              {item.content.map(
                                (benefit: string, idx: number) => (
                                  <li
                                    key={idx}
                                    className="flex items-center gap-4"
                                  >
                                    <div className="bg-gradient-radial h-[18px] w-[18px] rounded-full bg-[#A86A45] from-[#A86A45] via-[#A86A45] to-transparent drop-shadow-[0px_10px_19px_rgba(99,_200,_155,_0.28)] filter" />
                                    <Typography
                                      variant="h5"
                                      className="text-[#79738B]"
                                    >
                                      {benefit}
                                    </Typography>
                                  </li>
                                )
                              )}
                            </ul>
                            <Button
                              className="w-full rounded-[56px] border border-[#A86A45] bg-[#A86A45] px-[20px] py-[35px] text-[18px] font-bold text-white shadow-md [text-shadow:2px_2px_10px_rgba(0,0,0,0.25)] xl:text-[28px]"
                              style={{
                                background:
                                  'radial-gradient(163.33% 163.33% at 50% 100%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 100%), #A86A45',
                                backgroundBlendMode: 'overlay, normal',
                              }}
                            >
                              {item.btnText}
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div style={{ height: `${totalSlides * 30}vh` }} />
        </div>
      </div>
    </div>
  );
};
