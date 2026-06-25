"use client";

import React from "react";
import { Button } from "@/plugins/booking-modal/ui/button";
import { ErrorDisplay } from "@/plugins/booking-modal/ui/ErrorDisplay";
import { BookingStep } from "../types";
import { useQuery } from "@apollo/client";
import { GET_WEBSITES_CONFIG } from "@/plugins/booking-modal/api/queries";
import type { WebsiteConfig } from "../api/types";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface GetWebsiteConfigData {
    pluginsConfig?: {
        plugins: Array<{
            config: WebsiteConfig;
        }>;
    };
}

interface BookingModalFooterProps {
    currentStep: BookingStep;
    isTransitioning: boolean;
    isNextDisabled: boolean;
    errorMsg: string | null;
    onNext: () => void;
    onBack: () => void;
    isLoadingDateTime?: boolean;
}

export const BookingModalFooter: React.FC<BookingModalFooterProps> = ({
                                                                          currentStep,
                                                                          isTransitioning,
                                                                          isNextDisabled,
                                                                          errorMsg,
                                                                          onNext,
                                                                          onBack,
                                                                          isLoadingDateTime = false,
                                                                      }) => {
    const { data } = useQuery<GetWebsiteConfigData>(GET_WEBSITES_CONFIG, {
        fetchPolicy: "cache-first",
    });

    const phoneNumber =
        data?.pluginsConfig?.plugins?.[0]?.config?.phoneNumber || "+0000000000";

    const mainSteps: BookingStep[] = ["service", "datetime", "information", "confirm", "verify"];
    const currentStepIndex = mainSteps.indexOf(currentStep);
    const totalSteps = mainSteps.length;
    const completedSteps = currentStepIndex + 1;
    const remainingSteps = Math.max(0, totalSteps - completedSteps);

    const showProgress = mainSteps.includes(currentStep);

    return (
        <div className="flex flex-col items-center justify-center space-y-4 pt-5 pb-5 px-5">
            {/* Progress indicator */}
            {showProgress && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="w-full max-w-[500px] space-y-2"
                >
                    <div className="flex items-center justify-center gap-2 text-sm font-medium">
                        <span className="text-gradientFromBooking font-bold text-base">Step {completedSteps}</span>
                        <span className="text-textColorSelectText">of</span>
                        <span className="text-textColorSelectText font-semibold">{totalSteps}</span>
                        {remainingSteps > 0 && (
                            <span className="text-textColorSelectText text-xs ml-2">
                                ({remainingSteps} {remainingSteps === 1 ? 'step' : 'steps'} remaining)
                            </span>
                        )}
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-sectionColor">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            className="h-full bg-gradient-to-r from-gradientFromBooking to-gradientToBooking rounded-full"
                        />
                    </div>
                    {/* Step indicators */}
                    <div className="flex items-center justify-between">
                        {mainSteps.map((step, index) => {
                            const isCompleted = index < currentStepIndex;
                            const isCurrent = index === currentStepIndex;
                            return (
                                <div
                                    key={step}
                                    className="flex flex-col items-center gap-1"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className={`
                                            flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold
                                            ${isCompleted 
                                                ? "bg-gradient-to-br from-gradientFromBooking to-gradientToBooking text-white" 
                                                : isCurrent
                                                    ? "border-2 border-gradientFromBooking bg-white text-gradientFromBooking"
                                                    : "border-2 border-borderBooking bg-white text-textColorSelectText"
                                            }
                                        `}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                        ) : (
                                            <span>{index + 1}</span>
                                        )}
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            )}
            <div className="flex flex-wrap justify-center gap-4">
                {currentStep === "call" ? (
                    <>
                        <Button
                            className="rounded-[48px] border border-gradientFromBooking bg-background px-[35px] py-[25px] text-[18px] font-bold uppercase text-gradientFromBooking hover:bg-hoverBooking"
                            onClick={onBack}
                            disabled={isTransitioning}
                        >
                            Choose Another Time
                        </Button>
                        <Button
                            asChild
                            className="rounded-[48px] bg-gradient-to-r from-gradientFromBooking to-gradientToBooking px-[35px] py-[25px] text-[18px] font-bold uppercase text-white"
                            disabled={isTransitioning}
                        >
                            <a href={`tel:${phoneNumber}`}>Call</a>
                        </Button>
                    </>
                ) : (
                    <>
                        {currentStep !== "service" && currentStep !== "success" && (
                            <Button
                                onClick={onBack}
                                disabled={isTransitioning}
                                className="rounded-[48px] border border-gradientFromBooking bg-textColorInBg px-[35px] py-[25px] text-[18px] font-bold uppercase text-gradientFromBooking hover:bg-hoverBooking"
                            >
                                Back
                            </Button>
                        )}
                        <Button
                            onClick={onNext}
                            disabled={isNextDisabled || isTransitioning}
                            className="rounded-[48px] bg-gradient-to-r from-gradientFromBooking to-gradientToBooking px-[35px] py-[25px] text-[18px] font-bold uppercase text-textColorInBg disabled:opacity-70 disabled:cursor-not-allowed relative"
                        >
                            {currentStep === "confirm"
                                ? "Book"
                                : currentStep === "verify"
                                    ? "Confirm"
                                    : currentStep === "success"
                                        ? "New Visit"
                                        : "Next"}
                        </Button>
                    </>
                )}
            </div>
            {errorMsg && (
                <div className="mt-3 w-full max-w-md">
                    <ErrorDisplay message={errorMsg} variant="inline" showRetryButton={false} />
                </div>
            )}
            
            {/* Powered by Benevya - Hide when error on service step */}
            {!(currentStep === "service" && errorMsg) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="border-t border-borderBooking/20 w-full pt-5"
                >
                <motion.a
                    href="https://benevya.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <motion.span 
                        className="text-xs text-textColorSelectText/70 font-medium uppercase tracking-wider flex items-center"
                        whileHover={{ 
                            color: "var(--gradient-from-booking)",
                            x: -2
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        Powered by:
                    </motion.span>
                    <motion.div 
                        className="relative h-6 w-auto flex items-center"
                        whileHover={{ 
                            x: 2,
                            scale: 1.05
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <Image
                            src="http://benevya.com/logo-full.svg"
                            alt="Benevya"
                            width={120}
                            height={37}
                            className="h-6 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                            unoptimized
                        />
                    </motion.div>
                </motion.a>
            </motion.div>
            )}
        </div>
    );
};
