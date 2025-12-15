import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface TitleProps {
  page: string;
  isCentered?: boolean;
}

const TitleWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isCentered",
})<{ isCentered: boolean }>(({ theme, isCentered }) => ({
  width: "100%",
  maxWidth: "850px",
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5px",
  textAlign: isCentered ? "center" : "left",
  padding: "5px",
  [theme.breakpoints.down("md")]: {
    padding: "0px",
  },
}));

const HeadTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "VAGRundschriftD",
  color: theme.palette.textColor?.main,
  fontSize: "1.8rem",
  letterSpacing: "1.5px",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Figtree",
  fontStyle: "italic",
  color: theme.palette.icons?.main,
  fontSize: "1.5rem",
  maxWidth: "600px",
  minHeight: "75px",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
}));

export default function Title({ page, isCentered = true }: TitleProps) {
  const { t } = useTranslation();
  return (
    <TitleWrapper isCentered={isCentered}>
      <HeadTitle variant="h6">{t(`${page}.title.head_title`)}</HeadTitle>
      <SubTitle variant="h6" tabIndex={0}>
        {t(`${page}.title.content`)}
      </SubTitle>
    </TitleWrapper>
  );
}
