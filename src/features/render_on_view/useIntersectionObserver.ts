import { useEffect, useRef, useState, type RefObject } from "react";

interface UseIntersectionObserverProps {
  threshold: number;
}

interface UseIntersectionObserverReturn<T extends HTMLElement> {
  isVisible: boolean;
  componentRef: RefObject<T | null>;
}

export default function useIntersectionObserver<T extends HTMLElement>({
  threshold,
}: UseIntersectionObserverProps): UseIntersectionObserverReturn<T> {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const componentRef = useRef<T | null>(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold,
      }
    );

    if (componentRef.current) {
      intersectionObserver.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        intersectionObserver.unobserve(componentRef.current);
      }
    };
  }, []);

  return { isVisible, componentRef };
}
