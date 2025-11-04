import { Skeleton, styled } from "@mui/material";

const PropertySkeltonWrapper = styled(Skeleton)({
  width: "100%",
  height: "100%",
  minHeight: "150px",
  aspectRatio: "1",
  maxHeight: "400px",
  borderRadius: "12px",
  overflow: "hidden",
});

export default function PropertySkelton() {
  return <PropertySkeltonWrapper variant="rounded" />;
}
