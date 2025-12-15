import { Button, Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { useEffect } from "react";
import { fetchConcierge } from "../../features/concierge/conciergeSlice";
import { useTranslation } from "react-i18next";
import Title from "../../features/concierge/article/Title";
import Banner from "../../features/concierge/article/Banner";
import Price from "../../features/concierge/article/Price";
import Content from "../../features/concierge/article/Content";

const ArticleContainer = styled(Container)({
  width: "100%",
  minHeight: "100vh",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
});

const Concierge = styled(Button)({
  width: "fit-content",
  margin: "0 auto",
  padding: "0px",
  fontFamily: "Figtree",
});

export default function Article() {
  const { id, title } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id || !title) return;
    const articleDispatch = dispatch(
      fetchConcierge({ type: "id", queries: { id, title } })
    );
    return () => {
      articleDispatch.abort();
    };
  }, [id, title]);

  return (
    <ArticleContainer>
      <LinkTitle />
      <Concierge
        variant="text"
        color="primary"
        onClick={() => navigate("/concierge")}
      >
        {t("concierge.title.head_title")}
      </Concierge>
      <Title />
      <Banner />
      <Price />
      <Content />
    </ArticleContainer>
  );
}
