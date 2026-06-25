
export interface IHeader {
  menu: Menu[];
  appointmentButton: AppointmentButton;
}

export interface Menu {
  title: string;
  link: string;
  id: string;
}

export interface AppointmentButton {
  text: string;
  link: string;
}


export interface Services {
  title: string;
  items: Item[];
}

export interface Item {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
}


export interface Features {
  title: string;
  items: Item2[];
  imageUrl: string;
}

export interface Item2 {
  title: string;
  iconUrl: string;
}



export interface CtaButton2 {
  text: string;
  link: string;
}





// Types for the service data
export interface CTA {
  title: string;
  description: string;
  labelButton: string;
}

export interface Info {
  title: string;
  description: string;
}

export interface Benefit {
  title: string;
  items: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
}

export interface Question {
  question: string;
  answer: string;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  active: string;
  header: IHeader;
  slug: string;
  photo: string;
  title: string;
  description: string;
  labelButton: string;
  info: Info;
  benefits: Benefit;
  cta: CTA;
  questions: Question[];
  medications: Medications;
  options: Option[];
  content: {
    title: string;
    description: string;
    photo: string;
  };
  infusion: Infusion[];
  services: Services;
  faq: Faq[];
}

export interface Option {
  _id: string;
  name: string;
  price: string | number;
  question?: string;
}



export interface Faq {
  id: string;
  question: string;
  answer: string;
  isExpanded: boolean;
  group: string;
}

export interface BookingOption {
  _id: string;
  benefit: string;
  description: string;
  name: string;
  price: number;
  question: string;
}

export interface Booking {
  _id: string;
  categoryId: string;
  categoryName: string;
  createdAt: string; // або можна використати Date, якщо конвертуєте рядок у дату
  name: string;
  options: BookingOption[];
  price: string; // якщо у відповіді приходить рядок, або можна конвертувати в number
  status: string;
  updatedAt: string;
}

export interface Infusion {
  id: string;
  name: string;
  slug: string;
  pricePerSession: number;
  description: string;
  benefits: string[];
  bookingId: Booking[]; // тепер це масив об'єктів Booking
  ingredients: string[];
  frequency: string;
  optionalBoosters: OptionalBooster[];
  imageUrl: string;
}

export interface OptionalBooster {
  id: string;
  name: string;
  price: number | string;
  description: string;
  benefit: string;
  question: string;
}

export interface Medications {
  title: string;
  description: string;
  items: Item[];
}


export interface BasicServiceItem {
  title: string;
  description?: string;
  link: string;
  imageUrl: string;
}

export interface Item {
  title: string;
  features: string[];
  color: string;
  imageSrc: string;
  imagePosition: string;
}

export interface BoosterOption {
  id: string;
  name: string;
  price: string | number;
  description: string;
  benefit: string;
  question: string;
}

export interface BookingService {
  id: string;
  slug: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  frequency: string;
  imageURL: string;
  categoryId: string;
  name: string;
  categoryName: string;
  price: string | number;
  status: string;
  options?: BoosterOption[];
}

export interface ServiceCardType {
  name: string;
  image: string;
  description?: string;
  link?: string;
  points?: string[];
  pointsTitle?: string;
  ctaText?: string;
}

export interface DocumentType {
  id: string;
  type: string;
  title: string;
  link?: string;
  content: {
    title: string;
    description?: string;
    sections?: Array<{
      title: string;
      content: string | string[];
    }>;
  };
}

export interface PointType {
  title: string;
  image: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface StructureData {
  _id?: {
    $oid: string;
  };
  headers?: Array<{
    id: string;
    pages?: string[];
    menu?: Array<{
      label: string;
      link: string;
    }>;
  }>;
  seo?: Record<string, any>;
  home?: any;
  services?: Record<string, any>;
  documents?: DocumentType[];
}




