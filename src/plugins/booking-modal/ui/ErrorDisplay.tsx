"use client";

import React from "react";
import { Phone, Copy, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useBookingPhone } from "../hooks/useBookingPhone";

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  variant?: "default" | "inline" | "minimal" | "fullscreen";
  showRetryButton?: boolean;
  phoneNumber?: string;
  title?: string;
}

function formatPhoneNumber(phone: string): string {
  // Delete everything except the numbers and plus sign
  const cleaned = phone.replace(/[^\d+]/g, "");
  // Remove the plus for calculations
  const digits = cleaned.replace("+", "");
  if (digits.length !== 11) {
    return phone; // if not 11 digits, return the original
  }
  return `+${digits[0]}(${digits.substring(1,4)}) ${digits.substring(4,7)}-${digits.substring(7)}`;
}

export function ErrorDisplay({ 
  message, 
  onRetry, 
  variant = "default",
  showRetryButton = true,
  phoneNumber: phoneNumberProp,
  title = "Connection Issue"
}: ErrorDisplayProps) {
  const [copied, setCopied] = React.useState(false);
  
  // Get phone number from hook (cookies/API) if not provided via props
  const { phoneNumber: phoneNumberFromHook } = useBookingPhone();
  
  // Use phone number from props first, then from hook, otherwise null
  const displayPhoneNumber = phoneNumberProp || phoneNumberFromHook || null;

  const handleCopyPhoneNumber = () => {
    if (!displayPhoneNumber) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(displayPhoneNumber)
        .then(() => {
          setCopied(true);
          toast.success("Phone number copied to clipboard!", {
            autoClose: 3000,
          });
          setTimeout(() => setCopied(false), 3000);
        })
        .catch((err) => {
          console.error("Failed to copy phone number: ", err);
          toast.error("Failed to copy phone number. Please try again.", {
            autoClose: 3000,
          });
        });
    } else {
      console.warn("Clipboard API is not supported in this environment.");
      alert("Clipboard API is not supported. Please copy manually.");
    }
  };
  if (variant === "inline") {
    return (
      <div className="relative overflow-hidden rounded-lg border-l-4 border-amber-400 bg-gradient-to-r from-amber-50/80 to-orange-50/50 p-4 backdrop-blur-sm">
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
                <svg
                  className="h-4 w-4 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-amber-900 leading-relaxed">
                {message}
              </p>
            </div>
          </div>
          {displayPhoneNumber ? (
            <div className="flex items-center gap-2 pl-9">
              <a
                href={`tel:${displayPhoneNumber.replace(/[^\d+]/g, "")}`}
                onClick={handleCopyPhoneNumber}
                className="group flex items-center gap-2 rounded-md px-3 py-1.5 bg-white/60 hover:bg-white/80 transition-colors text-sm font-semibold text-amber-900"
              >
                <Phone className="h-4 w-4 text-amber-600" />
                <span>{displayPhoneNumber}</span>
                {copied ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-amber-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                )}
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-9">
              <div className="flex items-center gap-2 rounded-md px-3 py-1.5 bg-white/60 text-sm font-semibold text-amber-900">
                <Phone className="h-4 w-4 text-amber-600" />
                <span>Please Call Us</span>
              </div>
            </div>
          )}
        </div>
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-100/20 via-transparent to-orange-100/20 pointer-events-none" />
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className="flex items-center gap-2.5 text-sm text-amber-700">
        <svg
          className="h-4 w-4 flex-shrink-0 text-amber-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    );
  }

  if (variant === "fullscreen") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex flex-col items-center justify-center w-full py-12"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          className="relative text-center mb-8"
        >
          <div className="relative flex items-center justify-center gap-3 mb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30"
            >
              <AlertTriangle className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="bg-gradient-to-r from-amber-900 via-amber-700 to-orange-900 bg-clip-text text-[35px] font-bold text-transparent lg:text-xl">
              {title}
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="text-center text-[16px] font-medium text-amber-800 lg:text-[18px] max-w-md mx-auto"
          >
            {message}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="relative w-full max-w-[500px] mx-auto"
        >
          <div className="rounded-xl bg-gradient-to-r from-amber-50/90 to-orange-50/60 border border-amber-200/50 p-6 shadow-lg">
            <div className="flex flex-col items-center gap-4 mb-6">
              <p className="text-sm font-semibold text-amber-800 mb-2">
                Call Us Instead
              </p>
              <div className="flex flex-col items-center gap-3 w-full">
                {displayPhoneNumber ? (
                  <>
                    <a
                      href={`tel:${displayPhoneNumber.replace(/[^\d+]/g, "")}`}
                      className="group flex items-center justify-center gap-2 rounded-lg px-6 py-3 bg-white border-2 border-amber-500 text-amber-700 font-bold text-xl shadow-md hover:bg-amber-50 transition-all hover:scale-105 active:scale-95 w-full"
                    >
                      <Phone className="h-6 w-6 text-amber-600" />
                      <span className="text-amber-900">{displayPhoneNumber}</span>
                    </a>
                    <button
                      onClick={handleCopyPhoneNumber}
                      className="flex items-center gap-2 text-sm text-amber-700 hover:text-amber-900 transition-colors"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-green-600 font-medium">Copied to clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy number</span>
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-lg px-6 py-3 bg-white border-2 border-amber-500 text-amber-700 font-bold text-xl shadow-md w-full">
                    <Phone className="h-6 w-6 text-amber-600" />
                    <span className="text-amber-900">Please Call Us</span>
                  </div>
                )}
              </div>
            </div>

            {showRetryButton && onRetry && (
              <button
                onClick={onRetry}
                className="w-full group relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg active:scale-95"
              >
                <span className="relative z-10">Try Again</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center rounded-xl border border-amber-200/50 bg-gradient-to-br from-amber-50/90 via-white to-orange-50/60 p-6 shadow-lg backdrop-blur-sm">
      {/* Animated background pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-amber-200/20 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-orange-200/20 blur-2xl" />
      </div>

      {/* Icon */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 shadow-md">
        <svg
          className="h-8 w-8 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>

      {/* Content */}
      <h3 className="mb-2 text-lg font-bold text-amber-900">
        Connection Issue
      </h3>
      <p className="mb-4 max-w-sm text-center text-sm leading-relaxed text-amber-800/90">
        {message}
      </p>

      {/* Phone Number */}
      <div className="mb-4 flex flex-col items-center gap-2">
        <p className="text-xs font-semibold text-amber-800 mb-1">
          Call Us Instead
        </p>
        {displayPhoneNumber ? (
          <>
            <a
              href={`tel:${displayPhoneNumber.replace(/[^\d+]/g, "")}`}
              onClick={handleCopyPhoneNumber}
              className="group flex items-center gap-2 rounded-lg px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-md hover:from-amber-600 hover:to-orange-600 transition-all hover:scale-105 active:scale-95"
            >
              <Phone className="h-4 w-4" />
              <span>{displayPhoneNumber}</span>
              {copied ? (
                <CheckCircle2 className="h-4 w-4 text-green-200" />
              ) : (
                <Copy className="h-4 w-4 opacity-80 group-hover:opacity-100 transition-opacity" />
              )}
            </a>
            {copied && (
              <p className="text-xs text-green-600 font-medium">
                Copied to clipboard!
              </p>
            )}
          </>
        ) : (
          <div className="flex items-center gap-2 rounded-lg px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-md">
            <Phone className="h-4 w-4" />
            <span>Please Call Us</span>
          </div>
        )}
      </div>

      {/* Retry button */}
      {showRetryButton && onRetry && (
        <button
          onClick={onRetry}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg active:scale-95"
        >
          <span className="relative z-10">Try Again</span>
          <div className="absolute inset-0 -z-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>
      )}
    </div>
  );
}

