'use client';

import { CallbackButton } from '@/components/ui/CallbackButton';
import { HowItWorks } from '@/sections/how-it-works/how-it-works';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarClock, ChevronDown, FlaskConical, MonitorSmartphone } from 'lucide-react';
import { useState } from 'react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -60px 0px' },
};

const EXPECT = [
  {
    icon: CalendarClock,
    title: 'A quick, easy start',
    description:
      'Reach out and our team follows up promptly — no endless forms or waiting weeks for a first conversation.',
  },
  {
    icon: FlaskConical,
    title: 'Labs that guide the plan',
    description:
      'Most plans begin with comprehensive bloodwork. Some labs are done in our Chicago clinic; others can be arranged near you.',
  },
  {
    icon: MonitorSmartphone,
    title: 'In-person and online',
    description:
      'Visit our Lakeview clinic when it matters, and handle the rest by telehealth and secure messaging.',
  },
];

// TODO: confirm FAQ answers with client
const FAQS = [
  {
    question: 'Is this for men and women?',
    answer:
      'Yes. Hero Concierge Health cares for both men and women, with personalized plans across hormone optimization, weight and metabolic health, sexual health, longevity and aesthetics.',
  },
  {
    question: 'Is this telehealth or in-person?',
    answer:
      'Both. We are a real clinic in Chicago’s Lakeview neighborhood with telehealth layered on top. You can be seen in person, online, or a mix of the two depending on what your care needs.',
  },
  {
    question: 'Do I need to come to Chicago?',
    answer:
      'In-clinic visits are optional, and a great deal of care can be handled through telehealth. Some services—like certain labs, exams and in-person treatments—may require a visit to our Lakeview clinic.',
  },
  {
    question: 'What services do you offer?',
    answer:
      'Hormone optimization (including TRT and menopause/hormone balance), weight optimization (GLP-1), sexual health, NAD therapy, and aesthetics & Botox — all coordinated under one membership.',
  },
  {
    question: 'How much is membership?',
    answer:
      'Membership is built around a simple monthly model with a few tiers. You can review illustrative plans and pricing on our Membership page.',
  },
  {
    question: 'Are your providers licensed and board-certified?',
    answer:
      'Yes. Care is delivered by real, licensed, board-certified physicians and clinicians — not an anonymous app.',
  },
  {
    question: 'How fast can I be seen?',
    answer:
      'We aim to follow up quickly after you reach out, and members enjoy priority scheduling. Exact timing depends on the type of visit and provider availability.',
  },
  {
    question: 'Do you take insurance?',
    answer:
      'Hero Concierge Health operates on a concierge membership model rather than billing insurance for membership. Certain labs, medications or services may be handled separately — our team will walk you through the details.',
  },
];

export default function HowItWorksPage() {
  return (
    <main className="bg-cream">
      {/* Hero band */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
              How It Works
            </span>
            <h1 className="mt-4 text-[34px] font-medium leading-[1.12] text-ink sm:text-[48px] lg:text-[58px]">
              From hello to feeling like yourself — in four steps.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-taupe sm:text-[18px]">
              Getting started is simple. Here&apos;s exactly what working with
              Hero Concierge Health looks like, for men and women alike.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Existing HowItWorks process section */}
      <section className="bg-white py-20 lg:py-28">
        <HowItWorks />
      </section>

      {/* What to expect */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
              What To Expect
            </span>
            <h2 className="mt-4 text-[28px] font-medium leading-[1.15] text-ink sm:text-[40px]">
              A few things to know going in.
            </h2>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {EXPECT.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-[24px] border border-sand bg-white p-7 shadow-[0_8px_30px_rgba(45,37,37,0.05)]"
              >
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-accent/12 text-accent-deep">
                  <item.icon size={24} />
                </div>
                <h3 className="mt-6 text-[19px] font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-taupe">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
              FAQ
            </span>
            <h2 className="mt-4 text-[28px] font-medium leading-[1.15] text-ink sm:text-[40px]">
              Questions, answered.
            </h2>
          </motion.div>

          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl rounded-[32px] bg-ink px-8 py-16 text-center text-white sm:px-14 lg:py-20"
          >
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-soft">
              Get Started
            </span>
            <h2 className="mx-auto mt-4 max-w-2xl text-[28px] font-medium leading-[1.15] sm:text-[40px]">
              Still have questions? Let&apos;s talk.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
              Tell us what you want to feel better about and our team will reach
              out to guide you through the next step.
            </p>
            <div className="mt-9 flex justify-center">
              <CallbackButton label="Contact Hero" variant="light" />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-[20px] border border-sand bg-cream">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
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
            <p className="px-6 pb-6 text-[15px] leading-relaxed text-taupe">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
