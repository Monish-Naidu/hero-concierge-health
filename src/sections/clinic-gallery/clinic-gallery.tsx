'use client';

import { CallbackButton } from '@/components/ui/CallbackButton';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { Building2, Stethoscope, MapPin, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

/**
 * "Visit our Chicago clinic" — emphasizes the real, in-person physical clinic.
 * The photo tiles are placeholders; swap each `bg`/caption for a real photo
 * (clinic exterior, exam room, Lakeview street) when available.
 * TODO: replace PhotoTile placeholders with real clinic photography.
 */
const TILES = [
  { icon: Building2, label: 'Our Lakeview clinic', hint: 'Exterior / reception photo' },
  { icon: Stethoscope, label: 'Real exam rooms', hint: 'Treatment room photo' },
  { icon: MapPin, label: 'In the neighborhood', hint: 'Lakeview street photo' },
];

export function ClinicGallery() {
  return (
    <div className="container">
      <div className="overflow-hidden rounded-[32px] bg-cream">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: message + address */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/12 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-accent-deep">
              <MapPin size={15} /> In person, in Chicago
            </span>
            <h2 className="mt-5 text-[30px] font-medium leading-[1.12] text-ink sm:text-[40px] lg:text-[46px]">
              A real clinic in the heart of Lakeview.
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-taupe sm:text-[17px]">
              We’re not a faceless app. Come in for your labs, exams, and
              treatments at our Chicago clinic — or stay home and we’ll handle it
              by telehealth. Either way, there’s an actual place, and an actual
              team, behind your care.
            </p>

            <div className="mt-7 flex items-start gap-3 rounded-[16px] border border-sand bg-white/60 p-4">
              <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-deep">
                <MapPin size={20} />
              </span>
              <div>
                <p className="text-[15px] font-bold text-ink">1416 W Belmont Ave</p>
                <p className="text-[14px] text-taupe">Lakeview · Chicago, IL 60657</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <CallbackButton label="Book a Visit" />
              <Link
                href="/clinic"
                className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink underline-offset-4 transition-colors hover:text-accent-deep hover:underline"
              >
                See the clinic <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right: photo tiles (placeholders) */}
          <div className="grid grid-cols-2 gap-3 bg-sand/40 p-5 sm:gap-4 sm:p-8 lg:p-10">
            <PhotoTile {...TILES[0]} className="col-span-2 aspect-[16/10]" />
            <PhotoTile {...TILES[1]} className="aspect-square" />
            <PhotoTile {...TILES[2]} className="aspect-square" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotoTile({
  icon: Icon,
  label,
  hint,
  className,
}: {
  icon: LucideIcon;
  label: string;
  hint: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.4 }}
      className={cn(
        'flex flex-col items-center justify-center rounded-[20px] border border-dashed border-accent/35 bg-gradient-to-br from-cream to-sand/70 p-4 text-center',
        className
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent-deep">
        <Icon size={22} />
      </span>
      <p className="mt-3 text-[14px] font-semibold text-ink">{label}</p>
      <p className="mt-0.5 text-[12px] text-taupe">{hint}</p>
    </motion.div>
  );
}
