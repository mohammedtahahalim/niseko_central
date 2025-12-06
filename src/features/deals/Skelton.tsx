import { Box, Skeleton, styled } from "@mui/material";

interface SkeltonProps {
  skeltonNum?: number;
  maxHeight?: string;
}

const SkeltonContainer = styled(Box)(({ theme }) => ({
  width: "95%",
  minHeight: "150px",
  display: "flex",
  flexWrap: "wrap",
  gap: "15px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  margin: "0 auto",
}));

const SkeltonWrapper = styled(Skeleton, {
  shouldForwardProp: (prop) => prop !== "maxHeight" && prop !== "skeltonNum",
})<{ maxHeight: string; skeltonNum: number }>(
  ({ theme, maxHeight, skeltonNum }) => ({
    width: "100%",
    maxWidth: `calc(100% / ${skeltonNum} - 8px)`,
    minHeight: "350px",
    aspectRatio: "1",
    maxHeight: maxHeight ?? "350px",
    backgroundColor: theme.palette.icons?.main,
    borderRadius: "12px",
    overflow: "hidden",
    [theme.breakpoints.down("middle_break")]: {
      maxWidth: `calc(100% / ${skeltonNum})`,
    },
  })
);

export default function Skelton({
  skeltonNum = 3,
  maxHeight = "400px",
}: SkeltonProps) {
  return (
    <SkeltonContainer>
      {Array.from({ length: 7 }).map((_, idx) => {
        return (
          <SkeltonWrapper
            key={idx}
            variant="rounded"
            maxHeight={maxHeight}
            skeltonNum={skeltonNum}
          ></SkeltonWrapper>
        );
      })}
    </SkeltonContainer>
  );
}
