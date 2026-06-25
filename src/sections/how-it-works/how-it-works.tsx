'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ClipboardList, FlaskConical, RefreshCw } from 'lucide-react';

const STEPS = [
  {
    icon: MessageCircle,
    title: 'Reach out',
    description:
      'Tell us what you want to feel better about. Share a few details and we’ll get right back to you — no endless forms.',
  },
  {
    icon: FlaskConical,
    title: 'Get a real workup',
    description:
      'Comprehensive labs and a physician consult — in our Chicago clinic or online — so your plan is built on data, not guesswork.',
  },
  {
    icon: ClipboardList,
    title: 'Your personalized plan',
    description:
      'A board-certified doctor designs a plan around your goals, biology, and life. Treatments delivered or in-clinic, your choice.',
  },
  {
    icon: RefreshCw,
    title: 'Ongoing concierge care',
    description:
      'Message your team any time, track progress, and adjust as you go. We stay with you — this isn’t one-and-done.',
  },
];

export function HowItWorks({
  title = 'How it works',
  subtitle = 'Concierge-level care, made simple. Four steps from hello to feeling like yourself again.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
          The Process
        </span>
        <h2 className="mt-4 text-[32px] font-medium leading-[1.12] text-ink sm:text-[44px] lg:text-[50px]">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-taupe sm:text-[18px]">
          {subtitle}
        </p>
      </div>

      <div className="relative mt-14">
        {/* connecting line on desktop */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-[44px] hidden h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent lg:block"
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-[88px] w-[88px] items-center justify-center rounded-full border border-sand bg-cream shadow-[0_8px_30px_rgba(45,37,37,0.06)]">
                <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-accent/12 text-accent-deep">
                  <step.icon size={26} />
                </div>
                <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[13px] font-bold text-white shadow-custom-green">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-[19px] font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-[260px] text-[14.5px] leading-relaxed text-taupe">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
