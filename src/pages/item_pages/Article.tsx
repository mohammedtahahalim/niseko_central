import { Button, Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { fetchConcierge } from "../../features/concierge/conciergeSlice";
import { useTranslation } from "react-i18next";
import Title from "../../features/concierge/article/Title";
import Banner from "../../features/concierge/article/Banner";
import Price from "../../features/concierge/article/Price";
import Content from "../../features/concierge/article/Content";
import Error from "../../components/Error";
import RenderOnView from "../../features/render_on_view/RenderOnView";

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
  const { error } = useSelector((state: RootState) => state.concierge);

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
      {error && <Error errorMessage={error} />}
      {!error && (
        <>
          <RenderOnView animationDirection="top">
            <Title />
          </RenderOnView>
          <RenderOnView animationDirection="left">
            <Banner />
          </RenderOnView>
          <RenderOnView animationDirection="right">
            <Price />
          </RenderOnView>
          <RenderOnView animationDirection="top">
            <Content />
          </RenderOnView>
        </>
      )}
    </ArticleContainer>
  );
}
