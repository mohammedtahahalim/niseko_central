import { Box, styled } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
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
-- blurBackground a boolean value, needed if the wrapper is bigger than the modal content
this will render the wrapper as blurry glass effect that mask the backround to highlight the modal
-- sx an optional styling to style the wrapper of the modal (this is optional and had no default
value)


*/

interface ModalProps {
  trigger: React.ReactElement<any>;
  children: React.ReactElement<any>;
  sx?: React.CSSProperties;
  fullScreenModal?: boolean;
  fullScreenWrapper?: boolean;
  blurBackground?: boolean;
}

type ModalStyle = Omit<
  ModalProps,
  "trigger" | "children" | "sx" | "fullScreenWrapper"
>;

const ModalContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "fullScreenModal" && prop !== "blurBackground",
})<ModalStyle>(({ blurBackground, fullScreenModal }) => ({
  width: fullScreenModal ? "100vw" : "fit-content",
  height: fullScreenModal ? "100vh" : "fit-content",
  position: fullScreenModal ? "fixed" : "relative",
  top: "0",
  left: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: blurBackground ? "rgba(255, 255, 255, 0.15)" : "transparent",
  backdropFilter: blurBackground ? "blur(3px)" : "blur(0px)",
}));

const ModalMotion = motion.create(ModalContainer);

const ModalWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "fullScreenWrapper",
})<{ fullScreenWrapper: boolean }>(({ theme, fullScreenWrapper }) => ({
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
  borderRadius: "12px",
  overflow: "hidden",
  border: `1px solid ${theme.palette.divider}`,
}));

const CloseModalWrapper = styled(Box)({
  position: "absolute",
  top: "10px",
  right: "10px",
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
  fullScreenModal = false,
  blurBackground = true,
  fullScreenWrapper = false,
}: ModalProps) {
  const { parentRef, modalRef, openModal, closeModal, isOpen } = useModal();

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
      <AnimatePresence>
        {isOpen && (
          <ModalMotion
            sx={sx}
            fullScreenModal={fullScreenModal}
            blurBackground={blurBackground}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
          >
            <ModalWrapper ref={modalRef} fullScreenWrapper={fullScreenWrapper}>
              <CloseModalWrapper onClick={closeModal}>
                <CloseIcon fontSize="medium" color="secondary" />
              </CloseModalWrapper>
              {clonedChild}
            </ModalWrapper>
          </ModalMotion>
        )}
      </AnimatePresence>
    </>
  );
}
