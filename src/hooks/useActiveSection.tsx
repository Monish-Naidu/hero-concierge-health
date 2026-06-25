// hooks/useActiveSection.ts
'use client';

import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    function handleScroll() {
      /**
       * Variable to store the current section.
       * On each scroll, iterate through section IDs in the sectionIds array
       * and check if we're within each section's boundaries.
       */
      let currentSection = '';

      for (const id of sectionIds) {
        const sectionElement = document.getElementById(id);
        if (sectionElement) {
          // Determine section start point considering header offset
          const offsetTop = sectionElement.offsetTop - 220;
          // Can add marginBottom if needed between sections
          // const offsetBottom = offsetTop + sectionElement.offsetHeight;

          if (window.pageYOffset >= offsetTop) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    // Call handleScroll to determine active section on initial render
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  return activeSection;
}
