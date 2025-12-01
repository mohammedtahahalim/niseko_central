import {
  Box,
  Button,
  FormLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { submitInquiry, update_field } from "./contactSlice";
import { useTranslation } from "react-i18next";
import Field from "./Field";
import Property from "./Property";

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

const SelectWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  flex: "1",
  textTransform: "capitalize",
  fontFamily: "Figtree",
  fontStyle: "italic",
  fontSize: "0.8rem",
  maxWidth: "500px",
});

const AccommodationSelect = styled(Select)({});

const MessageWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  flex: "1",
  textTransform: "capitalize",
  fontFamily: "Figtree",
  fontStyle: "italic",
  fontSize: "0.8rem",
});

export default function Accomodation() {
  const { t } = useTranslation();

  const {
    first_name,
    last_name,
    email,
    country,
    phone,
    nights,
    adults,
    children,
    infants,
    comments,
  } = useSelector(
    (state: RootState) => state.contact.formData.accommodation_data
  );
  const info_fields = { email, country, phone };
  const select_fields = { nights, adults, children, infants };
  const dispatch = useDispatch<AppDispatch>();
  return (
    <AccomodationWrapper>
      <NameWrapper>
        <Field field_state={first_name} field_type="first_name" />
        <Field field_state={last_name} field_type="last_name" />
      </NameWrapper>
      {Object.keys(info_fields).map((field) => {
        return (
          <Field
            field_state={info_fields[field as keyof typeof info_fields]}
            field_type={field}
            key={field}
          />
        );
      })}
      {Object.keys(select_fields).map((field) => {
        return (
          <SelectWrapper key={field} tabIndex={0} aria-label={field}>
            <FormLabel sx={{ fontSize: "0.9rem" }} color="secondary">
              {t(`contact.forms.accommodation.form_content.${field}`)} *
            </FormLabel>
            <AccommodationSelect
              size="small"
              value={select_fields[field as keyof typeof select_fields]}
              onChange={(e) =>
                dispatch(update_field({ key: field, value: e.target.value }))
              }
              renderValue={(selected: any) => {
                if (selected === 0) {
                  return t(
                    "contact.forms.accommodation.form_content.placeholder"
                  );
                }
                return selected;
              }}
            >
              <MenuItem value={0} sx={{ fontSize: "0.9rem" }}>
                {t("contact.forms.accommodation.form_content.placeholder")}
              </MenuItem>
              {Array.from({ length: 10 }, (_, idx) => idx + 1).map((elem) => {
                return <MenuItem value={elem}>{elem}</MenuItem>;
              })}
            </AccommodationSelect>
          </SelectWrapper>
        );
      })}
      <Property />
      <MessageWrapper>
        <Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>
          {t("contact.forms.accommodation.form_content.questions")}
        </Typography>
        <TextField
          type="text"
          multiline
          minRows={7}
          value={comments}
          onChange={(e) =>
            dispatch(update_field({ key: "comments", value: e.target.value }))
          }
        />
      </MessageWrapper>
      <Button
        variant="contained"
        sx={{ width: "fit-content" }}
        onClick={() => dispatch(submitInquiry())}
      >
        {t("contact.forms.accommodation.form_content.submit")}
      </Button>
    </AccomodationWrapper>
  );
}
