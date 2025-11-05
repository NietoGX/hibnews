import { useEffect, useRef, useState } from "react";

interface UseNearScreenOptions {
  distance?: string;
  once?: boolean;
  externalRef?: React.RefObject<HTMLElement>;
}

export function useNearScreen({
  distance = "100px",
  once = true,
  externalRef,
}: UseNearScreenOptions = {}) {
  const [isNear, setIsNear] = useState(false);
  const fromRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = externalRef ? externalRef.current : fromRef.current;

    if (!element) return;

    const onChange = (entries: IntersectionObserverEntry[]) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setIsNear(true);
        if (once && observer) {
          observer.disconnect();
        }
      } else if (!once) {
        setIsNear(false);
      }
    };

    const observer = new IntersectionObserver(onChange, {
      rootMargin: distance,
    });

    observer.observe(element);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [distance, once, externalRef]);

  return { isNear, fromRef };
}
