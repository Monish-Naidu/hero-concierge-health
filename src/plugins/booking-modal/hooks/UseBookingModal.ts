import { useEffect, useMemo, useState, useRef } from "react";
import { ApolloError } from "@apollo/client";

import Cookies from "js-cookie";
import { apolloClient } from "@/api/apollo-client";
import {
    CREATE_CLIENT_AND_BOOKING,
    CONFIRM_BOOKING,
    GET_BOOKING_CONFIG,
} from "@/plugins/booking-modal/api/queries";
import { BookingData, BookingStep } from "../types";

// Keys for cookies:
const BOOKING_DATA_COOKIE_KEY = "bookingData";
const LAST_CLEAR_DATE_COOKIE_KEY = "lastClearDate";

export const useBookingModal = () => {
    // -------------------- STATUS --------------------
    const [currentStep, setCurrentStep] = useState<BookingStep>("service");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [smsActive, setSmsActive] = useState(true);
    const [isLoadingDateTime, setIsLoadingDateTime] = useState(false);

    const [maxBookingDays, setMaxBookingDays] = useState<number>(30);
    const [minHoursBeforeBooking, setMinHoursBeforeBooking] = useState<number>(4);
    const [rangeMinutes, setRangeMinutes] = useState<number>(30);
    const [stepTitles, setStepTitles] = useState<Record<BookingStep, string>>({
        service: "Select a Service",
        datetime: "Choose Date & Time",
        information: "Your Information",
        confirm: "Confirm your Visit",
        verify: "Verify Phone Number",
        success: "Booking Confirmed",
        call: "Please Call the Clinic",
    });
    const [bookingSteps, setBookingSteps] = useState<Array<{ step: BookingStep; isEnabled: boolean }>>([
        { step: "service", isEnabled: true },
        { step: "datetime", isEnabled: true },
        { step: "information", isEnabled: true },
        { step: "confirm", isEnabled: true },
        { step: "verify", isEnabled: true },
        { step: "success", isEnabled: true },
        { step: "call", isEnabled: true },
    ]);

    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [verificationCode, setVerificationCode] = useState("");
    const [hasErrors, setHasErrors] = useState(false);

    // -------------------- Clearing/initializing by date (via cookies) --------------------
    // Check if the cookie has a lastClearDate and compare it with the current date (“YYYY-MM-DD”).
    useEffect(() => {
        const nowDate = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
        const lastClearDate = Cookies.get(LAST_CLEAR_DATE_COOKIE_KEY);

        // If lastClearDate doesn't exist or differs from current date, reset bookingData
        if (!lastClearDate || lastClearDate !== nowDate) {
            Cookies.remove(BOOKING_DATA_COOKIE_KEY);
            setBookingData({ category: [], service: [], dates: [] });
            Cookies.set(LAST_CLEAR_DATE_COOKIE_KEY, nowDate);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // -------------------- bookingData --------------------
    const [bookingData, setBookingData] = useState<BookingData>(() => {
        const saved = Cookies.get(BOOKING_DATA_COOKIE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return {
                    ...parsed,
                    dates: parsed.dates
                        ? parsed.dates.map((d: string) => new Date(d))
                        : [],
                };
            } catch {
                // If there is a parsing error, we delete the “broken” data from cookies
                Cookies.remove(BOOKING_DATA_COOKIE_KEY);
                return { category: [], service: [], dates: [] };
            }
        }
        return { category: [], service: [], dates: [] };
    });

    // -------------------- We store bookingData in cookies --------------------
    useEffect(() => {
        Cookies.set(BOOKING_DATA_COOKIE_KEY, JSON.stringify(bookingData));
    }, [bookingData]);

    // -------------------- Configuration download (GraphQL) --------------------
    const configErrorLogged = useRef(false);
    useEffect(() => {
        (async () => {
            try {
                const response = await apolloClient.query({
                    query: GET_BOOKING_CONFIG,
                    fetchPolicy: "network-only",
                    errorPolicy: "all",
                });
                
                if (!response || !response.data) {
                    setSmsActive(false);
                    return;
                }
                
                const { data } = response;
                const plugin = data?.pluginsConfig?.plugins?.[0];
                if (plugin?.config) {
                    setSmsActive(plugin.config.SMS ?? false);
                    setMaxBookingDays(plugin.config.maxBookingDays ?? 30);
                    setMinHoursBeforeBooking(plugin.config.minHoursBeforeBooking ?? 4);
                    setRangeMinutes(plugin.config.rangeMinutes ?? 30);
                    
                    // Get stepTitles from API
                    if (plugin.config.stepTitles) {
                        setStepTitles(plugin.config.stepTitles as Record<BookingStep, string>);
                    }
                    
                    // Get steps from API
                    if (plugin.config.steps && Array.isArray(plugin.config.steps)) {
                        setBookingSteps(plugin.config.steps as Array<{ step: BookingStep; isEnabled: boolean }>);
                    }
                    
                    configErrorLogged.current = false; // Reset on success
                }
            } catch (err) {
                if (!configErrorLogged.current) {
                    configErrorLogged.current = true;
                }
                setSmsActive(false);
            }
        })();
    }, []);

    // -------------------- Filtering steps by smsActive --------------------
    const baseSteps = useMemo(() => {
        return bookingSteps
            .filter((cfg) => cfg.isEnabled)
            .map((c) => c.step);
    }, [bookingSteps]);

    const enabledSteps = useMemo(() => {
        if (!smsActive) {
            return baseSteps.filter((step) => step !== "verify");
        }
        return baseSteps;
    }, [baseSteps, smsActive]);

    // If the current step is not among the allowed ones, set the first one (fallback).
    useEffect(() => {
        if (!enabledSteps.includes(currentStep)) {
            setCurrentStep(enabledSteps[0] ?? "service");
        }
    }, [enabledSteps, currentStep]);

    // Auxiliary methods
    const getCurrentStepIndex = () => enabledSteps.indexOf(currentStep);
    const stepTitle = stepTitles[currentStep];

    // -------------------- handleNext --------------------
    const handleNext = async () => {
        setErrorMsg(null);
        if (isTransitioning) return;

        // If there is a “need-call” situation at the “datetime” step.
        if (currentStep === "datetime" && bookingData.slotStatus === "need-call") {
            setIsTransitioning(true);
            setCurrentStep("call");
            return;
        }

        // If the step “confirm” -> creating a reservation (if there is no bookingId yet)
        if (currentStep === "confirm") {
            if (bookingData.bookingId) {
                setIsTransitioning(true);
                setCurrentStep(!smsActive ? "success" : "verify");
                return;
            }

            try {
                const firstDate = bookingData.dates?.[0];
                const dateString = firstDate
                    ? firstDate.toISOString().split("T")[0]
                    : "";
                const serviceIDs = bookingData.service?.map((s) => s.id) || [];

                const response = await apolloClient.mutate({
                    mutation: CREATE_CLIENT_AND_BOOKING,
                    variables: {
                        name: bookingData.fullName ?? "",
                        phoneNumber: bookingData.phone ?? "",
                        serviceIDs,
                        date: dateString,
                        time: bookingData.time ?? "",
                        email: bookingData.email ?? "",
                    },
                });

                const createdBooking = response?.data?.createClientAndBooking;

                if (smsActive) {
                    if (!createdBooking?.id) {
                        throw new Error("Failed to create booking. No ID returned.");
                    }
                    setBookingData((prev) => ({ ...prev, bookingId: createdBooking.id }));
                }

                setIsTransitioning(true);
                setCurrentStep(!smsActive ? "success" : "verify");
                return;
            } catch (error) {
                let msg = "Unable to complete your booking. Please try again.";
                if (error instanceof ApolloError) {
                    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                        msg = error.graphQLErrors.map((err) => err.message).join("; ");
                    } else if (error.networkError) {
                        const networkMsg = error.networkError.message || String(error.networkError);
                        if (networkMsg.includes('CORS') || networkMsg.includes('Failed to fetch')) {
                            msg = "Connection issue. Please check your internet connection or contact support.";
                        } else {
                            msg = networkMsg;
                        }
                    } else if (error.message) {
                        msg = error.message;
                    }
                } else if (error instanceof Error) {
                    msg = error.message;
                }
                setErrorMsg(msg);
                return;
            }
        }

        // If the step “verify” -> booking confirmation (SMS)
        if (currentStep === "verify") {
            try {
                if (!bookingData.bookingId) {
                    return;
                }
                await apolloClient.mutate({
                    mutation: CONFIRM_BOOKING,
                    variables: {
                        generationCode: verificationCode,
                        bookingID: bookingData.bookingId,
                    },
                });
                setIsTransitioning(true);
                setCurrentStep("success");
                return;
            } catch (err) {
                let msg = "Unable to confirm your booking. Please try again.";
                if (err instanceof ApolloError) {
                    if (err.graphQLErrors && err.graphQLErrors.length > 0) {
                        msg = err.graphQLErrors.map((e) => e.message).join("; ");
                    } else if (err.networkError) {
                        const networkMsg = err.networkError.message || String(err.networkError);
                        if (networkMsg.includes('CORS') || networkMsg.includes('Failed to fetch')) {
                            msg = "Connection issue. Please check your internet connection or contact support.";
                        } else {
                            msg = networkMsg;
                        }
                    } else if (err.message) {
                        msg = err.message;
                    }
                } else if (err instanceof Error) {
                    msg = err.message;
                }
                setErrorMsg(msg);
                return;
            }
        }

        // If the step is “success” -> reset everything for a new reservation
        if (currentStep === "success") {
            setBookingData({ category: [], service: [], dates: [] });
            setVerificationCode("");
            setIsTransitioning(true);
            setCurrentStep("service");
            return;
        }

        // Otherwise, the usual transition to the next step
        const currentIndex = getCurrentStepIndex();
        if (currentIndex < enabledSteps.length - 1) {
            const nextStep = enabledSteps[currentIndex + 1];
            const transitionStartTime = performance.now();
            console.log(`[STEP TRANSITION] Starting transition from "${currentStep}" to "${nextStep}" at ${transitionStartTime.toFixed(2)}ms`);
            
            setCurrentStep(nextStep);
            setIsTransitioning(true);
            requestAnimationFrame(() => {
                const afterStateTime = performance.now();
                console.log(`[STEP TRANSITION] State updated in ${(afterStateTime - transitionStartTime).toFixed(2)}ms`);
            });
        }
    };

    // -------------------- handleBack --------------------
    const handleBack = () => {
        setErrorMsg(null);
        if (isTransitioning) return;

        // If the current step is “call”, return to “datetime”
        if (currentStep === "call") {
            setIsTransitioning(true);
            setCurrentStep("datetime");
            return;
        }

        const currentIndex = getCurrentStepIndex();
        if (currentIndex > 0) {
            setIsTransitioning(true);
            setCurrentStep(enabledSteps[currentIndex - 1]);
        }
    };

    // -------------------- handleSetStep --------------------
    const handleSetStep = (step: BookingStep) => {
        setErrorMsg(null);
        if (isTransitioning) return;
        if (enabledSteps.includes(step)) {
            setIsTransitioning(true);
            setCurrentStep(step);
        }
    };

    // -------------------- isNextDisabled --------------------
    const isNextDisabled = useMemo(() => {
        switch (currentStep) {
            case "service":
                return !bookingData.category?.length || !bookingData.service?.length;
            case "datetime":
                return !bookingData.dates?.length || !bookingData.time;
            case "information":
                return hasErrors;
            case "verify":
                return smsActive ? verificationCode.length < 4 : false;
            default:
                return false;
        }
    }, [currentStep, bookingData, hasErrors, verificationCode, smsActive]);

    // Callback to handle when datetime data is loaded (no longer blocks transition)
    const handleDateTimeDataLoaded = () => {
        if (currentStep === "datetime") {
            setIsTransitioning(false);
        }
    };

    return {
        currentStep,
        stepTitle,
        isTransitioning,
        errorMsg,
        verificationCode,
        bookingData,
        isNextDisabled,
        isLoadingDateTime,
        setIsLoadingDateTime,
        handleDateTimeDataLoaded,
        handleNext,
        handleBack,
        handleSetStep,
        setVerificationCode,
        setBookingData,
        setHasErrors,
        setIsTransitioning,
        smsActive,
        maxBookingDays,
        minHoursBeforeBooking,
        rangeMinutes,
        enabledSteps,
    };
};
