import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface UsefulLinkShape {
  title: string;
  path: string;
}

const UsefulWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
});

const Heading = styled(Typography)({
  fontFamily: "Figtree",
});

const UsefulLinks = styled("ul")(({ theme }) => ({
  paddingLeft: "3rem",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  [theme.breakpoints.down("md")]: {
    paddingLeft: "2rem",
  },
}));

const Link = styled("li")(({ theme }) => ({
  fontFamily: "Inter",
  fontSize: "0.85rem",
  fontWeight: "300",
  "& > a": {
    color: "inherit",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.9rem",
  },
}));

export default function Useful() {
  const { t } = useTranslation();
  const usefulItems = t("weather.useful_links", {
    returnObjects: true,
  }) as UsefulLinkShape[];
  return (
    <UsefulWrapper>
      <Heading variant="h5">{t("weather.useful_title")} :</Heading>
      <UsefulLinks>
        {usefulItems.map((item) => {
          return (
            <Link key={item.title}>
              <a href={item.path} target="_blank">
                {item.title}
              </a>
            </Link>
          );
        })}
      </UsefulLinks>
    </UsefulWrapper>
  );
}
