'use client';

import { FadeText } from '@/components/animation/FadeText';
import { useEffect, useState } from 'react';
import { Typography } from '../../components/ui/Typography';
import './benefits.css';

type Props = {
  title: string;
  description: string;
  points: { title: string; image: string }[];
};

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>(
    'desktop'
  );

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1640) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  return deviceType;
};

export const Benefits = (props: Props) => {
  const { title, description, points } = props;
  const deviceType = useDeviceType();

  const renderMobileLayout = () => (
    <div className="benefits-mobile container">
      {points.map((point, index) => (
        <div
          key={index}
          className="mobile-element"
          style={{
            backgroundImage: `url(${point.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="element-content">
            <div className="mobile-content">
              <div
                className="inline-flex rounded-[48px] p-[1px]"
                style={{
                  background: 'linear-gradient(to right, #A86A45, #EAEAEA)',
                }}
              >
                <div className="inline-flex w-auto items-center justify-center gap-3 text-wrap rounded-[48px] bg-[#A86A45] px-[18px] py-[8px] text-center text-[14px] font-bold leading-none text-white shadow-custom-green [text-shadow:2px_2px_10px_rgba(0,0,0,0.25)]">
                  {point.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabletLayout = () => (
    <div className="benefits-tablet container">
      {points.map((point, index) => (
        <div
          key={index}
          className="tablet-element"
          style={{
            backgroundImage: `url(${point.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="element-content">
            <div className="relative flex items-center justify-center">
              <div
                className="inline-flex rounded-[48px] p-[1px]"
                style={{
                  background: 'linear-gradient(to right, #A86A45, #EAEAEA)',
                }}
              >
                <div className="inline-flex w-auto items-center justify-center gap-3 text-wrap rounded-[48px] bg-[#A86A45] px-[20px] py-[10px] text-center text-[15px] font-bold leading-none text-white shadow-custom-green [text-shadow:2px_2px_10px_rgba(0,0,0,0.25)]">
                  {point.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDesktopLayout = () => (
    <div className="container-grid">
      <div className="row-flex">
        {points.slice(0, 2).map((point, index) => (
          <div
            key={index}
            className={`rounded-wrapper element-${index + 1}`}
            style={{
              backgroundImage: `url(${point.image})`,
            }}
          >
            <div className="element-content">
              <div
                className="relative flex items-center"
                style={{
                  justifyContent: index === 0 ? 'start' : 'center',
                }}
              >
                <div
                  className="inline-flex rounded-[48px] p-[1px]"
                  style={{
                    background: 'linear-gradient(to right, #A86A45, #EAEAEA)',
                  }}
                >
                  <div className="inline-flex w-auto items-center justify-center gap-3 text-wrap rounded-[48px] bg-[#A86A45] px-[20px] py-[10px] text-center text-[14px] font-bold leading-none text-white shadow-custom-green [text-shadow:2px_2px_10px_rgba(0,0,0,0.25)] sm:py-[20px] md:text-[17px] xl:text-[19px]">
                    {point.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="column-flex">
        {points.slice(2, 5).map((point, index) => (
          <div
            key={index + 2}
            className={`rounded-wrapper element-${index + 3}`}
            style={{
              backgroundImage: `url(${point.image})`,
            }}
          >
            <div className="element-content">
              <div
                className="relative flex items-center"
                style={{
                  justifyContent: 'center',
                }}
              >
                <div
                  className="inline-flex rounded-[48px] p-[1px]"
                  style={{
                    background: 'linear-gradient(to right, #A86A45, #EAEAEA)',
                  }}
                >
                  <div className="inline-flex w-auto items-center justify-center gap-3 text-wrap rounded-[48px] bg-[#A86A45] px-[20px] py-[10px] text-center text-[14px] font-bold leading-none text-white shadow-custom-green [text-shadow:2px_2px_10px_rgba(0,0,0,0.25)] sm:py-[20px] md:text-[17px] xl:text-[19px]">
                    {point.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="">
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
      <FadeText
        framerProps={{
          show: { transition: { delay: 0.3 } },
        }}
        direction="up"
        content={
          <Typography
            variant="h6"
            className="container mb-4 text-center text-[16px] font-medium text-[#2D2525] md:mb-4 md:text-[20px] xl:mb-4 xl:text-[24px]"
          >
            {description}
          </Typography>
        }
      />

      {deviceType === 'mobile' && renderMobileLayout()}
      {deviceType === 'tablet' && renderTabletLayout()}
      {deviceType === 'desktop' && renderDesktopLayout()}
    </div>
  );
};
