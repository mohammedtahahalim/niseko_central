import { useEffect, useState } from "react";

interface UseSkeltonCountReturn {
  skeltonCount: number;
}

const countNumber = (basis: number) => {
  if (basis > 1200) return 9;

  if (basis > 750) return 6;
  if (basis > 550) return 3;
  return 1;
};

export default function useSkeltonCount(): UseSkeltonCountReturn {
  const [skeltonCount, setSkeltonCount] = useState<number>(
    countNumber(window.innerWidth)
  );

  useEffect(() => {
    const onResize = () => {
      setSkeltonCount(countNumber(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { skeltonCount };
}
