'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type Props = {
  title: string;
  content: { q: string; a: string }[];
};

export default function FAQ({ title, content }: Props) {
  const items = content.filter((item) => item.a && item.a.trim() !== '').slice(0, 10);

  return (
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
          FAQ
        </span>
        <h2 className="mt-4 text-[28px] font-medium leading-[1.15] text-ink sm:text-[40px] lg:text-[44px]">
          {title || 'Questions, answered.'}
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {items.map((item, i) => (
          <FaqItem key={item.q || i} question={item.q} answer={item.a} index={i} />
        ))}
      </div>
    </div>
  );
}

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.04 }}
      className="overflow-hidden rounded-[20px] border border-sand bg-cream"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-sand/30"
      >
        <span className="text-[16px] font-semibold text-ink sm:text-[17px]">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`flex-none text-accent-deep transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[15px] leading-relaxed text-taupe sm:text-[16px]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
