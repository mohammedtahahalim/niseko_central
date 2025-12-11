import { Box, Skeleton, styled } from "@mui/material";
import FirstBlog from "./FirstBlog";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import Article from "../home/blog/Article";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../languages/changeLanguage";
import { useLocation } from "react-router-dom";

const BlogsContentWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  minHeight: "50vh",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  overflow: "hidden",
});

const BlogArticlesWrapper = styled(Box)({
  width: "100%",
  flex: "1",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  placeContent: "center",
  placeItems: "center",
  gap: "1rem",
});

const FirstBlogSkeleton = styled(Skeleton)({
  width: "100%",
  aspectRatio: "1",
  height: "450px",
});

const SkeletonArticle = styled(Skeleton)({
  width: "100%",
  height: "100%",
  aspectRatio: "1",
  maxHeight: "475px",
  overflow: "hidden",
  borderRadius: "10px",
});

export default function BlogsContent() {
  const { loading, data } = useSelector((state: RootState) => state.blogs);
  const { search } = useLocation();
  const queries = new URLSearchParams(search);
  const page = Number(queries.get("page")) || 1;
  const { blogs, first_blog } = data || {};
  const { i18n } = useTranslation();
  return (
    <BlogsContentWrapper>
      {page === 1 && loading && <FirstBlogSkeleton variant="rectangular" />}
      {!loading && page === 1 && first_blog && (
        <FirstBlog
          {...first_blog}
          title={first_blog[i18n.language as TLanguage].title}
        />
      )}
      <BlogArticlesWrapper>
        {blogs &&
          blogs.map((blog) => {
            return loading ? (
              <SkeletonArticle variant="rectangular" key={blog.id} />
            ) : (
              <Article
                key={blog.id}
                {...blog}
                title={blog[i18n.language as TLanguage].title}
              />
            );
          })}
      </BlogArticlesWrapper>
    </BlogsContentWrapper>
  );
}
