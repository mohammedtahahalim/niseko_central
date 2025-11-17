import { Box, styled, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  flexWrap: "wrap",
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
  const { title } = useParams();
  const pathname = useLocation().pathname;
  const paths = pathname.split("/")[1];

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
        onClick={() => navigate(`/${paths}`)}
        onKeyDown={(e) => handleKeyboardClick(e, `/${paths}`)}
        tabIndex={0}
        role="button"
      >
        {t(`paths.${paths}`)}
      </LinkTitleContent>
      {title && (
        <>
          <Icon>
            {i18n.language === "ar" ? (
              <ArrowBackIosIcon sx={{ fontSize: "0.6rem" }} color="inherit" />
            ) : (
              <ArrowForwardIosIcon
                sx={{ fontSize: "0.6rem" }}
                color="inherit"
              />
            )}
          </Icon>
          <LinkTitleContent variant="subtitle2" tabIndex={0} role="button">
            {title.split("-").join(" ")}
          </LinkTitleContent>
        </>
      )}
    </LinkTitleWrapper>
  );
}
