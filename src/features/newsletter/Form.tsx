import { Button, styled, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import {
  setEmail,
  setFirstName,
  setLastName,
  signUpToNewsLetter,
} from "./newsLetterSlice";

const FormWrapper = styled("form")(({ theme }) => ({
  width: "100%",
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 20px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "10px",
  },
}));

const StyledInput = styled(TextField)({
  flex: "1",
  width: "100%",
  maxWidth: "450px",
  "& input": {
    padding: "10px",
    fontFamily: "Inter",
  },
});

const Subscribe = styled(Button)({
  borderRadius: "50px",
  padding: "9px 24px",
  textTransform: "capitalize",
  fontFamily: "Inter",
});

export default function Form() {
  const { t } = useTranslation();
  const { firstName, lastName, email } = useSelector(
    (state: RootState) => state.newsLetter
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <FormWrapper>
      <StyledInput
        variant="standard"
        type="text"
        size="medium"
        placeholder={t("footer.newsletter.form.firstName")}
        value={firstName}
        onChange={(e) => dispatch(setFirstName(e.target.value))}
      />
      <StyledInput
        variant="standard"
        type="text"
        size="medium"
        placeholder={t("footer.newsletter.form.lastName")}
        value={lastName}
        onChange={(e) => dispatch(setLastName(e.target.value))}
      />
      <StyledInput
        variant="standard"
        type="email"
        size="medium"
        placeholder={t("footer.newsletter.form.email")}
        value={email}
        onChange={(e) => dispatch(setEmail(e.target.value))}
      />
      <Subscribe
        variant="contained"
        color="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          dispatch(signUpToNewsLetter());
        }}
      >
        {t("footer.newsletter.form.submit")}
      </Subscribe>
    </FormWrapper>
  );
}
