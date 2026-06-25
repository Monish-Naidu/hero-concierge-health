'use client';

import { ServiceCardType } from '@/api/types';
import { Marquee } from '@/components/ui/Marquee';
import { Typography } from '@/components/ui/Typography';
import Image from 'next/image';

type Props = {
  title: string;
  content: ServiceCardType[];
};

const ServiceCard = ({ item }: { item: ServiceCardType }) => {
  return (
    <div className="group relative flex h-auto w-[280px] shrink-0 flex-col items-center justify-center sm:w-[320px] md:w-[360px]">
      {/* Card Container with Gradient Border */}
      <div className="relative w-full overflow-hidden rounded-[24px] border border-[#A86A45]/20 bg-white p-[2px] shadow-[0_8px_32px_rgba(87,_191,_145,_0.1)] transition-all duration-500 hover:border-[#A86A45]/40 hover:shadow-[0_12px_48px_rgba(87,_191,_145,_0.2)] sm:rounded-[28px] md:rounded-[32px]">
        {/* Gradient Border Background */}
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(135deg, rgba(168,106,69,0.3) 0%, rgba(168,106,69,0.1) 50%, rgba(168,106,69,0.3) 100%)',
          }}
        />
        
        {/* Card Content */}
        <div className="relative flex w-full flex-col rounded-[22px] bg-gradient-to-br from-white to-[#F8FFFE] p-4 sm:rounded-[26px] sm:p-5 md:rounded-[30px] md:p-6">
          {/* Image Container with Enhanced Styling */}
          {item.image && (
            <div className="relative mb-3 w-full overflow-hidden rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)] sm:mb-4 sm:rounded-[20px] md:mb-4 md:rounded-[24px]">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={360}
                  height={270}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={false}
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </div>
            </div>
          )}

          {/* Title with Enhanced Styling */}
          <Typography
            variant="h5"
            className="w-full text-center text-[14px] font-bold leading-tight text-[#2D2525] transition-colors duration-300 group-hover:text-[#A86A45] sm:text-[16px] md:text-[18px]"
          >
            {item.name}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export function FeaturedServicesPages({ title, content }: Props) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      {/* Title */}
      <div className="mb-4 w-full px-4 sm:mb-6 sm:px-6 md:mb-8 md:px-8">
        <Typography
          variant="h3"
          className="text-center text-[22px] font-bold text-[#2D2525] sm:text-[26px] md:text-[30px]"
        >
          {title}
        </Typography>
      </div>

      {/* Marquee with Cards */}
      <div className="w-full">
        <Marquee pauseOnHover className="[--duration:40s]">
          {content.map((item, index) => (
            <ServiceCard key={index} item={item} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}

