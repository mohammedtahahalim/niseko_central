import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { update_field } from "./contactSlice";

export default function InHouse() {
  const { t } = useTranslation();
  const { phone, emergency_phone } = useSelector((state: RootState) => {
    const data = state.contact.formData.general_data;
    return data.in_house ? data : { phone: "", emergency_phone: "" };
  });
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <TextField
        type="text"
        name="phone"
        id="phone"
        label={t("contact.forms.general.form_content.phone")}
        size="small"
        value={phone}
        onChange={(e) =>
          dispatch(update_field({ key: "phone", value: e.target.value }))
        }
      />
      <TextField
        type="text"
        name="emergency_phone"
        id="emergency_phone"
        label={t("contact.forms.general.form_content.emer_phone")}
        size="small"
        value={emergency_phone}
        onChange={(e) =>
          dispatch(
            update_field({ key: "emergency_phone", value: e.target.value })
          )
        }
      />
    </>
  );
}
