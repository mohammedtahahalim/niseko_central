import { Box, styled, Typography } from "@mui/material";
import type { ServiceContents } from "../utils/Types";
interface ServiceProps extends ServiceContents {
  icon: React.ReactElement;
}

const ServiceWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  flex: "1",
  backgroundColor: theme.palette.service?.main,
  borderRadius: "8px",
  minHeight: "125px",
  display: "flex",
  gap: "10px",
  padding: "10px",
}));

const IconWrapper = styled(Box)({
  aspectRatio: "1",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& > *": {
    height: "69%",
    color: "#64748B",
    minHeight: "50px",
  },
});

const ContentWrapper = styled(Box)({
  minHeight: "100%",
  flex: "1",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  padding: "5px",
  overflow: "hidden",
  justifyContent: "center",
});

const StyledTypography = styled(Typography)({
  fontFamily: "Inter",
  fontStyle: "italic",
});

export default function Service({ title, body, icon }: ServiceProps) {
  return (
    <ServiceWrapper>
      <IconWrapper>{icon}</IconWrapper>
      <ContentWrapper>
        <StyledTypography
          variant="h6"
          color="primary"
          fontSize={"0.9rem"}
          fontWeight={"bold"}
        >
          {title}
        </StyledTypography>
        <StyledTypography variant="body1" color="inherit" fontSize={"0.8rem"}>
          {body}
        </StyledTypography>
      </ContentWrapper>
    </ServiceWrapper>
  );
}
