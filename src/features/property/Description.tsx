import { Box, Skeleton, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useTranslation } from "react-i18next";
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
  },
}));

const DescriptionWrapper = styled(Box)(({ theme }) => ({
  width: "35%",
  display: "flex",
  [theme.breakpoints.down("nav_break")]: {
    width: "100%",
  },
}));

const DescriptionContent = styled(Typography)(({ theme }) => ({
  width: "100%",
  textWrap: "wrap",
  fontFamily: "Figtree",
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
  letterSpacing: "1.1px",
  lineHeight: "1.75rem",
  [theme.breakpoints.down("nav_break")]: {
    fontSize: "1.1rem",
  },
}));

const DescriptionSkeltonWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

const DescriptionSkelton = styled(Skeleton)({
  flex: "1",
  minWidth: "350px",
  height: "25px",
});

const AmenitiesWrapper = styled(Box)({
  flex: "1",
  border: "1px solid white",
  display: "flex",
  gap: "50px",
  flexWrap: "wrap",
  padding: "0px 15px",
});

const InfoPiece = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  alignItems: "center",
  color: theme.palette.icons?.main,
}));

const InfoText = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  fontFamily: "Figtree",
  color: theme.palette.textColor?.main,
  textTransform: "capitalize",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
}));

const SvgContainer = styled(Box)(({ theme }) => ({
  width: "50px",
  aspectRatio: "1",
  color: "inherit",
  [theme.breakpoints.down("md")]: {
    width: "35px",
  },
}));

export default function Description() {
  const { propertyData, loading } =
    useSelector((state: RootState) => state.propertySlice) || {};
  const { translations } = propertyData || {};
  const { i18n } = useTranslation();
  const { description, amenities } = translations?.[i18n.language] || {};
  return (
    <RenderOnView animationDirection="right" animationSpeed={1.75}>
      <DescriptionContainer>
        <DescriptionWrapper>
          {loading && (
            <DescriptionSkeltonWrapper>
              <DescriptionSkelton variant="rounded" />
              <DescriptionSkelton variant="rounded" />
              <DescriptionSkelton variant="rounded" />
              <DescriptionSkelton variant="rounded" />
              <DescriptionSkelton variant="rounded" />
            </DescriptionSkeltonWrapper>
          )}
          <DescriptionContent>{description}</DescriptionContent>
        </DescriptionWrapper>
        <AmenitiesWrapper>
          {amenities &&
            amenities.map((_: any, idx: number) => {
              return (
                <InfoPiece key={idx}>
                  <SvgContainer>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.0036,23.4772c-.555.2077-1.1576.2997-1.7205.2997H4.7169c-.5645,0-1.1671-.092-1.7221-.2997-.5518-.2061-1.0529-.5264-1.4224-.9815-.3822-.4694-.6168-1.0688-.6168-1.8109,0-.4821.1031-1.0291.333-1.6475.5994-1.6031,2.0218-2.9272,3.9278-3.8469,1.887-.9118,4.2639-1.4319,6.7836-1.4319s4.8966.5201,6.7852,1.4319c1.906.9197,3.3252,2.2453,3.9262,3.8469.2299.6168.333,1.1639.333,1.6475,0,.7437-.2347,1.3415-.6152,1.8109-.3695.4551-.8721.7754-1.424.9815h-.0016ZM12,.2231c1.7046,0,3.2491.6914,4.3654,1.8077,1.1179,1.1179,1.8093,2.6624,1.8093,4.367s-.6929,3.2491-1.8093,4.3654c-1.1163,1.1179-2.6608,1.8093-4.3654,1.8093s-3.2491-.6929-4.3654-1.8093c-1.1179-1.1163-1.8093-2.6608-1.8093-4.3654,0-1.7062.6929-3.2507,1.8093-4.367C8.7509.9144,10.2954.2231,12,.2231"></path>
                    </svg>
                  </SvgContainer>
                  <InfoText variant="subtitle1" tabIndex={0}>
                    test
                  </InfoText>
                </InfoPiece>
              );
            })}
        </AmenitiesWrapper>
      </DescriptionContainer>
    </RenderOnView>
  );
}
