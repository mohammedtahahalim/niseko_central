import { Box, Button, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { submitInquiry } from "./contactSlice";
import { useTranslation } from "react-i18next";
import Field from "./Field";
import Property from "./Property";
import SelectField from "./SelectField";
import Message from "./Message";

const AccomodationWrapper = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "750px",
});

const NameWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  display: "flex",
  gap: "5px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export default function Accomodation() {
  const { t } = useTranslation();
  const info_fields = ["email", "country", "phone"];
  const select_fields = ["nights", "adults", "children", "infants"];
  const dispatch = useDispatch<AppDispatch>();

  return (
    <AccomodationWrapper name="contact" id="contact">
      <NameWrapper>
        <Field field_type="first_name" />
        <Field field_type="last_name" />
      </NameWrapper>
      {info_fields.map((field) => {
        return <Field field_type={field} key={field} />;
      })}
      <Field field_type="date" />
      {select_fields.map((field) => {
        return <SelectField key={field} field={field} />;
      })}
      <Property />
      <Message />
      <Button
        variant="contained"
        sx={{ width: "fit-content" }}
        onClick={() => dispatch(submitInquiry())}
        type="submit"
      >
        {t("contact.forms.accommodation.form_content.submit")}
      </Button>
    </AccomodationWrapper>
  );
}
