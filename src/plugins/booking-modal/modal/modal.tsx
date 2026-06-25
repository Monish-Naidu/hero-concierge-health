import { Dialog, DialogContent, DialogTitle } from "@/plugins/booking-modal/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, content }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.removeProperty("margin-right");
      document.body.style.removeProperty("--removed-body-scroll-bar-size");
      document.body.style.setProperty("padding-right", "17px", "important");
    }
  }, [isOpen]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in:     { opacity: 1, y: 0 },
    out:    { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    duration: 0.2,
    ease: "easeInOut",
  };

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
            forceMount
            onEscapeKeyDown={onClose}
            className="h-[80%] !rounded-[22px] p-0 pt-5 sm:max-w-[700px]"
        >
          <DialogTitle className="pl-6 text-[32px] font-semibold text-[#000A2D]">
            {title}
          </DialogTitle>

          {/* Framer Motion for content */}
          <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    key="dialog-inner"
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                    transition={pageTransition}
                    className="scrollbar-hide overflow-y-auto px-6 pb-6"
                >
                  {content}
                </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
  );
};
