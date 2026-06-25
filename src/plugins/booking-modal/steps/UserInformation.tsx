"use client";

import { Input } from "@/plugins/booking-modal/ui/input";
import { Label } from "@/plugins/booking-modal/ui/label";
import { useEffect, useState } from "react";
import { BookingData } from "@/plugins/booking-modal/types";
import { motion } from "framer-motion";
import { User, Mail, Phone, ChevronDown } from "lucide-react";
import { BookingStep } from "@/plugins/booking-modal/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/plugins/booking-modal/ui/select";
import { cn } from "@/plugins/booking-modal/utils/cn";

/** Props for UserInformation */
interface UserInformationProps {
    data: BookingData;
    onInformationChange: (
        info: { fullName: string; email: string; phone: string },
        hasErrors: boolean
    ) => void;

    /** If service name needs to be displayed in this component */
    serviceName?: string;
    currentStep: BookingStep;
    isTransitioning: boolean;
    isNextDisabled: boolean;
    errorMsg: string | null;
    onNext: () => void;
    onBack: () => void;
    isLoadingDateTime?: boolean;
}

export function UserInformation({
                                    data,
                                    onInformationChange,
                                    serviceName,
                                    currentStep,
                                    isTransitioning,
                                    isNextDisabled,
                                    errorMsg,
                                    onNext,
                                    onBack,
                                    isLoadingDateTime = false,
                                }: UserInformationProps) {
    const countries = [
        { code: "US", dialCode: "+1", name: "United States", flag: "🇺🇸" },
        { code: "CA", dialCode: "+1", name: "Canada", flag: "🇨🇦" },
        { code: "GB", dialCode: "+44", name: "United Kingdom", flag: "🇬🇧" },
        { code: "AU", dialCode: "+61", name: "Australia", flag: "🇦🇺" },
        { code: "DE", dialCode: "+49", name: "Germany", flag: "🇩🇪" },
        { code: "FR", dialCode: "+33", name: "France", flag: "🇫🇷" },
        { code: "IT", dialCode: "+39", name: "Italy", flag: "🇮🇹" },
        { code: "ES", dialCode: "+34", name: "Spain", flag: "🇪🇸" },
        { code: "NL", dialCode: "+31", name: "Netherlands", flag: "🇳🇱" },
        { code: "BE", dialCode: "+32", name: "Belgium", flag: "🇧🇪" },
        { code: "CH", dialCode: "+41", name: "Switzerland", flag: "🇨🇭" },
        { code: "AT", dialCode: "+43", name: "Austria", flag: "🇦🇹" },
        { code: "SE", dialCode: "+46", name: "Sweden", flag: "🇸🇪" },
        { code: "NO", dialCode: "+47", name: "Norway", flag: "🇳🇴" },
        { code: "DK", dialCode: "+45", name: "Denmark", flag: "🇩🇰" },
        { code: "FI", dialCode: "+358", name: "Finland", flag: "🇫🇮" },
        { code: "PL", dialCode: "+48", name: "Poland", flag: "🇵🇱" },
        { code: "CZ", dialCode: "+420", name: "Czech Republic", flag: "🇨🇿" },
        { code: "IE", dialCode: "+353", name: "Ireland", flag: "🇮🇪" },
        { code: "PT", dialCode: "+351", name: "Portugal", flag: "🇵🇹" },
    ];

    const formatPhoneNumber = (value: string) => {
        const digits = value.replace(/\D/g, "");
        if (digits.length > 6) {
            return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
        } else if (digits.length > 3) {
            return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        }
        return digits;
    };

    const parsePhoneNumber = (phone: string) => {
        if (!phone) return { countryCode: "US", phoneNumber: "" };
        
        for (const country of countries) {
            if (phone.startsWith(country.dialCode)) {
                const number = phone.replace(country.dialCode, "").trim().replace(/\D/g, "");
                return {
                    countryCode: country.code,
                    phoneNumber: formatPhoneNumber(number),
                };
            }
        }
        
        const number = phone.replace(/^\+?1/, "").trim().replace(/\D/g, "");
        return { countryCode: "US", phoneNumber: formatPhoneNumber(number) };
    };

    const initialPhone = parsePhoneNumber(data.phone || "");
    
    const [formData, setFormData] = useState({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
    });
    
    const [selectedCountry, setSelectedCountry] = useState<string>(initialPhone.countryCode);
    const [phoneNumber, setPhoneNumber] = useState<string>(initialPhone.phoneNumber);
    const [countrySelectOpen, setCountrySelectOpen] = useState(false);

    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        phone: "",
    });

    /** Email validation */
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    /** Phone validation (min. 10 digits) */
    const validatePhone = (phone: string) => {
        return phone.replace(/\D/g, "").length >= 10;
    };

    useEffect(() => {
        const country = countries.find((c) => c.code === selectedCountry);
        if (country) {
            const fullPhone = phoneNumber ? `${country.dialCode}${phoneNumber.replace(/\D/g, "")}` : "";
            setFormData((prev) => ({ ...prev, phone: fullPhone }));
        }
    }, [selectedCountry, phoneNumber]);

    // Control body overflow when Select dropdown is open
    useEffect(() => {
        const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
        if (isDesktop) {
            if (countrySelectOpen) {
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
    }, [countrySelectOpen]);

    useEffect(() => {
        const fullNameError =
            formData.fullName.trim() === "" ? "Full name is required" : "";
        let emailError = "";
        if (formData.email.trim() === "") {
            emailError = "Email is required";
        } else if (!validateEmail(formData.email)) {
            emailError = "Invalid email address";
        }
        let phoneError = "";
        if (formData.phone.trim() === "") {
            phoneError = "Phone number is required";
        } else {
            const digitsOnly = phoneNumber.replace(/\D/g, "");
            if (digitsOnly.length < 10) {
                phoneError = "Phone number must have at least 10 digits";
            }
        }

        setErrors({
            fullName: fullNameError,
            email: emailError,
            phone: phoneError,
        });

        const hasErrors = !!(fullNameError || emailError || phoneError);

        onInformationChange(formData, hasErrors);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData, phoneNumber, selectedCountry]);

    return (
        <motion.form
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
                        <User className="h-6 w-6 text-white" />
                    </motion.div>
                    <h2 className="bg-gradient-to-r from-textColorMain via-gradientFromBooking to-textColorMain bg-clip-text text-[35px] font-bold text-transparent lg:text-[45px]">
                        Your Information
                    </h2>
                </div>

                {serviceName && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="text-center text-sm text-textColorSelectText mb-2"
                    >
                        Service: <span className="font-semibold text-gradientFromBooking">{serviceName}</span>
                    </motion.p>
                )}

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="text-center text-[16px] font-medium text-textColorSelectText lg:text-[18px]"
                >
                    Please provide your details for the booking
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                className="space-y-6"
            >
                {/* Full Name */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                    className="mx-auto max-w-[600px] space-y-2.5 text-textColorMain"
                >
                    <Label htmlFor="fullName" className="flex items-center gap-2 text-sm font-semibold text-textColorSelectText uppercase tracking-wider">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-gradientFromBooking/20 to-gradientToBooking/20">
                            <User className="h-3.5 w-3.5 text-gradientFromBooking" />
                        </div>
                        <span>Full Name *</span>
                    </Label>
                    <div className="relative">
                        <Input
                            id="fullName"
                            placeholder="e.g John Doe"
                            className={`h-[52px] w-full rounded-[12px] border-2 border-borderBooking bg-[#F5F8FF] pl-4 text-left text-[15px] font-medium outline-none transition-all duration-200 hover:border-gradientFromBooking/50 hover:bg-white hover:shadow-md focus:border-gradientFromBooking focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-gradientFromBooking/20 ${
                                formData.fullName && !errors.fullName ? 'pr-12' : 'pr-4'
                            }`}
                            value={formData.fullName}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                            }
                        />
                        {formData.fullName && !errors.fullName && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute right-3 inset-y-0 flex items-center justify-center pointer-events-none"
                            >
                                <svg className="h-5 w-5 text-gradientFromBooking" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>
                        )}
                    </div>
                    {errors.fullName && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2"
                        >
                            <span className="text-red-500 text-sm font-medium">•</span>
                            <span className="text-red-600 text-sm">{errors.fullName}</span>
                        </motion.div>
                    )}
                </motion.div>

                {/* Email */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
                    className="mx-auto max-w-[600px] space-y-2.5 text-textColorMain"
                >
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-textColorSelectText uppercase tracking-wider">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-gradientFromBooking/20 to-gradientToBooking/20">
                            <Mail className="h-3.5 w-3.5 text-gradientFromBooking" />
                        </div>
                        <span>Email *</span>
                    </Label>
                    <div className="relative">
                        <Input
                            id="email"
                            type="email"
                            placeholder="e.g john@email.com"
                            className={`h-[52px] w-full rounded-[12px] border-2 border-borderBooking bg-[#F5F8FF] pl-4 text-left text-[15px] font-medium outline-none transition-all duration-200 hover:border-gradientFromBooking/50 hover:bg-white hover:shadow-md focus:border-gradientFromBooking focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-gradientFromBooking/20 ${
                                formData.email && !errors.email ? 'pr-12' : 'pr-4'
                            }`}
                            value={formData.email}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, email: e.target.value }))
                            }
                        />
                        {formData.email && !errors.email && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute right-3 inset-y-0 flex items-center justify-center pointer-events-none"
                            >
                                <svg className="h-5 w-5 text-gradientFromBooking" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>
                        )}
                    </div>
                    {errors.email && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2"
                        >
                            <span className="text-red-500 text-sm font-medium">•</span>
                            <span className="text-red-600 text-sm">{errors.email}</span>
                        </motion.div>
                    )}
                </motion.div>

                {/* Phone */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
                    className="mx-auto max-w-[600px] space-y-2.5 text-textColorMain"
                >
                    <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-textColorSelectText uppercase tracking-wider">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-gradientFromBooking/20 to-gradientToBooking/20">
                            <Phone className="h-3.5 w-3.5 text-gradientFromBooking" />
                        </div>
                        <span>Phone Number *</span>
                    </Label>
                    <div className="relative flex gap-2">
                        {/* Country Select */}
                        <Select
                            value={selectedCountry}
                            onValueChange={setSelectedCountry}
                            open={countrySelectOpen}
                            onOpenChange={setCountrySelectOpen}
                        >
                            <SelectTrigger
                                className={cn(
                                    "h-[52px] w-[140px] rounded-[12px] border-2 border-borderBooking bg-[#F5F8FF] text-left outline-none transition-all duration-200 hover:border-gradientFromBooking/50 hover:bg-white hover:shadow-md focus:border-gradientFromBooking focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-gradientFromBooking/20",
                                    "text-[15px] font-semibold text-textColorSelectText flex-shrink-0"
                                )}
                            >
                                <SelectValue>
                                    {(() => {
                                        const country = countries.find((c) => c.code === selectedCountry);
                                        return country ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">{country.flag}</span>
                                                <span>{country.dialCode}</span>
                                            </div>
                                        ) : (
                                            "+1"
                                        );
                                    })()}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent
                                className={cn(
                                    "rounded-[12px] border border-borderBooking bg-white shadow-xl max-h-[300px]"
                                )}
                            >
                                {countries.map((country) => (
                                    <SelectItem
                                        key={country.code}
                                        value={country.code}
                                        className={cn(
                                            "text-[15px] font-semibold text-textColorSelectText cursor-pointer",
                                            "hover:bg-gradientFromBooking/5 focus:bg-gradientFromBooking/10",
                                            "data-[highlighted]:bg-gradientFromBooking/10 data-[highlighted]:text-gradientFromBooking"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{country.flag}</span>
                                            <span className="flex-1">{country.name}</span>
                                            <span className="text-textColorSelectText/70">{country.dialCode}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Phone Number Input */}
                        <div className="relative flex-1">
                            <div className="relative">
                                <div 
                                    className={cn(
                                        "absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[15px] font-medium text-textColorMain z-10",
                                        !phoneNumber && "text-textColorSelectText/50"
                                    )}
                                >
                                    {phoneNumber || "(   )    -"}
                                </div>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={phoneNumber.replace(/\D/g, "")}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        const limitedValue = value.slice(0, 10);
                                        setPhoneNumber(formatPhoneNumber(limitedValue));
                                    }}
                                    className={cn(
                                        "h-[52px] w-full rounded-[12px] border-2 border-borderBooking bg-[#F5F8FF] pl-4 text-left text-[15px] font-medium outline-none transition-all duration-200 hover:border-gradientFromBooking/50 hover:bg-white hover:shadow-md focus:border-gradientFromBooking focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-gradientFromBooking/20",
                                        "text-transparent caret-textColorMain",
                                        phoneNumber && !errors.phone ? 'pr-12' : 'pr-4'
                                    )}
                                    placeholder=""
                                />
                                {phoneNumber && !errors.phone && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute right-3 inset-y-0 flex items-center justify-center pointer-events-none z-20"
                                    >
                                        <svg className="h-5 w-5 text-gradientFromBooking" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                    {errors.phone && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2"
                        >
                            <span className="text-red-500 text-sm font-medium">•</span>
                            <span className="text-red-600 text-sm">{errors.phone}</span>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </motion.form>
    );
}
