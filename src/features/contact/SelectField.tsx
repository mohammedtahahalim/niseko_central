import { styled, Box, FormLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { update_field } from "./contactSlice";

interface SelectFieldProps {
  field: string;
}

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

export default function SelectField({ field }: SelectFieldProps) {
  const value = useSelector(
    (state: RootState) =>
      state.contact.formData.accommodation_data[
        field as keyof typeof state.contact.formData.accommodation_data
      ]
  );
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <SelectWrapper tabIndex={0} aria-label={field}>
      <FormLabel sx={{ fontSize: "0.9rem" }} color="secondary">
        {t(`contact.forms.accommodation.form_content.${field}`)} *
      </FormLabel>
      <Select
        size="small"
        value={value}
        onChange={(e) =>
          dispatch(update_field({ key: field, value: e.target.value }))
        }
        renderValue={(selected: any) => {
          if (selected === 0) {
            return t("contact.forms.accommodation.form_content.placeholder");
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
      </Select>
    </SelectWrapper>
  );
}
