import { Box, styled, Typography } from "@mui/material";

interface ErrorProps {
  errorMessage: string;
  children?: React.ReactNode;
}

const ErrorWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "25px",
  textTransform: "capitalize",
  fontStyle: "italic",
});

export default function Error({ errorMessage, children }: ErrorProps) {
  return (
    <ErrorWrapper>
      <Typography variant="h6" fontFamily={"Source Code Pro"}>
        {errorMessage}
      </Typography>
      {children}
    </ErrorWrapper>
  );
}
