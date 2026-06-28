import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import BookingModal from '@/components/header/QuickContactModal';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

interface HomeStickyFeaturesSectionProps {
  title: string;
  description: string;
  content: string[];
  btnText: string;
  children: ReactNode;
  slug: string;
  isAbsolute?: boolean;
}

export const HomeStickyFeaturesSection: React.FC<
  HomeStickyFeaturesSectionProps
> = ({ title, description, children, btnText, content, slug, isAbsolute }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const router = useRouter();

  return (
    <section
      className={cn(
        isAbsolute
          ? 'lg:absolute lg:inset-0 lg:z-[var(--stick-visibility)]'
          : ''
      )}
    >
      <div
        className={cn(
          'flex lg:h-full lg:space-x-8 lg:space-y-0 lg:flex-row-between',
          !isAbsolute ? 'flex-col' : ''
        )}
      >
        <div className="flex flex-1 items-center justify-center transition duration-300 lg:scale-[var(--stick-scale)] lg:opacity-[var(--stick-visibility)]">
          {children}
        </div>
        <div className="order-1 flex flex-1 items-center transition-opacity duration-300 lg:order-none lg:opacity-[var(--stick-visibility)]">
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
            <Typography variant="h4" className="py-[20px] lg:mb-[40px]">
              {title}
            </Typography>
            <Typography variant="h5" className="mb-7 text-[#79738B]">
              {description}
            </Typography>
            {content.length > 0 ? (
              <>
                <Typography variant="h5" className="mb-4 text-[#79738B]">
                  Benefits:
                </Typography>
                <ul className="mb-10 space-y-2">
                  {content.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-4">
                      <div className="bg-gradient-radial h-[18px] w-[18px] flex-none rounded-full bg-[#A86A45] from-[#A86A45] via-[#A86A45] to-transparent drop-shadow-[0px_10px_19px_rgba(168,_106,_69,_0.28)] filter" />
                      <Typography variant="h5" className="text-[#79738B]">
                        {benefit}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {btnText ? (
              <Button
                onClick={() => router.push(`${slug}`)}
                className="w-full rounded-[56px] border border-[#A86A45] bg-[#A86A45] px-[20px] py-[35px] text-[18px] font-bold text-white shadow-md [text-shadow:2px_2px_10px_rgba(0,0,0,0.25)] xl:text-[28px]"
                style={{
                  background:
                    'radial-gradient(163.33% 163.33% at 50% 100%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 100%), #A86A45',
                  backgroundBlendMode: 'overlay, normal',
                }}
              >
                {btnText}
              </Button>
            ) : null}
          </motion.div>
        </div>
      </div>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
};
