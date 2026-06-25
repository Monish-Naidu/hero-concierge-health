"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Call } from "../steps/Call";
import { Select as SelectService } from "../steps/SelectServices";
import { SelectDateTime } from "../steps/SelectDateTime";
import Success from "../steps/Success";
import { UserInformation } from "../steps/UserInformation";
import VerifyCode from "../steps/VerifyCode";
import ConfirmVisit from "../steps/ConfirmVisit";
import { BookingModalFooter } from "./BookingModalFooter";

import { BookingData, BookingStep } from "../types";

const stepOrder: BookingStep[] = ["service", "datetime", "information", "confirm", "verify", "success", "call"];

const getStepIndex = (step: BookingStep): number => {
    return stepOrder.indexOf(step);
};

const forwardVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1],
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0,
        },
    },
};

const backwardVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1],
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0,
        },
    },
};

interface BookingModalStepsProps {
    currentStep: BookingStep;
    isTransitioning: boolean;
    setIsTransitioning: (value: boolean) => void;
    bookingData: BookingData;
    setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
    verificationCode: string;
    setVerificationCode: (val: string) => void;
    handleSetStep: (step: BookingStep) => void;
    maxBookingDays: number;
    minHoursBeforeBooking: number;
    rangeMinutes: number;
    setHasErrors: (hasError: boolean) => void;
    /** Props for footer */
    isNextDisabled: boolean;
    errorMsg: string | null;
    onNext: () => void;
    onBack: () => void;
    /** Callback to notify about content height change */
    onHeightChange?: (height: number) => void;
    /** Callback to notify about datetime loading state */
    onDateTimeLoadingChange?: (isLoading: boolean) => void;
    /** Callback to set loading state before transition */
    setIsLoadingDateTime?: (isLoading: boolean) => void;
    /** Datetime loading state */
    isLoadingDateTime?: boolean;
    /** Callback when datetime data is loaded */
    handleDateTimeDataLoaded?: () => void;
}

