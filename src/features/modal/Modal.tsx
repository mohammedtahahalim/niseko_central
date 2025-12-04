import { Box, styled } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import React, { useEffect } from "react";
import useModal from "./useModal";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";

interface ModalProps {
  trigger: React.ReactElement<any>;
  children: React.ReactElement<any>;
  sx?: React.CSSProperties;
  fullScreenWrapper?: boolean;
  blurBackground?: boolean;
  br?: boolean;
  disableScroll?: boolean;
  isTransparent?: boolean;
}

type ModalStyle = Omit<
  ModalProps,
  "trigger" | "children" | "sx" | "fullScreenWrapper"
>;

const ModalContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "blurBackground",
})<ModalStyle>(({ blurBackground }) => ({
  position: "fixed",
  width: "100vw",
  height: "100vh",
  top: "0",
  left: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: blurBackground ? "rgba(255, 255, 255, 0.15)" : "transparent",
  backdropFilter: blurBackground ? "blur(3px)" : "blur(0px)",
  zIndex: 9999,
}));

const ModalMotion = motion.create(ModalContainer);

const ModalWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "fullScreenWrapper" && prop !== "br" && prop !== "isTransparent",
})<{ fullScreenWrapper: boolean; br: boolean; isTransparent: boolean }>(
  ({ theme, fullScreenWrapper, br, isTransparent }) => ({
    position: "relative",
    width: fullScreenWrapper ? "100vw" : "fit-content",
    height: fullScreenWrapper ? "100vh" : "fit-content",
    minWidth: "150px",
    minHeight: "150px",
    backgroundColor: isTransparent
      ? "transparent"
      : theme.palette.headfoot?.main,
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: `${br ? 12 : 0}px`,
    border: `1px solid ${theme.palette.divider}`,
  })
);

const CloseModalWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "15px",
  insetInlineEnd: "20px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  color: theme.palette.textColor?.main,
}));

export default function Modal({
  trigger,
  children,
  sx = {},
  blurBackground = true,
  fullScreenWrapper = false,
  br = false,
  disableScroll = false,
  isTransparent = false,
}: ModalProps) {
  const { parentRef, modalRef, openModal, closeModal, isOpen } = useModal({
    disableScroll,
  });
  const queries = useLocation().search;

  useEffect(() => {
    closeModal();
  }, [queries]);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableSelectors = [
      "a[href]",
      "button",
      "textarea",
      "input",
      "select",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");

    const modal = modalRef.current;
    const focusable = Array.from(
      modal.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      } else if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    first.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  const clonedTrigger = React.cloneElement(trigger, {
    ref: (node: HTMLElement) => {
      parentRef.current = node;
    },
    onClick: openModal,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        openModal();
      }
    },
    "aria-haspopup": "dialog",
  });

  const clonedChild = React.cloneElement(children, {
    style: {
      width: "100%",
      height: "100%",
      minHeight: "150px",
      ...(children.props.style || {}),
    },
  });

  return (
    <>
      {clonedTrigger}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <ModalMotion
              sx={sx}
              blurBackground={blurBackground}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              tabIndex={-1}
            >
              <ModalWrapper
                ref={modalRef}
                fullScreenWrapper={fullScreenWrapper}
                br={br}
                isTransparent={isTransparent}
              >
                <CloseModalWrapper
                  onClick={closeModal}
                  aria-label="Close Modal"
                  tabIndex={0}
                >
                  <CloseIcon fontSize="medium" color="inherit" />
                </CloseModalWrapper>
                {clonedChild}
              </ModalWrapper>
            </ModalMotion>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
