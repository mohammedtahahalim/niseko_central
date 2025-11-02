import { Box, Skeleton, styled } from "@mui/material";

interface SkeltonProps {
  skeltonNum?: number;
  maxHeight?: number;
}

const SkeltonContainer = styled(Box)({
  flex: "1",
  width: "95%",
  display: "flex",
  flexWrap: "wrap",
  gap: "15px",
  margin: "0 auto",
});

const SkeltonWrapper = styled(Skeleton, {
  shouldForwardProp: (prop) => prop !== "maxHeight",
})<{ maxHeight: number }>(({ theme, maxHeight }) => ({
  height: "100%",
  maxHeight: `${maxHeight}px`,
  minWidth: "450px",
  flex: "1",
  aspectRatio: "1",
  backgroundColor: theme.palette.icons?.main,
}));

export default function Skelton({
  skeltonNum = 3,
  maxHeight = 400,
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
