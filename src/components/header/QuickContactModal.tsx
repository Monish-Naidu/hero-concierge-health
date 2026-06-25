'use client';

import { cn } from '@/utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { User, Mail, Phone, X, CheckCircle2, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface QuickContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ACCENT = '#A86A45';

const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length > 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length > 3) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return digits;
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function QuickContactModal({
  isOpen,
  onClose,
}: QuickContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>(
    'idle'
  );
  const [error, setError] = useState<string | null>(null);

  // Lock body scroll while open.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset the form a moment after closing so it's fresh next time.
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setName('');
        setEmail('');
        setPhone('');
        setStatus('idle');
        setError(null);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const phoneDigits = phone.replace(/\D/g, '');

    if (!trimmedName) {
      setError('Please enter your name.');
      return;
    }
    if (!trimmedEmail && !phoneDigits) {
      setError('Add an email or phone number so we can reach you.');
      return;
    }
    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      setError('That email doesn’t look right.');
      return;
    }
    if (phoneDigits && phoneDigits.length < 10) {
      setError('Phone number needs at least 10 digits.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone: phoneDigits ? `+1${phoneDigits}` : '',
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Something went wrong.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('idle');
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Try again.'
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#2D2525]/70 backdrop-blur-[6px]" />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-10 w-full max-w-[480px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-[#2D2525] transition-colors hover:bg-black/10"
            >
              <X size={18} />
            </button>

            {/* Accent header band */}
            <div
              className="px-7 pb-6 pt-8 text-center text-white"
              style={{
                background:
                  'radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%), #A86A45',
              }}
            >
              <h2 className="text-[26px] font-bold leading-tight [text-shadow:1px_1px_8px_rgba(0,0,0,0.2)] sm:text-[30px]">
                {status === 'success' ? "You're all set!" : "Let's talk"}
              </h2>
              <p className="mt-1.5 text-[14px] font-medium text-white/90 sm:text-[15px]">
                {status === 'success'
                  ? "We've got your details."
                  : "Leave your details and we'll get right back to you."}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center px-7 py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${ACCENT}22`, color: ACCENT }}
                  >
                    <CheckCircle2 size={36} />
                  </motion.div>
                  <p className="text-[17px] font-semibold text-[#2D2525]">
                    Thanks, {name.trim().split(' ')[0] || 'there'}!
                  </p>
                  <p className="mt-1.5 max-w-[320px] text-[14px] text-[#2D2525]/60">
                    One of our team will reach out shortly. Need us sooner? Call{' '}
                    <a
                      href="tel:+13124654653"
                      className="font-semibold"
                      style={{ color: ACCENT }}
                    >
                      (312) 465-4653
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 rounded-[40px] px-8 py-3 text-[16px] font-bold text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 px-7 py-7"
                >
                  <Field
                    icon={<User size={18} />}
                    label="Name"
                    required
                  >
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      autoFocus
                      className="w-full bg-transparent text-[15px] font-medium text-[#2D2525] outline-none placeholder:text-[#2D2525]/35"
                    />
                  </Field>

                  <Field icon={<Mail size={18} />} label="Email">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@email.com"
                      className="w-full bg-transparent text-[15px] font-medium text-[#2D2525] outline-none placeholder:text-[#2D2525]/35"
                    />
                  </Field>

                  <Field icon={<Phone size={18} />} label="Phone">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(formatPhoneNumber(e.target.value))
                      }
                      placeholder="(312) 555-0123"
                      className="w-full bg-transparent text-[15px] font-medium text-[#2D2525] outline-none placeholder:text-[#2D2525]/35"
                    />
                  </Field>

                  <p className="text-center text-[12.5px] text-[#2D2525]/45">
                    Just your name and an email{' '}
                    <span className="font-semibold">or</span> phone — that's all
                    we need.
                  </p>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="rounded-[12px] border border-red-200 bg-red-50 px-3 py-2 text-center text-[13px] font-medium text-red-600"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-[40px] py-4 text-[17px] font-bold text-white shadow-[0_10px_30px_rgba(168,106,69,0.4)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-80"
                    style={{
                      background:
                        'radial-gradient(163.33% 163.33% at 50% 100%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 100%, rgba(255, 255, 255, 0) 100%), #A86A45',
                      backgroundBlendMode: 'overlay, normal',
                    }}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <span className="relative z-10">Get a Callback</span>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  icon,
  label,
  required,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        'flex items-center gap-3 rounded-[14px] border-2 border-[#EAEFEC] bg-[#F5F8F6] px-4 py-3.5 transition-colors focus-within:border-[#A86A45] focus-within:bg-white'
      )}
    >
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#A86A45]/15 text-[#A86A45]">
        {icon}
      </span>
      <span className="flex flex-1 flex-col">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D2525]/45">
          {label}
          {required && <span className="text-[#A86A45]"> *</span>}
        </span>
        {children}
      </span>
    </label>
  );
}
