'use client';

import { cn } from '@/plugins/booking-modal/utils/cn';
import { X } from 'lucide-react';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

// Context for dialog state
interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog');
  }
  return context;
};

// Dialog Root Component
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

// Dialog Overlay
interface DialogOverlayProps {
  className?: string;
  onClick?: () => void;
}

const DialogOverlay: React.FC<DialogOverlayProps> = ({ className, onClick }) => {
  const { open } = useDialogContext();
  
  if (!open) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[80]',
        'bg-gradientFromBooking/10 backdrop-blur-sm',
        'animate-in fade-in-0',
        className
      )}
      onClick={onClick}
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
      aria-hidden="true"
      style={{ touchAction: 'none' }}
    />
  );
};

// Dialog Portal
interface DialogPortalProps {
  children: React.ReactNode;
}

const DialogPortal: React.FC<DialogPortalProps> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
};

// Dialog Content
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onEscapeKeyDown?: () => void;
  forceMount?: boolean;
  showCloseButton?: boolean;
  minHeight?: number | string;
  currentStep?: string;
  contentHeight?: number;
  onContentHeightChange?: (height: number) => void;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, onEscapeKeyDown, forceMount, showCloseButton = true, minHeight, currentStep, contentHeight, onContentHeightChange, ...props }, ref) => {
    const { open, onOpenChange } = useDialogContext();
    const internalRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const lastStepRef = React.useRef<string | undefined>(currentStep);
    
    // Combine refs
    React.useImperativeHandle(ref, () => internalRef.current as HTMLDivElement, []);

    const computedHeight = React.useMemo(() => {
      if (!minHeight) return 'min(auto, 98vh)';
      if (typeof minHeight === 'string') {
        return `min(${minHeight}, 98vh)`;
      }
      return `min(${minHeight}px, 98vh)`;
    }, [minHeight]);

    // Handle escape key
    React.useEffect(() => {
      if (!open) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (onEscapeKeyDown) {
            onEscapeKeyDown();
          } else {
            onOpenChange(false);
          }
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onEscapeKeyDown, onOpenChange]);

    // Handle click outside
    const handleOverlayClick = () => {
      onOpenChange(false);
    };

    // Prevent body scroll when dialog is open
    React.useEffect(() => {
      if (open) {
        const originalOverflow = document.body.style.overflow;
        const originalPosition = document.body.style.position;
        const originalWidth = document.body.style.width;
        const scrollY = window.scrollY;
        
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollY}px`;
        
        document.documentElement.style.overflow = 'hidden';
        
        return () => {
          document.body.style.overflow = originalOverflow;
          document.body.style.position = originalPosition;
          document.body.style.width = originalWidth;
          document.body.style.top = '';
          document.documentElement.style.overflow = '';
          
          window.scrollTo(0, scrollY);
        };
      }
    }, [open]);

    if (!open) return null;

    return (
      <DialogPortal>
        <DialogOverlay onClick={handleOverlayClick} />
        <motion.div
          ref={internalRef}
          className={cn(
            'fixed left-1/2 top-1/2 z-[90] flex flex-col border bg-white shadow-lg duration-200 sm:rounded-lg',
            'animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]',
            className
          )}
          style={{
            width: 'calc(100% - 20px)',
            maxWidth: '700px',
            transform: 'translate(-50%, -50%)',
            height: computedHeight,
            minHeight: computedHeight,
            maxHeight: '98vh',
            overflow: 'hidden',
            transition: 'height 0.2s ease-out',
            ...(props.style as React.CSSProperties),
          }}
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            e.stopPropagation();
            if (props.onClick) {
              props.onClick(e as any);
            }
          }}
        >
          <div 
            ref={contentRef}
            className="flex flex-col flex-1 min-h-0 h-full overflow-hidden"
            style={{
              maxHeight: '98vh',
              height: '100%',
            }}
          >
            {children}
          </div>
          {showCloseButton && (
            <motion.button
              type="button"
              onClick={() => onOpenChange(false)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-gradientFromBooking to-gradientToBooking text-white shadow-lg shadow-gradientFromBooking/30 transition-all duration-200 hover:shadow-xl hover:shadow-gradientFromBooking/40 focus:outline-none focus:ring-2 focus:ring-gradientFromBooking focus:ring-offset-2"
              aria-label="Close"
            >
              <X className="h-5 w-5 stroke-[2.5]" />
              <span className="sr-only">Close</span>
            </motion.button>
          )}
        </motion.div>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = 'DialogContent';

// Dialog Header
interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader: React.FC<DialogHeaderProps> = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

// Dialog Footer
interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter: React.FC<DialogFooterProps> = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

// Dialog Title
interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  )
);
DialogTitle.displayName = 'DialogTitle';

// Dialog Description
interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
);
DialogDescription.displayName = 'DialogDescription';

// Dialog Close (for programmatic closing)
const DialogClose: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ 
  children, 
  asChild 
}) => {
  const { onOpenChange } = useDialogContext();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        onOpenChange(false);
        if (children.props.onClick) {
          children.props.onClick(e);
        }
      },
    } as any);
  }

  return (
    <button type="button" onClick={() => onOpenChange(false)}>
      {children}
    </button>
  );
};
DialogClose.displayName = 'DialogClose';

// Dialog Trigger (for opening dialog)
interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, asChild }) => {
  const { onOpenChange } = useDialogContext();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        onOpenChange(true);
        if (children.props.onClick) {
          children.props.onClick(e);
        }
      },
    } as any);
  }

  return (
    <button type="button" onClick={() => onOpenChange(true)}>
      {children}
    </button>
  );
};
DialogTrigger.displayName = 'DialogTrigger';

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
