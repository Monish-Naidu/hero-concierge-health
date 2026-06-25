import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'h5' | 'h6';

const typographyVariants = cva('text-[#2D2525]', {
  variants: {
    variant: {
      h1: 'font-medium tracking-[-0.01em] text-[56px] md:text-[64px] leading-[1.1] xl:text-[80px]', // Mobile: 56px, Tablet: 96px, Desktop: 145px
      h2: 'font-semibold tracking-[-0.005em] leading-[1.15] text-[40px] md:text-[64px] lg:text-[65px]', // Mobile: 40px, Tablet: 64px, Desktop: 78px
      h3: 'font-normal md:font-medium tracking-[0%] leading-[1.2] md:leading-[1.25] 2xl:leading-[1.3] text-[28px] md:text-[48px] 2xl:text-[64px]', // Mobile: 28px, Tablet: 48px, Desktop: 64px
      h4: 'font-medium tracking-[0%] leading-[1.25] text-[24px] md:text-[36px] 2xl:text-[48px]', // Mobile: 24px, Tablet: 36px, Desktop: 48px
      h5: 'font-normal tracking-[0%] leading-relaxed 2xl:leading-[1.6] text-[16px] md:text-[20px] 2xl:text-[24px]', // Mobile: 16px, Tablet: 20px, Desktop: 24px
      h6: 'font-normal tracking-[0%] leading-[20px] md:leading-[22px] 2xl:leading-[24px] text-[14px] md:text-[16px] 2xl:text-[18px]', // Mobile: 14px, Tablet: 16px, Desktop: 18px
      span: 'font-medium tracking-[0%] leading-[24px] md:leading-[30px] 2xl:leading-[32px] text-[18px] md:text-[24px] 2xl:text-[28px]', // Mobile: 18px, Tablet: 24px, Desktop: 28px
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
  },
  defaultVariants: {
    align: 'left',
  },
});

const variantElementMap: Record<
  NonNullable<VariantProps<typeof typographyVariants>['variant']>,
  TypographyElement
> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  span: 'span',
  h5: 'h5',
  h6: 'h6',
};

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: TypographyElement;
  children: React.ReactNode;
  className?: string;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    { as, variant = 'h5', align, weight, children, className, ...props },
    ref
  ) => {
    // Use provided 'as' prop or default to mapped element
    // @ts-ignore
    const Element = as || variantElementMap[variant] || 'span';

    return (
      <Element
        ref={ref as React.LegacyRef<HTMLHeadingElement>}
        className={cn(
          typographyVariants({ variant, align, weight }),
          className
        )}
        style={props.style}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

Typography.displayName = 'Typography';
