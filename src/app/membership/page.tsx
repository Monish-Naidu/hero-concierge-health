'use client';

import { CallbackButton } from '@/components/ui/CallbackButton';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  Check,
  FlaskConical,
  MessageSquare,
  Sparkles,
  Stethoscope,
  Video,
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -60px 0px' },
};

// TODO: confirm tier names + pricing with client
const TIERS = [
  {
    name: 'Essential',
    price: '$99',
    cadence: '/mo',
    description:
      'Telehealth-first membership for staying ahead of your health with a dedicated care team.',
    features: [
      'Same-day secure messaging',
      'Telehealth visits with your physician',
      'Annual baseline lab panel',
      'Personalized care plan',
    ],
    highlighted: false,
  },
  {
    name: 'Concierge',
    price: '$249',
    cadence: '/mo',
    description:
      'Our most popular membership — full telehealth plus in-clinic access at our Lakeview location.',
    features: [
      'Everything in Essential',
      'In-clinic visits & exams',
      'Expanded lab panels',
      'Priority scheduling',
      'Discounted treatments',
    ],
    highlighted: true,
  },
  {
    name: 'Family',
    price: 'Custom',
    cadence: '',
    description:
      'Coordinated concierge care for couples and households, tailored to each member.',
    features: [
      'Concierge benefits for each member',
      'Shared care coordination',
      'Flexible visit scheduling',
      'Tailored household pricing',
    ],
    highlighted: false,
  },
];

const INCLUDED = [
  {
    icon: MessageSquare,
    title: 'Same-day messaging',
    description: 'Reach your care team directly without waiting on hold.',
  },
  {
    icon: FlaskConical,
    title: 'Annual labs',
    description: 'Comprehensive bloodwork to ground every decision in data.',
  },
  {
    icon: Stethoscope,
    title: 'In-clinic visits',
    description: 'Exams and treatments at our Chicago Lakeview clinic.',
  },
  {
    icon: Video,
    title: 'Telehealth visits',
    description: 'See your physician from anywhere, on your schedule.',
  },
  {
    icon: CalendarCheck,
    title: 'Personalized plans',
    description: 'A plan built around your biology, goals and lifestyle.',
  },
  {
    icon: Sparkles,
    title: 'Discounted treatments',
    description: 'Member pricing on eligible therapies and services.',
  },
];

export default function MembershipPage() {
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
              Membership
            </span>
            <h1 className="mt-4 text-[34px] font-medium leading-[1.12] text-ink sm:text-[48px] lg:text-[58px]">
              One membership. Your whole health, handled.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-taupe sm:text-[18px]">
              Concierge membership gives you a dedicated care team, seamless
              telehealth, and in-clinic access in Chicago — all under one simple
              plan. Less friction, more attention, for men and women alike.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
              Plans
            </span>
            <h2 className="mt-4 text-[28px] font-medium leading-[1.15] text-ink sm:text-[40px]">
              Choose the membership that fits.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-taupe sm:text-[16px]">
              Pricing shown is illustrative and for review.
            </p>
          </motion.div>

          {/* TODO: confirm tier names + pricing with client */}
          <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-3">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={cn(
                  'relative flex flex-col rounded-[32px] bg-cream p-8 lg:p-9',
                  tier.highlighted
                    ? 'border-2 border-accent shadow-[0_16px_50px_rgba(168,106,69,0.22)]'
                    : 'border border-sand shadow-[0_8px_30px_rgba(45,37,37,0.05)]',
                )}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white shadow-custom-green">
                    Most popular
                  </span>
                )}
                <h3 className="text-[20px] font-semibold text-ink">
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-[40px] font-medium leading-none text-ink">
                    {tier.price}
                  </span>
                  {tier.cadence && (
                    <span className="pb-1 text-[15px] text-taupe">
                      {tier.cadence}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-[14.5px] leading-relaxed text-taupe">
                  {tier.description}
                </p>
                <ul className="mt-7 space-y-3.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/15 text-accent-deep">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <span className="text-[14.5px] leading-snug text-ink/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-2">
                  <CallbackButton
                    label="Get Started"
                    variant={tier.highlighted ? 'solid' : 'outline'}
                    className="w-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
              What&apos;s Included
            </span>
            <h2 className="mt-4 text-[28px] font-medium leading-[1.15] text-ink sm:text-[40px]">
              The perks of being a member.
            </h2>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-[24px] border border-sand bg-white p-7 shadow-[0_8px_30px_rgba(45,37,37,0.05)]"
              >
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-accent/12 text-accent-deep">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-5 text-[18px] font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-taupe">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reassurance + CTA */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl rounded-[32px] bg-ink px-8 py-16 text-center text-white sm:px-14 lg:py-20"
          >
            <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-[16px]">
              No long-term lock-in surprises and no pressure — just a clear plan
              and a team that answers.
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-[28px] font-medium leading-[1.15] sm:text-[40px]">
              Let&apos;s find the right plan for you.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
              Share a few details and our team will reach out with the
              membership that fits your goals and budget.
            </p>
            <div className="mt-9 flex justify-center">
              <CallbackButton label="Become a Member" variant="light" />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
