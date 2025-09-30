import { Box, styled } from "@mui/material";

interface ModalProps {
  fullScreen?: boolean;
  blurBackground?: boolean;
  sx: React.CSSProperties;
  children: React.ReactNode;
}

const ModalContainer = styled(Box)<{
  fullScreen: boolean;
  blurBackground: boolean;
  sx: React.CSSProperties;
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

export default function Modal({
  fullScreen = false,
  blurBackground = true,
  sx = {},
}: ModalProps) {
  return (
    <ModalContainer
      fullScreen={fullScreen}
      blurBackground={blurBackground}
      sx={sx}
    >
      <ModalWrapper>Modal</ModalWrapper>
    </ModalContainer>
  );
}
