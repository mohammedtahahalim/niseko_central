import { Box, Skeleton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import Error from "../../../components/Error";
import type { categoryArticle } from "../conciergeSlice";
import Article from "../Article";

const ContentWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  padding: "0px auto",
  justifyContent: "center",
});

const ContentBox = styled(Box)({
  maxWidth: "400px",
  width: "100%",
  aspectRatio: "1",
  borderRadius: "12px",
  overflow: "hidden",
});

const SkeletonTile = styled(Skeleton)({
  maxWidth: "400px",
  width: "100%",
  height: "100%",
  maxHeight: "400px",
  aspectRatio: "1",
});

export default function Content() {
  const { loading, error, articles } = useSelector(
    (state: RootState) => state.concierge
  );

  return (
    <ContentWrapper>
      {error && <Error errorMessage={error} />}
      {loading &&
        Array.from({ length: 3 }).map((_, idx) => {
          return <SkeletonTile key={idx} variant="rectangular" />;
        })}
      {articles &&
        (articles as categoryArticle[]).map((article, idx) => {
          return (
            <ContentBox key={`${article.id}-${idx}`}>
              <Article {...article} />
            </ContentBox>
          );
        })}
    </ContentWrapper>
  );
}
