import { Box, styled } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import useIntersectionObserver from "./useIntersectionObserver";
import { RenderAnimationStyle } from "../../utils/Constants";
import React from "react";

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
  return (
    <>
      <RenderLine ref={componentRef}></RenderLine>
      <AnimatePresence>
        {isVisible && (
          <RenderMotion
            initial={{
              ...(withOpacity ? { opacity: 0 } : {}),
              ...RenderAnimationStyle(animationDirection, offset)["initial"],
            }}
            animate={{
              ...(withOpacity ? { opacity: 1 } : {}),
              ...RenderAnimationStyle(animationDirection, offset)["animate"],
            }}
            exit={{
              ...(withOpacity ? { opacity: 0 } : {}),
              ...RenderAnimationStyle(animationDirection, offset)["initial"],
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
