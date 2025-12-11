import { Skeleton, styled } from "@mui/material";

const FirstLaunchLoaderWrapper = styled(Skeleton)({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
});

export default function FirstLaunchLoader() {
  return <FirstLaunchLoaderWrapper variant="rectangular" />;
}
