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

            <div className="flex items-end justify-between gap-3 flex-row-end md:mt-0 md:flex-row-center lg:!items-end">
              <p className="text-center font-bold md:text-left">
                {footerData.developedBy.text}
              </p>
              <Link
                href={footerData.developedBy.url}
                className="flex items-center"
              >
                <svg
                  width="163"
                  height="28"
                  viewBox="0 0 163 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M45.5196 15.7487H37.2738C37.6152 14.4398 37.9256 13.1646 38.2197 11.9539H46.1404C46.5217 11.9539 46.8025 12.3053 46.7153 12.6727L46.0946 15.2963C46.0325 15.5613 45.793 15.7487 45.5196 15.7487ZM44.7171 18.0677H36.6412C36.3131 19.2126 35.9554 20.3663 35.5593 21.5111H44.1865C44.4614 21.5111 44.7008 21.3237 44.7629 21.0573L45.2935 18.7851C45.3792 18.4176 45.0984 18.0677 44.7171 18.0677ZM120.422 11.9539H117.07C116.795 11.9539 116.556 12.1413 116.494 12.4077L114.828 19.5171C114.75 19.8524 114.3 19.9227 114.12 19.6284L109.606 12.2364C109.5 12.0608 109.308 11.9539 109.101 11.9539H106.145C105.87 11.9539 105.63 12.1427 105.568 12.4077L102.198 26.931C102.113 27.2985 102.395 27.6484 102.775 27.6484H106.126C106.4 27.6484 106.64 27.4595 106.702 27.1945L108.304 20.3004C108.381 19.968 108.824 19.8934 109.008 20.1818L113.588 27.3761C113.696 27.5459 113.885 27.6499 114.088 27.6499H117.051C117.326 27.6499 117.565 27.461 117.627 27.196L120.997 12.6727C121.083 12.3053 120.801 11.9553 120.421 11.9553L120.422 11.9539ZM162.411 11.9539H158.868C158.645 11.9539 158.443 12.0783 158.341 12.2745L154.56 19.6474C154.396 19.9666 153.911 19.8524 153.91 19.4952L153.873 12.5366C153.871 12.2145 153.607 11.9539 153.281 11.9539H149.909C149.684 11.9539 149.479 12.0798 149.378 12.2804L145.664 19.7162C145.506 20.0325 145.028 19.9314 145.012 19.5801L144.694 12.5131C144.679 12.1998 144.419 11.9539 144.103 11.9539H140.866C140.529 11.9539 140.26 12.2335 140.275 12.5673L140.976 27.0906C140.99 27.4024 141.25 27.6484 141.567 27.6484H145.41C145.636 27.6484 145.843 27.5196 145.942 27.3175L149.461 20.1159C149.619 19.7938 150.107 19.8992 150.114 20.2565L150.26 27.0745C150.268 27.3936 150.529 27.6469 150.852 27.6469H154.924C155.145 27.6469 155.349 27.5239 155.45 27.3278L162.934 12.8045C163.135 12.4151 162.85 11.9524 162.408 11.9524L162.411 11.9539ZM43.3795 23.8536H34.702C34.3843 24.8257 33.9438 26.4098 32.6077 27.6484H42.7735C43.0499 27.6484 43.2878 27.4595 43.3499 27.1931L43.9544 24.5695C44.0386 24.2035 43.7578 23.8536 43.378 23.8536H43.3795ZM102.033 19.8011C101.527 22.3164 100.59 24.3104 99.2188 25.7861C97.8472 27.2619 96.0425 27.9998 93.8033 27.9998C91.5641 27.9998 90.0034 27.259 88.7899 25.7744C87.575 24.2913 87.2129 22.3003 87.7021 19.8011C88.1913 17.3035 89.121 15.3109 90.4926 13.8279C91.8642 12.3448 93.6777 11.6025 95.9317 11.6025C98.1856 11.6025 99.7701 12.3565 100.969 13.863C102.166 15.3695 102.521 17.3489 102.033 19.8011ZM97.3742 16.6154C97.0594 15.8497 96.5066 15.4676 95.7188 15.4676C94.9311 15.4676 94.2098 15.8468 93.6023 16.6037C92.9949 17.3606 92.5574 18.4279 92.2898 19.8011C92.0061 21.2066 92.0253 22.2841 92.349 23.0337C92.6712 23.7833 93.2195 24.1581 93.9925 24.1581C94.7655 24.1581 95.5016 23.776 96.109 23.0103C96.7165 22.2461 97.1614 21.1759 97.4451 19.8011C97.7127 18.4425 97.689 17.3811 97.3742 16.6154ZM85.2915 13.863C86.4886 15.3695 86.8434 17.3489 86.3556 19.8011C85.8502 22.3164 84.9131 24.3104 83.5415 25.7861C82.1699 27.2619 80.3652 27.9998 78.1261 27.9998C75.8869 27.9998 74.3261 27.259 73.1126 25.7744C71.8992 24.2913 71.5356 22.3003 72.0248 19.8011C72.514 17.3035 73.4437 15.3109 74.8153 13.8279C76.1869 12.3448 78.0004 11.6025 80.2544 11.6025C82.5084 11.6025 84.0928 12.3565 85.2915 13.863ZM81.6969 16.8496C81.3821 15.8497 80.8293 15.4676 80.0416 15.4676C79.2538 15.4676 78.5325 15.8468 77.925 16.6037C77.3176 17.3606 76.8801 18.4279 76.6126 19.8011C76.3288 21.2066 76.348 22.2841 76.6717 23.0337C76.9939 23.7833 77.5422 24.1581 78.3152 24.1581C79.0882 24.1581 79.8243 23.776 80.4317 23.0103C81.0392 22.2461 81.4841 21.1759 81.7679 19.8011C82.0354 18.4425 82.0117 17.3811 81.6969 16.6154ZM61.596 15.3505C61.596 16.2406 61.3713 17.0136 60.922 17.6695C60.4727 18.3254 59.9716 18.7939 59.4203 19.075C58.869 19.3561 58.3251 19.5127 57.7886 19.5435L57.7649 19.6372C58.5379 19.6694 59.175 19.9065 59.6805 20.3516C60.1845 20.7967 60.4372 21.457 60.4372 22.331C60.4372 23.8624 59.8179 25.1302 58.5808 26.1375C57.3422 27.1448 55.7622 27.6484 53.8393 27.6484H46.0443C45.6645 27.6484 45.3836 27.2985 45.4679 26.931L48.8378 12.4077C48.8998 12.1413 49.1378 11.9539 49.4142 11.9539H57.4812C58.7419 11.9539 59.7425 12.2628 60.4845 12.8792C61.225 13.4955 61.596 14.3198 61.596 15.3505ZM55.8243 22.3369C55.8361 21.9518 55.715 21.6531 55.4593 21.4409C55.2154 21.2388 54.871 21.1363 54.4306 21.1363H51.5913C51.4538 21.1363 51.3341 21.23 51.3031 21.3633L50.7311 23.7994C50.6882 23.9824 50.8286 24.1581 51.0193 24.1581H53.6975C54.3197 24.1581 54.8281 23.9824 55.2198 23.6325C55.5893 23.3031 55.8095 22.8288 55.8243 22.3369ZM56.89 16.592C56.89 16.2333 56.7717 15.9522 56.5352 15.7487C56.2988 15.5452 55.9751 15.4442 55.5657 15.4442H52.9392C52.8018 15.4442 52.6821 15.5379 52.651 15.6696L52.1042 17.9887C52.0613 18.1717 52.2017 18.3488 52.3924 18.3488H54.8104C55.409 18.3488 55.9056 18.1804 56.3002 17.8452C56.6949 17.5099 56.8914 17.0912 56.8914 16.592H56.89ZM136.441 13.9801C137.938 15.5818 138.538 17.5216 138.238 19.8011C137.923 22.2066 136.914 24.1742 135.211 25.7041C133.509 27.2355 131.397 27.9998 128.874 27.9998C126.429 28.0159 124.463 27.2267 122.973 25.6339C121.484 24.041 120.888 22.0968 121.188 19.8011C121.488 17.4909 122.536 15.5422 124.333 13.9567C126.13 12.3711 128.203 11.5791 130.553 11.5791C132.903 11.5791 134.944 12.3799 136.441 13.9801ZM132.917 16.8496C132.27 16.0532 131.397 15.655 130.292 15.655C129.125 15.655 128.117 16.0488 127.266 16.8379C126.414 17.627 125.91 18.6153 125.752 19.8011C125.594 20.9885 125.838 21.9767 126.485 22.7644C127.131 23.5535 128.006 23.9473 129.11 23.9473C130.292 23.9473 131.305 23.5564 132.149 22.7761C132.993 21.9957 133.492 21.0046 133.651 19.8011C133.809 18.6299 133.563 17.6461 132.917 16.8496ZM71.0449 11.9539H69.3023C69.0067 11.9539 68.7141 12.0124 68.4421 12.1252L63.6992 14.0987C63.4021 14.2217 63.1848 14.4794 63.1124 14.7897L62.3542 18.0487C62.2832 18.3547 62.5862 18.6167 62.8833 18.5025L65.6487 17.4396C65.8364 17.3679 66.0285 17.5319 65.9827 17.7266L63.8425 26.931C63.7568 27.2985 64.0391 27.6484 64.419 27.6484H67.675C67.9499 27.6484 68.1894 27.4595 68.2514 27.1945L71.6213 12.6713C71.707 12.3038 71.4247 11.9539 71.0449 11.9539Z"
                    fill="url(#paint0_linear_141_921)"
                  />
                  <path
                    d="M25.9818 22.3705C30.7395 22.3705 28.6777 0 38.1576 0C39.8307 0 40.9289 0.695419 41.6206 1.42158C42.0345 1.8564 41.7063 2.56353 41.1033 2.55768C41.093 2.55768 41.0811 2.55768 41.0708 2.55768C37.6921 2.55768 37.1674 13.8103 33.3674 23.4407C32.7747 24.9428 29.866 26.1024 29.866 26.1024C29.866 26.1024 23.7899 22.3705 25.9818 22.3705Z"
                    fill="url(#paint1_linear_141_921)"
                  />
                  <path
                    d="M14.9115 7.63057C12.4048 12.5249 11.9584 21.8347 9.04527 23.085C6.67158 24.1039 14.1917 29.5677 16.357 23.4407C18.5223 17.3137 18.9687 10.197 21.8242 9.50454C24.6797 8.81205 17.4226 2.7275 14.9115 7.63057Z"
                    fill="url(#paint2_linear_141_921)"
                  />
                  <path
                    d="M0.703336 11.7226C0.0781369 11.7284 -0.238158 10.9803 0.211158 10.5499C0.935384 9.85445 2.07198 9.20881 3.79534 9.20881C12.5659 9.20881 8.91961 24.3646 14.1828 24.3646C15.6874 24.3646 16.3584 23.4407 16.3584 23.4407C16.3584 23.4407 15.686 27.6469 10.7656 27.6469C2.69422 27.6469 5.35612 11.7226 0.741764 11.7226C0.72994 11.7226 0.718116 11.7226 0.706292 11.7226H0.703336Z"
                    fill="url(#paint3_linear_141_921)"
                  />
                  <path
                    d="M14.9115 7.63057C14.9115 7.63057 15.8958 4.6044 19.6234 4.6044C28.3939 4.6044 25.93 24.3645 31.1932 24.3645C32.6979 24.3645 33.3689 23.4407 33.3689 23.4407C33.3689 23.4407 32.6964 27.6469 27.7761 27.6469C19.3026 27.6469 21.5359 7.11669 16.5698 7.11669C15.3593 7.11669 14.9129 7.62911 14.9129 7.62911L14.9115 7.63057Z"
                    fill="url(#paint4_linear_141_921)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_141_921"
                      x1="2.03423"
                      y1="13.9998"
                      x2="161.75"
                      y2="13.9998"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6F33EF" />
                      <stop offset="0.5" stopColor="#E052A7" />
                      <stop offset="1" stopColor="#FF7367" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_141_921"
                      x1="81.5038"
                      y1="25.7432"
                      x2="81.5038"
                      y2="1.73223"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#E052A7" />
                      <stop offset="1" stopColor="#6F33EF" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_141_921"
                      x1="81.4894"
                      y1="25.7428"
                      x2="81.4894"
                      y2="1.73352"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#E052A7" />
                      <stop offset="1" stopColor="#6F33EF" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_141_921"
                      x1="81.4843"
                      y1="25.7434"
                      x2="81.4843"
                      y2="1.73416"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6F33EF" />
                      <stop offset="1" stopColor="#E052A7" />
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_141_921"
                      x1="24.1387"
                      y1="25.7905"
                      x2="24.1387"
                      y2="6.03038"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6F33EF" />
                      <stop offset="1" stopColor="#E052A7" />
                    </linearGradient>
                  </defs>
                </svg>
              </Link>
            </div>
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
