import { useEffect, useState } from "react";
import { debouncer } from "../../utils/Constants";

interface UseScrollProps {
  delay?: number;
}

interface UseScrollReturn {
  isScrolling: boolean;
}

export default function useScroll({
  delay,
}: UseScrollProps = {}): UseScrollReturn {
  const [isScrolling, setIsScrolling] = useState<boolean>(window.scrollY !== 0);

  useEffect(() => {
    const onScrollEvent = debouncer(() => {
      setIsScrolling(window.scrollY !== 0);
    }, delay ?? 0);
    window.addEventListener("scroll", onScrollEvent);
    return () => {
      window.removeEventListener("scroll", onScrollEvent);
    };
  }, []);

  return { isScrolling };
}
