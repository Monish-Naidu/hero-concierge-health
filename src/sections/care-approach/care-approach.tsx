'use client';

import { CallbackButton } from '@/components/ui/CallbackButton';
import { cn } from '@/utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, MonitorSmartphone, Users, FlaskConical } from 'lucide-react';
import { useState } from 'react';

const MODES = [
  {
    key: 'in-clinic',
    label: 'In our Chicago clinic',
    icon: Building2,
    heading: 'Real exams, real labs, real doctors.',
    description:
      'Come into our Lakeview clinic for in-person consults, comprehensive lab work, and treatments. When your health deserves hands-on attention, there’s an actual place to go — and an actual team that knows you.',
    bullets: ['Comprehensive lab panels', 'In-person physician visits', 'On-site treatments'],
  },
  {
    key: 'online',
    label: 'Online, anytime',
    icon: MonitorSmartphone,
    heading: 'Care that meets you wherever you are.',
    description:
      'Message your care team, take a telehealth visit, and get prescriptions delivered to your door. The convenience of virtual care — without the one-size-fits-all questionnaire medicine you get everywhere else.',
    bullets: ['Secure messaging with your team', 'Video visits on your schedule', 'Treatments shipped to you'],
  },
  {
    key: 'team',
    label: 'One coordinated team',
    icon: Users,
    heading: 'A single team for your whole health.',
    description:
      'Hormones, weight, sexual health, longevity, aesthetics — coordinated under one roof for men and women. No silos, no repeating your story, no chasing referrals. One plan, owned by people who know you.',
    bullets: ['One unified health plan', 'Board-certified physicians', 'Care that follows your history'],
  },
  {
    key: 'ongoing',
    label: 'Ongoing, not one-and-done',
    icon: FlaskConical,
    heading: 'We stay with you as you change.',
    description:
      'Your body and goals shift over time — your plan should too. We track your progress, retest, and adjust. Concierge care is a relationship, not a transaction.',
    bullets: ['Regular check-ins & retesting', 'Plans that evolve with you', 'Same team, every time'],
  },
];

export function CareApproach() {
  const [active, setActive] = useState(0);
  const current = MODES[active];

  return (
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
          How we care for you
        </span>
        <h2 className="mt-4 text-[32px] font-medium leading-[1.12] text-ink sm:text-[44px] lg:text-[50px]">
          One clinic. Every way you need care.
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
        {/* Left: selectable list (Spring Health style) */}
        <div className="flex flex-col">
          {MODES.map((mode, i) => {
            const isActive = i === active;
            return (
              <button
                key={mode.key}
                onClick={() => setActive(i)}
                className={cn(
                  'group border-t border-sand py-6 text-left transition-colors last:border-b',
                  isActive ? 'text-ink' : 'text-taupe hover:text-ink'
                )}
              >
                <span className="flex items-center gap-4">
                  <mode.icon
                    size={26}
                    className={cn(
                      'flex-shrink-0 transition-colors',
                      isActive ? 'text-accent-deep' : 'text-taupe group-hover:text-accent-deep'
                    )}
                  />
                  <span
                    className={cn(
                      'text-[26px] font-medium leading-tight transition-all sm:text-[32px]',
                      isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'
                    )}
                  >
                    {mode.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: panel that swaps with the active item */}
        <div className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-cream p-8 sm:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="flex h-full flex-col"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-accent/12 text-accent-deep">
                <current.icon size={28} />
              </div>
              <h3 className="mt-6 text-[24px] font-semibold leading-snug text-ink sm:text-[28px]">
                {current.heading}
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-taupe sm:text-[17px]">
                {current.description}
              </p>
              <ul className="mt-6 space-y-3">
                {current.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-[15px] font-medium text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <CallbackButton label="Talk to our team" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
