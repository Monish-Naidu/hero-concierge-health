'use client';

import { ServiceCardType } from '@/api/types';
import { SectionContent } from '@/components/sticky-scroll/types';
import { Button } from '@/components/ui/Button';
import StickySectionsContainer from '@/components/ui/NewStickyScroll';
import { Typography } from '@/components/ui/Typography';
import BookingModal from '@/components/header/QuickContactModal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { VerticalTitle } from './vertical-title';

type Props = {
  title: string;
  content: ServiceCardType[];
};

export function FeaturedServices(props: Props) {
  const { title, content } = props;
  const router = useRouter();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const adaptedContent: SectionContent[] = content.map((item) => ({
    title: item.name,
    description: item.description,
    content: item.points,
    image: item.image,
    btnText: item.ctaText,
    slug: item.link,
  }));

  return (
    <div className="lg:flex lg:min-h-[calc(100svh-40px)]">
      {/* Desktop Vertical Title */}
      <VerticalTitle title={title} showOnMobile={false} />
      
      <main className="flex-1">
        {/* Desktop Version - Sticky Scroll */}
        <div className="hidden lg:block">
          <StickySectionsContainer content={adaptedContent} />
        </div>
        
        {/* Mobile & Tablet Version */}
        <div className="container flex px-0 lg:hidden">
          {/* Mobile Vertical Title */}
          <VerticalTitle title={title} showOnMobile={true} />
          
          {/* Scrollable Content */}
          <div className="no-scrollbar flex flex-1 flex-col items-center gap-6 overflow-y-auto px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 md:gap-10 md:px-8 md:py-10">
            {content.map((item, index) => (
              <div
                key={index}
                className="group relative flex w-full max-w-[640px] flex-col items-center justify-center"
              >
                {/* Card Container with Gradient Border */}
                <div className="relative w-full overflow-hidden rounded-[32px] border border-[#A86A45]/20 bg-white p-[2px] shadow-[0_8px_32px_rgba(87,_191,_145,_0.1)] transition-all duration-500 hover:border-[#A86A45]/40 hover:shadow-[0_12px_48px_rgba(87,_191,_145,_0.2)] sm:rounded-[40px] md:rounded-[48px]">
                  {/* Gradient Border Background */}
                  <div 
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(135deg, rgba(168,106,69,0.3) 0%, rgba(168,106,69,0.1) 50%, rgba(168,106,69,0.3) 100%)',
                    }}
                  />
                  
                  {/* Card Content */}
                  <div className="relative rounded-[30px] bg-gradient-to-br from-white to-[#F8FFFE] p-6 sm:rounded-[38px] sm:p-8 md:rounded-[46px] md:p-10">
                    {/* Image Container with Enhanced Styling */}
                    <div className="relative mb-6 w-full overflow-hidden rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)] sm:mb-8 sm:rounded-[28px] md:mb-10 md:rounded-[32px]">
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={640}
                          height={480}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          priority={index === 0}
                        />
                        )}
                        {/* Enhanced Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                        {/* Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                      </div>
                    </div>

                    {/* Title with Enhanced Styling */}
                    <Typography
                      variant="h4"
                      className="mb-4 w-full text-center text-[26px] font-extrabold leading-tight text-[#2D2525] transition-colors duration-300 group-hover:text-[#A86A45] sm:mb-5 sm:text-[34px] md:mb-6 md:text-[42px]"
                    >
                      {item.name}
                    </Typography>

                    {/* Description */}
                    {item.description ? (
                      <Typography
                        variant="h5"
                        className="mb-6 w-full text-center text-[16px] leading-relaxed text-[#79738B] sm:mb-7 sm:text-[18px] md:mb-8 md:text-[20px]"
                      >
                        {item.description}
                      </Typography>
                    ) : null}

                    {/* Enhanced Points List */}
                    {item.points && item.points.length > 0 ? (
                      <div className="mb-8 w-full sm:mb-10 md:mb-12">
                        {item.pointsTitle && (
                          <Typography 
                            variant="h5" 
                            className="mb-5 text-center text-[19px] font-bold text-[#2D2525] sm:mb-6 sm:text-[21px] md:mb-7 md:text-[23px]"
                          >
                            {item.pointsTitle}:
                          </Typography>
                        )}
                        <ul className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                          {item.points.map((benefit: string, pointIndex: number) => (
                            <li 
                              key={pointIndex} 
                              className="group/point flex items-start gap-4 rounded-[16px] p-3 transition-all duration-300 hover:bg-[#F0FDF9] sm:gap-5 sm:p-4"
                            >
                              {/* Enhanced Icon with Checkmark */}
                              <div className="relative mt-1 flex-shrink-0">
                                <div className="relative h-[20px] w-[20px] sm:h-[22px] sm:w-[22px] md:h-[24px] md:w-[24px]">
                                  {/* Outer Glow */}
                                  <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-[#A86A45] to-[#7E4A2E] opacity-60 blur-[4px] group-hover/point:opacity-100 group-hover/point:blur-[6px]" />
                                  {/* Main Icon */}
                                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#A86A45] via-[#7E4A2E] to-[#7E4A2E] shadow-[0_4px_12px_rgba(87,_191,_145,_0.4)] transition-all duration-300 group-hover/point:scale-110 group-hover/point:shadow-[0_6px_16px_rgba(87,_191,_145,_0.6)]">
                                    {/* Checkmark Icon */}
                                    <svg 
                                      className="h-[12px] w-[12px] text-white sm:h-[14px] sm:w-[14px] md:h-[16px] md:w-[16px]" 
                                      fill="none" 
                                      stroke="currentColor" 
                                      viewBox="0 0 24 24"
                                    >
                                      <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={3} 
                                        d="M5 13l4 4L19 7" 
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              <Typography 
                                variant="h5" 
                                className="flex-1 text-[15px] leading-relaxed text-[#2D2525] transition-colors duration-300 group-hover/point:text-[#1a1a1a] sm:text-[16px] md:text-[17px]"
                              >
                                {benefit}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {/* Enhanced CTA Button */}
                    {item.ctaText ? (
                      <Button
                        onClick={() => router.push(item.link || '#')}
                        className="group/button relative mx-auto w-full max-w-[300px] overflow-hidden rounded-[56px] border-2 border-[#A86A45] bg-[#A86A45] px-8 py-5 text-[15px] font-bold text-white shadow-[0_6px_24px_rgba(87,_191,_145,_0.35)] transition-all duration-300 hover:scale-105 hover:border-[#7E4A2E] hover:shadow-[0_8px_32px_rgba(87,_191,_145,_0.5)] active:scale-95 [text-shadow:2px_2px_8px_rgba(0,0,0,0.2)] sm:max-w-[340px] sm:px-10 sm:py-6 sm:text-[17px] md:max-w-[380px] md:px-12 md:py-7 md:text-[19px]"
                        style={{
                          background:
                            'radial-gradient(163.33% 163.33% at 50% 100%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 100%), #A86A45',
                          backgroundBlendMode: 'overlay, normal',
                        }}
                      >
                        {/* Button Shine Effect */}
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/button:translate-x-full" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {item.ctaText}
                          <svg 
                            className="h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M13 7l5 5m0 0l-5 5m5-5H6" 
                            />
                          </svg>
                        </span>
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
