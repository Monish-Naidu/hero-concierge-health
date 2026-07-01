'use client';

import { CallbackButton } from '@/components/ui/CallbackButton';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * "Visit our Chicago clinic" — emphasizes the real, in-person physical clinic.
 * A short interior tour video (portrait) anchors the panel, flanked by the
 * clinic's own photos (Lakeview, 1416 W Belmont Ave).
 */
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

          {/* Right: interior tour video + real clinic photos */}
          <div className="grid grid-cols-2 gap-3 bg-sand/40 p-5 sm:gap-4 sm:p-8 lg:p-10">
            {/* Tour video — spans two rows on the left */}
            <VideoTile
              src="/videos/clinic-tour.mp4"
              poster="/videos/clinic-tour-poster.webp"
              caption="Step inside"
              className="row-span-2"
            />
            <PhotoTile
              src="/images/clinic/clinic-interior.webp"
              caption="Inside our clinic"
              priority
            />
            <PhotoTile
              src="/images/clinic/clinic-recovery.webp"
              caption="Recovery & training"
            />
            <PhotoTile
              src="/images/clinic/clinic-exterior-day.webp"
              caption="1416 W Belmont Ave"
            />
            <PhotoTile
              src="/images/clinic/clinic-exterior-dusk.webp"
              caption="In the heart of Lakeview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const tileBase =
  'group relative overflow-hidden rounded-[20px] border border-sand shadow-[0_8px_24px_rgba(45,37,37,0.08)]';
const captionCls =
  'absolute inset-x-3 bottom-3 text-[12px] font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] sm:text-[13px]';

function PhotoTile({
  src,
  caption,
  priority,
}: {
  src: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.4 }}
      className={cn(tileBase, 'aspect-square')}
    >
      <Image
        src={src}
        alt={caption}
        fill
        sizes="(max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-transparent" />
      <span className={captionCls}>{caption}</span>
    </motion.div>
  );
}

function VideoTile({
  src,
  poster,
  caption,
  className,
}: {
  src: string;
  poster: string;
  caption: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.4 }}
      className={cn(tileBase, className)}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-transparent" />
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
        <Play size={11} className="fill-white" /> Clinic tour
      </span>
      <span className={captionCls}>{caption}</span>
    </motion.div>
  );
}
