import { Skeleton, styled } from "@mui/material";

const PropertySkeltonWrapper = styled(Skeleton)({
  minWidth: "min(100%, 400px)",
  minHeight: "350px",
  aspectRatio: "1",
  borderRadius: "8px",
  overflow: "hidden",
});

export default function PropertySkelton() {
  return <PropertySkeltonWrapper variant="rounded" />;
}
