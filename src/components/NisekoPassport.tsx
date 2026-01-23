import { Box, styled, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RenderOnView from "../features/render_on_view/RenderOnView";
import { useNavigate } from "react-router-dom";

const NisekoPassportContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "250px",
  padding: "15px 40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("nav_break")]: {
    padding: "15px",
  },
}));

const NisekoPassportWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: "25px",
  overflow: "hidden",
  display: "flex",
  height: "fit-content",
  backgroundColor: theme.palette.hero?.main,
  [theme.breakpoints.down("nav_break")]: {
    flexDirection: "column",
    height: "fit-content",
    maxWidth: "650px",
  },
}));

const PassportImage = styled(Box)(({ theme }) => ({
  flex: "1",
  aspectRatio: "4/3",
  overflow: "hidden",
  [theme.breakpoints.down("nav_break")]: {
    aspectRatio: "16/9",
  },
}));

const PassportInfo = styled(Box)({
  flex: "1",
  padding: "40px",
  backgroundColor: "inherit",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "25px",
});

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: "VAGRundschriftD",
  fontWeight: "bold",
  fontSize: "1.5rem",
  letterSpacing: "1px",
  color: theme.palette.textColor?.main,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3rem",
  },
}));

const Content = styled("p")(({ theme }) => ({
  fontSize: "1.1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const ContentLink = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: "0px 10px",
  fontWeight: "bold",
}));

const More = styled(Button)(({ theme }) => ({
  width: "fit-content",
  padding: "10px 30px",
  borderRadius: "25px",
  backgroundColor: theme.palette.secondary.main,
}));

export default function NisekoPassport() {
  const [isImageHover, setIsImageHover] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate("/niseko-accommodation-deals/7/experience-niseko-passport");
    }
  };

  return (
    <RenderOnView animationDirection="bottom">
      <NisekoPassportContainer>
        <NisekoPassportWrapper>
          <PassportImage
            onMouseEnter={() => setIsImageHover(true)}
            onMouseLeave={() => setIsImageHover(false)}
          >
            <img
              src="https://i0.wp.com/thekeystotravel.com/wp-content/uploads/2019/09/Passport-and-Plane-Window.jpg?fit=1000%2C667&ssl=1"
              alt="Passport Image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                scale: isImageHover ? 1.1 : 1,
                transition: "all 0.4s ease-in-out",
              }}
              loading="lazy"
              decoding="async"
            />
          </PassportImage>
          <PassportInfo>
            <Title variant="h5" tabIndex={0}>
              {t("home.niseko_passport.title")}
            </Title>
            <Content>
              {t("home.niseko_passport.subtitle_1")}
              <ContentLink tabIndex={0}>
                {t("home.niseko_passport.link")}
              </ContentLink>
              {t("home.niseko_passport.subtitle_2")}
            </Content>
            <More
              variant="contained"
              onClick={() =>
                navigate(
                  "/niseko-accommodation-deals/7/experience-niseko-passport",
                )
              }
              onKeyDown={onKeyDown}
            >
              {t("home.niseko_passport.find_out")}
            </More>
          </PassportInfo>
        </NisekoPassportWrapper>
      </NisekoPassportContainer>
    </RenderOnView>
  );
}
