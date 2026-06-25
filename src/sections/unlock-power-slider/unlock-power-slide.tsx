import Image from 'next/image';
import React from 'react';
import * as LucideIcons from 'lucide-react';

interface SlideCardProps {
  svg: string;
  title: string; // e.g., "Energy & Metabolism"
  description: string; // e.g., "NAD+ is vital for mitochondrial function..."
  points: string[]; // e.g., ["Increased Energy Levels", "Improved Weight Management", ...]
  subtitleHeader?: string; // Custom header for the subtitle section
  pointsTitle?: string; // Custom title for the points section
}

// Helper function to get Lucide icon component by name
const getLucideIcon = (iconName: string): React.ComponentType<any> | null => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || null;
};

// Check if the string is a Lucide icon name (not a file path)
const isLucideIconName = (icon: string): boolean => {
  return !icon.startsWith('/') && !icon.includes('.');
};

export const UnlockPowerSlide: React.FC<SlideCardProps> = ({
  title,
  svg,
  description,
  points,
  subtitleHeader = 'Cellular Powerhouse',
  pointsTitle = 'Real Benefits',
}) => {
  const renderIcon = () => {
    if (!svg) return null;

    // If it's a Lucide icon name, render the icon component
    if (isLucideIconName(svg)) {
      const IconComponent = getLucideIcon(svg);
      if (IconComponent) {
        return (
          <div className="flex size-10 items-center justify-center">
            <IconComponent className="size-10 text-[#7E4A2E]" />
          </div>
        );
      }
    }

    // Otherwise, render as image (for backward compatibility)
    return (
      <div className="relative size-10">
        <Image src={svg} alt="svg" className="!object-cover" fill />
      </div>
    );
  };

  return (
    <div className="flex h-auto w-full flex-col rounded-[12px] border border-[#CDE0E7] bg-white p-6 text-left text-[#102D47]">
      <div className="flex items-center gap-[18px]">
        {renderIcon()}
        <p className="text-[23px] font-semibold text-[#102D47] lg:text-[33px]">
          {title}
        </p>
      </div>

      <hr className="my-[20px] border-[#7E4A2E33]" />

      <p className="mb-2 text-[14px] font-medium text-[#102D47] lg:text-[20px]">
        {description}
      </p>

      <hr className="my-[10px] border-[#7E4A2E33]" />

      <p className="mb-[16px] text-[16px] font-semibold text-[#102D47] lg:text-[26px]">
        {pointsTitle}
      </p>

      {points.length > 0 && (
        <ul className="ml-2 list-inside list-disc space-y-1">
          {points.map((point, index) => (
            <li
              key={index}
              className="text-[14px] font-bold text-[#7E4A2E] lg:text-[18px]"
            >
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
