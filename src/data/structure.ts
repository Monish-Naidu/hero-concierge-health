import type { StructureData } from '@/api/types';

// Shared constants to avoid repetition
const freeConsultationMenuItem = {
  "label": "Contact Hero",
  "link": ""
};

const partnersData = [
  {
    "name": "Harvard Medical School",
    "logo": "/images/harvard.webp"
  },
  {
    "name": "Columbia",
    "logo": "/images/columbia.webp"
  }
];

const partnersInWellnessDescription = "At Hero Concierge Health, our clinicians bring world-class knowledge and training to every consultation.";
const partnersInWellnessContent = "With advanced education, including certification in hormone optimization from Harvard and weight management therapy from Columbia, we combine cutting-edge science with personalized care to help every patient reach their full potential.";

const clinicContact = {
  "email": "info@heromenshealth.com",
  "address": "1416 W Belmont Ave, Chicago, IL 60657",
  "phone": "+1 (312) 465-4653"
};

const scheduleOnlineConsultationText = "Schedule Your Free Online Consultation";
const bookTodayCTAText = "Schedule Your Consultation Today!";

// Shared new-location section data
const newLocationSection = {
  "id": "new-location",
  "title": "Visit us at our clinic conveniently located in the Lakeview Neighborhood!",
  "subtitle": "Expert Care in the Heart of Lakeview",
  "address": "1416 W Belmont Ave, Chicago, IL 60657",
  "description": "Our Lakeview clinic is open and seeing patients. Come in for your labs, exams, and treatments — or connect with our care team by telehealth from anywhere. Personalized, concierge care on your schedule.",
  "map": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d-122.41941508468183!3d37.77492977975817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c2f4d5e3b%3A0x61e4b5703a7d8b9a!2s1416%20W%20Belmont%20Ave%2C%20Chicago%2C%20IL%2060640%2C%20USA!5e0!3m2!1sen!2sus!4v1684729230187!5m2!1sen!2sus",
  "mapLink": "https://maps.google.com/maps?dir//1416+W+Belmont+Ave+Chicago,+IL+60657",
  "directionsText": "Directions",
  "contact": clinicContact,
  "disclaimer": "Products may include compounded products which have not been approved by the FDA. The FDA does not verify the safety or effectiveness of compounded drugs. Treatments require a consultation with a healthcare provider who will determine if a treatment is appropriate. The information conveyed on the Hero Concierge Health website is not intended to act as a substitute for professional medical advice, or to diagnose, treat, cure, mitigate or prevent any disease or serious medical condition. All content, including text, blog posts, educational materials, graphics, images and information, contained on or available through this website is for general information purposes only. Such content is not intended to replace an evaluation with a qualified healthcare professional of your choosing and is not intended as medical advice. We do not provide medical advice on this website and are not responsible for your reliance on any information provided on this website. Many therapies available at Hero Concierge Health are not approved by the U.S. Food and Drug Administration and are offered and provided by licensed medical professionals acting in their sole and independent discretion. Certain of these therapies may be characterized as novel or experimental and as such their safety and efficacy may not be fully established by conventional means. It is important to understand that while we endeavor to provide accurate information about the therapies we offer, we make no guarantees regarding their effectiveness or suitability for your unique needs. Testimonials on our website reflect real life experiences and opinions of our clients, apply solely to the relevant individual, and are not necessarily representative of all clients who purchase Hero Concierge Health products and services. Results do vary, all clients will not have the same experience, and some services may be unsuccessful. Testimonials are not intended to make claims that our products and services diagnose, treat, cure, mitigate or prevent any disease. Medical services available to clients of Hero Concierge Health are provided by an independent medical practice. Prices and services may vary per location and are subject to change without warning. Terms and restrictions may apply."
};

