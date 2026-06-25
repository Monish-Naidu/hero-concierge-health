'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQItemProps {
  item: FAQItem;
}

export function FAQItem({ item }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [contentRef, item.a]);

  return (
    <div
      className="mb-[48px] rounded-full p-[2px]"
      style={{ background: 'linear-gradient(to right, #D0D0D0, #9DFFDA)' }}
    >
      <div className="rounded-full p-10 px-14 pb-8 [background:linear-gradient(to_right,_#F6F6F6,_#F5FEFA)]">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-[21px] font-semibold text-[#000a2d] xl:text-[29px]">
            {item.q}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.5, ease: 'anticipate' }}
            className="text-xl"
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <Plus size={48} color="#7E4A2E" strokeWidth={2.5} opacity={0.8} />
          </motion.div>
        </div>
        <motion.div
          animate={{ height: isOpen ? contentHeight : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
          className="mt-2 text-[17px] font-normal text-[#42526B] xl:text-2xl"
        >
          <div ref={contentRef}>
            <p>{item.a}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
