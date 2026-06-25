"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { apolloClient } from "@/api/apollo-client";
import { useQuery } from "@apollo/client";
import { GET_BOOKING_CATEGORIES, GET_WEBSITES_CONFIG, GET_BOOKING_CONFIG } from "@/plugins/booking-modal/api/queries";
import { MultiSelectCategories, MultiSelectServices } from "@/plugins/booking-modal/ui/multi-select";
import { ErrorDisplay } from "@/plugins/booking-modal/ui/ErrorDisplay";
import { Skeleton } from "@/plugins/booking-modal/ui/Skeleton";
import { useBookingPhone } from "../hooks/useBookingPhone";
import { CategoryWithServices, SelectServiceProps, Service, ChosenServiceItem, ServiceInCategory } from "@/plugins/booking-modal/api/types";
import { motion } from "framer-motion";
import { Sparkles, Layers } from "lucide-react";
import { BookingStep } from "@/plugins/booking-modal/types";


interface SelectWithFooterProps extends SelectServiceProps {
  currentStep: BookingStep;
  isTransitioning: boolean;
  isNextDisabled: boolean;
  errorMsg: string | null;
  onNext: () => void;
  onBack: () => void;
  isLoadingDateTime?: boolean;
  onErrorChange?: (hasError: boolean) => void;
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

export function Select({
                         data,
                         onCategoryChange,
                         onServiceChange,
                         preloadedCategories,
                         preloadedLoading = false,
                         currentStep,
                         isTransitioning,
                         isNextDisabled,
                         errorMsg,
                         onNext,
                         onBack,
                         isLoadingDateTime = false,
                         onErrorChange,
                       }: SelectWithFooterProps) {
  const [serviceCategories, setServiceCategories] = useState<
      CategoryWithServices[]
  >(preloadedCategories || []);
  const [loading, setLoading] = useState<boolean>(preloadedLoading || false);
  const [error, setError] = useState<string | null>(null);
  const errorLogged = useRef(false);

  // Get phone number from cookies/API hook
  const { phoneNumber: cachedPhoneNumber, isLoading: isPhoneLoading } = useBookingPhone();

  // Get phone number from API (fallback if not in cookies)
  const { data: websiteData } = useQuery<{ pluginsConfig?: { plugins?: Array<{ config?: { phoneNumber?: string } }> } }>(GET_WEBSITES_CONFIG, {
    fetchPolicy: "cache-first",
    errorPolicy: "all",
  });

  const { data: bookingData } = useQuery<{ pluginsConfig?: { plugins?: Array<{ config?: { defaultPhoneNumber?: string } }> } }>(GET_BOOKING_CONFIG, {
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

  /** Convert API data to the required structure */
  const transformServicesToCategories = (services: Service[]): CategoryWithServices[] => {
    const map = new Map<string, CategoryWithServices>();

    services.forEach((s) => {
      const { id, categoryId, categoryName, price, status, options } = s;
      // If there is no such category yet, add it
      if (!map.has(categoryId)) {
        map.set(categoryId, {
          id: categoryId,
          name: categoryName,
          status: undefined, // Will be determined based on services
          services: [],
        });
      }
      // Add this service
      const catObj = map.get(categoryId)!;
      // Use local index within category as fallback if id is empty
      // This ensures unique IDs even when all service IDs are empty
      const localIndex = catObj.services.length;
      const serviceId = id || `service-${categoryId}-${localIndex}`;
      catObj.services.push({
        id: serviceId,
        name: s.name,
        price,
        status,
        options,
      });
    });

    // Determine category status: if any service is "active", category is "active"
    // Otherwise, if all are "coming", category is "coming"
    map.forEach((cat: CategoryWithServices) => {
      const hasActive = cat.services.some((srv: ServiceInCategory) => srv.status === "active");
      const allComing = cat.services.every((srv: ServiceInCategory) => srv.status === "coming");
      cat.status = hasActive ? "active" : allComing ? "coming" : "active";
    });

    return Array.from(map.values());
  };

  useEffect(() => {
    if (preloadedCategories) return; // If they gave ready-made data, we do not load it

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      errorLogged.current = false; // Reset error flag on new fetch
      try {
        const { data: apiData } = await apolloClient.query({
          query: GET_BOOKING_CATEGORIES,
          fetchPolicy: "network-only",
          errorPolicy: "all",
        });

        if (!apiData?.bookingServices) {
          throw new Error("No data.bookingServices in response");
        }

        const grouped = transformServicesToCategories(apiData.bookingServices);
        setServiceCategories(grouped);
        errorLogged.current = false; // Reset on success
      } catch (err: any) {
        if (!errorLogged.current) {
          errorLogged.current = true;
        }
        // Check for CORS or network errors
        const errorMessage = err?.message || String(err) || "";
        if (errorMessage.includes('CORS') || errorMessage.includes('Failed to fetch') || errorMessage.includes('network')) {
          setError("Unable to connect to the server. This may be a connection or configuration issue. Please try again or contact support.");
        } else {
          setError("Unable to load services at this time. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [preloadedCategories]);

  /** Data for MultiSelectCategories */
  const categoryOptions = useMemo(() => {
    // Note: for MultiSelectCategories
    // we expect an array { id, name, services } according to our logic
    return serviceCategories.map((cat: CategoryWithServices) => ({
      id: cat.id,
      name: cat.name,
      status: cat.status,
      services: cat.services,
    }));
  }, [serviceCategories]);

  /** Filter categories by selected names */
  const availableServices = useMemo(() => {
    // data.category ?? [] -> to avoid TS18048
    const selectedCategoryNames = data.category ?? [];

    if (selectedCategoryNames.length === 0) return [];
    return serviceCategories.filter((cat: CategoryWithServices) =>
        // Compare the category name with what the user has selected
        selectedCategoryNames.includes(cat.name)
    );
  }, [data.category, serviceCategories]);

  /** Converting ChosenServiceItem => unique IDs and back */
  const transformToUniqueIds = (items: ChosenServiceItem[]) => {
    const uniqueIds: string[] = [];
    items.forEach((item) => {
      if (item.type === "service") {
        uniqueIds.push(`service-${item.categoryId}-${item.serviceId}`);
      } else if (item.type === "booster" && item.boosterId) {
        // For boosters, use the boosterId directly (now backend returns id)
        // Fallback to index format if boosterId is in index format
        uniqueIds.push(`booster-${item.categoryId}-${item.serviceId}-${item.boosterId}`);
      }
    });
    return uniqueIds;
  };

  const transformToReadableFormat = (uniqueIds: string[]): ChosenServiceItem[] => {
    const result: ChosenServiceItem[] = [];
    uniqueIds.forEach((uniqueId) => {
      // Parse uniqueId: "service-{categoryId}-{serviceId}" or "booster-{categoryId}-{serviceId}-{boosterId}"
      const match = uniqueId.match(/^(service|booster)-([^-]+)-(.+)$/);
      if (!match) return;
      
      const [, type, catId, rest] = match;
      
      // Find category
      const cat = availableServices.find((c: CategoryWithServices) => c.id === catId);
      if (!cat) return;

      if (type === "service") {
        // For service: rest is serviceId
        const srvId = rest;
        const srv = cat.services.find((sv: { id: string }) => sv.id === srvId);

        if (srv) {
        const numPrice =
            typeof srv.price === "string" ? parseFloat(srv.price) : srv.price ?? 0;
        result.push({
          categoryId: catId,
          serviceId: srvId,
          id: srv.id,
          name: srv.name,
          price: numPrice,
          type: "service",
        });
        }
      } else if (type === "booster") {
        // For booster: rest is "serviceId-boosterId" or "serviceId-index-{index}"
        // We need to find the service and booster by trying different splits
        let srvId: string;
        let boosterIdOrIndex: string;
        
        const indexDashIndex = rest.indexOf("-index-");
        if (indexDashIndex !== -1) {
          // Format: "serviceId-index-{index}" (fallback for old data)
          srvId = rest.substring(0, indexDashIndex);
          boosterIdOrIndex = rest.substring(indexDashIndex + 1); // "index-{index}"
        } else {
          // Format: "serviceId-boosterId" - use last dash
          const lastDashIndex = rest.lastIndexOf("-");
          if (lastDashIndex === -1) return;
          srvId = rest.substring(0, lastDashIndex);
          boosterIdOrIndex = rest.substring(lastDashIndex + 1);
        }
        
        const srv = cat.services.find((sv: { id: string; options?: Array<{ id: string; name: string; price?: number | string | null }> }) => sv.id === srvId);
        if (srv && srv.options) {
          let booster;
          
          // Check if boosterIdOrIndex is an index (starts with "index-") - fallback for old data
          if (boosterIdOrIndex.startsWith("index-")) {
            const indexStr = boosterIdOrIndex.replace("index-", "");
            const index = parseInt(indexStr, 10);
            if (!isNaN(index) && srv.options[index]) {
              booster = srv.options[index];
            }
          } else {
            // Try to find by id (preferred - now backend returns id)
            booster = srv.options.find((b: { id: string }) => b.id === boosterIdOrIndex);
          }
          
          if (booster) {
            const numPrice =
                typeof booster.price === "string"
                    ? parseFloat(booster.price)
                    : booster.price ?? 0;
            // Use booster.id if available, otherwise use the parsed boosterIdOrIndex
            const storedBoosterId = booster.id || boosterIdOrIndex;
            result.push({
              categoryId: catId,
              serviceId: srvId,
              boosterId: storedBoosterId,
              id: booster.id || storedBoosterId,
              name: booster.name,
              price: numPrice,
              type: "booster",
            });
          }
        }
      }
    });

    return result;
  };

  const selectedUniqueIds = useMemo(() => {
    if (!data.service) return [];
    return transformToUniqueIds(data.service);
  }, [data.service]);

  const showError = error && !loading;

  // Notify parent component about error state
  useEffect(() => {
    if (onErrorChange) {
      onErrorChange(!!showError);
    }
  }, [showError, onErrorChange]);

  // If there's an error, show only ErrorDisplay without the "Select a Service" header
  if (showError) {
    return (
      <ErrorDisplay
        message={error || "Unable to load services"}
        variant="fullscreen"
        showRetryButton={true}
        phoneNumber={phoneNumber || undefined}
        title="Unable to Load Services"
        onRetry={() => {
          setError(null);
          errorLogged.current = false;
          const fetchData = async () => {
            setLoading(true);
            try {
              const { data: apiData } = await apolloClient.query({
                query: GET_BOOKING_CATEGORIES,
                fetchPolicy: "network-only",
                errorPolicy: "all",
              });
              if (apiData?.bookingServices) {
                const grouped = transformServicesToCategories(apiData.bookingServices);
                setServiceCategories(grouped);
                setError(null);
              }
            } catch (err: any) {
              if (!errorLogged.current) {
                errorLogged.current = true;
              }
              const errorMessage = err?.message || String(err) || "";
              if (errorMessage.includes('CORS') || errorMessage.includes('Failed to fetch') || errorMessage.includes('network')) {
                setError("Unable to connect to the server. This may be a connection or configuration issue. Please try again or contact support.");
              } else {
                setError("Unable to load services at this time. Please try again.");
              }
            } finally {
              setLoading(false);
            }
          };
          fetchData();
        }}
      />
    );
  }

  return (
      <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-8"
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
              <Sparkles className="h-6 w-6 text-white" />
            </motion.div>
            <h2 className="bg-gradient-to-r from-textColorMain via-gradientFromBooking to-textColorMain bg-clip-text text-[35px] font-bold text-transparent lg:text-[45px]">
              Select a Service
            </h2>
          </div>

          <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-center text-[16px] font-medium text-textColorSelectText lg:text-[18px]"
          >
            Choose one or more services to continue booking your appointment
          </motion.p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="space-y-6"
        >
          <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
              className="mx-auto max-w-[600px] space-y-2.5 text-textColorMain"
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-textColorSelectText uppercase tracking-wider">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-gradientFromBooking/20 to-gradientToBooking/20">
                <Layers className="h-3.5 w-3.5 text-gradientFromBooking" />
              </div>
              <span>Choose Category</span>
            </label>
            {loading ? (
              <Skeleton className="h-[52px] w-full rounded-[12px]" />
            ) : (
              <MultiSelectCategories
                  options={categoryOptions}
                  selectedValues={data.category ?? []}
                  onSelectionChange={onCategoryChange}
                  placeholder="Choose Category"
              />
            )}
          </motion.div>

          <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
              className="mx-auto max-w-[600px] space-y-2.5 text-textColorMain"
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-textColorSelectText uppercase tracking-wider">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-gradientFromBooking/20 to-gradientToBooking/20">
                <Sparkles className="h-3.5 w-3.5 text-gradientFromBooking" />
              </div>
              <span>Select Service</span>
            </label>
            {loading ? (
              <Skeleton className="h-[52px] w-full rounded-[12px]" />
            ) : (
              <MultiSelectServices
                  options={availableServices.map((cat: CategoryWithServices) => ({
                      id: cat.id,
                      name: cat.name,
                      services: cat.services,
                  }))}
                  selectedValues={selectedUniqueIds}
                  onSelectionChange={(uniqueIds) => {
                      const newFormatted = transformToReadableFormat(uniqueIds);
                      onServiceChange(newFormatted);
                  }}
                  placeholder="Choose the Services"
                  className={`transition-all duration-300 ${
                      !(data.category?.length) 
                          ? "pointer-events-none opacity-50" 
                          : "opacity-100"
                  }`}
              />
            )}
          </motion.div>
        </motion.div>
      </motion.div>
  );
}
