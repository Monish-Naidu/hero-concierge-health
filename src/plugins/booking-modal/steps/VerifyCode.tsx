"use client";

import { Input } from "@/plugins/booking-modal/ui/input";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Mail, RotateCcw } from "lucide-react";
import { BookingStep } from "@/plugins/booking-modal/types";

interface VerifyCodeProps {
  codeValue: string; // <-- Code stored in parent component
  onCodeChange: (value: string) => void; // <-- Callback for new value
  currentStep: BookingStep;
  isTransitioning: boolean;
  isNextDisabled: boolean;
  errorMsg: string | null;
  onNext: () => void;
  onBack: () => void;
  isLoadingDateTime?: boolean;
}

export default function VerifyCode({ 
  codeValue, 
  onCodeChange,
  currentStep,
  isTransitioning,
  isNextDisabled,
  errorMsg,
  onNext,
  onBack,
  isLoadingDateTime = false,
}: VerifyCodeProps) {
  const [codeArray, setCodeArray] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(59);
  const [canResend, setCanResend] = useState(false);

  // On initial render, if codeValue already has 4 characters
  useEffect(() => {
    if (codeValue.length === 4) {
      setCodeArray(codeValue.split(""));
    }
  }, [codeValue]);

  // Whenever codeArray changes, trigger onCodeChange
  useEffect(() => {
    onCodeChange(codeArray.join(""));
  }, [codeArray, onCodeChange]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...codeArray];
      newCode[index] = value;
      setCodeArray(newCode);
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !codeArray[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Resend code logic
  const handleResendCode = () => {
    setCountdown(59);
    setCanResend(false);
    // Your code resend logic here
  };

  const formattedCountdown = countdown < 10 ? `0:0${countdown}` : `0:${countdown}`;

  return (
      <div className="flex flex-col min-h-0 w-full">
          <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-8 flex-1"
          >
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="relative text-center"
        >
          <div className="relative flex items-center justify-center gap-3 mb-3">
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gradientFromBooking to-gradientToBooking shadow-lg shadow-gradientFromBooking/30"
            >
              <Shield className="h-6 w-6 text-white" />
            </motion.div>
            <h2 className="bg-gradient-to-r from-textColorMain via-gradientFromBooking to-textColorMain bg-clip-text text-[35px] font-bold text-transparent lg:text-[45px]">
              Confirm the SMS Code
            </h2>
          </div>
          
          <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-center text-[16px] font-medium text-textColorSelectText lg:text-[18px]"
          >
            Please enter the verification code sent to your phone
          </motion.p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="flex w-full justify-center gap-4"
        >
          {codeArray.map((digit, index) => (
              <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.34, 1.56, 0.64, 1], 
                    delay: 0.3 + index * 0.1 
                  }}
                  className="relative"
              >
                <Input
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    className="h-16 w-16 text-textColorMain text-center text-2xl font-bold rounded-xl border-2 border-borderBooking bg-gradient-to-br from-white to-[#F5F8FF] transition-all duration-200 hover:border-gradientFromBooking hover:bg-white hover:shadow-md focus:border-gradientFromBooking focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-gradientFromBooking/20"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                />
                {digit && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-gradientFromBooking to-gradientToBooking"
                    >
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                )}
              </motion.div>
          ))}
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.7 }}
            className="text-center"
        >
          <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-borderBooking bg-gradient-to-r from-white to-[#F5F8FF] px-6 py-3 text-sm font-medium text-textColorSelectText transition-all duration-200 hover:border-gradientFromBooking hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleResendCode}
              disabled={!canResend}
          >
            <RotateCcw className={`h-4 w-4 text-gradientFromBooking transition-transform ${canResend ? 'animate-spin' : ''}`} />
            <span>
              {canResend ? "Resend code" : "Resend code in"}
              {!canResend && (
                  <span className="ml-1 font-semibold text-gradientFromBooking">{formattedCountdown}</span>
              )}
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
      </div>
  );
}
