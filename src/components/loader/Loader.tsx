'use client';

import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  variant = 'primary',
  text,
}) => {
  const sizeConfig = {
    small: 24,
    medium: 40,
    large: 64,
  };

  const dotSize = sizeConfig[size];
  const labelId = React.useId();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      role="status"
      aria-busy="true"
      aria-labelledby={text ? labelId : undefined}
      suppressHydrationWarning
    >
      <div className="flex flex-col items-center" suppressHydrationWarning>
        {/* Loading dots */}
        <div className="flex items-end gap-3" suppressHydrationWarning>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="loader-dot rounded-full"
              style={{
                width: dotSize / 5,
                height: dotSize / 5,
                backgroundColor: '#A86A45',
                animationDelay: `${index * 0.15}s`,
              }}
              suppressHydrationWarning
            />
          ))}
        </div>

        {text && (
          <p id={labelId} className="mt-3 text-sm font-medium text-gray-600" suppressHydrationWarning>
            {text}
          </p>
        )}

        <span className="sr-only" suppressHydrationWarning>Loading...</span>
      </div>
    </div>
  );
};
