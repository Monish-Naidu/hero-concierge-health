'use client';

import { CallbackButton } from '@/components/ui/CallbackButton';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import {
  Building2,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -60px 0px' },
};

const IN_CLINIC = [
  'In-person physician visits and exams',
  'On-site lab draws and diagnostics',
  'In-clinic treatments and aesthetics',
  'A welcoming Lakeview space built for unhurried care',
];

const ANYWHERE = [
  'Telehealth visits with your physician',
  'Secure messaging with your care team',
  'Prescriptions and refills handled online',
  'Follow-ups and check-ins from anywhere',
];

export default function ClinicPage() {
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
              A real clinic. Real doctors. Plus telehealth.
            </span>
            <h1 className="mt-4 text-[34px] font-medium leading-[1.12] text-ink sm:text-[48px] lg:text-[58px]">
              Telehealth, anchored by a real Chicago clinic.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-taupe sm:text-[18px]">
              Most virtual care is an app and a shipping label. We&apos;re
              different — a full clinic in Lakeview, staffed by board-certified
              doctors, with telehealth layered on top. Get the convenience of
              online care without giving up the depth of an in-person team.
            </p>
            <div className="mt-9 flex justify-center">
              <CallbackButton label="Book a Visit" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two ways to get care */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
              How You&apos;re Seen
            </span>
            <h2 className="mt-4 text-[28px] font-medium leading-[1.15] text-ink sm:text-[40px]">
              Two ways to get care.
            </h2>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-2">
            <CareCard
              icon={Building2}
              eyebrow="In the clinic"
              title="See us in person"
              description="Visit our Lakeview clinic at 1416 W Belmont Ave for exams, labs and treatments — the parts of care that are simply better face to face."
              items={IN_CLINIC}
            />
            <CareCard
              icon={Globe}
              eyebrow="From anywhere"
              title="Care that comes to you"
              description="Connect with your care team online for visits, messaging, prescriptions and follow-ups — without taking time off or leaving home."
              items={ANYWHERE}
            />
          </div>
        </div>
      </section>

      {/* Clinic info */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
                Visit Us
              </span>
              <h2 className="mt-4 text-[28px] font-medium leading-[1.15] text-ink sm:text-[40px]">
                Our Chicago clinic.
              </h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-taupe sm:text-[17px]">
                Located in the Lakeview neighborhood, our clinic is designed to
                feel calm and unhurried — a place where care actually has room to
                breathe.
              </p>

              <div className="mt-8 space-y-5">
                <InfoRow icon={MapPin} label="Address">
                  1416 W Belmont Ave, Chicago, IL 60657
                  <span className="block text-taupe">Lakeview neighborhood</span>
                </InfoRow>
                <InfoRow icon={Clock} label="Hours">
                  Mon–Fri 9:00 AM – 6:00 PM
                  <span className="block text-taupe">
                    Saturday by appointment
                  </span>
                  {/* TODO: confirm real clinic hours with client */}
                </InfoRow>
                <InfoRow icon={Phone} label="Phone">
                  <a
                    href="tel:+13124654653"
                    className="transition-colors hover:text-accent-deep"
                  >
                    +1 (312) 465-4653
                  </a>
                </InfoRow>
                <InfoRow icon={Mail} label="Email">
                  <a
                    href="mailto:info@heromenshealth.com"
                    className="transition-colors hover:text-accent-deep"
                  >
                    info@heromenshealth.com
                  </a>
                </InfoRow>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="overflow-hidden rounded-[32px] border border-sand shadow-[0_12px_40px_rgba(45,37,37,0.08)]"
            >
              <iframe
                title="Hero Concierge Health clinic location map"
                src="https://www.google.com/maps?q=1416+W+Belmont+Ave+Chicago+IL+60657&output=embed"
                className="h-[340px] w-full border-0 sm:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </motion.div>
          </div>

          {/* Clinic photo placeholders */}
          {/* TODO: replace with real clinic interior photos */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex aspect-[4/3] items-center justify-center rounded-[24px] bg-sand"
              >
                <span className="text-[14px] font-medium text-taupe">
                  Clinic photo coming soon
                </span>
              </motion.div>
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
              Come See Us
            </span>
            <h2 className="mx-auto mt-4 max-w-2xl text-[28px] font-medium leading-[1.15] sm:text-[40px]">
              Care you can actually walk into.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
              Book a visit at our Chicago clinic — or start online and come in
              when it makes sense. Either way, your team is ready.
            </p>
            <div className="mt-9 flex justify-center">
              <CallbackButton label="Book a Visit" variant="light" />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function CareCard({
  icon: Icon,
  eyebrow,
  title,
  description,
  items,
}: {
  icon: typeof Building2;
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.5 }}
      className="flex flex-col rounded-[32px] border border-sand bg-cream p-8 shadow-[0_8px_30px_rgba(45,37,37,0.05)] lg:p-10"
    >
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-accent/12 text-accent-deep">
        <Icon size={26} />
      </div>
      <span className="mt-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-accent-deep">
        {eyebrow}
      </span>
      <h3 className="mt-2 text-[22px] font-semibold text-ink sm:text-[26px]">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-taupe">
        {description}
      </p>
      <ul className="mt-7 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
            <span className="text-[14.5px] leading-snug text-ink/80">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span
        className={cn(
          'flex h-11 w-11 flex-none items-center justify-center rounded-full bg-accent/12 text-accent-deep',
        )}
      >
        <Icon size={20} />
      </span>
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-accent-deep">
          {label}
        </p>
        <p className="mt-1 text-[15.5px] leading-relaxed text-ink">
          {children}
        </p>
      </div>
    </div>
  );
}
