import { Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Title from "../../components/Title";
import BlogsContent from "../../features/blogs/BlogsContent";
import PageControl from "../../features/blogs/PageControl";

const BlogsWrapper = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
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
  return (
    <BlogsWrapper maxWidth="xl">
      <LinkTitle />
      <Title page="blogs" />
      <BlogsContent />
      <PageControl />
    </BlogsWrapper>
  );
}
