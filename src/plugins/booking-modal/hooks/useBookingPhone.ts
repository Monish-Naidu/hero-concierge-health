"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { apolloClient } from "@/api/apollo-client";
import { GET_WEBSITES_CONFIG } from "../api/queries";

const BOOKING_PHONE_COOKIE_KEY = "booking_phone";
const PHONE_CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

interface CachedPhone {
    phoneNumber: string;
    timestamp: number;
}

/**
 * Gets phone number from cookies
 */
function getPhoneFromCookies(): string | null {
    if (typeof window === "undefined") return null;

    try {
        const cached = Cookies.get(BOOKING_PHONE_COOKIE_KEY);
        if (!cached) return null;

        const parsed: CachedPhone = JSON.parse(cached);
        const now = Date.now();

        if (now - parsed.timestamp > PHONE_CACHE_DURATION) {
            Cookies.remove(BOOKING_PHONE_COOKIE_KEY);
            return null;
        }

        return parsed.phoneNumber;
    } catch {
        Cookies.remove(BOOKING_PHONE_COOKIE_KEY);
        return null;
    }
}

/**
 * Saves phone number to cookies
 */
function savePhoneToCookies(phoneNumber: string) {
    if (typeof window === "undefined") {
        console.log("[useBookingPhone] Cannot save to cookies: window is undefined");
        return;
    }

    if (!phoneNumber || phoneNumber.trim() === "") {
        console.log("[useBookingPhone] Cannot save empty phone number");
        return;
    }

    const cached: CachedPhone = {
        phoneNumber: phoneNumber.trim(),
        timestamp: Date.now(),
    };

    try {
        Cookies.set(BOOKING_PHONE_COOKIE_KEY, JSON.stringify(cached), {
            expires: 1, // 1 day
        });
        console.log("[useBookingPhone] Successfully saved phone number to cookies:", phoneNumber);
        
        // Verify it was saved
        const saved = Cookies.get(BOOKING_PHONE_COOKIE_KEY);
        if (saved) {
            console.log("[useBookingPhone] Verified cookie saved:", saved);
        } else {
            console.error("[useBookingPhone] Cookie was not saved!");
        }
    } catch (error) {
        console.error("[useBookingPhone] Error saving phone to cookies:", error);
    }
}

/**
 * Hook for loading and caching booking modal phone number
 */
export function useBookingPhone() {
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                // First check cookies
                const cachedPhone = getPhoneFromCookies();
                if (cachedPhone) {
                    setPhoneNumber(cachedPhone);
                    setIsLoading(false);
                    return;
                }

                // If not in cookies, load from API
                const response = await apolloClient.query({
                    query: GET_WEBSITES_CONFIG,
                    fetchPolicy: "cache-first",
                    errorPolicy: "all",
                });

                if (!response?.data) {
                    console.log("[useBookingPhone] No data in response");
                    setPhoneNumber(null);
                    setIsLoading(false);
                    return;
                }

                const { data } = response;
                const plugin = data?.pluginsConfig?.plugins?.[0];
                const apiPhoneNumber = plugin?.config?.phoneNumber;

                console.log("[useBookingPhone] API response:", {
                    hasData: !!data,
                    hasPlugin: !!plugin,
                    hasConfig: !!plugin?.config,
                    phoneNumber: apiPhoneNumber,
                });

                if (apiPhoneNumber && typeof apiPhoneNumber === "string" && apiPhoneNumber.trim() !== "") {
                    console.log("[useBookingPhone] Saving phone number to cookies:", apiPhoneNumber);
                    setPhoneNumber(apiPhoneNumber);
                    savePhoneToCookies(apiPhoneNumber);
                } else {
                    console.log("[useBookingPhone] No valid phone number found in API response");
                    setPhoneNumber(null);
                }
            } catch (err) {
                console.error("Error loading booking phone:", err);
                setPhoneNumber(null);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { phoneNumber, isLoading };
}

