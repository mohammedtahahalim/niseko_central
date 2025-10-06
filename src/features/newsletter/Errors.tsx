import { styled, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ErrorsProps {
  errors: string[];
}

const ErrorWrapper = styled(Box)({
  width: "100%",
  maxWidth: "fit-content",
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "5px",
});

const ErrorMessage = styled("li")(({ theme }) => ({
  color: theme.palette.error.main,
  textTransform: "capitalize",
  fontStyle: "italic",
  fontFamily: "Source Code Pro",
  fontSize: "0.9rem",
}));

export default function Errors({ errors }: ErrorsProps) {
  const { t } = useTranslation();
  return (
    <ErrorWrapper>
      {errors.map((error: string) => {
        return (
          <ErrorMessage key={error}>
            {t(`footer.newsletter.form.errors.${error}`)}
          </ErrorMessage>
        );
      })}
    </ErrorWrapper>
  );
}