export const BookingModalSteps: React.FC<BookingModalStepsProps> = ({
                                                                        currentStep,
                                                                        isTransitioning,
                                                                        setIsTransitioning,
                                                                        bookingData,
                                                                        setBookingData,
                                                                        verificationCode,
                                                                        setVerificationCode,
                                                                        handleSetStep,
                                                                        maxBookingDays,
                                                                        minHoursBeforeBooking,
                                                                        rangeMinutes,
                                                                        setHasErrors,
                                                                        isNextDisabled,
                                                                        errorMsg,
                                                                        isLoadingDateTime: isLoadingDateTimeProp,
                                                                        setIsLoadingDateTime: setIsLoadingDateTimeProp,
                                                                        handleDateTimeDataLoaded,
                                                                        onNext,
                                                                        onBack,
                                                                        onHeightChange,
                                                                        onDateTimeLoadingChange,
                                                                    }) => {
    const prevStepRef = React.useRef<BookingStep>(currentStep);
    const [direction, setDirection] = React.useState<"forward" | "backward">("forward");
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [isLoadingDateTime, setIsLoadingDateTime] = React.useState<boolean>(isLoadingDateTimeProp || false);
    const [hasServiceError, setHasServiceError] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (isLoadingDateTimeProp !== undefined) {
            setIsLoadingDateTime(isLoadingDateTimeProp);
        }
    }, [isLoadingDateTimeProp]);


    React.useEffect(() => {
        const prevIndex = getStepIndex(prevStepRef.current);
        const currentIndex = getStepIndex(currentStep);
        
        setDirection(currentIndex > prevIndex ? "forward" : "backward");
        prevStepRef.current = currentStep;
    }, [currentStep]);



    const variants = direction === "forward" ? forwardVariants : backwardVariants;

    return (
        <div ref={contentRef} className="flex flex-col w-full h-full min-h-0">
            <div 
                className="w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden relative"
            >
                <AnimatePresence
                    onExitComplete={() => {
                        setIsTransitioning(false);
                    }}
                    initial={false}
                >
                    <motion.div
                        key={currentStep}
                        initial={false}
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        className="w-full px-6"
                        style={{
                            willChange: "opacity",
                        }}
                    >
                {/* STEP 1: Service */}
                {currentStep === "service" && (
                    <div className="">
                        <SelectService
                            data={{
                                category: bookingData.category,
                                service: bookingData.service,
                            }}
                            onCategoryChange={(newCategories) =>
                                setBookingData((prev) => ({
                                    ...prev,
                                    category: newCategories,
                                }))
                            }
                            onServiceChange={(services) =>
                                setBookingData((prev) => ({
                                    ...prev,
                                    service: services,
                                }))
                            }
                            currentStep={currentStep}
                            isTransitioning={isTransitioning}
                            isNextDisabled={isNextDisabled}
                            errorMsg={errorMsg}
                            onNext={onNext}
                            onBack={onBack}
                            isLoadingDateTime={isLoadingDateTime}
                            onErrorChange={setHasServiceError}
                        />
                    </div>
                )}

                {/* STEP 2: Date & Time */}
                {currentStep === "datetime" && (
                    <div className="">
                        <SelectDateTime
                        categoryName={bookingData.category[0] ?? undefined}
                        serviceName={
                            bookingData.service.find((s) => s.type === "service")?.name
                        }
                        selectedDays={bookingData.dates}
                        slotStatus={bookingData.slotStatus}
                        time={bookingData.time}
                        onSlotChange={(newTime, newStatus) =>
                            setBookingData((prev) => ({
                                ...prev,
                                time: newTime,
                                slotStatus: newStatus,
                            }))
                        }
                        setSelectedDays={(days) =>
                            setBookingData((prev) => ({
                                ...prev,
                                dates: days,
                                time: "",
                                slotStatus: "",
                            }))
                        }
                        maxBookingDays={maxBookingDays}
                        minHoursBeforeBooking={minHoursBeforeBooking}
                        rangeMinutes={rangeMinutes}
                        onDataLoaded={() => {
                            setIsTransitioning(false);
                            if (handleDateTimeDataLoaded) {
                                handleDateTimeDataLoaded();
                            }
                        }}
                        onLoadingChange={(isLoading) => {
                            setIsLoadingDateTime(isLoading);
                            setIsLoadingDateTimeProp?.(isLoading);
                            onDateTimeLoadingChange?.(isLoading);
                        }}
                        currentStep={currentStep}
                        isTransitioning={isTransitioning}
                        isNextDisabled={isNextDisabled}
                        errorMsg={errorMsg}
                        onNext={onNext}
                        onBack={onBack}
                        isLoadingDateTime={isLoadingDateTime}
                    />
                    </div>
                )}

                {/* STEP: call */}
                {currentStep === "call" && (
                    <div className="">
                        <Call 
                            onChooseAnotherTime={() => handleSetStep("datetime")}
                            currentStep={currentStep}
                            isTransitioning={isTransitioning}
                            isNextDisabled={isNextDisabled}
                            errorMsg={errorMsg}
                            onNext={onNext}
                            onBack={onBack}
                            isLoadingDateTime={isLoadingDateTime}
                        />
                    </div>
                )}

                {/* STEP 3: User Information */}
                {currentStep === "information" && (
                    <div className="">
                        <UserInformation
                        serviceName={
                            bookingData.service.find((s) => s.type === "service")?.name
                        }
                        data={bookingData}
                        onInformationChange={(info, hasFormErrors) => {
                            setBookingData((prev) => ({
                                ...prev,
                                ...info,
                            }));
                            setHasErrors(hasFormErrors);
                        }}
                        currentStep={currentStep}
                        isTransitioning={isTransitioning}
                        isNextDisabled={isNextDisabled}
                        errorMsg={errorMsg}
                        onNext={onNext}
                        onBack={onBack}
                        isLoadingDateTime={isLoadingDateTime}
                    />
                    </div>
                )}

                {/* STEP 4: Confirm Visit */}
                {currentStep === "confirm" && (
                    <div className="">
                        <ConfirmVisit
                        data={bookingData}
                        setStep={handleSetStep}
                        setBookingData={setBookingData}
                        currentStep={currentStep}
                        isTransitioning={isTransitioning}
                        isNextDisabled={isNextDisabled}
                        errorMsg={errorMsg}
                        onNext={onNext}
                        onBack={onBack}
                        isLoadingDateTime={isLoadingDateTime}
                    />
                    </div>
                )}

                {/* STEP 5: Verify (SMS) */}
                {currentStep === "verify" && (
                    <div className="">
                        <VerifyCode
                        codeValue={verificationCode}
                        onCodeChange={(val) => setVerificationCode(val)}
                        currentStep={currentStep}
                        isTransitioning={isTransitioning}
                        isNextDisabled={isNextDisabled}
                        errorMsg={errorMsg}
                        onNext={onNext}
                        onBack={onBack}
                        isLoadingDateTime={isLoadingDateTime}
                    />
                    </div>
                )}

                {/* STEP 6: Success */}
                {currentStep === "success" && (
                    <div className="">
                        <Success 
                            currentStep={currentStep}
                            isTransitioning={isTransitioning}
                            isNextDisabled={isNextDisabled}
                            errorMsg={errorMsg}
                            onNext={onNext}
                            onBack={onBack}
                            isLoadingDateTime={isLoadingDateTime}
                        />
                    </div>
                )}
                    </motion.div>
                </AnimatePresence>
            </div>
            
            {/* Footer - Fixed at bottom - Hide when error is shown on service step */}
            {!(currentStep === "service" && hasServiceError) && (
                <div className="flex-shrink-0 w-full border-t border-borderBooking bg-background">
                    <BookingModalFooter
                        currentStep={currentStep}
                        isTransitioning={isTransitioning}
                        isNextDisabled={isNextDisabled}
                        errorMsg={errorMsg}
                        onNext={onNext}
                        onBack={onBack}
                        isLoadingDateTime={isLoadingDateTime}
                    />
                </div>
            )}
        </div>
    );
};
