'use client';

import { ServiceCardType } from '@/api/types';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  title: string;
  content: ServiceCardType[];
};

export function FeaturedServices({ title, content }: Props) {
  return (
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
          What we offer
        </span>
        <h2 className="mt-4 text-[32px] font-medium leading-[1.12] text-ink sm:text-[44px] lg:text-[50px]">
          {title || 'Featured Services'}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-taupe sm:text-[18px]">
          Concierge care for men and women — one team, one place, online and at
          our Chicago clinic.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {content.map((service, i) => (
          <ServiceCard key={service.link || service.name} service={service} index={i} />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: ServiceCardType;
  index: number;
}) {
  const href = service.link || '#';
  const points = (service.points || []).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-[24px] border border-sand bg-white shadow-[0_10px_40px_rgba(45,37,37,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_50px_rgba(168,106,69,0.16)]"
    >
      {/* Photo */}
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.name}
            width={640}
            height={480}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            priority={index === 0}
          />
        ) : (
          <div className="h-full w-full bg-sand" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <h3 className="text-[21px] font-semibold leading-tight text-ink transition-colors group-hover:text-accent-deep">
          {service.name}
        </h3>
        {service.description && (
          <p className="mt-2.5 text-[14.5px] leading-relaxed text-taupe">
            {service.description}
          </p>
        )}

        {points.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-deep">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="text-[14px] leading-snug text-ink/80">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        )}

        {service.ctaText && (
          <Link
            href={href}
            className={cn(
              'mt-6 inline-flex items-center gap-1.5 self-start text-[15px] font-semibold text-accent-deep transition-colors',
              'border-b-2 border-transparent hover:border-accent-deep'
            )}
          >
            {service.ctaText}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
