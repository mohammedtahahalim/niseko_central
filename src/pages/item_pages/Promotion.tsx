import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import type { AppDispatch } from "../../app/store";
import { useEffect } from "react";
import { fetchPromotion } from "../../features/promotion/promotionSlice";
import { Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Title from "../../features/promotion/Title";
import Banner from "../../features/promotion/Banner";
import DangerousHTML from "../../features/promotion/DangerousHTML";

const PromotionWrapper = styled(Container)({
  width: "100%",
  minHeight: "100vh",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
});

export default function Promotion() {
  const { id, title } = useParams();

  if (!id || !title) {
    return <Navigate to={"/"} replace={true} />;
  }
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const promotion = dispatch(fetchPromotion({ queries: { id, title } }));
    return () => {
      promotion.abort();
    };
  }, []);

  return (
    <PromotionWrapper maxWidth="xl">
      <LinkTitle />
      <Title />
      <Banner />
      <DangerousHTML />
    </PromotionWrapper>
  );
}
