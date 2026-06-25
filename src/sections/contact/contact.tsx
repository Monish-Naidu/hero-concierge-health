'use client';

import { InView } from '@/components/animation/InView';
import { Typography } from '@/components/ui/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// 1) Import the toast function from react-toastify
import { toast } from 'react-toastify';

/**
 * Fallback-capable copy-to-clipboard function.
 */
async function copyTextToClipboard(text: string) {
  // If the browser supports navigator.clipboard in a secure context...
  if (
    typeof navigator !== 'undefined' &&
    navigator.clipboard &&
    navigator.clipboard.writeText
  ) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback to the old execCommand API
    return new Promise<void>((resolve, reject) => {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;

        // Move off-screen just in case
        textArea.style.position = 'fixed';
        textArea.style.left = '-99999px';
        textArea.style.top = '-99999px';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        // Attempt the copy
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
          resolve();
        } else {
          reject(new Error('execCommand failed'));
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}

/**
 * Hook to detect if screen is under 700px.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 700);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
}

type ContactProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  address?: string;
  mapLink?: string;
  directionsText?: string;
  footerData?: {
    email: string;
    address: string;
    phone: string;
  };
  disclaimer: string;
  map: string;
};

export const Contact = ({
  title,
  subtitle,
  description,
  address,
  mapLink,
  directionsText = 'Get Directions',
  footerData,
  disclaimer,
  map,
}: ContactProps) => {
  const isMobile = useIsMobile();
  const [showMapOptions, setShowMapOptions] = useState(false);

  // The address text we want to copy
  const addressToCopy = address;

  // Called when user taps the map or address on mobile
  const handleMapClick = () => {
    if (isMobile) {
      setShowMapOptions(true);
    } else {
      // Desktop: open Google Maps in a new tab
      window.open(mapLink, '_blank');
    }
  };

  // Buttons in the modal:
  const openGoogleMaps = () => {
    window.open(mapLink, '_blank');
    setShowMapOptions(false);
  };

  const openAppleMaps = () => {
    window.open(
      'https://maps.apple.com/?address=1416%20W%20Belmont%20Ave,%20Chicago,%20IL%20%2060657,%20United%20States&auid=2704921888719263764&ll=41.939954,-87.664542&lsp=9902&q=1416%20W%20Belmont%20Condo%20Association&t=m',
      '_blank'
    );
    setShowMapOptions(false);
  };

  const copyAddress = async () => {
    try {
      await copyTextToClipboard(addressToCopy || '');
      // Instead of alert, show a toast
      toast.success('Address copied to clipboard!', {
        autoClose: 3000, // 3 seconds, for example
      });
    } catch (err) {
      console.error('Failed to copy address:', err);
      toast.error('Failed to copy. Please try again.', {
        autoClose: 3000,
      });
    }
    setShowMapOptions(false);
  };

  return (
    <div className="container flex flex-col gap-3">
      {/* MAP OPTIONS MODAL (only shown if showMapOptions === true) */}
      {showMapOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative flex flex-col items-center gap-3 rounded-md bg-white p-6">
            <Typography variant="h4" className="mb-2 font-bold">
              Open Address
            </Typography>

            <button
              onClick={openGoogleMaps}
              className="w-full rounded-md bg-[#A86A45] px-4 py-2 font-bold text-white hover:bg-[#7E4A2E]"
            >
              {directionsText}
            </button>
            <button
              onClick={openAppleMaps}
              className="w-full rounded-md bg-[#A86A45] px-4 py-2 font-bold text-white hover:bg-[#7E4A2E]"
            >
              Apple Maps
            </button>
            <button
              onClick={copyAddress}
              className="w-full rounded-md border border-[#A86A45] px-4 py-2 font-bold text-[#A86A45] hover:bg-[#f1f1f1]"
            >
              Copy Address
            </button>

            <button
              onClick={() => setShowMapOptions(false)}
              className="absolute right-2 top-2 text-sm font-bold text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="flex w-full flex-col text-center items-center justify-center font-bold">
        <InView
          variants={{
            hidden: {
              opacity: 0,
              x: -100,
            },
            visible: {
              opacity: 1,
              x: 0,
            },
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          viewOptions={{ margin: '0px 0px -50px 0px' }}
        >
          <Typography
            variant="h3"
            align="center"
            className="mb-2 font-bold text-[#2D2525] md:mb-4 lg:font-bold"
          >
            {title}
            {/* <span className="text-[#A86A45]">Location</span> Opening Soon! */}
          </Typography>
        </InView>
      </div>

      {/* Map Section */}
      {map && (
      <div className="relative w-full">
        <div className="relative overflow-hidden rounded-[50px]">
          <iframe
            src={map}
            width="100%"
            height={isMobile ? '300' : '500'} // Set height based on isMobile
            style={{ border: 0, pointerEvents: isMobile ? 'none' : 'auto' }}
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          />
          {/* Overlay to capture clicks on mobile */}
          {isMobile && (
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={handleMapClick}
            />
          )}
        </div>
      </div>
      )}

      {/* Contact Info */}
      <div className="relative w-full items-center justify-center rounded-[30px] py-[20px] md:px-[24px]">
        <Typography variant="h4" className="text-[#000]">
          {subtitle}
        </Typography>
        <Typography variant="h5" className="pb-6 text-[#79738B]">
          {description}
        </Typography>

        <div className="flex flex-col items-start justify-center gap-6 rounded-lg sm:items-center">
          <div className="flex gap-6 border-t-[1.5px] border-[#A86A45] pt-6 flex-col-start sm:flex-row-start">
            {/* Email */}
            <div className="flex w-full gap-4 flex-row-start sm:flex-row-center">
              <Image src="/images/mail.svg" width={40} height={40} alt="mail" />
              <Typography variant="h5" className="text-[#000]">
                <Link
                  href={`mailto:${footerData?.email}`}
                  className="text-[#000]"
                >
                  {footerData?.email}
                </Link>
              </Typography>
            </div>

            {/* Address */}
            <div className="flex w-full gap-4 flex-row-center">
              <Image src="/images/map.svg" width={40} height={40} alt="map" />
              <Typography variant="h5" className="text-[#000]">
                {isMobile ? (
                  <button
                    onClick={handleMapClick}
                    className="text-left text-[#000] underline"
                  >
                    {address}
                  </button>
                ) : (
                  <Link
                    href={mapLink || ''}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#000]"
                  >
                    {address}
                  </Link>
                )}
              </Typography>
            </div>
          </div>

          {/* Phone */}
          <div className="flex w-full !items-start !justify-start gap-4 flex-row-center sm:!items-center sm:!justify-center">
            <Image src="/images/phone.svg" width={40} height={40} alt="phone" />
            <Typography variant="h5" className="text-[#000]">
              <Link href={`tel:${footerData?.phone}`} className="text-[#000]">
                {footerData?.phone}
              </Link>
            </Typography>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-[36px] text-[10px] font-extrabold leading-[17px] text-[#333b57] md:mt-[60px]">
        {disclaimer}
      </p>
    </div>
  );
};
