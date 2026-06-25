import { InView } from '@/components/animation/InView';
import { Typography } from '@/components/ui/Typography';
import Image from 'next/image';

type PartnersProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  ctaText?: string;
  partners?: {
    name: string;
    logo: string;
  }[];
};

export const Partners = ({
  title,
  description,
  content,
  partners,
}: PartnersProps) => {
  return (
    <div className="container grid items-end justify-center lg:grid-cols-2 lg:gap-24">
      {/* Text Section */}
      <div className="flex flex-col items-center lg:items-start">
        <InView
          variants={{
            hidden: {
              opacity: 0,
              x: -100,
            },
            visible: {
              opacity: 1,
              x: 0,
            },
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          viewOptions={{ margin: '0px 0px -30px 0px' }}
        >
          <Typography
            variant="h3"
            className="mb-4 text-center font-bold text-[#2D2525] md:mb-6 lg:text-left"
          >
            {title}
          </Typography>
        </InView>
        <InView
          variants={{
            hidden: {
              opacity: 0,
              x: -100,
            },
            visible: {
              opacity: 1,
              x: 0,
            },
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          viewOptions={{ margin: '0px 0px -50px 0px' }}
        >
          <Typography
            variant="h5"
            className="mb-7 text-center text-[#2D2525] lg:text-left"
          >
            {description}
          </Typography>
        </InView>
        <InView
          variants={{
            hidden: {
              opacity: 0,
              x: -100,
            },
            visible: {
              opacity: 1,
              x: 0,
            },
          }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          viewOptions={{ margin: '0px 0px -70px 0px' }}
        >
          <Typography
            variant="h5"
            className="text-center text-[#2D2525] lg:text-left"
          >
            {content}
          </Typography>
        </InView>
      </div>

      <div className="relative flex h-full flex-col items-center justify-around gap-10">
        <div className="flex w-full flex-col items-center">
          {partners?.filter(partner => partner.logo && partner.logo.trim() !== '').map((partner, index) => (
            <Image
              key={index}
              src={partner.logo}
              width={400}
              height={400}
              alt={partner.name}
              className={`h-auto object-contain ${index === 0 ? 'mb-6 w-[473px]' : 'w-[511px]'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
