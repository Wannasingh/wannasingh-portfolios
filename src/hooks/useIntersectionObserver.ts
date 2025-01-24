"use client";
import { useEffect, useState, useRef, RefObject } from 'react';

export function useIntersectionObserver<T extends HTMLElement>(
  options?: IntersectionObserverInit
): [RefObject<T>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref as RefObject<T>, isVisible];
}
