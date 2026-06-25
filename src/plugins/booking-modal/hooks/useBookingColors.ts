"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { apolloClient } from "@/api/apollo-client";
import { GET_BOOKING_CONFIG } from "../api/queries";

const BOOKING_COLORS_COOKIE_KEY = "booking_colors";
const COLORS_CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

interface BookingColors {
    gradientFromBooking: string;
    gradientToBooking: string;
    hoverBooking: string;
    borderBooking: string;
    textColorInBg: string;
    textColorSelectText: string;
    sectionColor: string;
    textColorMain: string;
    background: string;
    popover: string;
    ring: string;
}

const defaultColors: BookingColors = {
    gradientFromBooking: "#A86A45",
    gradientToBooking: "#D8BFA6",
    hoverBooking: "rgb(245,239,231)",
    borderBooking: "rgb(245,239,231)",
    textColorInBg: "#ffffff",
    textColorSelectText: "#45597c",
    sectionColor: "#f5f8ff",
    textColorMain: "#2d2525",
    background: "#fff",
    popover: "#fff",
    ring: "rgba(168,106,69,0.4)"
};

interface CachedColors {
    colors: BookingColors;
    timestamp: number;
}

/**
 * Converts hex color to rgba with transparency
 */
function hexToRgba(hex: string, alpha: number): string {
    if (hex.startsWith('rgb')) {
        const match = hex.match(/\d+/g);
        if (match && match.length >= 3) {
            return `rgba(${match[0]}, ${match[1]}, ${match[2]}, ${alpha})`;
        }
    }
    
    const cleanHex = hex.replace('#', '');
    
    if (cleanHex.length === 3) {
        const r = parseInt(cleanHex[0] + cleanHex[0], 16);
        const g = parseInt(cleanHex[1] + cleanHex[1], 16);
        const b = parseInt(cleanHex[2] + cleanHex[2], 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Sets CSS variables for booking modal colors
 */
function setCSSVariables(colors: BookingColors) {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    root.style.setProperty("--gradient-from-booking", colors.gradientFromBooking);
    root.style.setProperty("--gradient-to-booking", colors.gradientToBooking);
    root.style.setProperty("--hover-booking", colors.hoverBooking);
    root.style.setProperty("--border-booking", colors.borderBooking);
    root.style.setProperty("--text-color-in-bg", colors.textColorInBg);
    root.style.setProperty("--text-color-select-text", colors.textColorSelectText);
    root.style.setProperty("--section-color", colors.sectionColor);
    root.style.setProperty("--text-color-main", colors.textColorMain);
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--popover", colors.popover);
    root.style.setProperty("--ring", colors.ring);
    
    root.style.setProperty("--gradient-from-booking-80", hexToRgba(colors.gradientFromBooking, 0.8));
    root.style.setProperty("--gradient-to-booking-80", hexToRgba(colors.gradientToBooking, 0.8));
    root.style.setProperty("--gradient-from-booking-30", hexToRgba(colors.gradientFromBooking, 0.3));
}

/**
 * Отримує кольори з cookies
 */
function getColorsFromCookies(): BookingColors | null {
    if (typeof window === "undefined") return null;

    try {
        const cached = Cookies.get(BOOKING_COLORS_COOKIE_KEY);
        if (!cached) return null;

        const parsed: CachedColors = JSON.parse(cached);
        const now = Date.now();

        if (now - parsed.timestamp > COLORS_CACHE_DURATION) {
            Cookies.remove(BOOKING_COLORS_COOKIE_KEY);
            return null;
        }

        return parsed.colors;
    } catch {
        Cookies.remove(BOOKING_COLORS_COOKIE_KEY);
        return null;
    }
}

/**
 * Saves colors to cookies
 */
function saveColorsToCookies(colors: BookingColors) {
    if (typeof window === "undefined") return;

    const cached: CachedColors = {
        colors,
        timestamp: Date.now(),
    };

    Cookies.set(BOOKING_COLORS_COOKIE_KEY, JSON.stringify(cached), {
        expires: 1, // 1 day (more than 6 hours, but this is the maximum term for cookies)
    });
}

/**
 * Hook for loading and caching booking modal colors
 */
export function useBookingColors() {
    const [colors, setColors] = useState<BookingColors>(defaultColors);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                // First check cookies
                const cachedColors = getColorsFromCookies();
                if (cachedColors) {
                    setColors(cachedColors);
                    setCSSVariables(cachedColors);
                    setIsLoading(false);
                    return;
                }

                // If not in cookies, load from API
                // Use cache-first to avoid unnecessary requests if data is already in Apollo cache
                const response = await apolloClient.query({
                    query: GET_BOOKING_CONFIG,
                    fetchPolicy: "cache-first",
                    errorPolicy: "all",
                });

                if (!response?.data) {
                    setColors(defaultColors);
                    setCSSVariables(defaultColors);
                    setIsLoading(false);
                    return;
                }

                const { data } = response;
                const plugin = data?.pluginsConfig?.plugins?.[0];
                const apiColors = plugin?.config?.colors;

                if (apiColors && typeof apiColors === "object") {
                    const newColors: BookingColors = {
                        gradientFromBooking: apiColors.gradientFromBooking || defaultColors.gradientFromBooking,
                        gradientToBooking: apiColors.gradientToBooking || defaultColors.gradientToBooking,
                        hoverBooking: apiColors.hoverBooking || defaultColors.hoverBooking,
                        borderBooking: apiColors.borderBooking || defaultColors.borderBooking,
                        textColorInBg: apiColors.textColorInBg || defaultColors.textColorInBg,
                        textColorSelectText: apiColors.textColorSelectText || defaultColors.textColorSelectText,
                        sectionColor: apiColors.sectionColor || defaultColors.sectionColor,
                        textColorMain: apiColors.textColorMain || defaultColors.textColorMain,
                        background: apiColors.background || defaultColors.background,
                        popover: apiColors.popover || defaultColors.popover,
                        ring: apiColors.ring || defaultColors.ring,
                    };

                    setColors(newColors);
                    setCSSVariables(newColors);
                    saveColorsToCookies(newColors);
                } else {
                    setColors(defaultColors);
                    setCSSVariables(defaultColors);
                }
            } catch (err) {
                console.error("Error loading booking colors:", err);
                setColors(defaultColors);
                setCSSVariables(defaultColors);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { colors, isLoading };
}

