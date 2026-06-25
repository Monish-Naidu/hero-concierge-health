"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Phone, Copy, CheckCircle2, Clock, Mail } from "lucide-react";
import { GET_WEBSITES_CONFIG, GET_BOOKING_CONFIG } from "@/plugins/booking-modal/api/queries";
import { useBookingPhone } from "../hooks/useBookingPhone";
import type { WebsiteConfig } from "../api/types";
import { BookingStep } from "../types";

interface GetWebsiteConfigData {
    pluginsConfig?: {
        plugins: Array<{
            config: WebsiteConfig;
        }>;
    };
}

interface BookingConfigData {
    pluginsConfig?: {
        plugins?: Array<{
            config?: {
                defaultPhoneNumber?: string;
            };
        }>;
    };
}

interface CallProps {
    onChooseAnotherTime: () => void;
    currentStep?: BookingStep;
    isTransitioning?: boolean;
    isNextDisabled?: boolean;
    errorMsg?: string | null;
    onNext?: () => void;
    onBack?: () => void;
    isLoadingDateTime?: boolean;
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

export function Call({ onChooseAnotherTime }: CallProps) {
    const [copied, setCopied] = React.useState(false);
    
    // Get phone number from cookies/API hook
    const { phoneNumber: cachedPhoneNumber, isLoading: isPhoneLoading } = useBookingPhone();
    
    // Make a request to the API to get WebsiteConfig (for email and other data)
    const { data: websiteData, error: websiteError } = useQuery<GetWebsiteConfigData>(GET_WEBSITES_CONFIG, {
        fetchPolicy: "cache-first",
        errorPolicy: "all",
    });

    // Make a request to get booking config for defaultPhoneNumber (fallback)
    const { data: bookingData, error: bookingError } = useQuery<BookingConfigData>(GET_BOOKING_CONFIG, {
        fetchPolicy: "cache-first",
        errorPolicy: "all",
    });

    // Get phone number: prioritize cached phone, then API, then booking config
    const rawPhoneNumber =
        cachedPhoneNumber ||
        websiteData?.pluginsConfig?.plugins?.[0]?.config?.phoneNumber ||
        bookingData?.pluginsConfig?.plugins?.[0]?.config?.defaultPhoneNumber ||
        null;
    const phoneNumber = rawPhoneNumber ? formatPhoneNumber(rawPhoneNumber) : null;
    
    // Get email from website config if available
    const email = websiteData?.pluginsConfig?.plugins?.[0]?.config?.email || null;

    const handleCopyPhoneNumber = () => {
        if (!phoneNumber) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(phoneNumber)
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative mx-auto max-w-[600px] space-y-8"
        >
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                className="relative text-center"
            >
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                        className="h-32 w-32 rounded-full bg-gradient-to-br from-gradientFromBooking/10 to-gradientToBooking/5 blur-3xl"
                    />
                </div>
                
                <div className="relative flex items-center justify-center gap-3 mb-3">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gradientFromBooking to-gradientToBooking shadow-lg shadow-gradientFromBooking/30"
                    >
                        <Phone className="h-6 w-6 text-white" />
                    </motion.div>
                    <h2 className="bg-gradient-to-r from-textColorMain via-gradientFromBooking to-textColorMain bg-clip-text text-[35px] font-bold text-transparent lg:text-[45px]">
                        Please Call the Clinic
                    </h2>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="text-center text-[16px] font-medium text-textColorSelectText lg:text-[18px]"
                >
                    It looks like your chosen time is too soon for an online booking.
                    Please call us directly or choose a different time.
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                className="relative space-y-4"
            >
                {/* Main Phone Number Card */}
                <div className="mx-auto max-w-[500px] rounded-xl bg-gradient-to-r from-gradientFromBooking/10 to-gradientToBooking/5 border border-gradientFromBooking/20 p-6 shadow-lg">
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gradientFromBooking to-gradientToBooking text-white shadow-md"
                        >
                            <Phone className="h-8 w-8" />
                        </motion.div>
                        
                        <div className="flex flex-col items-center gap-3 w-full">
                            <p className="text-sm font-semibold text-textColorSelectText uppercase tracking-wider">
                                Call Us Now
                            </p>
                            {phoneNumber ? (
                                <>
                                    <a
                                        href={`tel:${phoneNumber.replace(/[^\d+]/g, "")}`}
                                        onClick={handleCopyPhoneNumber}
                                        className="group relative flex items-center justify-center gap-3 rounded-lg px-6 py-4 w-full text-[22px] font-bold text-textColorMain transition-all duration-300 hover:bg-gradientFromBooking/10 hover:scale-[1.02] active:scale-95 bg-white/50 border border-gradientFromBooking/20"
                                    >
                                        <span className="bg-gradient-to-r from-gradientFromBooking to-gradientToBooking bg-clip-text text-transparent">
                                            {phoneNumber}
                                        </span>
                                        <motion.div
                                            animate={{ 
                                                scale: copied ? [1, 1.2, 1] : 1,
                                                rotate: copied ? [0, 10, -10, 0] : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradientFromBooking/10 text-gradientFromBooking transition-colors group-hover:bg-gradientFromBooking/20"
                                        >
                                            {copied ? (
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </motion.div>
                                    </a>
                                    {copied && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="text-xs text-green-500 font-medium"
                                        >
                                            Copied to clipboard!
                                        </motion.p>
                                    )}
                                    <p className="text-xs text-textColorSelectText text-center mt-1">
                                        Tap to call or copy the number
                                    </p>
                                </>
                            ) : (
                                <div className="group relative flex items-center justify-center gap-3 rounded-lg px-6 py-4 w-full text-[22px] font-bold text-textColorMain bg-white/50 border border-gradientFromBooking/20">
                                    <span className="bg-gradient-to-r from-gradientFromBooking to-gradientToBooking bg-clip-text text-transparent">
                                        Please Call Us
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Additional Contact Information */}
                {email && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="mx-auto max-w-[500px] rounded-xl bg-sectionColor/50 border border-gradientFromBooking/10 p-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradientFromBooking/10 text-gradientFromBooking">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-textColorSelectText uppercase tracking-wider mb-0.5">Email</p>
                                <a 
                                    href={`mailto:${email}`}
                                    className="text-sm font-medium text-textColorMain hover:text-gradientFromBooking transition-colors break-all"
                                >
                                    {email}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="mx-auto max-w-[500px] rounded-xl bg-sectionColor/50 border border-gradientFromBooking/10 p-4"
            >
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradientFromBooking/10 text-gradientFromBooking"
                    >
                        <Clock className="h-5 w-5" />
                    </motion.div>
                    <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-semibold text-textColorMain">
                            Need a different time?
                        </p>
                        <p className="text-xs text-textColorSelectText">
                            You can go back and select another available time slot
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
