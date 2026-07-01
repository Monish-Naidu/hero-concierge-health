'use client';

import { BoxReveal } from '@/components/animation/BoxReveal';
import { FadeText } from '@/components/animation/FadeText';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import BookingModal from '@/components/header/QuickContactModal';
import Image from 'next/image';
import { useState } from 'react';

type OfferType = {
  title: string;
  subtitle1: string;
  subtitle2: string;
  subtitle3: string;
  image: string;
};

type AboutSectionProps = {
  title?: string;
  content?: string | string[];
  ctaText?: string;
  offers?: OfferType[];
};

export const AboutSection = ({
  title,
  content,
  ctaText,
  offers = [],
}: AboutSectionProps) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  return (
    <div className="container px-4">
      <div className="flex flex-col items-center gap-24 md:gap-32 lg:!items-end lg:gap-8 lg:flex-row-center">
        <div className="flex w-full flex-col items-center gap-4 lg:w-1/2 lg:items-start lg:gap-10">
          <BoxReveal boxColor={'#A86A45'} duration={0.5}>
            <Typography
              className="text-center font-bold text-[#2D2525] md:mb-8 lg:mb-0 lg:text-left"
              variant="h3"
            >
              {title}
            </Typography>
          </BoxReveal>

          {Array.isArray(content) ? (
            content.map((paragraph, index) => (
              <BoxReveal key={index} boxColor={'#A86A45'} duration={0.5}>
                <Typography
                  className="text-center text-[#2D2525] lg:text-left"
                  variant="h5"
                >
                  {paragraph}
                </Typography>
              </BoxReveal>
            ))
          ) : (
            <BoxReveal boxColor={'#A86A45'} duration={0.5}>
              <Typography
                className="text-center text-[#2D2525] lg:text-left"
                variant="h5"
              >
                {content}
              </Typography>
            </BoxReveal>
          )}

          <BoxReveal boxColor={'#A86A45'} duration={0.5}>
            <Button
              className="w-auto rounded-[56px] border border-[#A86A45] bg-[#A86A45] px-[30px] py-[25px] text-[16px] font-bold text-white shadow-md [text-shadow:2px_2px_10px_rgba(0,0,0,0.25)] sm:text-[20px] lg:w-[430px] lg:px-[20px] lg:py-[35px] lg:text-[28px]"
              onClick={() => setIsBookingModalOpen(true)}
              style={{
                background:
                  'radial-gradient(163.33% 163.33% at 50% 100%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 100%), #A86A45',
                backgroundBlendMode: 'overlay, normal',
              }}
            >
              {ctaText}
            </Button>
          </BoxReveal>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="relative mx-auto max-w-[461px] lg:mx-0">
            <div 
              className="relative mx-auto aspect-square w-full max-w-[300px] overflow-hidden rounded-t-[32px] border-4 border-[#A86A45]/20 shadow-[0_8px_32px_rgba(168,_106,_69,_0.15)] sm:max-w-[360px] md:rounded-t-[40px] lg:ml-[175px] lg:mr-0 lg:max-w-[461px]"
              style={{
                background:
                  'radial-gradient(163.33% 163.33% at 50% 100%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 100%, rgba(255, 255, 255, 0) 100%), #A86A45',
                backgroundBlendMode: 'overlay, normal',
              }}
            >
              <Image
                src={offers[0]?.image || '/images/doctors/doc-4.webp'}
                width={600}
                height={600}
                alt="Dr. Rishi Gaiha, MD — Anesthesiology & Pain Medicine"
                className="absolute inset-0 h-full w-full object-cover object-top"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
            </div>

            {offers && offers.length > 0 && (
              <div className="absolute -left-2 -top-20 z-20 w-[130px] sm:left-[-6px] sm:-top-32 sm:w-[180px] lg:-left-4 lg:-top-20 lg:w-[280px]">
                <div className="group relative rounded-[20px] border-[3px] border-white/80 bg-[radial-gradient(circle,_163.33%_163.33%_at_50%_100%,_rgba(255,_255,_255,_0.45)_0%,_rgba(0,_0,_0,_0)_100%,_rgba(255,_255,_255,_0)_100%),_#A86A45] bg-blend-overlay shadow-[0_10px_25px_rgba(168,106,69,0.3)] transition-all duration-300 hover:scale-105 sm:rounded-[24px] sm:border-[5px]">
                  <div className="absolute -inset-1 rounded-[20px] bg-[#A86A45] opacity-10 blur-md animate-pulse sm:rounded-[24px]" />
                  
                  <div className="relative rounded-t-[17px] bg-white sm:rounded-t-[19px]">
                    <div className="bg-white bg-[linear-gradient(180deg,_#A86A45_26.82%,_rgba(168,_106,_69,_0.70)_77.27%)] bg-clip-text py-2 text-center text-[13px] font-bold uppercase text-transparent sm:py-3 sm:text-[16px] md:py-1 md:text-[23px] lg:text-[28px]">
                      {offers[0]?.title || 'Coming Soon...'}
                    </div>
                  </div>
                  <div
                    className="relative rounded-b-[17px] px-2 pb-3 pt-1.5 sm:rounded-b-[20px] sm:px-[25px] sm:pb-6 sm:pt-3"
                    style={{
                      background:
                        'radial-gradient(163.33% 163.33% at 50% 100%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 100%, rgba(255, 255, 255, 0) 100%), #A86A45',
                      backgroundBlendMode: 'overlay, normal',
                    }}
                  >
                    <Typography
                      className="text-center text-[11px] font-bold text-white sm:text-[14px] md:text-[16px] lg:text-[18px]"
                      variant="h5"
                    >
                      {offers[0]?.subtitle1}
                    </Typography>
                    
                    {offers[0]?.subtitle2 && (
                      <div className="my-1 flex items-center justify-center gap-1 sm:my-3 sm:gap-2">
                        <span className="text-[24px] font-extrabold leading-none text-white line-through opacity-60 sm:text-[32px] md:text-[40px] lg:text-[48px]">
                          {offers[0].subtitle2}
                        </span>
                        <span className="rounded-full bg-white/30 px-1.5 py-0.5 text-[11px] font-bold text-white sm:px-3 sm:py-1 sm:text-[14px]">
                          FREE
                        </span>
                      </div>
                    )}
                    
                    <Typography
                      className="text-center text-[10px] font-semibold text-white/90 sm:text-[12px] md:text-[14px] lg:text-[16px]"
                      variant="h5"
                    >
                      {offers[0]?.subtitle3}
                    </Typography>
                    
                    <div className="mt-1 flex justify-center sm:mt-3">
                      <svg 
                        className="h-4 w-4 animate-pulse text-white sm:h-6 sm:w-6" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="absolute -bottom-10 z-30 w-[calc(100%-40px)] max-w-[340px] left-1/2 -translate-x-1/2 lg:left-[calc(50%+100px)] lg:w-auto lg:max-w-none lg:translate-x-0">
              <FadeText
                framerProps={{
                  show: { transition: { delay: 0.8, duration: 0.6, ease: 'easeOut' } },
                }}
                direction="up"
                className="flex justify-center"
                content={
                  <div className="w-full rounded-[20px] border-[1px] border-white/50 bg-white/95 px-6 py-4 text-center shadow-[0_15px_30px_rgba(0,0,0,0.12)] backdrop-blur-md sm:rounded-[24px] sm:px-10 sm:py-5 lg:px-12 lg:py-6">
                    <Typography
                      variant="h5"
                      className="w-full whitespace-nowrap text-center font-bold leading-tight text-[#2D2525] text-[18px] sm:text-xl lg:text-[26px]"
                    >
                      Dr. Rishi Gaiha, MD
                    </Typography>
                    <p className="mt-1 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-[#A86A45] sm:text-[13px] md:text-[14px]">
                      Anesthesiology &amp; Pain Medicine
                    </p>
                    <p className="mt-0.5 text-center text-[10px] font-semibold text-[#2D2525]/60 sm:text-[12px]">
                      Board-Certified · Northwestern-Trained
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};
