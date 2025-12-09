import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import type { AppDispatch } from "../../app/store";
import { useEffect } from "react";
import { fetchPromotion } from "../../features/promotion/promotionSlice";
import { Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import { useTranslation } from "react-i18next";

const PromotionWrapper = styled(Container)({
  width: "100%",
  minHeight: "100vh",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export default function Promotion() {
  const { id, title } = useParams();
  const { i18n } = useTranslation();

  if (!id || !title) {
    return <Navigate to={"/"} replace={true} />;
  }
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPromotion({ queries: { id, title } }));
  }, []);

  return (
    <PromotionWrapper maxWidth="xl">
      <LinkTitle />
    </PromotionWrapper>
  );
}
