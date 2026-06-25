"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/plugins/booking-modal/ui/dialog";
import { BookingModalSteps } from "./components/BookingModalSteps";
import { useBookingModal } from "./hooks/UseBookingModal";
import { useBookingColors } from "./hooks/useBookingColors";
import { BookingModalProps } from "./types";
import { cn } from "@/plugins/booking-modal/utils/cn";

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  // Load colors from API (with caching in cookies)
  useBookingColors();

  const {
    currentStep,
    isTransitioning,
    errorMsg,
    isNextDisabled,
    isLoadingDateTime,
    setIsLoadingDateTime,
    handleDateTimeDataLoaded,
    handleNext,
    handleBack,
    handleSetStep,
    bookingData,
    verificationCode,
    setVerificationCode,
    maxBookingDays,
    minHoursBeforeBooking,
    rangeMinutes,
    setBookingData,
    setIsTransitioning,
    setHasErrors,
  } = useBookingModal();

  const handleClose = React.useCallback((open: boolean) => {
    if (!open) {
      onClose();
    }
  }, [onClose]);

  // Content height state passed from BookingModalSteps
  // IMPORTANT: hooks must be before conditional rendering!
  const [contentHeight, setContentHeight] = React.useState<number | undefined>(undefined);

  if (!isOpen) return null;

  // Define static height for each step
  const getMinHeight = (step: typeof currentStep): string => {
    const stepHeights: Record<typeof currentStep, string> = {
      'service': '600px',
      'datetime': '755px',
      'information': '740px',
      'confirm': '990px',
      'verify': '555px',
      'success': '500px',
      'call': '550px',
    };

    return stepHeights[step] || '600px';
  };

  return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent
            onEscapeKeyDown={onClose}
            className={cn(
              "!rounded-[22px] p-0 pt-5 sm:max-w-[700px]"
            )}
            showCloseButton={true}
            minHeight={getMinHeight(currentStep)}
            currentStep={currentStep}
            contentHeight={contentHeight}
            onContentHeightChange={setContentHeight}
        >
          {/* Hidden title for accessibility */}
         
          
          <BookingModalSteps
              currentStep={currentStep}
              isTransitioning={isTransitioning}
              setIsTransitioning={setIsTransitioning}
              bookingData={bookingData}
              setBookingData={setBookingData}
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              handleSetStep={handleSetStep}
              maxBookingDays={maxBookingDays}
              minHoursBeforeBooking={minHoursBeforeBooking}
              rangeMinutes={rangeMinutes}
              setHasErrors={setHasErrors}
              isNextDisabled={isNextDisabled}
              errorMsg={errorMsg}
              isLoadingDateTime={isLoadingDateTime}
              setIsLoadingDateTime={setIsLoadingDateTime}
              handleDateTimeDataLoaded={handleDateTimeDataLoaded}
              onNext={handleNext}
              onBack={handleBack}
              onHeightChange={setContentHeight}
          />
        </DialogContent>
      </Dialog>
  );
};

export default BookingModal;
