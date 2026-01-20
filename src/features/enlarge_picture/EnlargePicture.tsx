import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, styled } from "@mui/material";

interface EnlargePictureProps {
  children: React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>>;
}

const BigImageContainer = styled(Box)({
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  position: "fixed",
  top: "50%",
  left: "50%",
  translate: "-50% -50%",
  cursor: "pointer",
});

const BigImageWrapper = styled(Box)({
  zIndex: "9999",
  position: "fixed",
  top: "50%",
  left: "50%",
  translate: "-50% -50%",
  width: "75vw",
  height: "75vh",
  cursor: "default",
});

const BigImageMotion = motion.create(BigImageContainer);

const ImageMotion = motion.create(BigImageWrapper);

export default function EnlargePicture({ children }: EnlargePictureProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const bigImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        bigImageRef.current &&
        !bigImageRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (bigImageRef.current && e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const clonedChildren = React.cloneElement(children, {
    onClick: (e: React.MouseEvent<HTMLImageElement>) => {
      e.stopPropagation();
      setIsOpen(true);
    },
    style: { cursor: "pointer" },
  });

  return (
    <>
      {clonedChildren}

      <AnimatePresence>
        {isOpen && (
          <BigImageMotion
            initial={{ width: "0", height: "0", opacity: 0 }}
            animate={{ width: "100vw", height: "100vh", opacity: 1 }}
            exit={{ width: "0", height: "0", opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ImageMotion
              initial={{ width: "0", height: "0", opacity: 0 }}
              animate={{ width: "80vw", height: "80vh", opacity: 1 }}
              exit={{ width: "0", height: "0", opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={children.props.src}
                alt={children.props.alt}
                ref={bigImageRef}
                style={{ width: "100%", height: "100%" }}
              />
            </ImageMotion>
          </BigImageMotion>
        )}
      </AnimatePresence>
    </>
  );
}
