'use client';

import { CallbackButton } from '@/components/ui/CallbackButton';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import {
  HeartPulse,
  LineChart,
  ShieldCheck,
  Users,
} from 'lucide-react';
import Image from 'next/image';

const VALUES = [
  {
    icon: HeartPulse,
    title: 'Whole-person care',
    description:
      'We look at the full picture — hormones, metabolism, sleep, stress and longevity — not a single symptom in isolation.',
  },
  {
    icon: LineChart,
    title: 'Data-driven medicine',
    description:
      'Comprehensive labs and clear metrics guide every plan, so decisions are grounded in your biology rather than guesswork.',
  },
  {
    icon: ShieldCheck,
    title: 'Access without compromise',
    description:
      'Telehealth convenience layered on a real Chicago clinic. See us online or in person — without sacrificing depth of care.',
  },
  {
    icon: Users,
    title: 'One coordinated team',
    description:
      'Your physician, care coordinator and clinical team work together, so nothing falls through the cracks between visits.',
  },
];

const TEAM = [
  {
    image: '/images/doctors/doc-1.png',
    name: 'Dr. [Name]',
    role: 'Medical Director · Internal Medicine',
    bio: 'Focused on hormone optimization and preventive, longevity-minded care for men and women.',
  },
  {
    image: '/images/doctors/doc-2.png',
    name: 'Dr. [Name]',
    role: 'Physician · Metabolic & Weight Health',
    bio: 'Helps members build sustainable, medically supervised weight and metabolic plans.',
  },
  {
    image: '/images/doctors/doc-3.png',
    name: 'Dr. [Name]',
    role: 'Physician · Hormone & Sexual Health',
    bio: 'Specializes in hormone balance and sexual wellness across every stage of life.',
  },
  {
    image: '/images/doctors/doc-4.webp',
    name: 'Dr. [Name]',
    role: 'Clinician · Aesthetics & Wellness',
    bio: 'Brings a refined, conservative approach to aesthetics and in-clinic treatments.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -60px 0px' },
};

export default function AboutPage() {
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
              About Us
            </span>
            <h1 className="mt-4 text-[34px] font-medium leading-[1.12] text-ink sm:text-[48px] lg:text-[58px]">
              Modern concierge medicine, built around you.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-taupe sm:text-[18px]">
              Hero Concierge Health exists to make exceptional care feel
              effortless. We combine the access of telehealth with the depth of
              a real Chicago clinic — so men and women alike can get attentive,
              personalized medicine that fits real life.
            </p>
            <div className="mt-9 flex justify-center">
              <CallbackButton label="Become a Member" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
                Our Story
              </span>
              <h2 className="mt-4 text-[28px] font-medium leading-[1.15] text-ink sm:text-[38px]">
                Care that should have existed all along.
              </h2>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-7 space-y-5 text-[16px] leading-relaxed text-taupe sm:text-[17px]"
            >
              <p>
                Most people experience two extremes of healthcare: rushed,
                fifteen-minute visits where nobody seems to know your history, or
                app-only services that ship a prescription and call it care.
                Neither felt like enough. So we built something in between.
              </p>
              <p>
                Hero Concierge Health started in Chicago with a simple idea — that
                truly personal medicine should be both accessible and deep. A real
                clinic in Lakeview, staffed by board-certified doctors, paired with
                telehealth that lets you reach your team from anywhere.
              </p>
              <p>
                Today we care for men and women across hormone optimization, weight
                and metabolic health, sexual health, longevity and aesthetics — all
                coordinated under one membership, with one team that actually knows
                you. {/* TODO: replace with real founding story + milestones */}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
              What We Believe
            </span>
            <h2 className="mt-4 text-[28px] font-medium leading-[1.15] text-ink sm:text-[40px]">
              The principles behind every plan.
            </h2>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-[24px] border border-sand bg-white p-7 shadow-[0_8px_30px_rgba(45,37,37,0.05)]"
              >
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-accent/12 text-accent-deep">
                  <value.icon size={24} />
                </div>
                <h3 className="mt-6 text-[19px] font-semibold text-ink">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-taupe">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
              Our Team
            </span>
            <h2 className="mt-4 text-[28px] font-medium leading-[1.15] text-ink sm:text-[40px]">
              Real, board-certified doctors.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-taupe sm:text-[18px]">
              The people behind your care — a coordinated team you can actually
              get to know.
            </p>
          </motion.div>

          {/* TODO: replace with real team photos + bios */}
          <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="overflow-hidden rounded-[24px] border border-sand bg-cream shadow-[0_8px_30px_rgba(45,37,37,0.05)]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-[18px] font-semibold text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.1em] text-accent-deep">
                    {member.role}
                  </p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-taupe">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <CtaBand
        eyebrow="Get Started"
        title="Ready to feel like yourself again?"
        subtitle="Tell us a little about your goals and our team will reach out to walk you through membership."
        buttonLabel="Become a Member"
      />
    </main>
  );
}

function CtaBand({
  eyebrow,
  title,
  subtitle,
  buttonLabel,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
}) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className={cn(
            'mx-auto max-w-4xl rounded-[32px] bg-ink px-8 py-16 text-center text-white sm:px-14 lg:py-20',
          )}
        >
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-soft">
            {eyebrow}
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl text-[28px] font-medium leading-[1.15] sm:text-[40px]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
            {subtitle}
          </p>
          <div className="mt-9 flex justify-center">
            <CallbackButton label={buttonLabel} variant="light" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
