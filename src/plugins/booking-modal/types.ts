// booking-modal/types.ts

export type BookingStep =
    | "service"
    | "datetime"
    | "information"
    | "confirm"
    | "verify"
    | "success"
    | "call";

/** Selected service */
export interface ChosenServiceItem {
    categoryId: string;
    serviceId: string;
    boosterId?: string;
    id: string;
    name: string;
    price?: number;
    type: "service" | "booster";
}

/** Booking data */
export interface BookingData {
    category: string[];
    service: ChosenServiceItem[];
    dates: Date[];
    time?: string;
    slotStatus?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    bookingId?: string;
}

/** Props for bookingModal */
export interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}
