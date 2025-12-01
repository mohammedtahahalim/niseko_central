import { memo } from "react";
import { styled, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { update_field } from "./contactSlice";

interface FieldProps {
  field_type: string;
  field_state: any;
}

const FieldWrapper = styled(TextField)({
  flex: "1",
  textTransform: "capitalize",
  fontFamily: "Figtree",
  fontStyle: "italic",
  fontSize: "0.8rem",
  maxWidth: "500px",
});

const Field = memo(({ field_type, field_state }: FieldProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <FieldWrapper
      size="small"
      label={t(`contact.forms.accommodation.form_content.${field_type}`)}
      value={field_state}
      onChange={(e) =>
        dispatch(update_field({ key: field_type, value: e.target.value }))
      }
      required
    />
  );
});

export default Field;
