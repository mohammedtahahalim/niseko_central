import { useEffect, useState } from "react";
import { debouncer } from "../../../utils/Constants";

export default function useSlideAndHeightCount() {
  const [slideCount, setSlideCount] = useState<number>(2);
  const [maxHeight, setMaxHeight] = useState<string>("350px");

  useEffect(() => {
    const onResize = debouncer(() => {
      const winwidth = window.innerWidth;
      if (winwidth > 1300) {
        setMaxHeight("350px");
        setSlideCount(2);
      }
      if (winwidth < 1300 && winwidth > 1024) {
        setMaxHeight("");
        setSlideCount(2);
      }
      if (winwidth < 1024 && winwidth > 750) {
        setMaxHeight("350px");
        setSlideCount(2);
      }
      if (winwidth < 750) {
        setMaxHeight("350px");
        setSlideCount(1);
      }
    }, 100);
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { slideCount, maxHeight };
}
