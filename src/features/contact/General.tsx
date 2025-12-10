import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import InHouse from "./InHouse";
import OutHouse from "./OutHouse";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { submitInquiry, update_field } from "./contactSlice";
import { useTranslation } from "react-i18next";
import type React from "react";

const GeneralWrapper = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
  maxWidth: "550px",
});

const NameWrapper = styled(Box)({
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
});

export default function General() {
  const { t } = useTranslation();
  const { loading } = useSelector((state: RootState) => state.contact);
  const { in_house, first_name, last_name } = useSelector(
    (state: RootState) => state.contact.formData.general_data
  );
  const dispatch = useDispatch<AppDispatch>();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(update_field({ key: "in_house", value: !in_house }));
    }
  };

  return (
    <GeneralWrapper name="contact">
      <NameWrapper>
        <TextField
          type="text"
          label={t("contact.forms.general.form_content.first_name")}
          size="small"
          value={first_name}
          onChange={(e) =>
            dispatch(update_field({ key: "first_name", value: e.target.value }))
          }
        />
        <TextField
          type="text"
          label={t("contact.forms.general.form_content.last_name")}
          size="small"
          value={last_name}
          onChange={(e) =>
            dispatch(update_field({ key: "last_name", value: e.target.value }))
          }
        />
      </NameWrapper>
      <FormControlLabel
        control={
          <Checkbox
            checked={in_house}
            onChange={() =>
              dispatch(update_field({ key: "in_house", value: !in_house }))
            }
            onKeyDown={onKeyDown}
            tabIndex={0}
          />
        }
        label={
          <Typography>
            {t("contact.forms.general.form_content.in_house")}
          </Typography>
        }
      />
      {in_house && <InHouse />}
      {!in_house && <OutHouse />}
      <Button
        variant="contained"
        sx={{ width: "fit-content" }}
        onClick={(e: React.FormEvent) => {
          e.preventDefault();
          dispatch(submitInquiry());
        }}
        disabled={loading}
      >
        {t("contact.forms.accommodation.form_content.submit")}
      </Button>
    </GeneralWrapper>
  );
}
