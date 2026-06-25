"use client";

import { Pencil, CheckCircle2, Shield } from "lucide-react";
import { BookingData } from "../types";
import { motion } from "framer-motion";
import { BookingStep } from "../types";

/**
 * Type of step
 */
type StepType =
    | "service"
    | "datetime"
    | "information"
    | "confirm"
    | "verify"
    | "success";


interface ConfirmVisitProps {
  data: BookingData;
  setStep: (step: StepType) => void;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
  currentStep: BookingStep;
  isTransitioning: boolean;
  isNextDisabled: boolean;
  errorMsg: string | null;
  onNext: () => void;
  onBack: () => void;
  isLoadingDateTime?: boolean;
}

export default function ConfirmVisit({ 
  data, 
  setStep,
  currentStep,
  isTransitioning,
  isNextDisabled,
  errorMsg,
  onNext,
  onBack,
  isLoadingDateTime = false,
}: ConfirmVisitProps) {

  // Data shown during "confirm" step
  const bookingDetails = [
    {
      label: "Category",
      value: data.category,
      step: "service" as StepType,
    },
    {
      label: "Service",
      value: data.service?.map((service) => service.name).join(", ") || "",
      step: "service" as StepType,
    },
    {
      label: "Date & Time",
      value: data.dates?.length
          ? data.dates
          .map((date) => new Date(date).toLocaleDateString("en-CA"))
          .join(", ") + (data.time ? ` ${data.time}` : "")
          : "",
      step: "datetime" as StepType,
    },
    {
      label: "Full Name",
      value: data.fullName,
      step: "information" as StepType,
    },
    {
      label: "Email",
      value: data.email,
      step: "information" as StepType,
    },
    {
      label: "Phone",
      value: data.phone,
      step: "information" as StepType,
    },
    {
      label: "Price",
      value: data.service
          ? `Price: $${data.service.reduce((total, item) => total + (item.price || 0), 0)}`
          : "Price: $0",
      step: "service" as StepType,
    },
  ];

  return (
      <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-8 w-full"
          layout
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
              <CheckCircle2 className="h-6 w-6 text-white" />
            </motion.div>
            <h2 className="bg-gradient-to-r from-textColorMain via-gradientFromBooking to-textColorMain bg-clip-text text-[35px] font-bold text-transparent lg:text-[45px]">
              Confirm your Visit
            </h2>
          </div>
          
          <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-center text-[16px] font-medium text-textColorSelectText lg:text-[18px]"
          >
            Review your information to secure your booking
          </motion.p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
            className="mx-auto max-w-[900px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookingDetails.map((detail, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.1 + index * 0.02 }}
                    className="group relative"
                >
                  <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 border-borderBooking bg-gradient-to-r from-white to-[#F5F8FF] p-4 shadow-sm transition-all duration-300 hover:border-gradientFromBooking hover:shadow-md hover:shadow-gradientFromBooking/20"
                      onClick={() => setStep(detail.step)}
                  >
                    <div className="flex flex-1 items-center gap-3 min-w-0">
                      <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 + index * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
                          className="flex h-10 w-10 shrink-0 items-center justify-center"
                      >
                        <CheckCircle2 className="h-5 w-5 text-gradientFromBooking" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-textColorSelectText mb-1">
                          {detail.label}
                        </p>
                        <p className="text-sm font-medium text-textColorMain truncate">
                          {detail.value || "Not specified"}
                        </p>
                      </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center text-gradientFromBooking transition-colors group-hover:text-gradientToBooking"
                    >
                      <Pencil className="h-4 w-4" />
                    </motion.div>
                  </motion.div>
                </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
            className="mx-auto max-w-[600px]"
        >
          <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="rounded-xl border border-gradientFromBooking/20 bg-gradient-to-br from-gradientFromBooking/5 to-gradientToBooking/5 p-6 shadow-sm"
          >
            <div className="flex items-start gap-3 mb-4">
              <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gradientFromBooking to-gradientToBooking"
              >
                <Shield className="h-5 w-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-textColorMain mb-2">
                  Terms & Privacy
                </h3>
                <p className="text-xs leading-relaxed text-textColorSelectText">
                  By clicking{" "}
                  <span className="font-bold text-gradientFromBooking">&quot;Book&quot;</span>,
                  you agree to our Terms & Conditions and Privacy Policy, including the processing of your personal data. You also consent to
                  receive SMS notifications, alerts, and occasional marketing communication
                  from our company. Message frequency varies, and message and data rates
                  may apply. You can reply STOP to unsubscribe at any time.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
  );
}
