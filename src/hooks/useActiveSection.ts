import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // 1. Initialize the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px', // Adjusted slightly to trigger more reliably on smaller screens
      }
    );

    // 2. Helper function to find and observe elements
    const observeElements = (): boolean => {
      let allElementsFound = true;
      
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        } else {
          allElementsFound = false;
        }
      });
      
      return allElementsFound;
    };

    // 3. Attempt to observe immediately (works for statically rendered elements)
    const elementsFound = observeElements();

    let mutationObserver: MutationObserver | null = null;

    // 4. If elements are missing (because they are waiting on a fetch request),
    // watch the DOM for changes and re-attempt observing when it updates.
    if (!elementsFound) {
      mutationObserver = new MutationObserver(() => {
        if (observeElements()) {
          // Once all elements are found and observed, stop watching the DOM
          mutationObserver?.disconnect();
        }
      });

      mutationObserver.observe(document.body, { 
        childList: true, 
        subtree: true 
      });
    }

    // 5. Cleanup both observers on unmount
    return () => {
      observer.disconnect();
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    };
  }, [sectionIds]);

  return activeSection;
}