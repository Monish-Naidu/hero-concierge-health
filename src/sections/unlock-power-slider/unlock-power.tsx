import { Typography } from '@/components/ui/Typography';
import BookingModal from '@/components/header/QuickContactModal';
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { UnlockPowerSlide } from './unlock-power-slide';
import { UnlockPowerSlider } from './unlock-power-slider';

type PointType = string | { title: string; image: string };

interface UnlockPowerProps {
  unlockPowerData: {
    id: string;
    title: string;
    description?: string;
    points?: PointType[];
    ctaText?: string;
    sections?: Array<{
      icons?: string;
      title: string;
      description: string;
      pointsTitle?: string;
      points?: PointType[];
    }>;
  };
}

export default function UnlockPower({ unlockPowerData }: UnlockPowerProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const convertPoints = (points?: PointType[]): string[] => {
    if (!points) return [];

    return points.map((point) =>
      typeof point === 'string' ? point : point.title
    );
  };

  return (
    <>
      <section className="container px-4 text-center">
        <Typography
          variant="h3"
          className="mb-4 text-center font-bold text-[#7E4A2E] md:mb-6"
        >
          {unlockPowerData.title}
        </Typography>
        <Typography
          variant="h5"
          className="container mx-auto text-center font-medium text-[#2D2525]"
        >
          {unlockPowerData.description || ''}
        </Typography>
      </section>

      <UnlockPowerSlider>
        {unlockPowerData.sections?.map((section, index) => (
          <UnlockPowerSlide
            key={index}
            svg={section.icons || ''}
            title={section.title}
            description={section.description}
            points={convertPoints(section.points)}
            pointsTitle={section.pointsTitle || 'Real Benefits'}
          />
        ))}
      </UnlockPowerSlider>

      <div className="container text-center">
        <Button
          className="inline-flex w-auto items-center justify-center gap-3 text-wrap rounded-[56px] border-[1px] border-[#A86A45] bg-[#A86A45] px-[40px] py-[30px] text-[16px] font-bold leading-none text-white shadow-custom-green [text-shadow:2px_2px_10px_rgba(0,0,0,0.25)] sm:py-[45px] md:text-[24px] xl:text-[28px]"
          onClick={() => setIsBookingModalOpen(true)}
          style={{
            background:
              'radial-gradient(163.33% 163.33% at 50% 100%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 100%, rgba(255, 255, 255, 0) 100%), #A86A45',
            backgroundBlendMode: 'overlay, normal',
          }}
        >
          {unlockPowerData.ctaText || 'Schedule Your Consultation Today!'}
        </Button>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
