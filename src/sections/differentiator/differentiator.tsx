'use client';

import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { Building2, Stethoscope, Video, HeartPulse } from 'lucide-react';

const PILLARS = [
  {
    icon: Building2,
    title: 'A real clinic, not just an app',
    description:
      'Walk into our Lakeview clinic in Chicago for labs, exams, and in-person care whenever it matters. Virtual care, grounded in a real place.',
  },
  {
    icon: Stethoscope,
    title: 'Board-certified physicians',
    description:
      'Your plan is built and managed by licensed doctors who know your history — not a rotating cast of anonymous providers.',
  },
  {
    icon: Video,
    title: 'Telehealth that actually works',
    description:
      'Message your care team, hop on a visit, and adjust your plan from anywhere. Convenience without cutting corners.',
  },
  {
    icon: HeartPulse,
    title: 'One team, one plan',
    description:
      'Hormones, weight, longevity, sexual health, aesthetics — coordinated under one roof for men and women alike.',
  },
];

export function Differentiator() {
  return (
    <div className="container">
      <div className="relative overflow-hidden rounded-[32px] bg-ink px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        {/* soft accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{ background: '#A86A45' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full opacity-10 blur-3xl"
          style={{ background: '#D8BFA6' }}
        />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-soft">
              What sets us apart
            </span>
            <h2 className="mt-5 text-[32px] font-medium leading-[1.12] text-white sm:text-[44px] lg:text-[52px]">
              Telehealth, backed by an actual clinic.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
              Most "virtual care" is a questionnaire and a shipping label. We're
              a full concierge clinic in Chicago — real doctors, real exam rooms,
              real labs — with the convenience of telehealth layered on top. Care
              that meets you online <span className="text-white">and</span> in
              person.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={cn(
                  'group rounded-[20px] border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-accent/40 hover:bg-white/[0.07]'
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-accent/15 text-accent-soft transition-transform group-hover:scale-110">
                  <pillar.icon size={24} />
                </div>
                <h3 className="mt-5 text-[18px] font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/60">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
