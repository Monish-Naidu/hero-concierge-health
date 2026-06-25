"use client";

import { Checkbox } from "@/plugins/booking-modal/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/plugins/booking-modal/ui/select";
import { ScrollArea } from "@/plugins/booking-modal/ui/scroll-area";
import { cn } from "@/plugins/booking-modal/utils/cn";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MultiSelectProps } from "@/plugins/booking-modal/api/types";
import styles from "../../style.module.css";
import { motion } from "framer-motion";

function formatPrice(price: number | string | null | undefined): string | null {
  if (price == null || price === "null" || price === "none") {
    return null;
  }
  if (price === "free") {
    return "Free";
  }
  return `$${price}`;
}

interface MultiSelectComponentProps extends MultiSelectProps {
  mode?: "categories" | "services";
}

export const MultiSelect = ({
  options,
  selectedValues,
  onSelectionChange,
  placeholder = "Select options",
  className,
  triggerClassName,
  contentClassName,
  optionClassName,
  maxHeight = 290,
  mode = "services",
}: MultiSelectComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Manage the overflow style for the body when displaying Select
  useEffect(() => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    if (isDesktop) {
      if (isOpen) {
        document.body.style.setProperty("overflow", "visible", "important");
        document.body.style.setProperty("overscroll-behavior", "none", "important");
        document.body.style.setProperty("position", "unset", "important");
        document.body.style.setProperty("margin-right", "0", "important");
      } else {
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("margin-right");
      }
    }
    document.body.style.setProperty("margin-right", "0", "important");

    return () => {
      if (isDesktop) {
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("margin-right");
      }
    };
  }, [isOpen]);

  // ========== CATEGORIES MODE ==========
  if (mode === "categories") {
    const handleToggle = useCallback(
      (categoryName: string) => {
        if (selectedValues.includes(categoryName)) {
          onSelectionChange([]);
        } else {
          onSelectionChange([categoryName]);
          setIsOpen(false);
        }
      },
      [selectedValues, onSelectionChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, categoryName: string, isComing: boolean) => {
        if (isComing) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle(categoryName);
        }
      },
      [handleToggle]
    );

    const selectedLabels = selectedValues
      .map((val) => options.find((option) => option.name === val)?.name)
      .filter(Boolean)
      .join(", ");

    return (
      <div className={cn("z-[9999] w-full", className)} ref={selectRef}>
        <Select open={isOpen} onOpenChange={setIsOpen}>
          <SelectTrigger
            className={cn(
              "h-[52px] rounded-[12px] border border-borderBooking bg-[#F5F8FF] text-left outline-none transition-all duration-200 hover:border-gradientFromBooking/50 hover:shadow-sm focus:border-gradientFromBooking focus:ring-2 focus:ring-gradientFromBooking/20",
              triggerClassName
            )}
          >
            <SelectValue
              className={cn(
                "block rounded-lg text-[15px] font-semibold px-1",
                "text-textColorSelectText"
              )}
              placeholder={placeholder}
            >
              {selectedLabels || placeholder}
            </SelectValue>
          </SelectTrigger>

          <SelectContent
            className={cn(
              "rounded-[12px] border border-borderBooking bg-white shadow-xl",
              contentClassName
            )}
            align="center"
            position="popper"
            sideOffset={8}
          >
            <ScrollArea className="rounded-md" style={{ maxHeight, height: maxHeight }}>
              <div className="p-2">
                {options.map((category, index) => {
                  const isComing = category.status === "coming";
                  const isChecked = selectedValues.includes(category.name);

                  return (
                    <motion.div
                      key={`${category.id}-${index}`}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <label
                        className={cn(
                          "flex items-center space-x-3 rounded-lg p-3 transition-all duration-150",
                          isComing
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer hover:bg-gradientFromBooking/5 hover:shadow-sm active:bg-gradientFromBooking/10",
                          isChecked && !isComing && "bg-gradientFromBooking/10",
                          optionClassName
                        )}
                        onKeyDown={(e) => handleKeyDown(e, category.name, isComing)}
                      >
                        {!isComing && (
                          <Checkbox
                            id={`checkbox-${category.id}-${index}`}
                            checked={isChecked}
                            className="text-[18px] transition-all duration-200"
                            onCheckedChange={() => handleToggle(category.name)}
                          />
                        )}

                        {isComing && (
                          <div className="h-[20px] w-[20px]" aria-hidden="true" />
                        )}

                        <span
                          className={cn(
                            "text-[15px] font-semibold flex-1",
                            isChecked && !isComing
                              ? "text-gradientFromBooking"
                              : "text-textColorSelectText"
                          )}
                        >
                          {category.name}
                          {isComing && (
                            <span className="pl-2 text-xs text-textColorSelectText/70 italic">
                              (Coming Soon)
                            </span>
                          )}
                        </span>
                      </label>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>
    );
  }

  // ========== SERVICES MODE ==========
  const updatedOptions = options.map((category) => ({
    ...category,
    uniqueId: `category-${category.id}`,
    services: category.services.map((service, serviceIndex) => ({
      ...service,
      uniqueId: `service-${category.id}-${service.id}`,
      options: service.options?.map((booster, boosterIndex) => ({
        ...booster,
        // Use booster.id if available, otherwise fallback to index
        uniqueId: `booster-${category.id}-${service.id}-${booster.id || `index-${boosterIndex}`}`,
      })),
    })),
  }));

  const handleToggle = useCallback(
    (uniqueId: string) => {
      const match = uniqueId.match(/^(service|booster)-([^-]+)-(.+)$/);
      if (!match) return;

      const [, type, catId, rest] = match;

      let newSelection = [...selectedValues];
      const isSelected = selectedValues.includes(uniqueId);

      if (type === "service") {
        const serviceId = rest;

        const category = updatedOptions.find((cat) => cat.id === catId);
        const serviceObj = category?.services.find((srv) => srv.id === serviceId);

        if (!serviceObj) return;

        if (serviceObj.status === "coming") {
          return;
        }

        const serviceFormattedPrice = formatPrice(serviceObj.price);

        if (isSelected) {
          newSelection = newSelection.filter((value) => {
            const valMatch = value.match(/^(service|booster)-([^-]+)-(.+)$/);
            if (!valMatch) return true;

            const [, valType, valCatId, valRest] = valMatch;

            if (valType === "service") {
              const valSrvId = valRest;
              return !(valCatId === catId && valSrvId === serviceId);
            } else if (valType === "booster") {
              const lastDashIndex = valRest.lastIndexOf("-");
              if (lastDashIndex === -1) return true;
              const valSrvId = valRest.substring(0, lastDashIndex);
              return !(valCatId === catId && valSrvId === serviceId);
            }
            return true;
          });
        } else {
          newSelection.push(uniqueId);

          if (serviceFormattedPrice === null) {
            const firstBooster = serviceObj.options?.[0];
            if (firstBooster?.uniqueId && firstBooster.status !== "coming") {
              newSelection.push(firstBooster.uniqueId);
            }
          }
        }
      } else if (type === "booster") {
        // Handle format: "serviceId-index-{index}" or "serviceId-boosterId"
        // We need to find the split point before "index-" if it exists, otherwise use last dash
        let serviceId: string;
        
        const indexDashIndex = rest.indexOf("-index-");
        if (indexDashIndex !== -1) {
          // Format: "serviceId-index-{index}"
          serviceId = rest.substring(0, indexDashIndex);
        } else {
          // Format: "serviceId-boosterId" - use last dash
          const lastDashIndex = rest.lastIndexOf("-");
          if (lastDashIndex === -1) return;
          serviceId = rest.substring(0, lastDashIndex);
        }

        const category = updatedOptions.find((cat) => cat.id === catId);
        if (!category) return;

        const serviceObj = category.services.find((srv) => srv.id === serviceId);
        if (!serviceObj) return;

        const boosterObj = serviceObj.options?.find((b) => b.uniqueId === uniqueId);

        const serviceUniqueId = `service-${catId}-${serviceId}`;
        if (!selectedValues.includes(serviceUniqueId)) {
          return;
        }

        if (boosterObj?.status === "coming") {
          return;
        }

        if (isSelected) {
          newSelection = newSelection.filter((value) => value !== uniqueId);
        } else {
          newSelection.push(uniqueId);
        }
      }

      onSelectionChange(newSelection);
    },
    [selectedValues, onSelectionChange, updatedOptions]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, id: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle(id);
      }
    },
    [handleToggle]
  );

  const selectedLabels = selectedValues
    .map((uniqueId) => {
      const match = uniqueId.match(/^(service|booster)-([^-]+)-(.+)$/);
      if (!match) return null;

      const [, type, catId, rest] = match;

      if (type === "service") {
        const serviceId = rest;
        const category = updatedOptions.find((cat) => cat.id === catId);
        const service = category?.services.find((srv) => srv.id === serviceId);
        return service?.name || null;
      } else if (type === "booster") {
        // Handle format: "serviceId-index-{index}" or "serviceId-boosterId"
        let serviceId: string;
        
        const indexDashIndex = rest.indexOf("-index-");
        if (indexDashIndex !== -1) {
          // Format: "serviceId-index-{index}"
          serviceId = rest.substring(0, indexDashIndex);
        } else {
          // Format: "serviceId-boosterId" - use last dash
          const lastDashIndex = rest.lastIndexOf("-");
          if (lastDashIndex === -1) return null;
          serviceId = rest.substring(0, lastDashIndex);
        }
        
        const category = updatedOptions.find((cat) => cat.id === catId);
        const service = category?.services.find((srv) => srv.id === serviceId);
        const booster = service?.options?.find((b) => b.uniqueId === uniqueId);
        return booster?.name || null;
      }
      return null;
    })
    .filter(Boolean)
    .join(", ");

  return (
    <div className={cn("w-full", className)} ref={selectRef}>
      <Select
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <SelectTrigger
          className={cn(
            "h-[52px] rounded-[12px] border border-borderBooking bg-[#F5F8FF] text-left outline-none transition-all duration-200 hover:border-gradientFromBooking/50 hover:shadow-sm focus:border-gradientFromBooking focus:ring-2 focus:ring-gradientFromBooking/20",
            triggerClassName
          )}
        >
          <SelectValue
            className={cn(
              "block rounded-lg text-[15px] font-semibold px-1",
              "text-textColorSelectText"
            )}
            placeholder={placeholder}
          >
            {selectedLabels || placeholder}
          </SelectValue>
        </SelectTrigger>

        <SelectContent
          className={cn(
            "relative rounded-[12px] border border-borderBooking bg-white shadow-xl",
            contentClassName
          )}
          align="center"
          position="popper"
          sideOffset={8}
        >
          <div className={styles.customScrollbar} style={{ maxHeight, height: maxHeight, overflowY: 'auto' }}>
            <div className="p-2">
              {updatedOptions.map((cat, catIndex) => (
                <motion.div
                  key={cat.uniqueId}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: catIndex * 0.05 }}
                  className="mb-3"
                >
                  <motion.label
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: catIndex * 0.05 + 0.1 }}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-[14px] font-bold uppercase tracking-wider",
                      "text-gradientFromBooking bg-gradientFromBooking/5"
                    )}
                  >
                    {cat.name}
                  </motion.label>

                  {cat.services.map((srv, srvIndex) => {
                    const srvUniqueId = srv.uniqueId!;
                    const isSrvChecked = selectedValues.includes(srvUniqueId);
                    const isSrvComing = srv.status === "coming";
                    const serviceFormattedPrice = formatPrice(srv.price);

                    return (
                      <motion.div
                        key={srvUniqueId}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: catIndex * 0.05 + srvIndex * 0.03 + 0.15,
                        }}
                        className="mb-2 pl-4"
                      >
                        <label
                          className={cn(
                            "flex items-center space-x-3 rounded-lg p-2.5 transition-all duration-150",
                            optionClassName,
                            isSrvComing
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer hover:bg-gradientFromBooking/5 hover:shadow-sm active:bg-gradientFromBooking/10",
                            isSrvChecked && !isSrvComing && "bg-gradientFromBooking/10"
                          )}
                          onKeyDown={(e) => handleKeyDown(e, srvUniqueId)}
                        >
                          <Checkbox
                            id={srvUniqueId}
                            checked={isSrvChecked}
                            disabled={isSrvComing}
                            onCheckedChange={() => handleToggle(srvUniqueId)}
                            className="text-[18px] transition-all duration-200"
                          />
                          <span
                            className={cn(
                              "text-[15px] font-semibold flex-1",
                              isSrvChecked && !isSrvComing
                                ? "text-gradientFromBooking"
                                : "text-textColorSelectText"
                            )}
                          >
                            {srv.name}
                            {isSrvComing && (
                              <span className="pl-2 text-xs text-textColorSelectText/70 italic">
                                (Coming Soon)
                              </span>
                            )}
                            {serviceFormattedPrice && (
                              <span className="pl-2 text-gradientFromBooking font-bold">
                                {serviceFormattedPrice}
                              </span>
                            )}
                          </span>
                        </label>

                        {/* BOOSTERS */}
                        {srv.options && srv.options.length > 0 && (
                          <div className="mt-2 pl-4 border-l-2 border-gradientFromBooking/20">
                            {srv.options.map((booster, boosterIndex) => {
                              const boosterUniqueId = booster.uniqueId!;
                              const isBoosterChecked = selectedValues.includes(boosterUniqueId);
                              const isBoosterComing = booster.status === "coming";
                              const isBoosterDisabled = !isSrvChecked;
                              const boosterFormattedPrice = formatPrice(booster.price);

                              return (
                                <motion.div
                                  key={boosterUniqueId}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.2,
                                    delay:
                                      catIndex * 0.05 +
                                      srvIndex * 0.03 +
                                      boosterIndex * 0.02 +
                                      0.2,
                                  }}
                                  className="mt-2 ml-4"
                                >
                                  <label
                                    htmlFor={boosterUniqueId}
                                    className={cn(
                                      "flex items-center space-x-3 rounded-lg p-2.5 transition-all duration-150 border",
                                      isBoosterDisabled || isBoosterComing
                                        ? "cursor-not-allowed opacity-50 border-transparent bg-gray-50/30"
                                        : isBoosterChecked
                                        ? "cursor-pointer border-gradientFromBooking/40 bg-gradientFromBooking/15 hover:bg-gradientFromBooking/20 hover:shadow-sm"
                                        : "cursor-pointer border-transparent hover:border-gradientFromBooking/20 hover:bg-gradientFromBooking/5 active:bg-gradientFromBooking/10"
                                    )}
                                    onKeyDown={(e) => handleKeyDown(e, boosterUniqueId)}
                                  >
                                    <Checkbox
                                      id={boosterUniqueId}
                                      checked={isBoosterChecked}
                                      disabled={isBoosterDisabled || isBoosterComing}
                                      onCheckedChange={() => handleToggle(boosterUniqueId)}
                                      className="text-[18px] transition-all duration-200"
                                    />
                                    <span
                                      className={cn(
                                        "text-[14px] font-medium flex-1",
                                        isBoosterChecked &&
                                          !isBoosterDisabled &&
                                          !isBoosterComing
                                          ? "text-gradientFromBooking font-semibold"
                                          : "text-textColorSelectText"
                                      )}
                                    >
                                      {booster.name}
                                      {isBoosterComing && (
                                        <span className="pl-2 text-xs text-textColorSelectText/70 italic">
                                          (Coming Soon)
                                        </span>
                                      )}
                                      {boosterFormattedPrice && (
                                        <span className="pl-2 text-gradientFromBooking font-semibold">
                                          {boosterFormattedPrice}
                                        </span>
                                      )}
                                    </span>
                                  </label>
                                </motion.div>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}

                  {catIndex < updatedOptions.length - 1 && (
                    <hr className="my-3 border-borderBooking/30" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

// Export convenience components for backward compatibility
export const MultiSelectCategories = (props: MultiSelectProps) => (
  <MultiSelect {...props} mode="categories" />
);

export const MultiSelectServices = (props: MultiSelectProps) => (
  <MultiSelect {...props} mode="services" />
);

