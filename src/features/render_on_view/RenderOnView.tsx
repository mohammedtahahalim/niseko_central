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

const Placeholder = styled(Box)({
  width: "100%",
  minHeight: "250px",
  display: "flex",
  flexDirection: "column",
});

const RenderWrapper = styled(Box)({
  width: "100%",
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
  animationSpeed = 1,
  offset = 75,
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
    <Placeholder>
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
    </Placeholder>
  );
}
