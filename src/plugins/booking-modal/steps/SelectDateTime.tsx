"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import clsx from "clsx";
import { apolloClient } from "@/api/apollo-client";
import styles from "@/plugins/booking-modal/style.module.css";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/plugins/booking-modal/ui/select";
import { cn } from "@/plugins/booking-modal/utils/cn";
import { Skeleton } from "@/plugins/booking-modal/ui/Skeleton";
import { BookingStep } from "@/plugins/booking-modal/types";


import {
    GET_BOOKING_CALENDAR,
} from "@/plugins/booking-modal/api/queries";


import type {
    BookingCalendar,
    CalendarDay,
    TimeSlot,
} from "@/plugins/booking-modal/api/types";
import {
    DayStatus,
    SlotStatus,
} from "@/plugins/booking-modal/api/types";


interface YearMonthData {
    year: number;
    months: {
        monthIndex: number;
        days: {
            dateObj: Date;
            dateStr: string;
            status: DayStatus;
            reason?: string;
        }[];
    }[];
}

interface SelectDateTimeProps {
    categoryName?: string;
    serviceName?: string;
    selectedDays?: Date[];
    setSelectedDays?: (days: Date[]) => void;
    time?: string;
    slotStatus?: string;
    onSlotChange?: (time: string, status: string) => void;
    onContainerWidthChange?: (width: number) => void;
    maxBookingDays: number;
    minHoursBeforeBooking: number;
    rangeMinutes: number;
    onDataLoaded?: () => void;
    onLoadingChange?: (isLoading: boolean) => void;
    currentStep: BookingStep;
    isTransitioning: boolean;
    isNextDisabled: boolean;
    errorMsg: string | null;
    onNext: () => void;
    onBack: () => void;
    isLoadingDateTime?: boolean;
}

interface DayWithDateObj {
    dateObj: Date;
    dateStr: string;
    status: DayStatus;
    reason?: string;
    closedPeriods?: Array<{
        fromTime: string;
        toTime: string;
        reason: string;
    }>;
}

interface BookingCalendarResponse {
    bookingCalendar: BookingCalendar;
}

