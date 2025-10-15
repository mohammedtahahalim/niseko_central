import { Box, styled, Typography } from "@mui/material";
import type { SuggestionBookingData } from "./suggestionsSlice";

const CardContainer = styled(Box)({
  width: "100%",
  height: "100",
  minHeight: "150px",
  aspectRatio: "1",
  maxHeight: "350px",
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
});

const TagContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "25px",
  left: "0",
  zIndex: 222,
  width: "25%",
  maxWidth: "150px",
  height: "25%",
  maxHeight: "38px",
  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "3px 7px",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

const TagTitle = styled(Typography)({
  fontSize: "0.8rem",
  fontFamily: "VAGRundschriftD",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const TagSubtitle = styled(Typography)({
  fontSize: "0.6rem",
  fontFamily: "Inter",
  fontStyle: "italic",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export default function Card({
  booking_main_image,
  booking_title,
  booking_location,
  tag,
}: SuggestionBookingData) {
  console.log(booking_location);
  return (
    <CardContainer>
      <ImageContainer>
        <img
          src={booking_main_image}
          alt={booking_title}
          width={"100%"}
          height={"100%"}
          style={{ objectFit: "cover" }}
        />
      </ImageContainer>
      <ShadeOverlay />
      <TagContainer>
        <TagTitle variant="subtitle1">{tag?.tag_title}</TagTitle>
        <TagSubtitle variant="body1">{tag?.tag_subtitle}</TagSubtitle>
      </TagContainer>
    </CardContainer>
  );
}
