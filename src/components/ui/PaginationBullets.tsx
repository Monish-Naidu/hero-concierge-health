import React from 'react';

interface PaginationBulletsProps {
  slideCount: number;
  activeIndex: number;
  onBulletClick: (index: number) => void;
  className?: string;
}

export const PaginationBullets: React.FC<PaginationBulletsProps> = ({
  slideCount,
  activeIndex,
  onBulletClick,
  className = '',
}) => {
  return (
    <div className={`mt-8 flex items-center justify-center gap-1 ${className}`}>
      {Array.from({ length: slideCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => onBulletClick(index)}
          className={`h-3 w-3 cursor-pointer rounded-full transition-all duration-300 ${
            index === activeIndex
              ? 'h-5 w-5 scale-110 transform bg-gradient-to-r from-[#7E4A2E] to-[#D8BFA6]'
              : 'hover:scale-120 bg-[#847c8c] hover:bg-[#6a6273] hover:shadow-md'
          } `}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '800px',
          }}
        />
      ))}
    </div>
  );
};
