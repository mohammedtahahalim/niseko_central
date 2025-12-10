import { Box, styled } from "@mui/material";
import { useLocation } from "react-router-dom";
import FirstBlog from "./FirstBlog";

const BlogsContentWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  border: "1px solid black",
  minHeight: "100vh",
});

export default function BlogsContent() {
  const page = new URLSearchParams(useLocation().search).get("page") ?? 1;
  return (
    <BlogsContentWrapper>{page === 1 && <FirstBlog />}</BlogsContentWrapper>
  );
}
