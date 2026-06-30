'use client';

import { ServiceCardType } from '@/api/types';
import { CallbackButton } from '@/components/ui/CallbackButton';
import { cn } from '@/utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const EXPLORE = [
  { name: 'Home', href: '/' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'About', href: '/about' },
  { name: 'Membership', href: '/membership' },
  { name: 'The Clinic', href: '/clinic' },
];

export function SiteMenu({ services = [] }: { services?: ServiceCardType[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Portal target is only available on the client.
  useEffect(() => setMounted(true), []);

  // Lock scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="group flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        <Menu size={20} />
        <span className="hidden sm:inline">Menu</span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[999] overflow-y-auto bg-cream"
              >
            <div className="container mx-auto flex min-h-full flex-col px-6 py-6 lg:px-10">
              {/* Top row */}
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-taupe">
                  Menu
                </span>
                <div className="flex items-center gap-3">
                  <CallbackButton label="Contact Hero" />
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Links */}
              <div className="mt-10 grid flex-1 grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[1.4fr_1fr]">
                {/* Explore */}
                <motion.nav
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  onClick={() => setOpen(false)}
                  className="flex flex-col"
                >
                  <span className="mb-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-taupe">
                    Explore
                  </span>
                  {EXPLORE.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex w-fit items-center gap-3 py-2.5 text-[30px] font-medium leading-tight text-ink transition-colors hover:text-accent-deep sm:text-[38px]"
                    >
                      {item.name}
                      <ArrowRight
                        size={24}
                        className="-translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 text-accent-deep"
                      />
                    </Link>
                  ))}
                </motion.nav>

                {/* Services + contact column */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.12 }}
                  className="flex flex-col gap-8"
                >
                  {services.length > 0 && (
                    <div onClick={() => setOpen(false)}>
                      <span className="mb-3 block text-[13px] font-semibold uppercase tracking-[0.18em] text-taupe">
                        Services
                      </span>
                      <div className="flex flex-col">
                        {services.map((s) => (
                          <Link
                            key={s.link || s.name}
                            href={s.link || '#'}
                            className="w-fit py-1.5 text-[17px] font-medium text-ink/80 transition-colors hover:text-accent-deep"
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="mb-3 block text-[13px] font-semibold uppercase tracking-[0.18em] text-taupe">
                      Get in touch
                    </span>
                    <div className="flex flex-col gap-2">
                      <a
                        href="tel:+13124654653"
                        className="flex items-center gap-3 text-[16px] font-medium text-ink transition-colors hover:text-accent-deep"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent-deep">
                          <Phone size={16} />
                        </span>
                        +1 (312) 465-4653
                      </a>
                      <a
                        href="sms:+13124654653"
                        className="flex items-center gap-3 text-[16px] font-medium text-ink transition-colors hover:text-accent-deep"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent-deep">
                          <MessageSquare size={16} />
                        </span>
                        Text us
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Promo card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[24px] bg-ink p-7 sm:flex-row sm:items-center lg:mt-14"
              >
                <div>
                  <p className="text-[20px] font-semibold text-white sm:text-[24px]">
                    New patients: a complimentary lab panel
                  </p>
                  <p className="mt-1 text-[14px] text-white/60">
                    Concierge care for men and women — online and at our Chicago clinic.
                  </p>
                </div>
                <CallbackButton label="Contact Hero" variant="light" />
              </motion.div>
            </div>
          </motion.div>
        )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
