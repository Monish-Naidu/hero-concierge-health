'use client';

import { InView } from '@/components/animation/InView';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import BookingModal from '@/components/header/QuickContactModal';
import Image from 'next/image';
import { useState } from 'react';

type JourneyProps = {
  title?: string;
  subtitle?: string;
  content?: string | string[];
  btnText?: string;
};

export const Journey = ({
  title,
  subtitle,
  content,
  btnText,
}: JourneyProps) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const contentArray = Array.isArray(content) ? content : [content];

  return (
    <div className="container">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="inner-shadow">
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="5" result="offset-blur" />
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          />
          <feFlood floodColor="black" floodOpacity="0.2" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </svg>

      <div
        className="flex h-full !flex-col-reverse items-end justify-end gap-4 rounded-[36px] md:flex-row-center lg:gap-0 xl:pr-[90px] xl:!flex-row-between"
        style={{
          background: 'linear-gradient(96deg, #F4EEE3 0%, #E7DAC6 100%)',
        }}
      >
        <div className="hidden shrink-0 p-8 xl:block">
          <Image
            src="/images/hero-stethoscope.svg"
            width={460}
            height={460}
            alt="Be your own hero — concierge health"
            priority
          />
        </div>
        <div className="block shrink-0 pt-6 xl:hidden">
          <Image
            src="/images/hero-stethoscope.svg"
            width={300}
            height={300}
            alt="Be your own hero — concierge health"
          />
        </div>
        <div className="w-full px-[20px] pt-[15px] text-center sm:px-[65px] sm:pt-[70px] lg:w-[800px] lg:px-0 xl:pt-0 xl:text-left">
          <InView
            variants={{
              hidden: {
                opacity: 0,
                x: 100,
              },
              visible: {
                opacity: 1,
                x: 0,
              },
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            viewOptions={{ margin: '0px 0px -100px 0px' }}
          >
            <Typography
              variant="h4"
              className="text-center font-bold leading-none text-[#2D2525] lg:font-medium xl:text-left"
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              className="text-center font-extrabold leading-none text-[#A86A45] xl:text-left"
              style={{ filter: 'url(#inner-shadow)' }}
            >
              {subtitle}
            </Typography>
          </InView>

          <InView
            variants={{
              hidden: {
                opacity: 0,
                x: 100,
              },
              visible: {
                opacity: 1,
                x: 0,
              },
            }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            viewOptions={{ margin: '0px 0px -120px 0px' }}
          >
            {contentArray.map((text, index) => (
              <Typography
                key={index}
                variant="h5"
                className="my-8 text-center font-medium text-[#79738b] xl:text-left"
              >
                {text}
              </Typography>
            ))}
          </InView>
          <InView
            variants={{
              hidden: {
                opacity: 0,
                x: 100,
              },
              visible: {
                opacity: 1,
                x: 0,
              },
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewOptions={{ margin: '0px 0px -120px 0px' }}
          >
            <Button
              onClick={() => setIsBookingModalOpen(true)}
              className="text-wrap rounded-[56px] border border-[#A86A45] bg-[#A86A45] px-[20px] py-[35px] text-[16px] font-bold text-white shadow-md [text-shadow:2px_2px_10px_rgba(0,0,0,0.25)] md:text-[24px] lg:text-nowrap lg:text-[28px]"
              style={{
                background:
                  'radial-gradient(163.33% 163.33% at 50% 100%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 100%), #A86A45',
                backgroundBlendMode: 'overlay, normal',
              }}
            >
              {btnText}
            </Button>
          </InView>
        </div>
      </div>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};
