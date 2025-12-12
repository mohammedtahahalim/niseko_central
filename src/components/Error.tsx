import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { backendErrors } from "../utils/Constants";
import type { TLanguage } from "../features/languages/changeLanguage";

const STATUS_ERRORS = ["400", "401", "403", "404", "405", "500", "522"];

interface ErrorProps {
  errorMessage: string;
  children?: React.ReactNode;
}

const ErrorWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  minHeight: "350px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "25px",
  textTransform: "capitalize",
  fontStyle: "italic",
});

export default function Error({ errorMessage, children }: ErrorProps) {
  const { i18n } = useTranslation();

  const displayError = STATUS_ERRORS.includes(errorMessage)
    ? backendErrors[i18n.language as TLanguage][
        errorMessage as keyof (typeof backendErrors)["string"]
      ]
    : errorMessage;

  return (
    <ErrorWrapper>
      <Typography variant="h6" fontFamily={"Source Code Pro"}>
        {displayError} ...
      </Typography>
      {children}
    </ErrorWrapper>
  );
}
