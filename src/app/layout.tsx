import { Footer } from '@/components/footer/Footer';
import { NavBar } from '@/components/header/NavBar';
import { ScreenSize } from '@/utils/screen-size';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProviderWrapper } from '@/components/ApolloProviderWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hero Concierge Health | Chicago Concierge Medicine for Men & Women',
  description:
    'Hero Concierge Health is a Chicago concierge clinic for men and women. Personalized, telehealth-backed care from a real local medical team, with hormone optimization, weight management, longevity, sexual health, and aesthetics.',
  openGraph: {
    type: 'website',
    url: 'https://heromenshealth.com/',
    title: 'Hero Concierge Health | Chicago Concierge Medicine for Men & Women',
    description:
      'Concierge medicine for men and women in Chicago. Hero Concierge Health blends a real local clinic with seamless telehealth so you get attentive, personalized care, from hormone optimization and weight management to longevity, sexual health, and aesthetics.',
    images: [
      {
        url: 'https://heromenshealth.com/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Concierge medicine for men and women in Chicago',
      },
      {
        url: 'https://heromenshealth.com/images/services/service-1.webp',
        width: 800,
        height: 600,
        alt: 'Meet Our Expert Clinicians',
      },
      {
        url: 'https://heromenshealth.com/images/services/service-2.webp',
        width: 800,
        height: 600,
        alt: 'Our Featured Services',
      },
    ],
    siteName: 'Hero Concierge Health',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hero Concierge Health | Chicago Concierge Medicine for Men & Women',
    description:
      'Concierge medicine for men and women in Chicago, backed by a real local clinic and seamless telehealth. Personalized care for hormones, weight, longevity, sexual health, and aesthetics.',
    images: ['https://heromenshealth.com/images/hero-bg.jpg'],
    site: '@HeroConcierge',
    creator: '@HeroConcierge',
  },
  alternates: {
    canonical: 'https://heromenshealth.com/',
  },
};

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Y1LSE2Z87J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y1LSE2Z87J');
          `}
        </Script>
      </head>
      <body
        className={`${montserrat.style} ${montserrat.className} min-h-screen antialiased`}
        suppressHydrationWarning
      >
        <ApolloProviderWrapper>
        <ToastContainer position="bottom-center" />
        <NavBar sticky variant="centered" />
        {children}
        {process.env.ENVIRONMENT === 'development' && <ScreenSize />}

        <Footer />
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
