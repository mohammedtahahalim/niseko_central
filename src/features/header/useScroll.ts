import { useEffect, useState } from "react";
import { debouncer } from "../../utils/Constants";

interface UseScrollProps {
  delay?: number;
}

interface UseScrollReturn {
  isScrolling: boolean;
  barWidth?: number;
}

export default function useScroll({
  delay,
}: UseScrollProps = {}): UseScrollReturn {
  const [isScrolling, setIsScrolling] = useState<boolean>(window.scrollY !== 0);
  const [barWidth, setBarWidth] = useState<number>(0);

  useEffect(() => {
    const onScrollEvent = debouncer(() => {
      const scrollTop = window.scrollY;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / scrollableHeight) * 100;
      setIsScrolling(scrollTop !== 0);
      setBarWidth(scrollPercent);
    }, delay ?? 0);
    window.addEventListener("scroll", onScrollEvent);
    return () => {
      window.removeEventListener("scroll", onScrollEvent);
    };
  }, []);

  return { isScrolling, barWidth };
}
