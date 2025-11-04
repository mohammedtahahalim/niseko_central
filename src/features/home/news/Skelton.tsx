import { Box, Skeleton, styled } from "@mui/material";

interface SkeltonProps {
  skeltonNum?: number;
  maxHeight?: string;
}

const SkeltonContainer = styled(Box)(({ theme }) => ({
  width: "95%",
  minHeight: "150px",
  display: "flex",
  gap: "15px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  margin: "0 auto",
}));

const SkeltonWrapper = styled(Skeleton, {
  shouldForwardProp: (prop) => prop !== "maxHeight",
})<{ maxHeight: string }>(({ theme, maxHeight }) => ({
  width: "100%",
  height: "100%",
  minHeight: "150px",
  aspectRatio: "1",
  maxHeight: maxHeight,
  backgroundColor: theme.palette.icons?.main,
  borderRadius: "12px",
  overflow: "hidden",
}));

export default function Skelton({
  skeltonNum = 3,
  maxHeight = "400px",
}: SkeltonProps) {
  return (
    <SkeltonContainer>
      {Array.from({ length: skeltonNum }).map((_, idx) => {
        return (
          <SkeltonWrapper
            key={idx}
            variant="rounded"
            maxHeight={maxHeight}
          ></SkeltonWrapper>
        );
      })}
    </SkeltonContainer>
  );
}
