'use client';

import { FadeText } from '@/components/animation/FadeText';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import BookingModal from '@/components/header/QuickContactModal';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  title?: string;
  shortTitle?: string;
  subtitle?: string;
  description?: string;
  btnText?: string;
  video?: string;
  content?: {
    title: string;
    description: string;
  }[];
};

export const HeroSection = (props: Props) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { title, description, btnText, video, subtitle, shortTitle } = props;

  const firstPart = title ? title.split(' ').slice(0, -1).join(' ') : '';
  const lastWord = title ? title.split(' ').slice(-1)[0] : '';

  return (
    <div className="md:-mt-22 relative -mt-[150px] flex min-h-screen flex-col items-center justify-end gap-4 p-4 pb-6 md:pb-20 lg:-mt-2" suppressHydrationWarning>
      {/* Video Background */}
      {video && (
      <video
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        src={video}
        autoPlay
        loop
        muted
        playsInline
      ></video>
      )}

      {/* Dark Overlay */}
      <div className="z-1 absolute left-0 top-0 h-full w-full bg-black opacity-65" suppressHydrationWarning></div>

      {/* Overlay Content */}
      <div className="container relative z-10 flex w-full flex-col items-center gap-0 sm:mt-0 sm:gap-[0px] md:gap-[5px] lg:gap-0" suppressHydrationWarning>
        <FadeText
          framerProps={{
            show: { transition: { delay: 0.1 } },
          }}
          direction="up"
          className="mb-3 flex justify-center sm:mb-4"
          content={
            <Image
              src="/images/chicago-stethoscope-emblem.svg"
              alt="Hero Concierge Health — a real clinic in Chicago"
              width={140}
              height={146}
              priority
              className="h-auto w-[96px] drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)] sm:w-[120px] lg:w-[132px]"
            />
          }
        />
        <FadeText
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          direction="up"
          content={
            <>
              <Typography
                variant="h1"
                className="text-center font-semibold uppercase leading-[1] lg:leading-tight"
                style={{
                  wordBreak: 'break-word',
                }}
              >
                <span className="bg-[linear-gradient(182deg,_#FFF_13.61%,_#777571_83.15%)] bg-clip-text text-center uppercase leading-tight text-transparent">
                  {firstPart}
                </span>
                <span className="bg-gradient-to-r from-[#A86A45] to-[#7E4A2E] bg-clip-text font-bold leading-tight text-transparent">
                  {' '}
                  {lastWord}
                </span>
              </Typography>
              <FadeText
                framerProps={{
                  show: { transition: { delay: 0.4 } },
                }}
                direction="up"
                content={
                  <Typography
                    variant="h2"
                    className="bg-[linear-gradient(182deg,_#FFF_13.61%,_#777571_83.15%)] bg-clip-text text-center font-semibold uppercase text-transparent"
                  >
                    {shortTitle}
                  </Typography>
                }
              />
            </>
          }
        />
        {subtitle ? (
          <FadeText
            framerProps={{
              show: { transition: { delay: 0.1 } },
            }}
            direction="up"
            content={
              <Typography
                variant="h3"
                className="text-center !font-extrabold uppercase leading-[1.2] lg:leading-[1]"
              >
                <span className="bg-[linear-gradient(182deg,_#FFF_13.61%,_#777571_83.15%)] bg-clip-text text-transparent">
                  {subtitle}
                </span>{' '}
              </Typography>
            }
          />
        ) : null}

        <FadeText
          framerProps={{
            show: { transition: { delay: 0.6 } },
          }}
          direction="up"
          content={
            <Typography
              variant="h5"
              className="mb-[15px] mt-[15px] text-center text-white opacity-[60%] md:ml-auto lg:mb-[45px] lg:mt-[10px]"
            >
              {description}
            </Typography>
          }
        />

        <FadeText
          framerProps={{
            show: { transition: { delay: 0.8 } },
          }}
          direction="up"
          content={
            <Button
              leftIcon={<ArrowUpRight size={40} color="white" />}
              className="inline-flex w-auto flex-row-reverse items-center justify-center gap-3 text-wrap rounded-[56px] border-[1px] border-[#A86A45] bg-[#A86A45] px-[40px] py-[30px] text-[16px] font-bold leading-none text-white shadow-custom-green [text-shadow:2px_2px_10px_rgba(0,0,0,0.25)] sm:py-[45px] md:text-[24px] xl:text-[28px]"
              onClick={() => setIsBookingModalOpen(true)}
              style={{
                background:
                  'radial-gradient(163.33% 163.33% at 50% 100%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 100%, rgba(255, 255, 255, 0) 100%), #A86A45',
                backgroundBlendMode: 'overlay, normal',
              }}
            >
              {btnText}
            </Button>
          }
        />
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      </div>
    </div>
  );
};
