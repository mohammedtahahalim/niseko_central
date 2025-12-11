import { Box, Skeleton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const ArticleWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  minHeight: "150px",
  aspectRatio: "1",
  maxHeight: "400px",
  borderRadius: "12px",
  overflow: "hidden",
  position: "relative",
});

const SkeletonArticle = styled(Skeleton)({
  width: "100%",
  height: "100%",
});

const ContentWrapper = styled(Box)({
  width: "100%",
  height: "100%",
});

export default function Article() {
  const { loading } = useSelector((state: RootState) => state.blogs);
  return (
    <ArticleWrapper>
      {loading ? (
        <SkeletonArticle variant="rectangular" />
      ) : (
        <ContentWrapper></ContentWrapper>
      )}
    </ArticleWrapper>
  );
}
