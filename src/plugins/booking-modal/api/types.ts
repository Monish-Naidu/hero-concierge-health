// Here we describe the structure of data returned by GraphQL API.

// NEW

export interface SelectServiceProps {
  data: {
    category?: string[]; // selected category names
    service?: ChosenServiceItem[];
  };
  onCategoryChange: (categories: string[]) => void;
  onServiceChange: (services: ChosenServiceItem[]) => void;
  preloadedCategories?: CategoryWithServices[];
  preloadedLoading?: boolean;
}

export interface CategoryWithServices {
  id: string;
  name: string;
  status?: string;
  services: ServiceInCategory[];
}

export interface Service {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  price: number | string | null;
  status: string;
  options?: Booster[];
}

export interface ChosenServiceItem {
  categoryId: string;
  serviceId: string;
  boosterId?: string;
  id: string;
  name: string;
  price?: number;
  type: "service" | "booster";
}

export interface Booster {
  id: string;
  name: string;
  price?: number | string | null;
  description?: string;
  benefit?: string;
  question?: string;
  status?: string;
}

export interface ServiceInCategory {
  id: string;
  name: string;
  price?: number | string | null;
  status?: string;
  options?: Booster[];
}

export interface MultiSelectProps {
  options: CategoryWithServices[];
  selectedValues: string[];
  onSelectionChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  optionClassName?: string;
  maxHeight?: number;
}

export interface FetchedDay {
  date: string;
  status: string;
  reason?: string;
}

export interface AvailableSlot {
  date: string;
  time: string;
  status: string;
}

// New Booking Calendar API Types
export enum DayStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  PARTIAL = "PARTIAL"
}

export enum SlotStatus {
  AVAILABLE = "AVAILABLE",
  RESERVED = "RESERVED",
  BOOKED = "BOOKED",
  NEED_CALL = "NEED_CALL",
  CLOSED = "CLOSED"
}

export interface CalendarConfig {
  timezone: string;
  dateFormat: string;
  maxBookingDays: number;
  rangeMinutes: number;
  minHoursBeforeBooking: number;
}

export interface DaySchedule {
  start: string;
  end: string;
  maxBookingsPerTimeSlot?: number;
}

export interface WeeklyWorkingHours {
  Mon?: DaySchedule;
  Tue?: DaySchedule;
  Wed?: DaySchedule;
  Thu?: DaySchedule;
  Fri?: DaySchedule;
  Sat?: DaySchedule;
  Sun?: DaySchedule;
}

export interface CalendarClosedPeriod {
  fromTime: string;
  toTime: string;
  reason: string;
}

export interface TimeSlot {
  time: string;
  status: SlotStatus;
  endTime?: string;
}

export interface SlotsSummary {
  total: number;
  available: number;
  reserved: number;
  booked: number;
  needCall: number;
  closed: number;
}

export interface CalendarDay {
  date: string;
  status: DayStatus;
  reason?: string;
  workingHours?: DaySchedule;
  closedPeriods: CalendarClosedPeriod[];
  slotsSummary: SlotsSummary;
  slots?: TimeSlot[];
}

export interface CalendarSummary {
  totalDays: number;
  openDays: number;
  closedDays: number;
  partialDays: number;
}

export interface BookingCalendar {
  config: CalendarConfig;
  defaultWorkingHours?: WeeklyWorkingHours;
  days: CalendarDay[];
  summary: CalendarSummary;
}

export interface Document {
  content: ContentClass;
  link:    string;
  title:   string;
  type:    string;
}

export interface WebsiteConfig {
  id: string;
  dateTimeFormat: string;
  email: string;
  nameCompany: string;
  timeClose: string;
  timeOpen: string;
  timezone: string;
  phoneNumber: string;
}



// OLD
export interface Fields {
  categoryId: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  price?: number | string | null;
  status?: string;
  options?: Booster[];
}

export interface Service {
  id: string;
  fields: Fields;
}


export interface WebsiteConfig {
  id: string;
  dateTimeFormat: string;
  email: string;
  nameCompany: string;
  timeClose: string;
  timeOpen: string;
  timezone: string;
  phoneNumber: string;
}

export interface Fields {
  categoryId: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  price?: number | string | null;
  options?: Booster[];
}

export interface ContentClass {
  description: string;
  sections:    Section[];
  title:       string;
}

export interface Section {
  content: ContentUnion;
  title:   string;
}

export type ContentUnion = string[] | string;

