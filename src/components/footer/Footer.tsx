'use client';

import { DocumentType } from '@/api/types';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Typography } from '../ui/Typography';
import { structureData } from '@/data/structure';

type FooterData = {
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  navigation: {
    title: string;
    url: string;
  }[];
  copyright: string;
  developedBy: {
    text: string;
    name: string;
    url: string;
  };
};

export const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeDocument, setActiveDocument] = useState<DocumentType | null>(null);
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    const loadFooterData = () => {
      try {
        // Use structureData directly instead of API calls
        const footer = structureData.home?.footer as FooterData;
        setFooterData(footer);
        
        // Initialize documents with mock data (since API is not used)
        setDocuments([
          {
            id: '1',
            type: 'privacyPolicy',
            title: 'Privacy Policy',
            content: {
              title: 'Privacy Policy',
              description: 'Our privacy policy outlines how we collect, use, and protect your personal information.',
              sections: [],
            },
          },
          {
            id: '2',
            type: 'termsOfService',
            title: 'Terms Of Service',
            content: {
              title: 'Terms Of Service',
              description: 'These terms and conditions govern your use of our website and services.',
              sections: [],
            },
          },
        ]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load footer data'
        );
      }
    };

    loadFooterData();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const openModal = (docType: string) => {
    const doc = documents.find((d) => d.type === docType);
    if (doc) {
      setActiveDocument(doc);
      setModalOpen(true);
    }
  };

  const relevantDocs =
    documents.length > 0
      ? documents.filter((doc) =>
          ['privacyPolicy', 'termsOfService'].includes(doc.type)
        )
      : [];

  if (!footerData || isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <footer className="relative mb-4 px-4 sm:px-6 lg:mb-10 lg:px-8">
        <div className="container relative">
          <div className="flex flex-col gap-4 md:items-center md:justify-between md:space-y-0 xl:flex-row-between">
            <Typography
              variant="h6"
              className="text-center text-[#000a2d] md:text-left md:text-lg lg:mt-0"
            >
              &copy; {new Date().getFullYear()}. {footerData.copyright}
            </Typography>

            <div className="flex items-center justify-center gap-4">
              {relevantDocs.map((doc) => (
                <button
                  key={doc.type}
                  onClick={() => openModal(doc.type)}
                  className="text-sm font-semibold text-[#000a2d] transition-colors duration-300 hover:text-[#A86A45] md:text-lg"
                >
                  {doc.title || doc.type}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-5 sm:gap-3 md:mt-0 md:justify-start" />

          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isModalOpen && activeDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-gradientFromBooking/10 bg-opacity-50 p-4 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{
                type: 'spring',
                duration: 0.5,
                bounce: 0.3,
              }}
              className="max-h-[85vh] w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 flex items-center justify-between"
              >
                <h2 className="text-2xl font-bold text-[#000a2d]">
                  {activeDocument.content.title}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setModalOpen(false)}
                  className="rounded-full p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="customScrollbar space-y-6 overflow-y-auto pr-2"
                style={{
                  maxHeight: 'calc(85vh - 120px)',
                }}
              >
                {activeDocument.content.description && (
                  <p className="leading-relaxed text-gray-600">
                    {activeDocument.content.description}
                  </p>
                )}

                {Array.isArray(activeDocument.content.sections) &&
                  activeDocument.content.sections.map((section, index) => (
                    <div key={index} className="space-y-3">
                      {section.title && (
                        <h3 className="text-xl font-semibold text-[#000a2d]">
                          {section.title}
                        </h3>
                      )}

                      {Array.isArray(section.content) ? (
                        <ul className="list-inside list-disc space-y-2 pl-4">
                          {section.content.map((item, i) => (
                            <li
                              key={i}
                              className="leading-relaxed text-gray-600"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="leading-relaxed text-gray-600">
                          {section.content}
                        </p>
                      )}
                    </div>
                  ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
