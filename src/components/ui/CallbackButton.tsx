'use client';

import QuickContactModal from '@/components/header/QuickContactModal';
import { cn } from '@/utils/cn';
import { Send } from 'lucide-react';
import { useState } from 'react';

/**
 * Standalone CTA button that opens the "Get a Callback" lead modal.
 * Reusable across landing sections and standalone pages.
 */
export function CallbackButton({
  label = 'Contact Hero',
  variant = 'solid',
  className,
  withIcon = true,
}: {
  label?: string;
  variant?: 'solid' | 'outline' | 'light';
  className?: string;
  withIcon?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const base =
    'group inline-flex items-center justify-center gap-2 rounded-[40px] px-7 py-3.5 text-[16px] font-semibold transition-all hover:scale-[1.03]';
  const variants = {
    solid:
      'bg-accent text-white shadow-[0_10px_30px_rgba(168,106,69,0.35)] hover:shadow-[0_12px_38px_rgba(168,106,69,0.5)]',
    outline:
      'border-2 border-ink/15 text-ink hover:border-accent hover:text-accent-deep',
    light:
      'bg-white text-ink shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_38px_rgba(0,0,0,0.18)]',
  } as const;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(base, variants[variant], className)}
      >
        {withIcon && (
          <Send size={18} className="transition-transform group-hover:translate-x-0.5" />
        )}
        {label}
      </button>
      <QuickContactModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
