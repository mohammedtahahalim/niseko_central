import { Box, Skeleton, styled } from "@mui/material";

const SkeltonWrapper = styled(Box)({
  width: "100%",
  height: "100%",
});

export default function Skelton() {
  return (
    <SkeltonWrapper>
      <Skeleton variant="rounded" width={"100%"} sx={{ maxHeight: "300px" }} />
    </SkeltonWrapper>
  );
}
