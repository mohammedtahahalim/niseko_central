import { Box, styled } from "@mui/material";
import useModal from "./useModal";
import { cloneElement, type CSSProperties } from "react";

interface ModalProps {
  fullScreen?: boolean;
  blurBackground?: boolean;
  sx: React.CSSProperties;
  children: React.ReactNode;
  trigger: React.ReactElement;
}

const ModalContainer = styled(Box)<{
  fullScreen: boolean;
  blurBackground: boolean;
  sx: CSSProperties;
}>(({ theme, fullScreen, blurBackground, sx }) => ({
  width: fullScreen ? "100vw" : "",
  height: fullScreen ? "100vh" : "",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: blurBackground
    ? "rgba(255, 255, 255, 0.3)"
    : theme.palette.headfoot?.main,
  ...sx,
}));

const ModalWrapper = styled(Box)({});

export default function Modal<P extends HTMLElement, M extends HTMLElement>({
  fullScreen = false,
  blurBackground = true,
  sx = {},
  children,
  trigger,
}: ModalProps) {
  const { modalRef, parentRef, isOpen, openModal, closeModal } = useModal<
    P,
    M
  >();
  console.log(parentRef, isOpen, closeModal);
  const clonedTrigger = cloneElement(trigger as React.ReactElement, {
    onClick: (e: MouseEvent) => {
      e.stopPropagation();
      openModal();
    },
  });
  return (
    <>
      <ModalContainer
        fullScreen={fullScreen}
        blurBackground={blurBackground}
        sx={sx}
        ref={modalRef}
      >
        <ModalWrapper>{children}</ModalWrapper>
      </ModalContainer>
    </>
  );
}
