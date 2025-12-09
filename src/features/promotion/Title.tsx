import { Box, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

interface TitleProps {
  title: string;
}

const TitleWrapper = styled(Box)({});

export default function Title({ title }: TitleProps) {
  const { t } = useTranslation();
  return <TitleWrapper>Title</TitleWrapper>;
}