export function SelectDateTime({
                                   categoryName,
                                   serviceName,
                                   selectedDays = [],
                                   setSelectedDays = () => {},
                                   time,
                                   onDataLoaded,
                                   onLoadingChange,
                                   onSlotChange = () => {},
                                   onContainerWidthChange = () => {},
                                   maxBookingDays,
                                   minHoursBeforeBooking,
                                   rangeMinutes,
                                   currentStep,
                                   isTransitioning,
                                   isNextDisabled,
                                   errorMsg,
                                   onNext,
                                   onBack,
                                   isLoadingDateTime = false,
                               }: SelectDateTimeProps) {
    // ----------------------------------------------------------------
    // 0. Dynamic calculation of container maxWidth
    // ----------------------------------------------------------------
    const containerRef = useRef<HTMLDivElement>(null);
    const [maxWidth, setMaxWidth] = useState(650);
    const onContainerWidthChangeRef = useRef(onContainerWidthChange);

    useEffect(() => {
        onContainerWidthChangeRef.current = onContainerWidthChange;
    }, [onContainerWidthChange]);



    useEffect(() => {
        function updateMaxWidth() {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.offsetWidth;
            setMaxWidth(containerWidth);
            onContainerWidthChangeRef.current(containerWidth);
        }

        const observer = new ResizeObserver(() => {
            updateMaxWidth();
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
            updateMaxWidth(); // initial
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    // ----------------------------------------------------------------
    // State for data (days from backend)
    // ----------------------------------------------------------------
    const [allFetchedDays, setAllFetchedDays] = useState<DayWithDateObj[]>([]);
    const [yearMonthData, setYearMonthData] = useState<YearMonthData[]>([]);
    const [errorDays, setErrorDays] = useState<string | null>(null);
    const [isLoadingDays, setIsLoadingDays] = useState<boolean>(true);

    // Slots state
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    const [errorSlots, setErrorSlots] = useState<string | null>(null);
    const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);
    
    // Calendar config state
    const [calendarConfig, setCalendarConfig] = useState<BookingCalendar["config"] | null>(null);

    useEffect(() => {
        const isLoading = isLoadingDays || isLoadingSlots;
        onLoadingChange?.(isLoading);
    }, [isLoadingDays, isLoadingSlots, onLoadingChange]);

    // Selected year & month
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

    // State for Select dropdowns to control body overflow
    const [yearSelectOpen, setYearSelectOpen] = useState(false);
    const [monthSelectOpen, setMonthSelectOpen] = useState(false);

    // Error logging protection
    const daysErrorLogged = useRef(false);
    const slotsErrorLogged = useRef(false);
    
    // Helper function to check if a time falls within a range
    const isTimeInRange = (time: string, fromTime: string, toTime: string): boolean => {
        // Convert time strings to minutes for comparison
        const timeToMinutes = (timeStr: string): number => {
            // Handle both "03:04 PM" and "15:04" formats
            let hours: number, minutes: number;
            
            if (timeStr.includes('PM') || timeStr.includes('AM')) {
                // 12-hour format
                const [timePart, period] = timeStr.split(' ');
                const [h, m] = timePart.split(':').map(Number);
                hours = period === 'PM' && h !== 12 ? h + 12 : (period === 'AM' && h === 12 ? 0 : h);
                minutes = m;
            } else {
                // 24-hour format
                [hours, minutes] = timeStr.split(':').map(Number);
            }
            
            return hours * 60 + minutes;
        };
        
        const timeMinutes = timeToMinutes(time);
        const fromMinutes = timeToMinutes(fromTime);
        const toMinutes = timeToMinutes(toTime);
        
        // Handle case where toTime is next day (e.g., 11:00 PM to 02:00 AM)
        if (toMinutes < fromMinutes) {
            return timeMinutes >= fromMinutes || timeMinutes <= toMinutes;
        }
        
        return timeMinutes >= fromMinutes && timeMinutes < toMinutes;
    };

    // Control body overflow when Select dropdowns are open
    useEffect(() => {
        const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
        if (isDesktop) {
            if (yearSelectOpen || monthSelectOpen) {
                document.body.style.setProperty("overflow", "visible", "important");
                document.body.style.setProperty("margin-right", "0", "important");
            } else {
                document.body.style.removeProperty("overflow");
                document.body.style.removeProperty("margin-right");
            }
        }
        return () => {
            if (isDesktop) {
                document.body.style.removeProperty("overflow");
                document.body.style.removeProperty("margin-right");
            }
        };
    }, [yearSelectOpen, monthSelectOpen]);

    // ----------------------------------------------------------------
    // 1. Load calendar from backend (GraphQL => GET_BOOKING_CALENDAR)
    // ----------------------------------------------------------------
    const hasLoadedDays = useRef(false);
    const isLoadingDaysRef = useRef(false);
    const loadedDateRanges = useRef<Set<string>>(new Set());
    
    // Helper function to get date range for a specific month
    const getMonthDateRange = (year: number, monthIndex: number) => {
        const fromDate = new Date(year, monthIndex, 1);
        const toDate = new Date(year, monthIndex + 1, 0); // Last day of month
        
        const formatDate = (date: Date) => {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            return `${yyyy}-${mm}-${dd}`;
        };
        
        return {
            fromDate: formatDate(fromDate),
            toDate: formatDate(toDate),
        };
    };
    
    // Helper function to get date range for initial load (current month only)
    const getInitialDateRange = () => {
        const now = new Date();
        return getMonthDateRange(now.getFullYear(), now.getMonth());
    };
    
    useEffect(() => {
        if (!categoryName || !serviceName) {
            setAllFetchedDays([]);
            setYearMonthData([]);
            setIsLoadingDays(false);
            return;
        }
        
        if (isLoadingDaysRef.current) return;
        
        // Get initial date range (current month + next month)
        const { fromDate, toDate } = getInitialDateRange();
        const rangeKey = `${fromDate}-${toDate}`;
        
        // Skip if we already loaded this range
        if (loadedDateRanges.current.has(rangeKey)) {
            return;
        }
        
        setErrorDays(null);
        daysErrorLogged.current = false;
        setIsLoadingDays(true);
        isLoadingDaysRef.current = true;
        loadedDateRanges.current.add(rangeKey);

        apolloClient
            .query<BookingCalendarResponse>({
                query: GET_BOOKING_CALENDAR,
                variables: {
                    categoryName,
                    serviceName,
                    fromDate,
                    toDate,
                    includeSlots: false, // Only load days, not slots
                },
                fetchPolicy: "cache-first",
                errorPolicy: "all",
            })
            .then((res) => {
                const calendar = res.data.bookingCalendar;
                if (!calendar || !calendar.days || calendar.days.length === 0) {
                    setAllFetchedDays([]);
                    setYearMonthData([]);
                    setCalendarConfig(null);
                    setIsLoadingDays(false);
                    isLoadingDaysRef.current = false;
                    return;
                }
                
                // Save config
                setCalendarConfig(calendar.config);
                
                // Convert each day to DayWithDateObj
                const mapped = calendar.days.map((d) => {
                    const [yyyy, mm, dd] = d.date.split("-");
                    // Let's assume that the offset of -6 hours (winter) is applied for this date. For summer time, it will be -5.
                    const offsetHours = -6;
                    const dateObj = new Date(Date.UTC(+yyyy, (+mm) - 1, +dd, -offsetHours));
                    return {
                        dateObj,
                        dateStr: d.date,
                        status: d.status,
                        reason: d.reason || null,
                        closedPeriods: d.closedPeriods || [],
                    } as DayWithDateObj;
                });
                // Sort by date
                mapped.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
                setAllFetchedDays(mapped);

                // Forming the structure for year->month->days
                const ymd: YearMonthData[] = [];
                mapped.forEach((item) => {
                    const y = item.dateObj.getFullYear();
                    const m = item.dateObj.getMonth();

                    let yItem = ymd.find((yi) => yi.year === y);
                    if (!yItem) {
                        yItem = { year: y, months: [] };
                        ymd.push(yItem);
                    }
                    let mItem = yItem.months.find((mi) => mi.monthIndex === m);
                    if (!mItem) {
                        mItem = { monthIndex: m, days: [] };
                        yItem.months.push(mItem);
                    }
                    mItem.days.push(item);
                });

                // Sort years and months
                ymd.sort((a, b) => a.year - b.year);
                ymd.forEach((yItem) => {
                    yItem.months.sort((a, b) => a.monthIndex - b.monthIndex);
                });

                setYearMonthData(ymd);
                daysErrorLogged.current = false; // Reset on success
                setIsLoadingDays(false);
                isLoadingDaysRef.current = false;
                onDataLoaded?.();
            })
            .catch((err) => {
                if (!daysErrorLogged.current) {
                    daysErrorLogged.current = true;
                    console.error("Error loading calendar:", err);
                }
                setErrorDays("Cannot load calendar from server.");
                hasLoadedDays.current = false; // Allow retry on error
                setIsLoadingDays(false);
                isLoadingDaysRef.current = false;
            });
    }, [categoryName, serviceName, onDataLoaded]);

    // Helper function to check if a day is selectable (OPEN or PARTIAL)
    const isDaySelectable = (status: DayStatus): boolean => {
        return status === DayStatus.OPEN || status === DayStatus.PARTIAL;
    };
    
    useEffect(() => {
        if (allFetchedDays.length === 0) return;
        
        if (!selectedDays || selectedDays.length === 0) {
            // If there is no saved date, select the first selectable day (OPEN or PARTIAL)
            const firstSelectable = allFetchedDays.find((d) => isDaySelectable(d.status));
            if (firstSelectable) {
                setSelectedDays([firstSelectable.dateObj]);
                setSelectedYear(firstSelectable.dateObj.getFullYear());
                setSelectedMonth(firstSelectable.dateObj.getMonth());
            } else {
                // If there is no selectable day, we just take the first day
                const firstDay = allFetchedDays[0];
                if (firstDay) {
                    setSelectedDays([firstDay.dateObj]);
                    setSelectedYear(firstDay.dateObj.getFullYear());
                    setSelectedMonth(firstDay.dateObj.getMonth());
                }
            }
        } else {
            // If there is a saved date, check if it is up-to-date (it must be among selectable days)
            const storedDate = selectedDays[0];
            const storedDateStr = `${storedDate.getFullYear()}-${String(
                storedDate.getMonth() + 1
            ).padStart(2, "0")}-${String(storedDate.getDate()).padStart(2, "0")}`;
            const validDay = allFetchedDays.find(
                (d) => d.dateStr === storedDateStr && isDaySelectable(d.status)
            );
            if (validDay) {
                // If the saved date is up to date, synchronize the year and month
                setSelectedYear(storedDate.getFullYear());
                setSelectedMonth(storedDate.getMonth());
            } else {
                // If the saved date is not relevant, select the first selectable day
                const firstSelectable = allFetchedDays.find((d) => isDaySelectable(d.status));
                if (firstSelectable) {
                    setSelectedDays([firstSelectable.dateObj]);
                    setSelectedYear(firstSelectable.dateObj.getFullYear());
                    setSelectedMonth(firstSelectable.dateObj.getMonth());
                } else {
                    // If there are no selectable days, just choose the first day
                    const firstDay = allFetchedDays[0];
                    if (firstDay) {
                        setSelectedDays([firstDay.dateObj]);
                        setSelectedYear(firstDay.dateObj.getFullYear());
                        setSelectedMonth(firstDay.dateObj.getMonth());
                    }
                }
            }
        }
    }, [allFetchedDays, selectedDays, setSelectedDays]);

    // ----------------------------------------------------------------
    // 2. When changing the selected day => load slots
    // ----------------------------------------
    const isLoadingSlotsRef = useRef(false);
    const lastSlotsRequestRef = useRef<string>("");
    
    useEffect(() => {
        if (!categoryName || !serviceName) {
            setAvailableSlots([]);
            setIsLoadingSlots(false);
            return;
        }
        if (!selectedDays || selectedDays.length === 0) {
            setAvailableSlots([]);
            setIsLoadingSlots(false);
            return;
        }

        const d = selectedDays[0];
        if (!d) {
            setAvailableSlots([]);
            setIsLoadingSlots(false);
            return;
        }
        
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const chosenDate = `${yyyy}-${mm}-${dd}`;
        
        const requestKey = `${categoryName}-${serviceName}-${chosenDate}`;
        if (lastSlotsRequestRef.current === requestKey && isLoadingSlotsRef.current) {
            return;
        }
        
        if (isLoadingSlotsRef.current) {
            return;
        }

        lastSlotsRequestRef.current = requestKey;
        setErrorSlots(null);
        slotsErrorLogged.current = false;
        setIsLoadingSlots(true);
        isLoadingSlotsRef.current = true;

        apolloClient
            .query<BookingCalendarResponse>({
                query: GET_BOOKING_CALENDAR,
                variables: {
                    categoryName,
                    serviceName,
                    fromDate: chosenDate,
                    toDate: chosenDate,
                    includeSlots: true, // Load slots for selected day
                },
                fetchPolicy: "network-only", // Always fetch fresh data - slots can change when someone books
                errorPolicy: "all",
            })
            .then((res) => {
                const calendar = res.data.bookingCalendar;
                if (!calendar || !calendar.days || calendar.days.length === 0) {
                    setAvailableSlots([]);
                    setIsLoadingSlots(false);
                    isLoadingSlotsRef.current = false;
                    return;
                }
                
                // Find the selected day and get its slots
                const selectedDay = calendar.days.find((day) => day.date === chosenDate);
                
                // If selected day is CLOSED, find next available day and select it
                if (selectedDay && selectedDay.status === DayStatus.CLOSED) {
                    // Find next available day (OPEN or PARTIAL) from allFetchedDays
                    const [yyyy, mm, dd] = chosenDate.split("-");
                    const currentDate = new Date(Date.UTC(+yyyy, (+mm) - 1, +dd));
                    const nextAvailableDay = allFetchedDays.find((day) => {
                        return day.dateObj.getTime() > currentDate.getTime() && isDaySelectable(day.status);
                    });
                    
                    if (nextAvailableDay) {
                        // Auto-select next available day
                        setSelectedDays([nextAvailableDay.dateObj]);
                        setSelectedYear(nextAvailableDay.dateObj.getFullYear());
                        setSelectedMonth(nextAvailableDay.dateObj.getMonth());
                        setAvailableSlots([]);
                        slotsErrorLogged.current = false;
                        setIsLoadingSlots(false);
                        isLoadingSlotsRef.current = false;
                        return; // Will trigger new slot load for the new day
                    } else {
                        // No available days found, clear selection
                        setSelectedDays([]);
                        setAvailableSlots([]);
                        slotsErrorLogged.current = false;
                        setIsLoadingSlots(false);
                        isLoadingSlotsRef.current = false;
                        return;
                    }
                }
                
                if (selectedDay && selectedDay.slots) {
                    let filteredSlots = selectedDay.slots;
                    
                    // If day has PARTIAL status and closedPeriods, filter out slots in closed periods
                    if (selectedDay.status === DayStatus.PARTIAL && selectedDay.closedPeriods && selectedDay.closedPeriods.length > 0) {
                        filteredSlots = selectedDay.slots.filter((slot) => {
                            // Check if slot time falls within any closed period
                            const slotTime = slot.time; // Format: "03:04 PM"
                            
                            return !selectedDay.closedPeriods.some((period) => {
                                const isInClosedPeriod = isTimeInRange(slotTime, period.fromTime, period.toTime);
                                return isInClosedPeriod;
                            });
                        });
                    }
                    
                    setAvailableSlots(filteredSlots);
                } else {
                    setAvailableSlots([]);
                }
                
                slotsErrorLogged.current = false;
                setIsLoadingSlots(false);
                isLoadingSlotsRef.current = false;
            })
            .catch((err) => {
                if (!slotsErrorLogged.current) {
                    slotsErrorLogged.current = true;
                    console.error("Error loading slots:", err);
                }
                setErrorSlots("Failed to load available slots for the chosen date.");
                setIsLoadingSlots(false);
                isLoadingSlotsRef.current = false;
            });
    }, [categoryName, serviceName, selectedDays, allFetchedDays]);

    // Helper function to load a specific month
    const loadMonthIfNeeded = useCallback(async (year: number, monthIndex: number) => {
        if (!categoryName || !serviceName) return;
        
        // Get date range for this month
        const { fromDate: fromDateStr, toDate: toDateStr } = getMonthDateRange(year, monthIndex);
        const rangeKey = `${fromDateStr}-${toDateStr}`;
        
        // Skip if already loading or loaded
        if (loadedDateRanges.current.has(rangeKey) || isLoadingDaysRef.current) {
            return;
        }
        
        loadedDateRanges.current.add(rangeKey);
        setIsLoadingDays(true);
        isLoadingDaysRef.current = true;
        
        try {
            const res = await apolloClient.query<BookingCalendarResponse>({
                query: GET_BOOKING_CALENDAR,
                variables: {
                    categoryName,
                    serviceName,
                    fromDate: fromDateStr,
                    toDate: toDateStr,
                    includeSlots: false,
                },
                fetchPolicy: "cache-first",
                errorPolicy: "all",
            });
            
            const calendar = res.data.bookingCalendar;
            if (calendar && calendar.days && calendar.days.length > 0) {
                // Convert and merge new days
                const mapped = calendar.days.map((d) => {
                    const [yyyy, mm, dd] = d.date.split("-");
                    const offsetHours = -6;
                    const dateObj = new Date(Date.UTC(+yyyy, (+mm) - 1, +dd, -offsetHours));
                    return {
                        dateObj,
                        dateStr: d.date,
                        status: d.status,
                        reason: d.reason || null,
                        closedPeriods: d.closedPeriods || [],
                    } as DayWithDateObj;
                });
                
                // Merge with existing days (avoid duplicates)
                setAllFetchedDays((prev) => {
                    const existingDates = new Set(prev.map((d) => d.dateStr));
                    const newDays = mapped.filter((d) => !existingDates.has(d.dateStr));
                    if (newDays.length === 0) return prev; // No new days
                    
                    const merged = [...prev, ...newDays].sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
                    
                    // Rebuild yearMonthData
                    const ymd: YearMonthData[] = [];
                    merged.forEach((item) => {
                        const y = item.dateObj.getFullYear();
                        const m = item.dateObj.getMonth();
                        
                        let yItem = ymd.find((yi) => yi.year === y);
                        if (!yItem) {
                            yItem = { year: y, months: [] };
                            ymd.push(yItem);
                        }
                        let mItem = yItem.months.find((mi) => mi.monthIndex === m);
                        if (!mItem) {
                            mItem = { monthIndex: m, days: [] };
                            yItem.months.push(mItem);
                        }
                        mItem.days.push(item);
                    });
                    
                    ymd.sort((a, b) => a.year - b.year);
                    ymd.forEach((yItem) => {
                        yItem.months.sort((a, b) => a.monthIndex - b.monthIndex);
                    });
                    
                    setYearMonthData(ymd);
                    return merged;
                });
            }
        } catch (err) {
            if (!daysErrorLogged.current) {
                daysErrorLogged.current = true;
                console.error("Error loading additional month:", err);
            }
        } finally {
            setIsLoadingDays(false);
            isLoadingDaysRef.current = false;
        }
    }, [categoryName, serviceName]);
    
    // Auto-load month when selectedYear/selectedMonth changes
    useEffect(() => {
        if (!categoryName || !serviceName) return;
        if (selectedYear === null || selectedMonth === null) return;
        
        // Check if we already have days for this month
        const yItem = yearMonthData.find((y) => y.year === selectedYear);
        const mItem = yItem?.months.find((m) => m.monthIndex === selectedMonth);
        
        // If month is not loaded or has no days, load it
        if (!mItem || mItem.days.length === 0) {
            loadMonthIfNeeded(selectedYear, selectedMonth);
        }
    }, [selectedYear, selectedMonth, categoryName, serviceName, yearMonthData, loadMonthIfNeeded]);
    
    // ----------------------------------------------------------------
    // 3. handleYearChange / handleMonthChange
    // ----------------------------------------------------------------
    const handleYearChange = (year: number) => {
        setSelectedYear(year);
        const yItem = yearMonthData.find((y) => y.year === year);
        if (!yItem || yItem.months.length === 0) {
            // Set first month, useEffect will load it
            setSelectedMonth(0);
            return;
        }

        const firstMonthIndex = yItem.months[0].monthIndex;
        setSelectedMonth(firstMonthIndex);

        const firstDay =
            yItem.months[0].days.find((d) => isDaySelectable(d.status)) ||
            yItem.months[0].days[0];
        if (firstDay) {
            setSelectedDays([firstDay.dateObj]);
        }
    };

    const handleMonthChange = (monthIndex: number) => {
        if (selectedYear === null) return;
        setSelectedMonth(monthIndex);

        const yItem = yearMonthData.find((y) => y.year === selectedYear);
        if (!yItem) {
            // useEffect will load the month
            return;
        }
        
        const mItem = yItem.months.find((m) => m.monthIndex === monthIndex);
        if (!mItem || mItem.days.length === 0) {
            // useEffect will load the month
            return;
        }

        const firstSelectable = mItem.days.find((d) => isDaySelectable(d.status));
        if (firstSelectable) {
            setSelectedDays([firstSelectable.dateObj]);
        } else {
            setSelectedDays([mItem.days[0].dateObj]);
        }
    };

    // ----------------------------------------------------------------
    // 4. handleDayClick
    // ----------------------------------------------------------------
    const handleDayClick = (dayObj: Date, status: DayStatus) => {
        if (status === DayStatus.CLOSED) return;
        if (
            selectedDays.length > 0 &&
            selectedDays[0].toDateString() === dayObj.toDateString()
        ) {
            setSelectedDays([]);
        } else {
            setSelectedDays([dayObj]);
        }
    };

    // ----------------------------------------------------------------
    // 5. Determine daysToShow
    // ----------------------------------------------------------------
    let daysToShow: {
        dateObj: Date;
        dateStr: string;
        status: DayStatus;
        reason?: string;
    }[] = [];

    if (selectedYear !== null && selectedMonth !== null) {
        const yItem = yearMonthData.find((y) => y.year === selectedYear);
        const mItem = yItem?.months.find((m) => m.monthIndex === selectedMonth);
        daysToShow = mItem?.days || [];
    }

    const availableYears = useMemo(
        () => yearMonthData.map((y) => y.year),
        [yearMonthData]
    );
    const availableMonths = useMemo(() => {
        const yItem = yearMonthData.find((y) => y.year === selectedYear);
        return yItem?.months.map((m) => m.monthIndex) || [];
    }, [yearMonthData, selectedYear]);

    // ----------------------------------------------------------------
    // 6. Horizontal scroll logic
    // ----------------------------------------------------------------
    const daysContainerRef = useRef<HTMLDivElement>(null);
    const timeContainerRef = useRef<HTMLDivElement>(null);

    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    // Scroll position state for arrows visibility
    const [daysScrollState, setDaysScrollState] = useState({ canScrollLeft: false, canScrollRight: false });
    const [timeScrollState, setTimeScrollState] = useState({ canScrollLeft: false, canScrollRight: false });

    // Check scroll position for days
    const checkDaysScroll = useCallback(() => {
        if (!daysContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = daysContainerRef.current;
        setDaysScrollState({
            canScrollLeft: scrollLeft > 0,
            canScrollRight: scrollLeft < scrollWidth - clientWidth - 1,
        });
    }, []);

    // Check scroll position for time slots
    const checkTimeScroll = useCallback(() => {
        if (!timeContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = timeContainerRef.current;
        setTimeScrollState({
            canScrollLeft: scrollLeft > 0,
            canScrollRight: scrollLeft < scrollWidth - clientWidth - 1,
        });
    }, []);

    // Update scroll state on scroll
    useEffect(() => {
        const daysContainer = daysContainerRef.current;
        const timeContainer = timeContainerRef.current;

        if (daysContainer) {
            checkDaysScroll();
            daysContainer.addEventListener('scroll', checkDaysScroll);
            // Check on resize
            const resizeObserver = new ResizeObserver(checkDaysScroll);
            resizeObserver.observe(daysContainer);
            return () => {
                daysContainer.removeEventListener('scroll', checkDaysScroll);
                resizeObserver.disconnect();
            };
        }
    }, [checkDaysScroll, daysToShow]);

    useEffect(() => {
        const timeContainer = timeContainerRef.current;

        if (timeContainer) {
            checkTimeScroll();
            timeContainer.addEventListener('scroll', checkTimeScroll);
            // Check on resize
            const resizeObserver = new ResizeObserver(checkTimeScroll);
            resizeObserver.observe(timeContainer);
            return () => {
                timeContainer.removeEventListener('scroll', checkTimeScroll);
                resizeObserver.disconnect();
            };
        }
    }, [checkTimeScroll, availableSlots]);

    const handleMouseDown = (
        e: React.MouseEvent,
        ref: React.RefObject<HTMLDivElement>
    ) => {
        isDragging.current = true;
        startX.current = e.pageX - (ref.current?.offsetLeft || 0);
        scrollLeft.current = ref.current?.scrollLeft || 0;
    };
    const handleMouseLeave = () => {
        isDragging.current = false;
    };
    const handleMouseUp = () => {
        isDragging.current = false;
    };
    const handleMouseMove = (
        e: React.MouseEvent,
        ref: React.RefObject<HTMLDivElement>
    ) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - (ref.current?.offsetLeft || 0);
        const walk = (x - startX.current) * 1.5;
        if (ref.current) {
            ref.current.scrollLeft = scrollLeft.current - walk;
        }
    };

    // ----------------------------------------------------------------
    // 7. If selected day is closed => show reason
    // ----------------------------------------------------------------
    let selectedReason: string | null = null;
    let selectedDayIsClosed = false;
    if (selectedDays.length > 0 && allFetchedDays.length > 0) {
        const sel = selectedDays[0];
        const found = allFetchedDays.find(
            (fd) =>
                fd.dateStr ===
                `${sel.getFullYear()}-${String(sel.getMonth() + 1).padStart(2, "0")}-${String(
                    sel.getDate()
                ).padStart(2, "0")}`
        );
        if (found && found.status === DayStatus.CLOSED) {
            selectedDayIsClosed = true;
            selectedReason = found.reason || null;
        }
    }

    // ----------------------------------------------------------------
    // Render
    // ----------------------------------------------------------------
    
    return (
        <div className="flex flex-col min-h-0 w-full">
            <motion.div
                ref={containerRef}
                style={{ maxWidth, overflow: "hidden" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-6 flex-1"
            >
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
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
                        <Calendar className="h-6 w-6 text-white" />
                    </motion.div>
                    <h2 className="bg-gradient-to-r from-textColorMain via-gradientFromBooking to-textColorMain bg-clip-text text-[35px] font-bold text-transparent lg:text-[45px]">
                        Select a Day
                    </h2>
                </div>
                
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="text-center text-[16px] font-medium text-textColorSelectText lg:text-[18px]"
                >
                    You can only choose one day
                </motion.p>
                {selectedDayIsClosed && selectedReason && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-center text-sm text-red-500"
                    >
                        {selectedReason}
                    </motion.p>
                )}
            </motion.div>

            {errorDays && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm text-red-500"
                >
                    {errorDays}
                </motion.p>
            )}

            {/* Month/year selection */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                className="flex w-auto flex-col items-start space-y-4"
            >
                <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-gradientFromBooking" />
                    {isLoadingDays ? (
                        <Skeleton className="h-4 w-24" />
                    ) : (
                        <label className="text-sm font-semibold text-textColorSelectText uppercase tracking-wider">
                            Select Period
                        </label>
                    )}
                </div>
                
                {/* Year/Month Select */}
                <div className="flex gap-3 w-full">
                    {isLoadingDays ? (
                        <>
                            <Skeleton className="h-[52px] flex-1 rounded-[12px]" />
                            <Skeleton className="h-[52px] flex-1 rounded-[12px]" />
                        </>
                    ) : yearMonthData.length > 0 ? (
                        <>
                            {/* Year select */}
                            {availableYears.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
                                    className="flex-1"
                                >
                                    <Select
                                        value={selectedYear?.toString() ?? ""}
                                        onValueChange={(value) => handleYearChange(Number(value))}
                                        open={yearSelectOpen}
                                        onOpenChange={setYearSelectOpen}
                                    >
                                        <SelectTrigger
                                            className={cn(
                                                "h-[52px] rounded-[12px] border border-borderBooking bg-[#F5F8FF] text-left outline-none transition-all duration-200 hover:border-gradientFromBooking/50 hover:shadow-sm focus:border-gradientFromBooking focus:ring-2 focus:ring-gradientFromBooking/20",
                                                "text-[15px] font-semibold text-textColorSelectText"
                                            )}
                                        >
                                            <SelectValue placeholder="Select Year">
                                                {selectedYear ? selectedYear.toString() : "Select Year"}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent
                                            className={cn(
                                                "rounded-[12px] border border-borderBooking bg-white shadow-xl max-h-[200px]"
                                            )}
                                        >
                                            {availableYears.map((year) => (
                                                <SelectItem
                                                    key={year}
                                                    value={year.toString()}
                                                    className={cn(
                                                        "text-[15px] font-semibold text-textColorSelectText cursor-pointer",
                                                        "hover:bg-gradientFromBooking/5 focus:bg-gradientFromBooking/10",
                                                        "data-[highlighted]:bg-gradientFromBooking/10 data-[highlighted]:text-gradientFromBooking"
                                                    )}
                                                >
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </motion.div>
                            )}

                            {/* Month select */}
                            {selectedYear !== null && availableMonths.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                                    className="flex-1"
                                >
                                    <Select
                                        value={selectedMonth?.toString() ?? ""}
                                        onValueChange={(value) => handleMonthChange(Number(value))}
                                        open={monthSelectOpen}
                                        onOpenChange={setMonthSelectOpen}
                                    >
                                        <SelectTrigger
                                            className={cn(
                                                "h-[52px] rounded-[12px] border border-borderBooking bg-[#F5F8FF] text-left outline-none transition-all duration-200 hover:border-gradientFromBooking/50 hover:shadow-sm focus:border-gradientFromBooking focus:ring-2 focus:ring-gradientFromBooking/20",
                                                "text-[15px] font-semibold text-textColorSelectText"
                                            )}
                                        >
                                            <SelectValue placeholder="Select Month">
                                                {selectedMonth !== null
                                                    ? new Date(selectedYear, selectedMonth, 1).toLocaleString("en-US", {
                                                          month: "long",
                                                      })
                                                    : "Select Month"}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent
                                            className={cn(
                                                "rounded-[12px] border border-borderBooking bg-white shadow-xl max-h-[200px]"
                                            )}
                                        >
                                            {availableMonths.map((mIndex) => {
                                                const monthName = new Date(selectedYear, mIndex, 1).toLocaleString("en-US", {
                                                    month: "long",
                                                });
                                                return (
                                                    <SelectItem
                                                        key={mIndex}
                                                        value={mIndex.toString()}
                                                        className={cn(
                                                            "text-[15px] font-semibold text-textColorSelectText cursor-pointer",
                                                            "hover:bg-gradientFromBooking/5 focus:bg-gradientFromBooking/10",
                                                            "data-[highlighted]:bg-gradientFromBooking/10 data-[highlighted]:text-gradientFromBooking"
                                                        )}
                                                    >
                                                        {monthName}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                </motion.div>
                            )}
                        </>
                    ) : null}
                </div>

                {/* Days List */}
                {isLoadingDays || (errorDays && yearMonthData.length === 0) ? (
                    <div className="flex w-full space-x-3 overflow-x-auto py-2">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-[90px] min-w-[70px] rounded-[12px] flex-shrink-0" />
                        ))}
                    </div>
                ) : yearMonthData.length > 0 ? (
                    <div className="relative flex w-full max-w-full items-center">
                        {/* Left arrow button */}
                        {daysScrollState.canScrollLeft && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 0.9, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ opacity: 1, scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                onClick={() => {
                                    if (daysContainerRef.current) {
                                        daysContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
                                    }
                                }}
                                className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm text-white shadow-lg transition-all duration-150 hover:opacity-100 hover:shadow-xl"
                                style={{
                                    background: `linear-gradient(to bottom right, var(--gradient-from-booking-80), var(--gradient-to-booking-80))`,
                                    boxShadow: '0 10px 15px -3px var(--gradient-from-booking-30), 0 4px 6px -2px var(--gradient-from-booking-30)'
                                }}
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </motion.button>
                        )}

                        <div
                            ref={daysContainerRef}
                            className={clsx(
                                "flex w-full space-x-3 overflow-x-auto py-2 scrollbar-hide",
                                styles.customScrollbar
                            )}
                            style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                            onMouseDown={(e) => handleMouseDown(e, daysContainerRef)}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={(e) => handleMouseMove(e, daysContainerRef)}
                        >
                            {daysToShow.length === 0 ? (
                                <p className="px-4 py-3 text-sm text-gray-500">No days in this month/year</p>
                            ) : (
                                daysToShow.map((item) => {
                                    const isSelected =
                                        selectedDays.length > 0 &&
                                        selectedDays[0].toDateString() === item.dateObj.toDateString();
                                    const isClosed = item.status === DayStatus.CLOSED;

                                    return (
                                        <motion.div
                                            key={item.dateStr}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            whileHover={!isClosed ? { scale: 1.05, y: -2 } : {}}
                                            whileTap={!isClosed ? { scale: 0.95 } : {}}
                                            transition={{ duration: 0.2 }}
                                            className={clsx(
                                                "flex min-w-[70px] flex-col items-center justify-center rounded-[12px] border-2 px-4 py-3 text-center transition-all duration-200",
                                                isSelected
                                                    ? "bg-gradient-to-br from-gradientFromBooking to-gradientToBooking border-gradientFromBooking text-white shadow-lg shadow-gradientFromBooking/30 cursor-pointer"
                                                    : isClosed
                                                    ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed opacity-60"
                                                    : "bg-white border-borderBooking text-textColorMain hover:border-gradientFromBooking/50 hover:shadow-md cursor-pointer"
                                            )}
                                            onClick={() => !isClosed && handleDayClick(item.dateObj, item.status)}
                                        >
                                            <span className={clsx(
                                                "text-[22px] font-bold mb-1",
                                                isSelected ? "text-white" : isClosed ? "text-gray-400" : "text-textColorMain"
                                            )}>
                                                {item.dateObj.getDate()}
                                            </span>
                                            <span className={clsx(
                                                "text-xs font-medium uppercase tracking-wide",
                                                isSelected ? "text-white/90" : isClosed ? "text-gray-400" : "text-textColorSelectText"
                                            )}>
                                                {item.dateObj.toLocaleDateString("en-US", { weekday: "short" })}
                                            </span>
                                        </motion.div>
                                    );
                                })
                            )}
                        </div>

                        {/* Right arrow button */}
                        {daysScrollState.canScrollRight && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 0.9, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ opacity: 1, scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                onClick={() => {
                                    if (daysContainerRef.current) {
                                        daysContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
                                    }
                                }}
                                className="absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm text-white shadow-lg transition-all duration-150 hover:opacity-100 hover:shadow-xl"
                                style={{
                                    background: `linear-gradient(to bottom right, 
                                        color-mix(in srgb, var(--gradient-from-booking) 80%, transparent), 
                                        color-mix(in srgb, var(--gradient-to-booking) 80%, transparent)
                                    )`,
                                    boxShadow: '0 10px 15px -3px color-mix(in srgb, var(--gradient-from-booking) 30%, transparent), 0 4px 6px -2px color-mix(in srgb, var(--gradient-from-booking) 30%, transparent)'
                                }}
                                aria-label="Scroll right"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </motion.button>
                        )}
                    </div>
                ) : null}
            </motion.div>

            <hr className="border-borderBooking/30 my-2" />

            {/* List of slots */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
                className="space-y-3"
            >
                <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-gradientFromBooking" />
                    <h3 className="text-[16px] font-bold text-textColorMain">
                        Available Slots for Selected Day
                    </h3>
                </div>

                {errorSlots && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-500"
                    >
                        Error: {errorSlots}
                    </motion.p>
                )}

                {/* Horizontal scroll for slots */}
                {isLoadingSlots || (errorSlots && availableSlots.length === 0 && selectedDays.length > 0) ? (
                    <div className="flex w-full space-x-3 overflow-x-auto py-2">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-[48px] w-20 rounded-[12px] flex-shrink-0" />
                        ))}
                    </div>
                ) : (
                    <div className="relative flex w-full items-center">
                    {/* Left arrow button */}
                    {timeScrollState.canScrollLeft && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.9, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            onClick={() => {
                                if (timeContainerRef.current) {
                                    timeContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
                                }
                            }}
                            className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm text-white shadow-lg transition-all duration-150 hover:opacity-100 hover:shadow-xl"
                            style={{
                                background: `linear-gradient(to bottom right, 
                                    color-mix(in srgb, var(--gradient-from-booking) 80%, transparent), 
                                    color-mix(in srgb, var(--gradient-to-booking) 80%, transparent)
                                )`,
                                boxShadow: '0 10px 15px -3px color-mix(in srgb, var(--gradient-from-booking) 30%, transparent), 0 4px 6px -2px color-mix(in srgb, var(--gradient-from-booking) 30%, transparent)'
                            }}
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </motion.button>
                    )}

                    <div
                        ref={timeContainerRef}
                        className={clsx(
                            "flex w-full space-x-3 overflow-x-auto py-2 scrollbar-hide",
                            styles.customScrollbar
                        )}
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                        onMouseDown={(e) => handleMouseDown(e, timeContainerRef)}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={(e) => handleMouseMove(e, timeContainerRef)}
                    >
                    {availableSlots.length === 0 ? (
                        <p className="px-4 py-3 text-sm text-gray-500">No available slots for this day</p>
                    ) : (
                        availableSlots.map((slot) => {
                            const isSelected = slot.time === time;
                            return (
                                <motion.button
                                    key={`${slot.time}-${slot.status}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className={clsx(
                                        "whitespace-nowrap rounded-[12px] px-5 py-3 text-[15px] font-semibold transition-all duration-200 border-2",
                                        isSelected
                                            ? "bg-gradient-to-br from-gradientFromBooking to-gradientToBooking border-gradientFromBooking text-white shadow-lg shadow-gradientFromBooking/30"
                                            : "bg-sectionColor border-borderBooking text-textColorMain hover:border-gradientFromBooking/50 hover:shadow-md"
                                    )}
                                    onClick={() => {
                                        if (onSlotChange) {
                                            const selectedDate = selectedDays[0];
                                            if (selectedDate && slot.time) {
                                                // Parse time from format "03:04 PM" or "HH:MM"
                                                let hours: number, minutes: number;
                                                if (slot.time.includes('PM') || slot.time.includes('AM')) {
                                                    // 12-hour format
                                                    const [timePart, period] = slot.time.split(' ');
                                                    const [h, m] = timePart.split(':').map(Number);
                                                    hours = period === 'PM' && h !== 12 ? h + 12 : (period === 'AM' && h === 12 ? 0 : h);
                                                    minutes = m;
                                                } else {
                                                    // 24-hour format
                                                    [hours, minutes] = slot.time.split(':').map(Number);
                                                }
                                                
                                                const slotDateTime = new Date(selectedDate);
                                                slotDateTime.setHours(hours, minutes, 0, 0);
                                                
                                                const now = new Date();
                                                
                                                const diffMs = slotDateTime.getTime() - now.getTime();
                                                const diffHours = diffMs / (1000 * 60 * 60);
                                                
                                                // Convert SlotStatus enum to string format expected by onSlotChange
                                                let finalStatus: string = "";
                                                if (diffHours < minHoursBeforeBooking && slot.status === SlotStatus.AVAILABLE) {
                                                    finalStatus = "need-call";
                                                } else if (slot.status === SlotStatus.NEED_CALL) {
                                                    finalStatus = "need-call";
                                                } else if (slot.status === SlotStatus.AVAILABLE) {
                                                    finalStatus = "available";
                                                } else if (slot.status === SlotStatus.BOOKED) {
                                                    finalStatus = "booked";
                                                } else if (slot.status === SlotStatus.RESERVED) {
                                                    finalStatus = "reserved";
                                                } else if (slot.status === SlotStatus.CLOSED) {
                                                    finalStatus = "closed";
                                                } else {
                                                    finalStatus = slot.status || "";
                                                }
                                                
                                                onSlotChange(slot.time, finalStatus);
                                            } else {
                                                // Fallback: convert status enum to string
                                                let statusStr: string = "";
                                                if (slot.status === SlotStatus.NEED_CALL) {
                                                    statusStr = "need-call";
                                                } else if (slot.status === SlotStatus.AVAILABLE) {
                                                    statusStr = "available";
                                                } else if (slot.status === SlotStatus.BOOKED) {
                                                    statusStr = "booked";
                                                } else if (slot.status === SlotStatus.RESERVED) {
                                                    statusStr = "reserved";
                                                } else if (slot.status === SlotStatus.CLOSED) {
                                                    statusStr = "closed";
                                                } else {
                                                    statusStr = slot.status || "";
                                                }
                                                onSlotChange(slot.time, statusStr);
                                            }
                                        }
                                    }}
                                >
                                    {slot.time}
                                </motion.button>
                            );
                        })
                    )}
                    </div>

                    {/* Right arrow button */}
                    {timeScrollState.canScrollRight && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.9, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            onClick={() => {
                                if (timeContainerRef.current) {
                                    timeContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
                                }
                            }}
                            className="absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm text-white shadow-lg transition-all duration-150 hover:opacity-100 hover:shadow-xl"
                            style={{
                                background: `linear-gradient(to bottom right, 
                                    color-mix(in srgb, var(--gradient-from-booking) 80%, transparent), 
                                    color-mix(in srgb, var(--gradient-to-booking) 80%, transparent)
                                )`,
                                boxShadow: '0 10px 15px -3px color-mix(in srgb, var(--gradient-from-booking) 30%, transparent), 0 4px 6px -2px color-mix(in srgb, var(--gradient-from-booking) 30%, transparent)'
                            }}
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </motion.button>
                    )}
                    </div>
                )}
            </motion.div>
            </motion.div>
        </div>
    );
}
