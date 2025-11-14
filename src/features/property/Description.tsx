import { Box, Skeleton, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useTranslation } from "react-i18next";
import { amenities_icons } from "../../utils/Icons";
import RenderOnView from "../render_on_view/RenderOnView";

const DescriptionContainer = styled(Box)(({ theme }) => ({
  width: "90%",
  minHeight: "250px",
  alignSelf: "center",
  display: "flex",
  gap: "30px",
  justifyContent: "space-between",
  [theme.breakpoints.down("nav_break")]: {
    flexDirection: "column",
    width: "100%",
  },
}));

const DescriptionWrapper = styled(Box)(({ theme }) => ({
  width: "37%",
  overflow: "hidden",
  display: "flex",
  [theme.breakpoints.down("nav_break")]: {
    width: "100%",
  },
}));

const DescriptionContent = styled(Typography)({
  width: "100%",
  textWrap: "wrap",
  fontFamily: "Figtree",
  fontSize: "0.9rem",
  fontWeight: "500",
  textTransform: "capitalize",
  letterSpacing: "1.1px",
  lineHeight: "1.75rem",
});

const DescriptionSkeletonWrapper = styled(Box)({
  minWidth: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  minHeight: "200px",
});

const DescriptionSkeleton = styled(Skeleton)({
  flex: "1",
  minWidth: "450px",
  maxHeight: "40px",
});

const AmenitiesWrapper = styled(Box)(({ theme }) => ({
  flex: "1",
  overflow: "hidden",
  display: "flex",
  gap: "50px",
  flexWrap: "wrap",
  padding: "0px 15px",
  [theme.breakpoints.down("sm")]: {
    padding: "0px",
    gap: "10px",
  },
}));

const InfoPiece = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  alignItems: "center",
  color: theme.palette.icons?.main,
  minWidth: "75px",
  maxWidth: "75px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
    minWidth: "45%",
    gap: "10px",
  },
}));

const InfoText = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  fontFamily: "Figtree",
  color: theme.palette.textColor?.main,
  textTransform: "capitalize",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textWrap: "wrap",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.9rem",
  },
}));

const SvgContainer = styled(Box)(({ theme }) => ({
  width: "40px",
  aspectRatio: "1",
  color: "inherit",
  [theme.breakpoints.down("md")]: {
    width: "30px",
  },
}));

const InfoSkeleton = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  minWidth: "60px",
  minHeight: "100px",
});

const AmenitySkeleton = styled(Skeleton)(({ theme }) => ({
  minWidth: "100%",
  minHeight: "100%",
  translate: "0% -25%",
  [theme.breakpoints.down("md")]: {
    width: "40px",
    height: "70px",
  },
}));

export default function Description() {
  const { propertyData, loading } =
    useSelector((state: RootState) => state.property) || {};
  const { translations } = propertyData || {};
  const { i18n } = useTranslation();
  const { description, amenities } = translations?.[i18n.language] || {};
  const amenities_keys = translations?.["en"].amenities;
  return (
    <RenderOnView animationDirection="right" animationSpeed={1.75}>
      <DescriptionContainer>
        <DescriptionWrapper>
          {loading && (
            <DescriptionSkeletonWrapper>
              {Array.from({ length: 6 }).map((_, idx) => {
                return <DescriptionSkeleton key={idx} variant="rounded" />;
              })}
            </DescriptionSkeletonWrapper>
          )}
          {!loading && description && (
            <DescriptionContent tabIndex={0}>{description}</DescriptionContent>
          )}
        </DescriptionWrapper>
        <AmenitiesWrapper>
          {loading &&
            Array.from({ length: 16 }).map((_, idx) => {
              return (
                <InfoSkeleton key={idx}>
                  <AmenitySkeleton />
                </InfoSkeleton>
              );
            })}
          {!loading &&
            amenities &&
            amenities.map((amenity: string, idx: number) => {
              return (
                <InfoPiece key={amenity}>
                  <SvgContainer>
                    {amenities_icons[amenities_keys[idx]]}
                  </SvgContainer>
                  <InfoText variant="subtitle1" tabIndex={0}>
                    {amenity}
                  </InfoText>
                </InfoPiece>
              );
            })}
        </AmenitiesWrapper>
      </DescriptionContainer>
    </RenderOnView>
  );
}
