import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ServiceType {
  title: string;
  image: string;
  blur_image: string;
  content: string;
}

const ContentWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
});

const BodyText = styled(Typography)({
  fontFamily: "Inter",
  fontSize: "0.9rem",
  fontWeight: "300",
});

const MainImage = styled("img")({
  width: "100%",
  aspectRatio: "16/9",
  objectFit: "cover",
});

const ServiceWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const ServiceTitle = styled(Typography)({
  fontFamily: "VAGRundschriftD",
});

const ServiceImage = styled("img")({
  width: "100%",
  aspectRatio: "16/9",
  objectFit: "cover",
});

const ServiceContent = styled(Typography)({
  fontStyle: "italic",
  fontFamily: "Inter",
  fontSize: "0.9rem",
});

export default function Content() {
  const { t } = useTranslation();
  const services = t("niseko-information.services", {
    returnObjects: true,
  }) as ServiceType[];

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    if (img.dataset.loaded === "true") return;
    const fullSrc = img.dataset.src;
    if (!fullSrc) return;
    img.dataset.loaded = "true";
    img.src = fullSrc;
  };

  return (
    <ContentWrapper>
      <BodyText variant="body1" tabIndex={0}>
        {t("niseko-information.body1")}
      </BodyText>
      <BodyText variant="body1" tabIndex={0}>
        {t("niseko-information.body2")}
      </BodyText>
      <MainImage
        src="https://d1z517741srsht.cloudfront.net/general/_1500xAUTO_crop_center-center_none/2085/kids-yotei.webp"
        loading="lazy"
      />
      {services.map((service) => {
        return (
          <ServiceWrapper key={service.title}>
            <ServiceTitle variant="h5" tabIndex={0}>
              {service.title}
            </ServiceTitle>
            {service.image && (
              <ServiceImage
                src={service.blur_image}
                data-src={service.image}
                onLoad={onImageLoad}
                data-loaded="false"
              />
            )}
            <ServiceContent tabIndex={0}>{service.content}</ServiceContent>
          </ServiceWrapper>
        );
      })}
    </ContentWrapper>
  );
}
