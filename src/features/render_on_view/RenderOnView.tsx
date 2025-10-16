import { Box, styled } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import useIntersectionObserver from "./useIntersectionObserver";
import { RenderAnimationStyle } from "../../utils/Constants";
import React, { useMemo } from "react";

interface RenderProps {
  threshold?: number;
  animationDirection?: "top" | "right" | "bottom" | "left";
  animationSpeed?: number;
  offset?: number;
  withOpacity?: boolean;
  children: React.ReactElement;
}

const RenderWrapper = styled(Box)({
  width: "fit-content",
  height: "fit-content",
});

const RenderMotion = motion.create(RenderWrapper);

const RenderLine = styled(Box)({
  width: "90vw",
  height: "1px",
  margin: "0 auto",
});

export default function RenderOnView({
  threshold = 0.1,
  animationDirection = "top",
  animationSpeed = 0.5,
  offset = 30,
  withOpacity = true,
  children,
}: RenderProps) {
  const { isVisible, componentRef } = useIntersectionObserver<HTMLDivElement>({
    threshold,
  });
  const initialPosition = useMemo(
    () => RenderAnimationStyle(animationDirection, offset)["initial"],
    [animationDirection, offset]
  );
  const animatePosition = useMemo(
    () => RenderAnimationStyle(animationDirection, offset)["animate"],
    [animationDirection, offset]
  );
  return (
    <>
      <RenderLine ref={componentRef}></RenderLine>
      <AnimatePresence>
        {isVisible && (
          <RenderMotion
            initial={{
              ...(withOpacity ? { opacity: 0 } : {}),
              ...initialPosition,
            }}
            animate={{
              ...(withOpacity ? { opacity: 1 } : {}),
              ...animatePosition,
            }}
            exit={{
              ...(withOpacity ? { opacity: 0 } : {}),
              ...initialPosition,
            }}
            transition={{ duration: animationSpeed }}
          >
            {children}
          </RenderMotion>
        )}
      </AnimatePresence>
    </>
  );
}