export const structureData: StructureData = {
  "_id": {
    "$oid": "67a08567bfb74289c01c2405"
  },
  "headers": [
    {
      "id": "home-header",
      "pages": [
        "/"
      ],
      "menu": [
        {
          "label": "Home",
          "link": "/#"
        },
        {
          "label": "About",
          "link": "/about"
        },
        {
          "label": "How It Works",
          "link": "/how-it-works"
        },
        {
          "label": "Services",
          "link": "/#services"
        },
        {
          "label": "Membership",
          "link": "/membership"
        },
        {
          "label": "The Clinic",
          "link": "/clinic"
        },
        freeConsultationMenuItem
      ]
    },
    {
      "id": "service-header",
      "pages": [
        "/services/hormone-optimization",
        "/services/weight-optimization",
        "/services/nad-therapy",
        "/services/sexual-health",
        "/services/aesthetics"
      ],
      "menu": [
        {
          "label": "Home",
          "link": "/"
        },
        {
          "label": "About",
          "link": "/about"
        },
        {
          "label": "How It Works",
          "link": "/how-it-works"
        },
        {
          "label": "Services",
          "link": "/#services"
        },
        {
          "label": "Membership",
          "link": "/membership"
        },
        {
          "label": "The Clinic",
          "link": "/clinic"
        },
        freeConsultationMenuItem
      ]
    }
  ],
  "seo": {
    "home": {
      "title": "Hero Concierge Health | Chicago's Premier Concierge Health Group",
      "description": "Chicago's premier concierge health group for men and women. Real telehealth backed by an actual physical clinic in Lakeview. Expert hormone optimization, GLP-1 weight loss, sexual health, NAD therapy, and aesthetics.",
      "keywords": "concierge medicine Chicago, concierge clinic Chicago, telehealth Chicago, hormone optimization men and women, menopause treatment Chicago, GLP-1 weight loss, NAD therapy, sexual health, aesthetics, botox Chicago, Lakeview clinic",
      "ogTitle": "Hero Concierge Health | Chicago's Premier Concierge Health Group",
      "ogDescription": "Join Hero Concierge Health. Real telehealth backed by a real Chicago clinic. One-stop concierge care for men and women: hormone optimization, GLP-1 weight loss, sexual health, NAD therapy, and aesthetics. Book a free consultation.",
      "ogImage": "https://hero-concierge-health.vercel.app/images/og-hero-chicago.jpg",
      "ogUrl": "https://hero-concierge-health.vercel.app/",
      "twitterCard": "summary_large_image",
      "twitterTitle": "Hero Concierge Health | Chicago's Premier Concierge Health Group",
      "twitterDescription": "Chicago's premier concierge health group for men and women. Real telehealth backed by a real Lakeview clinic.",
      "twitterImage": "https://hero-concierge-health.vercel.app/images/og-hero-chicago.jpg",
      "twitterSite": "@HeroConcierge",
      "twitterCreator": "@HeroConcierge",
      "canonical": "https://heromenshealth.com/",
      "structuredData": {
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "name": "Hero Concierge Health",
        "description": "Chicago's premier concierge health group for men and women, offering telehealth backed by a real Lakeview clinic and specializing in hormone optimization, GLP-1 weight loss, sexual health, NAD therapy, and aesthetics.",
        "url": "https://heromenshealth.com",
        "telephone": "+1-312-687-9436",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1416 W Belmont Ave",
          "addressLocality": "Chicago",
          "addressRegion": "IL",
          "postalCode": "60657",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "41.9397",
          "longitude": "-87.6534"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        "medicalSpecialty": ["Concierge Medicine", "Hormone Therapy", "Weight Management", "Sexual Health"],
        "priceRange": "$$"
      }
    },
    "hormone-optimization": {
      "title": "Hormone Optimization Chicago | TRT & Menopause Care | Hero Concierge Health",
      "description": "Personalized hormone optimization in Chicago for men and women. Testosterone replacement therapy (TRT) for men and hormone, perimenopause, and menopause balance for women. Boost energy, mood, and vitality. Free consultation available.",
      "keywords": "hormone optimization Chicago, hormone optimization men and women, TRT Chicago, testosterone therapy, menopause treatment Chicago, perimenopause care, hormone replacement therapy, hormone balance, concierge hormone clinic Chicago",
      "ogTitle": "Hormone Optimization Chicago | TRT & Menopause Care | Hero Concierge Health",
      "ogDescription": "Unlock renewed energy, balanced mood, and improved well-being with a personalized hormone plan for men and women. Expert TRT and menopause care in Chicago.",
      "ogImage": "https://heromenshealth.com/image/services/hormone-optimization/increased-energy-and-stamina.webp",
      "ogUrl": "https://heromenshealth.com/services/hormone-optimization",
      "twitterCard": "summary_large_image",
      "twitterTitle": "Hormone Optimization Chicago | TRT & Menopause Care",
      "twitterDescription": "Personalized hormone optimization for men and women. TRT and menopause balance to restore energy, mood, and vitality.",
      "twitterImage": "https://heromenshealth.com/image/services/hormone-optimization/increased-energy-and-stamina.webp",
      "twitterSite": "@HeroConcierge",
      "twitterCreator": "@HeroConcierge",
      "canonical": "https://heromenshealth.com/services/hormone-optimization",
      "structuredData": {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": "Hormone Optimization for Men & Women",
        "description": "Personalized hormone optimization for men and women, including TRT and menopause/perimenopause balance, to restore energy, mood, and overall vitality.",
        "medicalSpecialty": "Endocrinology",
        "provider": {
          "@type": "MedicalBusiness",
          "name": "Hero Concierge Health",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1416 W Belmont Ave",
            "addressLocality": "Chicago",
            "addressRegion": "IL",
            "postalCode": "60657"
          }
        }
      }
    },
    "weight-optimization": {
      "title": "GLP-1 Weight Loss & Weight Optimization Chicago | Hero Concierge Health",
      "description": "Medically supervised, GLP-1 weight loss in Chicago for men and women. Personalized nutrition, clinical support, and physician oversight for sustainable results. Free consultation available.",
      "keywords": "GLP-1 weight loss Chicago, medical weight loss Chicago, semaglutide Chicago, tirzepatide Chicago, weight optimization, sustainable weight loss, weight management Chicago, concierge weight loss clinic",
      "ogTitle": "GLP-1 Weight Loss & Weight Optimization Chicago | Hero Concierge Health",
      "ogDescription": "Reach a healthier weight with a medically supervised GLP-1 program—personalized nutrition, clinical support, and physician oversight every step of the way.",
      "ogImage": "https://heromenshealth.com/image/services/weight-optimization/sustained-weight-loss.webp",
      "ogUrl": "https://heromenshealth.com/services/weight-optimization",
      "twitterCard": "summary_large_image",
      "twitterTitle": "GLP-1 Weight Loss & Weight Optimization Chicago",
      "twitterDescription": "Medically supervised GLP-1 weight loss for men and women, with personalized nutrition and clinical support.",
      "twitterImage": "https://heromenshealth.com/image/services/weight-optimization/sustained-weight-loss.webp",
      "twitterSite": "@HeroConcierge",
      "twitterCreator": "@HeroConcierge",
      "canonical": "https://heromenshealth.com/services/weight-optimization",
      "structuredData": {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": "GLP-1 Weight Optimization & Medical Weight Loss",
        "description": "Medically supervised GLP-1 weight loss program combining personalized nutrition, clinical support, and physician oversight for sustainable results.",
        "medicalSpecialty": "Weight Management",
        "provider": {
          "@type": "MedicalBusiness",
          "name": "Hero Concierge Health",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1416 W Belmont Ave",
            "addressLocality": "Chicago",
            "addressRegion": "IL",
            "postalCode": "60657"
          }
        }
      }
    },
    "nad-therapy": {
      "title": "NAD Therapy & IV Infusion Chicago | Hero Concierge Health",
      "description": "Recharge your cells with NAD+ therapy in Chicago. Boost energy, sharpen focus, support cellular health, and unlock anti-aging benefits. Clinically guided NAD infusions for men and women. Free consultation available.",
      "keywords": "NAD therapy Chicago, NAD+ infusion, IV therapy Chicago, cellular rejuvenation, anti-aging therapy, energy boost, brain function, DNA repair, mitochondrial health, IV infusion Chicago",
      "ogTitle": "NAD Therapy & IV Infusion Chicago | Hero Concierge Health",
      "ogDescription": "Boost energy, sharpen focus, and support overall wellness with a clinically guided NAD program. Recharge your cells for renewed vitality.",
      "ogImage": "https://heromenshealth.com/image/services/nad-therapy/enhanced-cellular-energy-and-vitality.webp",
      "ogUrl": "https://heromenshealth.com/services/nad-therapy",
      "twitterCard": "summary_large_image",
      "twitterTitle": "NAD Therapy & IV Infusion Chicago",
      "twitterDescription": "Recharge your cells with NAD+ therapy. Boost energy, sharpen focus, and unlock anti-aging benefits.",
      "twitterImage": "https://heromenshealth.com/image/services/nad-therapy/enhanced-cellular-energy-and-vitality.webp",
      "twitterSite": "@HeroConcierge",
      "twitterCreator": "@HeroConcierge",
      "canonical": "https://heromenshealth.com/services/nad-therapy",
      "structuredData": {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": "NAD+ Therapy & IV Infusion",
        "description": "Clinically guided NAD+ therapy to boost energy, enhance cognitive function, support cellular health, and unlock anti-aging benefits.",
        "medicalSpecialty": "Regenerative Medicine",
        "provider": {
          "@type": "MedicalBusiness",
          "name": "Hero Concierge Health",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1416 W Belmont Ave",
            "addressLocality": "Chicago",
            "addressRegion": "IL",
            "postalCode": "60657"
          }
        }
      }
    },
    "sexual-health": {
      "title": "Sexual Health & Intimacy Treatment Chicago | Hero Concierge Health",
      "description": "Reclaim your confidence with advanced sexual health solutions in Chicago for men and women. Libido enhancement, intimacy, and personalized therapies. Discreet, medically backed treatments for improved confidence and intimacy. Free consultation available.",
      "keywords": "sexual health Chicago, low libido treatment, libido enhancement men and women, intimacy treatment, ED treatment Chicago, sexual wellness, sexual confidence, discreet sexual health clinic Chicago",
      "ogTitle": "Sexual Health & Intimacy Treatment Chicago | Hero Concierge Health",
      "ogDescription": "Address intimacy concerns, boost libido, and reignite connection with personalized, medically backed treatments for men and women.",
      "ogImage": "https://heromenshealth.com/image/services/sexual-health/improved-erectile-function.webp",
      "ogUrl": "https://heromenshealth.com/services/sexual-health",
      "twitterCard": "summary_large_image",
      "twitterTitle": "Sexual Health & Intimacy Treatment Chicago",
      "twitterDescription": "Reclaim your confidence with advanced sexual health solutions for men and women. Libido enhancement and intimacy care.",
      "twitterImage": "https://heromenshealth.com/image/services/sexual-health/improved-erectile-function.webp",
      "twitterSite": "@HeroConcierge",
      "twitterCreator": "@HeroConcierge",
      "canonical": "https://heromenshealth.com/services/sexual-health",
      "structuredData": {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": "Sexual Health & Intimacy Treatment",
        "description": "Advanced sexual health solutions for men and women, including libido enhancement, intimacy care, and personalized therapies for improved confidence and connection.",
        "medicalSpecialty": "Sexual Medicine",
        "provider": {
          "@type": "MedicalBusiness",
          "name": "Hero Concierge Health",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1416 W Belmont Ave",
            "addressLocality": "Chicago",
            "addressRegion": "IL",
            "postalCode": "60657"
          }
        }
      }
    },
    "aesthetics": {
      "title": "Aesthetics & Botox Chicago | Hero Concierge Health",
      "description": "Refresh your look with expertly applied Botox and aesthetic treatments in Chicago for men and women. Smooth, natural results—no frozen face, no fuss. Wrinkle reduction and a refreshed, natural look. Free consultation available.",
      "keywords": "Botox Chicago, aesthetics Chicago, wrinkle treatment, facial rejuvenation, anti-aging, cosmetic Botox men and women, natural Botox results, medical aesthetics Chicago, concierge aesthetics clinic",
      "ogTitle": "Aesthetics & Botox Chicago | Hero Concierge Health",
      "ogDescription": "Refresh your look with expertly applied Botox and aesthetic treatments for men and women. Smooth, natural wrinkle reduction—no frozen face, no fuss.",
      "ogImage": "https://heromenshealth.com/image/services/aesthetics/refreshed-appearance.webp",
      "ogUrl": "https://heromenshealth.com/services/aesthetics",
      "twitterCard": "summary_large_image",
      "twitterTitle": "Aesthetics & Botox Chicago",
      "twitterDescription": "Refresh your look with expertly applied Botox and aesthetics. Smooth, natural results that boost confidence.",
      "twitterImage": "https://heromenshealth.com/image/services/aesthetics/refreshed-appearance.webp",
      "twitterSite": "@HeroConcierge",
      "twitterCreator": "@HeroConcierge",
      "canonical": "https://heromenshealth.com/services/aesthetics",
      "structuredData": {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": "Aesthetics & Botox Treatment",
        "description": "Expertly applied Botox and aesthetic treatments for men and women, delivering natural-looking wrinkle reduction and a refreshed appearance.",
        "medicalSpecialty": "Cosmetic Medicine",
        "provider": {
          "@type": "MedicalBusiness",
          "name": "Hero Concierge Health",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1416 W Belmont Ave",
            "addressLocality": "Chicago",
            "addressRegion": "IL",
            "postalCode": "60657"
          }
        }
      }
    }
  },
  "home": {
    "slug": "/",
    "hero": {
      "video": "/videos/main-page.mp4",
      "title": "Concierge Health,",
      "short_title": "Done Right",
      "subtitle": "Hero Concierge Health is Chicago’s premier concierge health group for men and women — real telehealth backed by an actual clinic in Lakeview. One team, one place for hormone optimization, weight loss, sexual health, NAD therapy, and aesthetics.",
      "ctaText": "Contact Hero"
    },
    "sections": [
      {
        "id": "membership-signup",
        "title": "Hero Concierge Health",
        "content": [
          "Hero Concierge Health is a one-stop concierge clinic for men and women, combining real telehealth with an actual physical clinic in Chicago’s Lakeview neighborhood. Our team brings focused expertise in hormone optimization, medically supervised weight loss, sexual wellness, NAD therapy, and aesthetics, all delivered with a high-touch, judgment-free approach.",
          "Every treatment plan is built around you—your labs, your lifestyle, and your long-term goals—with seamless care online and in person."
        ],
        "ctaText": "Schedule your visit today!",
        "exclusive-offers": [
          {
            "title": "Limited Time Offer",
            "subtitle1": "FREE Lab Panel",
            "subtitle2": "$99",
            "subtitle3": "For New Patients to Sign Up",
            "image": "/images/doctors/rishi-gaiha.webp"
          }
        ]
      },
      {
        "id": "as-seen-on",
        "title": "As Seen On",
        "data": [
          {
            "id": "1-line",
            "logos": [
              "/images/logos/1.svg",
              "/images/logos/2.svg",
              "/images/logos/3.svg",
              "/images/logos/4.svg"
            ]
          },
          {
            "id": "2-line",
            "logos": [
              "/images/logos/5.svg",
              "/images/logos/6.svg",
              "/images/logos/7.svg",
              "/images/logos/8.svg"
            ]
          }
        ]
      },
      {
        "id": "why-choose-us",
        "title": "Why Choose Us?",
        "description": "At Hero Concierge Health, we help you restore energy, confidence, and vitality with personalized care—hormone optimization, weight loss, sexual health, NAD therapy, and aesthetics—delivered through real telehealth backed by a real Chicago clinic.",
        "sections": [
          {
            "icons": "Award",
            "title": "Board Certified Medical Professionals",
            "description": "Our doctors & clinicians have years of experience and specialize in the latest treatment methods.",
            "pointsTitle": "Why It Matters:",
            "points": [
              "Expert medical guidance",
              "Latest treatment methods",
              "Years of proven experience"
            ]
          },
          {
            "icons": "UserCheck",
            "title": "Personalized Health Plans",
            "description": "Each client receives a customized program tailored to their unique needs.",
            "pointsTitle": "Benefits:",
            "points": [
              "Tailored to your unique needs",
              "Customized treatment programs",
              "Individual attention and care"
            ]
          },
          {
            "icons": "Sparkles",
            "title": "Advanced Technology",
            "description": "We use only the most advanced technology and methodologies for optimal results.",
            "pointsTitle": "Advantages:",
            "points": [
              "Cutting-edge technology",
              "Modern methodologies",
              "Optimal treatment results"
            ]
          }
        ]
      },
      {
        "id": "unlock-power",
        "title": "Featured Services",
        "subtitle": "Your Partners in Whole-Person Wellness",
        "description": "At Hero Concierge Health, our clinicians bring world-class knowledge and training to every consultation. With advanced education, including certification in hormone optimization from Harvard and weight management therapy from Columbia, we combine cutting-edge science with personalized care to help every patient reach their full potential.",
        "services": [
          {
            "name": "Hormone Optimization",
            "description": "Restore balance with our hormone optimization program for men and women—TRT for men and hormone, perimenopause, and menopause support for women—turning fatigue into renewed energy.",
            "pointsTitle": "Benefits",
            "points": [
              "Increased energy and improved mood",
              "Support for physical and emotional well-being",
              "Personalized monitoring for consistent results"
            ],
            "ctaText": "Explore Hormone Solutions",
            "image": "/image/services/hormone-optimization/increased-energy-and-stamina.webp",
            "link": "/services/hormone-optimization"
          },
          {
            "name": "Weight Optimization",
            "description": "Reach a healthier weight with our medically supervised GLP-1 program—personalized nutrition and clinical support that make lasting results achievable for everyone.",
            "pointsTitle": "Benefits",
            "points": [
              "Customized nutrition and fitness plan",
              "Consultation, labs and full body analysis",
              "Ongoing support from our specialists"
            ],
            "ctaText": "Discover Our Weight Loss Program",
            "image": "/image/services/weight-optimization/sustained-weight-loss.webp",
            "link": "/services/weight-optimization"
          },
          {
            "name": "NAD Therapy",
            "description": "Recharge with NAD infusions—where cellular rejuvenation meets renewed vitality, helping your body feel energized and restored.",
            "pointsTitle": "Benefits",
            "points": [
              "Immediate absorption",
              "Recharge your cells",
              "Tailored blends for your unique needs"
            ],
            "ctaText": "Explore NAD Therapy Benefits",
            "image": "/image/services/nad-therapy/enhanced-cellular-energy-and-vitality.webp",
            "link": "/services/nad-therapy"
          },
          {
            "name": "Sexual Health",
            "description": "Reconnect with your confidence through our sexual health program for men and women—personalized, discreet care that supports libido, intimacy, and well-being.",
            "pointsTitle": "Treatments",
            "points": [
              "Support for libido and intimacy",
              "Personalized treatments for qualified patients",
              "Discreet, judgment-free care"
            ],
            "ctaText": "Discover Sexual Health Solutions",
            "image": "/image/services/sexual-health/strengthened-intimacy.webp",
            "link": "/services/sexual-health"
          },
          {
            "name": "Aesthetics & Botox",
            "description": "Refresh your look with expertly applied Botox and aesthetic treatments for men and women. Smooth, natural wrinkle reduction—no frozen face, no fuss—just a refreshed, natural you.",
            "pointsTitle": "Benefits",
            "points": [
              "Refreshed, natural appearance",
              "Confidence in every room you enter",
              "Discreet, natural-looking results"
            ],
            "ctaText": "Discover Aesthetics & Botox",
            "image": "/image/services/aesthetics/natural-results.webp",
            "link": "/services/aesthetics"
          }
        ]
      },
      {
        "id": "partners",
        "title": "Your Partners in Peak Wellness",
        "description": partnersInWellnessDescription,
        "content": partnersInWellnessContent,
        "partners": partnersData
      },
      {
        "id": "final-cta",
        "title": "Ready to start your ",
        "subtitle": "Journey to extraordinary?",
        "content": "Sign up for a free online consultation and enjoy unique benefits for new clients. Our team is here to guide you every step of the way!",
        "ctaText": scheduleOnlineConsultationText
      },
      {
        ...newLocationSection,
        
      },
      {
        "id": "footer",
        "contact": clinicContact,
        "copyright": " 2025. All rights reserved by Hero Concierge Health"
      }
    ],
    "footer": {
      "contact": clinicContact,
      "navigation": [
        {
          "title": "Privacy Policy",
          "url": "/privacy-policy"
        },
        {
          "title": "Terms Of Service",
          "url": "/terms-of-service"
        }
      ],
      "copyright": "All rights reserved by Hero Concierge Health",
      "developedBy": {
        "text": "Developed by",
        "name": "WEB100NOW",
        "url": "https://web100now.com"
      }
    }
  },
  "services": {
    "hormone-optimization": {
      "slug": "/services/hormone-optimization",
      "hero": {
        "video": "/videos/hormone-optimization.mp4",
        "title": "Hormone Optimization",
        "subtitle": "Revitalize Your Life",
        "description": "Unlock renewed energy, balanced mood, and improved well-being with a personalized hormone plan for men and women—TRT for men and hormone, perimenopause, and menopause balance for women.",
        "ctaText": "Schedule Your Consultation"
      },
      "sections": [
        {
          "id": "problem-statement",
          "title": "Hormone Imbalance Holding You Back?",
          "points": [
            {
              "title": "Constant lack of energy and motivation",
              "image": "/image/services/hormone-optimization/constant-lack-of-energy-and-motivation.webp"
            },
            {
              "title": "Reduced libido or changes in intimacy",
              "image": "/image/services/hormone-optimization/reduced-sexual-drive-or-performance.webp"
            },
            {
              "title": "Unwanted weight changes, hot flashes, or sleep disruption",
              "image": "/image/services/hormone-optimization/unwanted-weight-gain-and-difficulty-building-muscle.webp"
            }
          ]
        },
        {
          "id": "unlock-the-power",
          "title": "Hormone Therapy for Men & Women",
          "description": "Restore Your Vitality\n\nHormone imbalance can affect energy, mood, sleep, and intimacy. We offer testosterone replacement therapy (TRT) for men and hormone, perimenopause, and menopause balance for women—each plan personalized to your labs and goals.",
          "sections": [
            {
              "icons": "Zap",
              "title": "Energy & Vitality",
              "description": "Balanced hormones support daily energy, stamina, and overall vitality for men and women.",
              "pointsTitle": "Benefits:",
              "points": [
                "More Energy Throughout the Day",
                "Improved Stamina & Resilience",
                "Reduced Fatigue"
              ]
            },
            {
              "icons": "Dumbbell",
              "title": "Strength & Body Composition",
              "description": "Optimized hormones help support lean muscle, bone health, and healthy metabolism.",
              "pointsTitle": "Benefits:",
              "points": [
                "Support for Lean Muscle",
                "Stronger Bones & Joints",
                "Healthier Body Composition"
              ]
            },
            {
              "icons": "Brain",
              "title": "Mood & Brain Function",
              "description": "Hormone imbalance often leads to mood changes, irritability, and brain fog in both men and women.",
              "pointsTitle": "Benefits:",
              "points": [
                "Sharper Mental Clarity",
                "Elevated Mood & Confidence",
                "Reduced Irritability"
              ]
            },
            {
              "icons": "Heart",
              "title": "Intimacy & Well-Being",
              "description": "Balanced hormones can help restore libido and support intimacy for men and women.",
              "pointsTitle": "Benefits:",
              "points": [
                "Renewed Desire & Drive",
                "Support for Healthy Intimacy",
                "Improved Connection"
              ]
            }
          ],
          "ctaText": bookTodayCTAText
        },
        {
          "id": "benefits",
          "title": "Benefits",
          "description": "Our medically supervised, safe protocols are tailored to individual needs and goals for men and women, incorporating data-driven adjustments for optimal results.",
          "points": [
            {
              "title": "Increased Energy & Stamina",
              "image": "/image/services/hormone-optimization/increased-energy-and-stamina.webp"
            },
            {
              "title": "Renewed Libido & Intimacy",
              "image": "/image/services/hormone-optimization/enhanced-sexual-drive-and-performance.webp"
            },
            {
              "title": "Improved Mood & Mental Clarity",
              "image": "/image/services/hormone-optimization/improved-mood-and-mental-clarity.webp"
            },
            {
              "title": "Overall Enhanced Quality of Life",
              "image": "/image/services/nad-therapy/improved-cognitive-function-and-mental-clarity.webp"
            }
          ]
        },
        {
          "id": "partners-in-wellness",
          "title": "Your Partners in Whole-Person Wellness",
          "description": "Our protocols are developed in partnership with top endocrinologists and are based on research from Harvard and Columbia.",
          "content": "Balanced hormone levels can support meaningful improvements in energy, mood, and quality of life for men and women. (Placeholder for client review—add medical team credentials and any specialized hormone therapy certifications.)",
          "partners": partnersData
        },
        {
          "id": "faq",
          "title": "Frequently Asked Questions",
          "questions": [
            {
              "q": "How long does hormone therapy take to show results?",
              "a": "Most patients report improvements in energy, mood, and overall well-being within a few weeks. However, noticeable physical changes—such as increased muscle mass or improved body composition—may take several months of consistent therapy and follow-up."
            },
            {
              "q": "Are there any side effects or risks?",
              "a": "All medical treatments carry some level of risk. Potential side effects vary based on the type of hormone therapy, dosage, and individual factors. Our programs are closely monitored by medical professionals to minimize risks, and we adjust treatment plans as needed to ensure safety."
            },
            {
              "q": "Do I need ongoing tests or follow-ups?",
              "a": "Yes. Monitoring your hormone levels is crucial for adjusting dosages and maintaining balanced health. Routine blood tests and follow-up appointments help ensure the therapy remains effective and safe over time."
            },
            {
              "q": "Is hormone therapy covered by insurance?",
              "a": "Coverage depends on your insurance plan and the specific treatments prescribed. Some policies may cover lab work and consultations if deemed medically necessary. We recommend checking with your insurance provider or contacting our billing department for detailed information."
            },
            {
              "q": "Will I have to change my diet or lifestyle?",
              "a": "While hormone therapy can significantly improve certain symptoms, lifestyle factors (diet, exercise, sleep, stress management) also play a critical role in achieving optimal results. We typically recommend a balanced approach that may include nutrition guidance and regular physical activity."
            },
            {
              "q": "Can I combine Hormone Optimization with other services?",
              "a": "Absolutely. Many clients see enhanced benefits by addressing multiple health areas simultaneously. Hormone Optimization can complement Weight Optimization and other services to help you achieve a more comprehensive transformation and improved overall health."
            }
          ]
        },
        {
          "id": "cta",
          "title": "Take the First Step to",
          "subtitle": "Renewed Vitality",
          "content": "Our experts are here to guide you every step of the way—no commitment required.",
          "ctaText": scheduleOnlineConsultationText
        },
        newLocationSection
      ]
    },
    "weight-optimization": {
      "slug": "/services/weight-optimization",
      "hero": {
        "video": "/videos/weight-optimization.mp4",
        "title": "Weight Optimization",
        "subtitle": "Achieve Your Best Shape",
        "description": "Reach a healthier weight with a medically supervised GLP-1 program—personalized nutrition, clinical support, and physician oversight every step of the way.",
        "ctaText": "Start Your Transformation"
      },
      "sections": [
        {
          "id": "problem-statement",
          "title": "It’s Time for a Smarter Approach to Weight Loss",
          "points": [
            {
              "title": "Difficulty shedding belly fat despite dieting",
              "image": "/image/services/weight-optimization/difficulty-shedding-belly-fat-despite-dieting.webp"
            },
            {
              "title": "Fluctuating weight or ‘yo-yo’ dieting cycles",
              "image": "/image/services/weight-optimization/fluctuating-weight-or-yo-yo-dieting-cycles.webp"
            },
            {
              "title": "Low energy and lack of motivation for exercise",
              "image": "/image/services/weight-optimization/low-energy-and-lack-of-motivation-for-exercise.webp"
            }
          ]
        },
        {
          "id": "unlock-the-power",
          "title": "⚡ GLP-1 Weight Loss Therapy",
          "description": "Lasting, Healthy Results\n\nOur medically supervised GLP-1 weight loss program combines science-driven therapies with personalized guidance to help you reach a healthier weight, improve energy, and maintain results long term.",
          "sections": [
            {
              "icons": "Flame",
              "title": "Metabolism & Energy",
              "description": "Your metabolism slows with age and lifestyle. Our therapies support fat burning, increase daily energy, and improve insulin sensitivity.",
              "pointsTitle": "Benefits:",
              "points": [
                "Steady Fat Reduction",
                "Improved Energy & Stamina",
                "Enhanced Metabolic Health"
              ]
            },
            {
              "icons": "Apple",
              "title": "Appetite & Cravings Control",
              "description": "Medical interventions help reduce cravings and support portion control without extreme dieting.",
              "pointsTitle": "Benefits:",
              "points": [
                "Reduced Food Cravings",
                "Better Relationship With Food",
                "Sustainable Eating Habits"
              ]
            },
            {
              "icons": "Activity",
              "title": "Body Composition",
              "description": "We focus on fat loss while preserving lean muscle for healthier, lasting results.",
              "pointsTitle": "Benefits:",
              "points": [
                "Improved Muscle-to-Fat Ratio",
                "Stronger, Leanner Body",
                "Long-Term Weight Maintenance"
              ]
            }
          ],
          "ctaText": bookTodayCTAText
        },
        {
          "id": "benefits",
          "title": "Benefits",
          "description": "Achieve sustainable weight loss without rebound, improved metabolism and energy, and boosted self-confidence—while building lifelong healthy habits in diet, exercise, and mindset.",
          "points": [
            {
              "title": "Boosted Self-Confidence & Body Image",
              "image": "/image/services/weight-optimization/boosted-self-confidence-and-body-image.webp"
            },
            {
              "title": "Improved Metabolism & Energy Levels",
              "image": "/image/services/weight-optimization/improved-metabolism-and-energy-levels.webp"
            },
            {
              "title": "Sustainable Weight Loss",
              "image": "/image/services/weight-optimization/sustained-weight-loss.webp"
            },
            {
              "title": "Long-Term Healthy Habits",
              "image": "/image/services/weight-optimization/long-term-healthy-habits.webp"
            }
          ]
        },
        {
          "id": "partners-in-wellness",
          "title": "Your Partners in Peak Wellness",
          "description": "Our protocols are guided by evidence-based medicine, integrating knowledge from Harvard and Columbia on effective weight management.Studies show that supervised weight loss programs can significantly improve both physical health and emotional well-being.",
          "content": "Highlight the medical team’s qualifications, e.g., board-certified nutritionists, endocrinologists.",
          "partners": partnersData
        },
        {
          "id": "faq",
          "title": "Frequently Asked Questions",
          "questions": [
            {
              "q": "How quickly can I expect to see results?",
              "a": "Results vary based on individual factors like starting weight, metabolism, and adherence to the plan. Many clients begin noticing changes in energy, mood, and initial weight loss within the first few weeks. More significant body composition changes often become visible within 8–12 weeks of consistent effort."
            },
            {
              "q": "Is the nutrition plan restrictive, or can I still enjoy my favorite foods?",
              "a": "We focus on balance rather than strict restriction. Our clinicians and nutritionists work with you to develop a tailored plan that allows occasional indulgences. The goal is sustainable, healthy eating habits—not a rigid diet you'll abandon after a short time."
            },
            {
              "q": "Do I need to follow a specific workout routine?",
              "a": "We recommend a structured fitness component that fits your lifestyle and goals—this could be strength training, cardio, or a combination of both. Our team provides guidelines, but we also adapt routines for different fitness levels, injuries, or preferences."
            },
            {
              "q": "Are there medications or supplements involved?",
              "a": "In some cases, we may recommend medically supervised supplements or FDA-approved weight-loss medications. Any prescription is based on clinical evaluation and lab results to ensure safety and effectiveness."
            },
            {
              "q": "Will I regain the weight if I stop the program?",
              "a": "Our approach aims to cultivate long-term habits, not quick fixes. If you continue applying the nutritional and fitness strategies learned, you're more likely to maintain your results. Regular check-ins or follow-ups can further help prevent weight regain."
            },
            {
              "q": "How does this program differ from a standard commercial weight loss plan?",
              "a": "Unlike many \"one-size-fits-all\" plans, our program is personalized and medically supervised. We consider hormone levels, metabolic rates, and overall health to create a plan that's unique to your body. This data-driven approach typically yields more sustainable and safer results."
            }
          ]
        },
        {
          "id": "cta",
          "title": "Take Control of Your Weight – ",
          "subtitle": "Get Started Now",
          "content": "Our experts guide you every step of the way—no strings attached.",
          "ctaText": scheduleOnlineConsultationText
        },
        newLocationSection
      ]
    },
    "nad-therapy": {
      "slug": "/services/nad-therapy",
      "hero": {
        "video": "/videos/nad-therapy.mp4",
        "title": "NAD Therapy",
        "subtitle": "Recharge Your Cells",
        "description": "Boost energy, sharpen focus, and support overall wellness with a clinically guided NAD program.",
        "ctaText": "Schedule Your NAD Consultation"
      },
      "sections": [
        {
          "id": "problem-statement",
          "title": "Running on Empty?",
          "points": [
            {
              "title": "Persistent fatigue or low energy",
              "image": "/image/services/nad-therapy/persistent-fatigue-or-low-energy.webp"
            },
            {
              "title": "Reduced focus or ‘Brain fog’",
              "image": "/image/services/nad-therapy/reduced-focus-or-brain-fog.webp"
            },
            {
              "title": "Slowed recovery from stress or physical activity",
              "image": "/image/services/nad-therapy/slowed-recovery-from-stress-or-physical-activity.webp"
            }
          ]
        },
        {
          "id": "unlock-the-power",
          "title": "Unlock the Power of Your Cell",
          "description": "NAD+ is a vital coenzyme in every cell that powers energy production, DNA repair, brain function, and metabolism. As you age, its levels drop—causing fatigue, brain fog, slower metabolism, and inflammation. Replenishing NAD+ can help reverse these aging effects and restore vitality.",
          "sections": [
            {
              "icons": "Battery",
              "title": "Energy & Metabolism",
              "description": "NAD+ is vital for mitochondrial function—it converts food into ATP (cellular energy) through the Krebs cycle and oxidative phosphorylation. This process not only energizes every cell but also supports fat burning and enhances insulin sensitivity.",
              "pointsTitle": "Real Benefits:",
              "points": [
                "Increased Energy Levels",
                "Improved Weight Management",
                "Enhanced Metabolic Health"
              ]
            },
            {
              "icons": "Brain",
              "title": "Brain Function & Longevity",
              "description": "NAD+ activates Sirtuins (SIRT1 & SIRT3), proteins that protect neurons and enhance memory. These proteins also reduce neuroinflammation, crucial for preventing age-related cognitive decline.",
              "pointsTitle": "Proven Impact:",
              "points": [
                "Sharper Memory And Clearer Thinking",
                "Reduced Risk Of Neurodegenerative Conditions Like Alzheimer's",
                "Overall Improved Brain Performance"
              ]
            },
            {
              "icons": "Shield",
              "title": "DNA Repair & Anti-Aging",
              "description": "By fueling PARP enzymes, NAD+ enables efficient DNA repair—mitigating damage caused by toxins, stress, and aging. This helps slow down the aging process and promotes cellular regeneration.",
              "pointsTitle": "Visible Results:",
              "points": [
                "Reduced Signs Of Aging",
                "Increased Cell Survival And Resilience",
                "A More Youthful, Revitalized Appearance"
              ]
            }
          ],
          "ctaText": bookTodayCTAText
        },
        {
          "id": "benefits",
          "title": "Benefits",
          "description": "Elevate your well-being with enhanced cellular energy, sharper mental clarity, and faster stress recovery—unlocking potential anti-aging benefits for a more vibrant life.",
          "points": [
            {
              "title": "Enhanced Cellular Energy & Vitality",
              "image": "/image/services/nad-therapy/enhanced-cellular-energy-and-vitality.webp"
            },
            {
              "title": "Improved Cognitive Function & Mental Clarity",
              "image": "/image/services/nad-therapy/improved-cognitive-function-and-mental-clarity.webp"
            },
            {
              "title": "Faster Recovery from Stress",
              "image": "/image/services/nad-therapy/faster-recovery-from-stress.webp"
            },
            {
              "title": "Potential Anti-Aging Effects",
              "image": "/image/services/nad-therapy/potential-anti-aging-effects.webp"
            }
          ]
        },
        {
          "id": "partners-in-wellness",
          "title": "Your Partners in Peak Wellness",
          "description": "NAD is a coenzyme found in every cell, crucial for energy production and DNA repair. Studies from leading institutions highlight its role in cellular health and longevity. ",
          "content": "Research suggests that restoring NAD levels may improve mitochondrial function, support healthy aging, and reduce inflammation. Mention if the clinic’s professionals have special training or if the clinic is part of any anti-aging medical boards.",
          "partners": partnersData
        },
        {
          "id": "faq",
          "title": "Frequently Asked Questions",
          "questions": [
            {
              "q": "How long does it take to feel the effects of NAD Therapy?",
              "a": "Many clients report increased energy and mental clarity within the first few sessions. However, individual responses vary, and some may require several treatments to notice significant changes."
            },
            {
              "q": "Is NAD Therapy safe?",
              "a": "NAD Therapy is generally well-tolerated when administered by qualified professionals. Mild side effects, such as discomfort at the IV site or temporary nausea, can occur. Our medical team closely monitors treatments to ensure safety."
            },
            {
              "q": "How often do I need NAD infusions?",
              "a": "Frequency depends on your specific goals and response. Some individuals benefit from weekly sessions initially, then reduce to monthly maintenance. Your provider will tailor the schedule to meet your needs."
            },
            {
              "q": "Can NAD Therapy help with addiction or substance recovery?",
              "a": "Emerging research suggests NAD may support withdrawal management and recovery by replenishing brain chemistry. However, addiction treatment typically involves a comprehensive program, and NAD is just one component."
            },
            {
              "q": "Will my insurance cover NAD Therapy?",
              "a": "Insurance coverage can vary. Some policies may cover partial costs if deemed medically necessary. We recommend consulting with your insurance provider or our billing department for more details."
            },
            {
              "q": "Can I combine NAD Therapy with other wellness programs?",
              "a": "Yes. Many patients integrate NAD infusions with programs like Weight Optimization or Hormone Therapy for a more comprehensive approach. We customize treatment plans to help you achieve overall health goals."
            }
          ]
        },
        {
          "id": "cta",
          "title": "Boost Your Energy Today – ",
          "subtitle": "Book NAD Therapy",
          "content": "Our expert team will guide you throughout your NAD journey to ensure maximum benefits.",
          "ctaText": bookTodayCTAText
        },
        newLocationSection
      ]
    },
    "sexual-health": {
      "slug": "/services/sexual-health",
      "hero": {
        "video": "/videos/sexual-health.mp4",
        "title": "Sexual Health Solutions",
        "subtitle": "Reclaim Your Confidence",
        "description": "Address intimacy concerns, boost libido, and reignite connection with personalized, medically backed treatments for men and women.",
        "ctaText": "Schedule Your Sexual Health Consultation"
      },
      "sections": [
        {
          "id": "problem-statement",
          "title": "Intimacy Not Feeling Like It Used To?",
          "points": [
            {
              "title": "Low libido or reduced interest in intimacy",
              "image": "/image/services/sexual-health/difficulty-achieving.webp"
            },
            {
              "title": "Discomfort, dryness, or changes in arousal",
              "image": "/image/services/sexual-health/low-libido.webp"
            },
            {
              "title": "Anxiety or stress related to intimacy",
              "image": "/image/services/sexual-health/performance-anxiety.webp"
            }
          ]
        },
        {
          "id": "unlock-the-power",
          "title": "Personalized Sexual Health Care",
          "description": "Regain Confidence & Connection\n\nChanges in libido, arousal, and intimacy are common for men and women—and they’re treatable. Our therapies address both the physical and emotional factors so you can feel confident again.",
          "sections": [
            {
              "icons": "Heart",
              "title": "Libido & Desire",
              "description": "Targeted, personalized therapies help support healthy libido and arousal for men and women.",
              "pointsTitle": "Benefits:",
              "points": [
                "Renewed Desire & Drive",
                "Improved Circulation & Arousal",
                "Increased Confidence"
              ]
            },
            {
              "icons": "Timer",
              "title": "Comfort & Function",
              "description": "We offer effective, discreet solutions to support comfort, function, and satisfaction.",
              "pointsTitle": "Benefits:",
              "points": [
                "Greater Comfort & Satisfaction",
                "Reduced Anxiety Around Intimacy",
                "Renewed Confidence"
              ]
            },
            {
              "icons": "Brain",
              "title": "Emotional Well-Being",
              "description": "Treatments also focus on reducing stress and improving emotional intimacy.",
              "pointsTitle": "Benefits:",
              "points": [
                "Lower Anxiety",
                "Better Relationship Satisfaction",
                "Restored Self-Esteem"
              ]
            }
          ],
          "ctaText": bookTodayCTAText
        },
        {
          "id": "benefits",
          "title": "Benefits",
          "description": "Experience improved comfort and function, reduced anxiety, and enhanced libido—while fostering deeper intimacy, greater confidence, and lasting relationship satisfaction.",
          "points": [
            {
              "title": "Improved Comfort & Function",
              "image": "/image/services/sexual-health/improved-erectile-function.webp"
            },
            {
              "title": "Reduced Anxiety & Greater Confidence",
              "image": "/image/services/sexual-health/reduced-performance-anxiety.webp"
            },
            {
              "title": "Strengthened Intimacy & Relationship Satisfaction",
              "image": "/image/services/sexual-health/strengthened-intimacy.webp"
            },
            {
              "title": "Enhanced Libido & Desire",
              "image": "/image/services/sexual-health/enhanced-libido.webp"
            }
          ]
        },
        {
          "id": "partners-in-wellness",
          "title": "Your Partners in Whole-Person Wellness",
          "description": "Changes in libido and intimacy for men and women often stem from underlying factors like hormonal imbalances, circulation, or stress. Our protocols follow guidelines from leading medical associations.",
          "partners": partnersData
        },
        {
          "id": "faq",
          "title": "Frequently Asked Questions",
          "questions": [
            {
              "q": "How do I know if my issue is physical or psychological?",
              "a": "Sexual health often involves both factors. Our team uses assessments, blood tests, and discussions around emotional well-being to pinpoint contributing elements."
            },
            {
              "q": "Are sexual health treatments safe?",
              "a": "When prescribed and monitored by qualified professionals, most treatments—whether medication, hormone therapy, or lifestyle adjustments—are safe. We tailor plans to your individual needs."
            },
            {
              "q": "Will I need hormone therapy?",
              "a": "That depends on your lab results and symptoms. If a hormonal imbalance is identified, hormone optimization may be recommended alongside other interventions for men or women."
            },
            {
              "q": "Is the consultation and treatment confidential?",
              "a": "Absolutely. We prioritize privacy and adhere to strict medical confidentiality guidelines. Your information remains secure within our practice."
            },
            {
              "q": "How quickly will I see improvements?",
              "a": "Some medications can have rapid effects, while others (like hormone therapy) may take several weeks or months to show significant results. Each individual's timeline varies."
            },
            {
              "q": "Does insurance typically cover sexual health treatments?",
              "a": "Coverage varies widely. Some plans may cover consultations or lab work, while medications and specialized therapies might require out-of-pocket expenses. We encourage you to check with your insurance provider for specifics."
            }
          ]
        },
        {
          "id": "cta",
          "title": "Take Control of Your Sexual Health – ",
          "subtitle": "Book Now",
          "content": "Our expert, discreet team is here to help you find lasting solutions—no judgment, just support.",
          "ctaText": scheduleOnlineConsultationText
        },
        newLocationSection
      ]
    },
    "aesthetics": {
      "slug": "/services/aesthetics",
      "hero": {
        "video": "/videos/botox.mp4",
        "title": "Aesthetics & Botox",
        "subtitle": "Refresh Your Confidence",
        "description": "Refresh your look with expertly applied Botox and aesthetic treatments for men and women. Smooth, natural wrinkle reduction—no frozen face, no fuss—just a refreshed, natural you.",
        "ctaText": "Schedule Your Consultation"
      },
      "sections": [
        {
          "id": "problem-statement",
          "title": "Looking More Tired Than You Feel?",
          "points": [
            {
              "title": "Worry Lines & Deep Forehead Furrows",
              "image": "/image/services/aesthetics/worry-lines.webp"
            },
            {
              "title": "Tired, Aged Appearance",
              "image": "/image/services/aesthetics/tired-appearance.webp"
            }
          ]
        },
        {
          "id": "unlock-the-power",
          "title": "How It Works",
          "description": "Our thoughtful approach to Botox and aesthetics delivers natural, refreshed results that enhance your features—for men and women alike.",
          "sections": [
            {
              "icons": "ClipboardList",
              "title": "Personalized Assessment",
              "description": "In-depth consultation to understand your goals and facial structure.",
              "pointsTitle": "Key Focus:",
              "points": [
                "Personalized goal setting",
                "Facial anatomy analysis",
                "Custom treatment planning"
              ]
            },
            {
              "icons": "Target",
              "title": "Tailored Treatment Plan",
              "description": "Our specialists customize your Botox dosage and placement to suit your unique features and goals.",
              "pointsTitle": "Our Approach:",
              "points": [
                "Individually tailored dosing",
                "Strategic injection placement",
                "Natural result preservation"
              ]
            },
            {
              "icons": "Syringe",
              "title": "Precise Injection",
              "description": "Careful Botox application with a light touch—no overdone or artificial look.",
              "pointsTitle": "Benefits:",
              "points": [
                "Precise, skilled application",
                "Minimal discomfort",
                "Natural-looking enhancement"
              ]
            },
            {
              "icons": "RefreshCw",
              "title": "Ongoing Care",
              "description": "Optional check-ins and updates to keep your look refreshed and natural.",
              "pointsTitle": "Ongoing Support:",
              "points": [
                "Follow-up consultations",
                "Touch-up treatments",
                "Long-term maintenance plan"
              ]
            }
          ],
          "ctaText": bookTodayCTAText
        },
        {
          "id": "benefits",
          "title": "Benefits",
          "description": "Experience a refreshed, natural appearance with results that boost your confidence in every room you enter—without looking frozen or artificial.",
          "points": [
            {
              "title": "Refreshed, Natural Appearance",
              "image": "/image/services/aesthetics/refreshed-appearance.webp"
            },
            {
              "title": "Confidence in Every Room You Enter",
              "image": "/image/services/aesthetics/confidence-boost.webp"
            },
            {
              "title": "Photo-Ready Without the Filters",
              "image": "/image/services/aesthetics/photo-ready.webp"
            },
            {
              "title": "Discreet, Natural-Looking Results",
              "image": "/image/services/aesthetics/natural-results.webp"
            }
          ]
        },
        {
          "id": "partners-in-wellness",
          "title": "Your Partners in Whole-Person Wellness",
          "description": "Our providers are aesthetic experts—trained in facial anatomy and natural-looking treatments for men and women to keep you looking refreshed and like yourself.",
          "partners": partnersData
        },
        {
          "id": "faq",
          "title": "Frequently Asked Questions",
          "questions": [
            {
              "q": "Will I look fake or frozen?",
              "a": "Never. Our approach enhances, not erases. You'll still look like you—just well-rested and refreshed."
            },
            {
              "q": "How long does it last?",
              "a": "Most results last 3–4 months, with a quick refresh keeping your look consistent year-round."
            },
            {
              "q": "Is this only for older patients?",
              "a": "Not at all. Many patients start in their 30s to stay ahead of fine lines and wrinkles."
            },
            {
              "q": "How fast will I see results?",
              "a": "Expect visible improvement in 3–7 days, with peak results at 10–14 days."
            },
            {
              "q": "Does it hurt?",
              "a": "Most clients experience minimal discomfort. Our experienced injectors use fine needles and can apply numbing cream if needed."
            },
            {
              "q": "Is Botox safe?",
              "a": "Absolutely. Botox has been FDA-approved for cosmetic use for decades and is safe when administered by qualified professionals for men and women."
            }
          ]
        },
        {
          "id": "cta",
          "title": "Your Refreshed Look Starts Today – ",
          "subtitle": "Schedule Your Consultation",
          "content": "Look how you feel—refreshed, confident, and naturally you.",
          "ctaText": "Schedule Your Consultation"
        },
        newLocationSection
      ]
    }
  },
  "documents": [
    {
      "id": "privacy-policy",
      "type": "privacyPolicy",
      "title": "Privacy Policy",
      "link": "/privacy-policy",
      "content": {
        "title": "Privacy Policy",
        "description": "At Hero Concierge Health, we are committed to protecting your privacy and the security of your personal data. This policy explains what information we collect, how we use it, and how we protect it.",
        "sections": [
          {
            "title": "1. Information We Collect",
            "content": [
              "Full name",
              "Email address",
              "Phone number",
              "Medical information provided when booking an appointment (if required)",
              "Details of your visit (e.g., selected services, appointment time, doctor, etc.)",
              "Payment information (for online transactions, if applicable)",
              "Technical data (e.g., IP address, browser type, and usage statistics for our website)"
            ]
          },
          {
            "title": "2. How We Use Your Information",
            "content": [
              "To schedule and manage appointments",
              "To provide the medical and wellness services you request",
              "To send you appointment reminders, notifications, and other essential communication",
              "To send you marketing communications (offers, promotions, and updates about our services) with your explicit consent",
              "To improve the quality of our services and enhance your user experience",
              "To analyze website usage to improve functionality and performance"
            ]
          },
          {
            "title": "3. Data Storage and Protection",
            "content": "We store your data on secure servers with robust encryption and security measures in place. Your personal data is retained only for as long as necessary to provide the requested services, fulfill legal obligations, or as otherwise permitted by applicable law. Regular audits are conducted to ensure data security and compliance."
          },
          {
            "title": "4. SMS Notifications and Marketing Communication",
            "content": [
              "By providing your phone number, you consent to receive SMS notifications and occasional marketing messages from our company. This includes appointment reminders, alerts, and promotional offers.",
              "Message frequency may vary, and standard message and data rates may apply.",
              "You can unsubscribe from SMS marketing at any time by replying STOP to any SMS message or contacting us directly."
            ]
          },
          {
            "title": "5. Use of Data for Marketing Purposes",
            "content": "With your consent, we may send you marketing emails and SMS, including special offers, promotions, and updates about new services. You can opt out of these communications at any time by clicking the unsubscribe link in any email or replying STOP to an SMS."
          },
          {
            "title": "6. Sharing Information with Third Parties",
            "content": [
              "We do not sell your personal information to third parties.",
              "We may share your information with trusted third-party service providers to deliver services (e.g., email or SMS platforms, payment processors). These third parties are required to comply with strict data protection standards.",
              "We may disclose information if required by law or to protect our legal rights."
            ]
          },
          {
            "title": "7. Your Rights",
            "content": [
              "You have the right to access, correct, delete, or restrict the processing of your personal data. You also have the right to object to certain types of data processing, such as direct marketing.",
              "To exercise your rights, contact us at info@heromenshealth.com or +1 (312) 465-4653."
            ]
          },
          {
            "title": "8. Updates to This Policy",
            "content": "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant updates through our website or other communication channels."
          },
          {
            "title": "9. Contact Us",
            "content": "If you have any questions about this Privacy Policy or how we handle your personal data, please contact us at info@heromenshealth.com or call us at +1 (312) 465-4653."
          },
          {
            "title": "10. Cookies and Tracking Technologies",
            "content": [
              "Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site usage, and deliver tailored advertisements.",
              "You can manage your cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website.",
              "We also use third-party services, such as Google Analytics, to collect and analyze usage data. These third parties may use cookies to provide their services. For more details, please review their privacy policies."
            ]
          },
          {
            "title": "11. Children’s Privacy",
            "content": "Our services are not directed to individuals under the age of 18, and we do not knowingly collect personal information from minors. If we become aware that we have inadvertently collected data from a minor, we will take steps to delete it promptly. If you believe we may have collected information from a minor, please contact us immediately."
          },
          {
            "title": "12. Legal Basis for Data Processing",
            "content": [
              "We process your personal data based on one or more of the following legal grounds:",
              "1. Your explicit consent for marketing communications or specific services.",
              "2. The necessity to perform a contract, such as managing your appointments and providing requested services.",
              "3. Compliance with a legal obligation, such as record-keeping or responding to legal inquiries.",
              "4. Our legitimate interests, such as improving our services or ensuring the security of our systems, provided these interests do not override your fundamental rights and freedoms."
            ]
          },
          {
            "title": "13. Data Breach Notification",
            "content": "In the unlikely event of a data breach, we will notify affected individuals and relevant authorities as required by applicable laws. Our team will work promptly to contain the breach, assess its impact, and ensure data security moving forward."
          },
          {
            "title": "14. International Data Transfers",
            "content": "If you are accessing our services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States or other countries where our servers or service providers are located. By using our services, you consent to this transfer, storage, and processing. We ensure that appropriate safeguards are in place to protect your data during such transfers."
          },
          {
            "title": "15. Your Privacy Rights Under CCPA",
            "content": [
              "If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA), including:",
              "1. The right to know what personal information we collect, how we use it, and with whom we share it.",
              "2. The right to request access to and deletion of your personal information, subject to certain exceptions.",
              "3. The right to opt-out of the sale of your personal information. While we do not sell personal information, we respect your right to limit how your information is shared.",
              "4. The right to not be discriminated against for exercising your privacy rights.",
              "To exercise these rights, please contact us at info@heromenshealth.com or +1 (312) 465-4653. We will verify your identity before processing your request."
            ]
          }
        ]
      }
    },
    {
      "id": "terms-of-service",
      "type": "termsOfService",
      "title": "Terms of Service",
      "link": "/terms-of-service",
      "content": {
        "title": "Terms of Service",
        "description": "These terms outline the rules and regulations for the use of Hero Concierge Health’s website and services.",
        "sections": [
          {
            "title": "1. Acceptance of Terms",
            "content": "By accessing and using our website or services, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree to these terms, please refrain from using our services."
          },
          {
            "title": "2. Services Provided",
            "content": "We provide health and wellness services as described on our website. While we strive to ensure accuracy, the specifics of services, pricing, and availability are subject to change at our discretion without prior notice. Please contact us for the most up-to-date information."
          },
          {
            "title": "3. User Responsibilities",
            "content": "You agree to provide accurate, current, and complete information when using our services. You are solely responsible for maintaining the confidentiality of your personal information, including login credentials, and for any activities conducted under your account."
          },
          {
            "title": "4. Appointments and Cancellations",
            "content": "Appointments can be scheduled through our website or by contacting us directly. To avoid cancellation charges, we require at least 24 hours’ notice for cancellations or rescheduling. Late cancellations or missed appointments may incur a fee as per our policy."
          },
          {
            "title": "5. Payment and Refunds",
            "content": "Payment is required at the time of service unless prior arrangements have been made. Refunds are processed in accordance with our refund policy, which is available upon request. Refunds are granted at our discretion, subject to the specifics of the situation."
          },
          {
            "title": "6. Limitation of Liability",
            "content": "To the fullest extent permitted by law, we disclaim liability for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our services. This includes, but is not limited to, errors, omissions, or interruptions in service."
          },
          {
            "title": "7. Intellectual Property",
            "content": "All content on our website, including but not limited to text, graphics, logos, images, and software, is our property or the property of our licensors. It is protected under applicable copyright, trademark, and intellectual property laws. Unauthorized use, reproduction, or distribution of this content is strictly prohibited."
          },
          {
            "title": "8. Changes to Terms",
            "content": "We reserve the right to update or modify these terms at any time without prior notice. Any changes will be effective immediately upon posting on our website. By continuing to use our services, you agree to the updated terms. We encourage you to review these terms periodically."
          },
          {
            "title": "9. Governing Law",
            "content": "These terms and any disputes arising from your use of our services are governed by and construed in accordance with the laws of the State of Illinois, USA. Any legal actions or proceedings shall be resolved in the appropriate courts located in Illinois."
          },
          {
            "title": "10. Contact Information",
            "content": "If you have any questions, concerns, or feedback about these Terms of Service, please contact us at info@heromenshealth.com or call us at +1 (312) 465-4653."
          },
          {
            "title": "11. Dispute Resolution",
            "content": "Any disputes arising from or related to these Terms of Service shall first be resolved through informal discussions between the parties. If no resolution is reached, the dispute shall be settled through arbitration in accordance with the rules of the American Arbitration Association, held in the State of Illinois, USA."
          },
          {
            "title": "12. Termination of Services",
            "content": "We reserve the right to suspend or terminate your access to our services at any time, without prior notice, for conduct that we believe violates these Terms of Service, is harmful to other users, or causes us liability."
          },
          {
            "title": "13. Privacy Policy Reference",
            "content": "Your use of our services is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal data. Please review our Privacy Policy for more details."
          },
          {
            "title": "14. Force Majeure",
            "content": "We shall not be held liable for any failure or delay in performance caused by circumstances beyond our reasonable control, including but not limited to natural disasters, government actions, internet outages, or technical failures."
          },
          {
            "title": "15. Severability",
            "content": "If any provision of these Terms of Service is found to be unenforceable or invalid under applicable law, the remaining provisions shall remain in full force and effect."
          },
          {
            "title": "16. Entire Agreement",
            "content": "These Terms of Service, along with our Privacy Policy, constitute the entire agreement between you and Hero Concierge Health and supersede any prior agreements, communications, or understandings, whether written or oral."
          }
        ]
      }
    }
  ]
};

export default structureData;
