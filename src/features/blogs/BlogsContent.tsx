import { Box, styled } from "@mui/material";
import { useLocation } from "react-router-dom";
import FirstBlog from "./FirstBlog";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { fetchBlogs } from "../home/blog/blogSlice";

const BlogsContentWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  border: "1px solid black",
  minHeight: "100vh",
});

export default function BlogsContent() {
  const page = new URLSearchParams(useLocation().search).get("page") ?? 1;
  const limit = new URLSearchParams(useLocation().search).get("limit") ?? 12;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const blogs_abort = dispatch(fetchBlogs({ limit, page }));
    return () => {
      blogs_abort.abort();
    };
  }, [page, limit]);

  return (
    <BlogsContentWrapper>{page === 1 && <FirstBlog />}</BlogsContentWrapper>
  );
}
