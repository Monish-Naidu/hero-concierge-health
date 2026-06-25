'use client';

import { CallbackButton } from '@/components/ui/CallbackButton';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

const PERKS = [
  'Your own board-certified care team',
  'Same-day secure messaging',
  'Annual comprehensive labs',
  'Both telehealth & in-clinic visits',
  'Personalized, evolving health plans',
  'Member pricing on treatments',
];

export function MembershipTeaser() {
  return (
    <div className="container">
      <div className="overflow-hidden rounded-[32px] border border-sand bg-cream">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-16">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
              Membership
            </span>
            <h2 className="mt-4 text-[30px] font-medium leading-[1.12] text-ink sm:text-[40px] lg:text-[46px]">
              One membership. Your whole health, handled.
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-taupe sm:text-[17px]">
              Concierge medicine for men and women — the convenience of
              telehealth with the depth of a real Chicago clinic behind it. One
              team that actually knows you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CallbackButton label="Become a Member" />
              <Link
                href="/membership"
                className="inline-flex items-center text-[15px] font-semibold text-ink underline-offset-4 transition-colors hover:text-accent-deep hover:underline"
              >
                See plans & pricing →
              </Link>
            </div>
          </div>

          <div className="bg-ink p-8 sm:p-12 lg:p-16">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-soft">
              What's included
            </p>
            <ul className="mt-6 space-y-4">
              {PERKS.map((perk, i) => (
                <motion.li
                  key={perk}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-soft">
                    <Check size={15} />
                  </span>
                  <span className="text-[15.5px] leading-relaxed text-white/80">
                    {perk}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
