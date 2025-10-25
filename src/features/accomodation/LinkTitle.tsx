import { Box, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const LinkTitleWrapper = styled(Box)(({ theme }) => ({
  width: "fit-content",
  padding: "10px",
  color: theme.palette.icons?.main,
  display: "flex",
  alignItems: "center",
  gap: "5px",
}));

const LinkTitleContent = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  cursor: "pointer",
  color: theme.palette.icons?.main,
  textTransform: "capitalize",
  fontFamily: "Inter",
  fontWeight: "400",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const Icon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.icons?.main,
}));

export default function LinkTitle() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleKeyboardClick = (e: React.KeyboardEvent, link: string) => {
    if (e.key === "Enter") {
      navigate(link);
    }
  };

  return (
    <LinkTitleWrapper>
      <LinkTitleContent
        variant="subtitle2"
        onClick={() => navigate("/")}
        onKeyDown={(e) => handleKeyboardClick(e, "/")}
        tabIndex={0}
        role="button"
      >
        {t("accomodation.link_title.home")}
      </LinkTitleContent>
      <Icon>
        {i18n.language === "ar" ? (
          <ArrowBackIosIcon sx={{ fontSize: "0.6rem" }} color="inherit" />
        ) : (
          <ArrowForwardIosIcon sx={{ fontSize: "0.6rem" }} color="inherit" />
        )}
      </Icon>
      <LinkTitleContent
        variant="subtitle2"
        onClick={() => navigate("/niseko-accommodation")}
        onKeyDown={(e) => handleKeyboardClick(e, "/niseko-accommodation")}
        tabIndex={0}
        role="button"
      >
        {t("accomodation.link_title.niseko")}
      </LinkTitleContent>
    </LinkTitleWrapper>
  );
}
