import { Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Title from "../../features/blog/Title";
import Banner from "../../features/blog/Banner";
import UnsafeContent from "../../features/blog/UnsafeContent";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchBlogs } from "../../features/home/blog/blogSlice";

const BlogContainer = styled(Container)({
  width: "100%",
  minHeight: "100vh",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
});

export default function Blog() {
  const { id, title } = useParams();
  const { shouldRedirect } = useSelector((state: RootState) => state.blogs);
  const disptach = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id || !title) return;
    const fetchArticle = disptach(fetchBlogs({ id, title }));
    return () => {
      fetchArticle.abort();
    };
  }, []);

  if (shouldRedirect) return <Navigate to={"/blogs"} replace={true} />;

  return (
    <BlogContainer maxWidth="xl">
      <LinkTitle />
      <Title />
      <Banner />
      <UnsafeContent />
    </BlogContainer>
  );
}
