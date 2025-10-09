import { Box, styled } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import React from "react";
import useModal from "./useModal";
import CloseIcon from "@mui/icons-material/Close";

/* Read Carefully on how to use the modal */
/*

-- The Modal accepts the component to trigger the opening of the modal as trigger prop.
-- The Modal takes the children as the instance of the modal to be created after the the trigger
has been triggered.
-- it accepts the following additional props, fullScreenModal a boolean value that determine if the wrapper
around the modal takes the full screen width or not (the wrapper styling can be adjusted by using the
sx prop)
-- fullScreenWrapper that determine if the wrapper itself around your modal is full screen or not
-- blurBackground a boolean value, needed if the wrapper is bigger than the modal content
this will render the wrapper as blurry glass effect that mask the backround to highlight the modal
-- sx an optional styling to style the wrapper of the modal (this is optional and had no default
value)
-- br an optional number value that sets the border of the wrapper
-- disableScroll wether you want to disable scroll while modal is active or not, by default is false


*/

interface ModalProps {
  trigger: React.ReactElement<any>;
  children: React.ReactElement<any>;
  sx?: React.CSSProperties;
  fullScreenWrapper?: boolean;
  blurBackground?: boolean;
  br?: boolean;
  disableScroll?: boolean;
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
  shouldForwardProp: (prop) => prop !== "fullScreenWrapper" && prop !== "br",
})<{ fullScreenWrapper: boolean; br: boolean }>(
  ({ theme, fullScreenWrapper, br }) => ({
    position: "relative",
    width: fullScreenWrapper ? "100vw" : "fit-content",
    height: fullScreenWrapper ? "100vh" : "fit-content",
    minWidth: "150px",
    minHeight: "150px",
    backgroundColor: theme.palette.headfoot?.main,
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: `${br ? 12 : 0}px`,
    border: `1px solid ${theme.palette.divider}`,
  })
);

const CloseModalWrapper = styled(Box)({
  position: "absolute",
  top: "10px",
  insetInlineEnd: "10px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
});

export default function Modal({
  trigger,
  children,
  sx = {},
  blurBackground = true,
  fullScreenWrapper = false,
  br = false,
  disableScroll = false,
}: ModalProps) {
  const { parentRef, modalRef, openModal, closeModal, isOpen } = useModal({
    disableScroll,
  });

  const clonedTrigger = React.cloneElement(trigger, {
    ref: (node: HTMLElement) => {
      parentRef.current = node;
    },
    onClick: openModal,
    "aria-haspopup": "dialog",
    "aria-expanded": isOpen,
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
              >
                <CloseModalWrapper onClick={closeModal}>
                  <CloseIcon fontSize="medium" color="action" />
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
