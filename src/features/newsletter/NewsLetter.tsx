import { Box, styled } from "@mui/material";
import Description from "./Description";
import Form from "./Form";
import type { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import Errors from "./Errors";
import Loader from "../../components/Loader";
import Subscribed from "./Subscribed";
import { useEffect, useRef } from "react";
import { resetError } from "./newsLetterSlice";

const NewsLetterWrapper = styled(Box)({
  width: "100%",
  maxWidth: "900px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
});

export default function NewsLetter() {
  const { errors, hasRegistered, loading } = useSelector(
    (state: RootState) => state.newsLetter,
  );
  const dispatch = useDispatch<AppDispatch>();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      dispatch(resetError());
    }, 4000);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [errors, dispatch]);

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
