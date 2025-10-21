import { Box, Button, styled, Typography } from "@mui/material";
import type { SuggestionBookingData } from "./suggestionsSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../languages/i18n";

const MountainIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    style={{ height: "30px" }}
  >
    <path d="M23.8512,20.628L15.3438,6.1503c-.3141-.5332-1.0166-.7207-1.5693-.4188-.1899.1035-.3458.2569-.448.4431l-3.4587,6.2527c-.0463.0852-.045.1863.0037.2691l1.7543,2.9596c.3263.5503.224,1.243-.2459,1.6837-.2009-.0292-.252-.0365-.4529-.0657l-3.6292-6.1249c-.3153-.532-1.019-.7171-1.5705-.4139-.1911.1059-.347.2617-.4492.4492L.1442,20.6353c-.0743.1364-.0195.3044.1205.375.0414.0207.0877.0317.1339.0317h23.203c.1583,0,.2873-.1242.2873-.2776,0-.0475-.0122-.095-.0377-.1364M2.1226,6.7712c.0073-1.0068.8595-1.8188,1.9041-1.8115.3372,0,.6672.0852.9581.2484.3214-1.5218,1.8614-2.503,3.438-2.1926,1.5778.3092,2.5956,1.7933,2.2742,3.3138-.2678,1.2661-1.3964,2.1938-2.7343,2.2474H3.9c-.9934-.056-1.7714-.8461-1.7774-1.8054"></path>
  </svg>
);

const PeopleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    style={{ height: "30px" }}
  >
    <path d="M21.0036,23.4772c-.555.2077-1.1576.2997-1.7205.2997H4.7169c-.5645,0-1.1671-.092-1.7221-.2997-.5518-.2061-1.0529-.5264-1.4224-.9815-.3822-.4694-.6168-1.0688-.6168-1.8109,0-.4821.1031-1.0291.333-1.6475.5994-1.6031,2.0218-2.9272,3.9278-3.8469,1.887-.9118,4.2639-1.4319,6.7836-1.4319s4.8966.5201,6.7852,1.4319c1.906.9197,3.3252,2.2453,3.9262,3.8469.2299.6168.333,1.1639.333,1.6475,0,.7437-.2347,1.3415-.6152,1.8109-.3695.4551-.8721.7754-1.424.9815h-.0016ZM12,.2231c1.7046,0,3.2491.6914,4.3654,1.8077,1.1179,1.1179,1.8093,2.6624,1.8093,4.367s-.6929,3.2491-1.8093,4.3654c-1.1163,1.1179-2.6608,1.8093-4.3654,1.8093s-3.2491-.6929-4.3654-1.8093c-1.1179-1.1163-1.8093-2.6608-1.8093-4.3654,0-1.7062.6929-3.2507,1.8093-4.367C8.7509.9144,10.2954.2231,12,.2231"></path>
  </svg>
);

const CardContainer = styled(Box)({
  width: "100%",
  height: "100%",
  minHeight: "150px",
  aspectRatio: "1",
  maxHeight: "400px",
  borderRadius: "12px",
  overflow: "hidden",
  position: "relative",
});

const ImageContainer = styled(Box)({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: 1,
});

const ShadeOverlay = styled(Box)({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.25)",
  zIndex: 111,
  overflow: "hidden",
  cursor: "pointer",
});

const TagContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ theme, isArabic }) => ({
  position: "absolute",
  top: "25px",
  ...(isArabic
    ? {
        right: "0px",
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
      }
    : {
        left: "0px",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
      }),
  zIndex: 222,
  maxWidth: "150px",
  maxHeight: "55px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "4px 8px",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

const TagTitle = styled(Typography)({
  fontSize: "0.9rem",
  fontFamily: "Figtree",
  fontWeight: "700",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const TagSubtitle = styled(Typography)({
  fontSize: "0.6rem",
  fontFamily: "Figtree",
  fontStyle: "italic",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const BookingInformation = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ isArabic }) => ({
  position: "absolute",
  bottom: "0",
  ...(isArabic ? { right: "0px" } : { left: "0px" }),
  width: "99%",
  height: "35%",
  maxHeight: "150px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "5px 10px",
  zIndex: 9999,
}));

const PropertyTitle = styled(Typography)({
  fontSize: "1.4rem",
  fontFamily: "VAGRundschriftD",
  color: "whitesmoke",
});

const PropertyLocation = styled(Typography)({
  fontStyle: "italic",
  fontWeight: "bold",
  fontFamily: "Figtree",
  fontSize: "1.1rem",
  color: "whitesmoke",
});

const AmenitiesWrapper = styled(Box)({
  display: "flex",
  gap: "5px",
  padding: "2px",
});

const ActionButtons = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  gap: "10px",
  justifyContent: "flex-start",
  alignItems: "center",
  [theme.breakpoints.down("xs")]: {
    flexDirection: "column",
  },
}));

const BookNow = styled(Button)({
  height: "fit-content",
  width: "fit-content",
  borderRadius: "50px",
  textTransform: "capitalize",
  padding: "5px 20px",
});

const MoreInfo = styled(Button)({
  height: "fit-content",
  width: "fit-content",
  borderRadius: "50px",
  textTransform: "capitalize",
  padding: "5px 20px",
});

const PropertyAmentities = styled(Box)({
  flex: "1",
  height: "100%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "whitesmoke",
  paddingLeft: "5px",
});

const Amenety = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "75%",
  width: "fit-content",
});

const MaxCapacity = styled(Typography)({
  fontFamily: "Figtree",
  fontSize: "0.8rem",
});

const Distance = styled(Typography)({
  fontFamily: "Figtree",
  fontSize: "0.8rem",
});

export default function Card({
  booking_main_image,
  booking_title,
  booking_location,
  distance,
  max_capacity,
  tag,
}: SuggestionBookingData) {
  const { t } = useTranslation();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  return (
    <CardContainer>
      <ImageContainer>
        <img
          src={booking_main_image}
          alt={booking_title}
          width={"100%"}
          height={"100%"}
          style={{
            objectFit: "cover",
            scale: isHovering ? "1.1" : "1",
            transition: "all 0.4s ease-in-out",
          }}
          loading="lazy"
        />
      </ImageContainer>
      <ShadeOverlay
        onMouseMove={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
      <TagContainer isArabic={i18n.language === "ar"}>
        <TagTitle variant="subtitle1">{tag?.tag_title}</TagTitle>
        <TagSubtitle variant="body1">{tag?.tag_subtitle}</TagSubtitle>
      </TagContainer>
      <BookingInformation isArabic={i18n.language === "ar"}>
        <PropertyTitle>{booking_title}</PropertyTitle>
        <PropertyLocation>{booking_location}</PropertyLocation>
        <AmenitiesWrapper>
          <ActionButtons>
            <BookNow variant="contained" color="primary">
              {t("suggestions.book_now")}
            </BookNow>
            <MoreInfo variant="contained" color="info">
              {t("suggestions.more")}
            </MoreInfo>
          </ActionButtons>
          <PropertyAmentities>
            <Amenety>
              {PeopleIcon}
              <MaxCapacity>
                {max_capacity} {t("suggestions.guests")}
              </MaxCapacity>
            </Amenety>
            <Amenety>
              {MountainIcon}
              <Distance>{distance}m</Distance>
            </Amenety>
          </PropertyAmentities>
        </AmenitiesWrapper>
      </BookingInformation>
    </CardContainer>
  );
}
