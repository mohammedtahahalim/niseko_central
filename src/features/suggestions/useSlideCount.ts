import { useEffect, useState } from "react";
import { debouncer, swiperSlideCount } from "../../utils/Constants";

interface UseSlideCountReturn {
  slideCount: number;
}

export default function useSlideCount(): UseSlideCountReturn {
  const [slideCount, setSlideCount] = useState<number>(
    swiperSlideCount(window.innerWidth)
  );
  useEffect(() => {
    window.addEventListener(
      "resize",
      debouncer(() => {
        setSlideCount(swiperSlideCount(window.innerWidth));
      }, 100)
    );
  }, []);

  return { slideCount };
}
