import { cn } from '@/utils/cn';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'group text-white inline-flex items-center justify-center rounded whitespace-nowrap font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 active:scale-[0.99] duration-300 hover:scale-[1.02]',
  {
    variants: {
      variant: {
        default: '',
        destructive:
          'bg-red-500 text-zinc-50 dark:bg-red-900 dark:text-zinc-50',
        outline:
          'border border-zinc-300 bg-white dark:border-zinc-800 dark:bg-zinc-950 hover:dark:bg-zinc-800 hover:bg-zinc-200',
        secondary:
          'bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50',
        ghost: 'hover:bg-zinc-200 dark:hover:bg-zinc-700',
        link: 'text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 px-3',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  hideIcon?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      rightIcon,
      leftIcon,
      hideIcon,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {leftIcon && <span>{leftIcon}</span>}
        <Slottable>{props.children}</Slottable>

        {rightIcon ? (
          <span className="ml-0 w-0 opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-5 group-hover:opacity-100">
            {rightIcon}
          </span>
        ) : null}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

{
  /* <button className="px-8 py-4 bg-gradient-radial from-[rgba(255,255,255,0.45)] via-transparent to-[#A86A45] text-white font-bold rounded-[56px] border-[1px] border-[#A86A45] shadow-[0px_10px_19px_0px_rgba(168,106,69,0.28)] transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
  Free Online Consultation
</button> */
}
