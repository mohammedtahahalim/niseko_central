import { Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { useEffect } from "react";
import { fetchConcierge } from "../../features/concierge/conciergeSlice";
import { useParams } from "react-router-dom";
import Title from "../../features/concierge/category/Title";
import Content from "../../features/concierge/category/Content";

const CategoryContainer = styled(Container)({
  width: "100%",
  minHeight: "100vh",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
});

export default function Category() {
  const { category } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const categoryDispatch = dispatch(
      fetchConcierge({
        type: "category",
        queries: { category: category || "" },
      })
    );
    return () => {
      categoryDispatch.abort();
    };
  }, [category]);

  return (
    <CategoryContainer maxWidth="xl">
      <LinkTitle />
      <Title />
      <Content />
    </CategoryContainer>
  );
}
