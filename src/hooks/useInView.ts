'use client'

import { useEffect, useState } from "react";

const useInView = (ref: React.RefObject<HTMLElement>, options?: IntersectionObserverInit) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      options
    );

    const currentElement = ref.current;
    observer.observe(currentElement);

    return () => {
      observer.unobserve(currentElement);
    };
  }, [ref, options]);

  return inView;
};

export default useInView;
