import { Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Title from "../../components/Title";
import BlogsContent from "../../features/blogs/BlogsContent";
import PageControl from "../../features/blogs/PageControl";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { fetchBlogs } from "../../features/home/blog/blogSlice";

const DEFAULT_LIMIT = 9;

const BlogsWrapper = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "9px",
  padding: "1rem",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("md")]: {
    padding: "5px",
    gap: "15px",
  },
}));

export default function Blogs() {
  const { search } = useLocation();
  const queries = new URLSearchParams(search);
  const page = queries.get("page") ?? 1;
  const limit = queries.get("limit") ?? DEFAULT_LIMIT;
  const disptach = useDispatch<AppDispatch>();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (!limit || !page) return;
    const fetch_blogs = disptach(fetchBlogs({ limit, page }));
    return () => {
      fetch_blogs.abort();
    };
  }, [page, limit]);

  return (
    <BlogsWrapper maxWidth="xl">
      <LinkTitle />
      <Title page="blogs" />
      <BlogsContent />
      <PageControl />
    </BlogsWrapper>
  );
}
