import { Box, styled } from "@mui/material";
import Description from "./Description";
import Form from "./Form";
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import Errors from "./Errors";
import Loader from "../../components/Loader";
import Subscribed from "./Subscribed";

const NewsLetterWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
});

export default function NewsLetter() {
  const { errors, hasRegistered, loading } = useSelector(
    (state: RootState) => state.newsLetter
  );

  if (loading) return <Loader />;

  if (hasRegistered) return <Subscribed />;

  return (
    <NewsLetterWrapper>
      <Description />
      <Form />
      {errors?.length && <Errors errors={errors} />}
    </NewsLetterWrapper>
  );
}
