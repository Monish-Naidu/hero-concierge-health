"use client";

import { Check, Sparkles, Calendar, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { BookingStep } from "@/plugins/booking-modal/types";

interface SuccessProps {
    currentStep: BookingStep;
    isTransitioning: boolean;
    isNextDisabled: boolean;
    errorMsg: string | null;
    onNext: () => void;
    onBack: () => void;
    isLoadingDateTime?: boolean;
}

export default function Success({
    currentStep,
    isTransitioning,
    isNextDisabled,
    errorMsg,
    onNext,
    onBack,
    isLoadingDateTime = false,
}: SuccessProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8 text-center"
        >
            <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                    className="h-64 w-64 rounded-full bg-gradient-to-br from-gradientFromBooking/20 to-gradientToBooking/10 blur-3xl"
                />
            </div>

            <motion.div
                className="relative flex justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                    duration: 0.8, 
                    ease: [0.34, 1.56, 0.64, 1], 
                    delay: 0.1 
                }}
            >
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="h-32 w-32 rounded-full border-4 border-gradientFromBooking/20 animate-pulse" />
                </motion.div>
                
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="h-24 w-24 rounded-full border-4 border-gradientFromBooking/30" />
                </motion.div>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gradientFromBooking to-gradientToBooking shadow-2xl shadow-gradientFromBooking/50"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        <Check className="h-10 w-10 text-white stroke-[3]" />
                    </motion.div>
                    
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 0] }}
                        transition={{ duration: 1, delay: 0.8, repeat: Infinity, repeatDelay: 2 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"
                    />
                </motion.div>

                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    className="absolute top-5 -right-2"
                >
                    <motion.div
                        animate={{ 
                            y: [0, -10, 0],
                            rotate: [0, 10, 0]
                        }}
                        transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gradientFromBooking to-gradientToBooking shadow-lg"
                    >
                        <Sparkles className="h-5 w-5 text-white" />
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1 }}
                    className="absolute -bottom-2 -left-2"
                >
                    <motion.div
                        animate={{ 
                            y: [0, 10, 0],
                            rotate: [0, -10, 0]
                        }}
                        transition={{ 
                            duration: 2.5, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gradientToBooking to-gradientFromBooking shadow-lg"
                    >
                        <Heart className="h-5 w-5 text-white fill-white" />
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
                className="space-y-4"
            >
                <h2 className="bg-gradient-to-r from-textColorMain via-gradientFromBooking to-textColorMain bg-clip-text text-[35px] font-bold text-transparent lg:text-[45px]">
                    Thank You!
                </h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-[20px] font-semibold text-textColorSelectText lg:text-[24px]"
                >
                    Your Appointment is Confirmed
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 1 }}
                className="mx-auto max-w-md rounded-xl border border-gradientFromBooking/20 bg-gradient-to-br from-gradientFromBooking/5 to-gradientToBooking/5 p-6 shadow-sm"
            >
                <div className="flex items-center justify-center gap-3">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gradientFromBooking to-gradientToBooking"
                    >
                        <Calendar className="h-5 w-5 text-white" />
                    </motion.div>
                    <p className="text-sm font-medium text-textColorSelectText">
                        You will receive a confirmation email shortly
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}
