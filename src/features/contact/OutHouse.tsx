import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useTranslation } from "react-i18next";
import { update_field } from "./contactSlice";

export default function OutHouse() {
  const { t } = useTranslation();
  const { email, message } = useSelector((state: RootState) =>
    !state.contact.formData.general_data.in_house
      ? state.contact.formData.general_data
      : { email: "", message: "" }
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <TextField
        type="email"
        name="email"
        id="email"
        label={t("contact.forms.general.form_content.email")}
        value={email}
        onChange={(e) =>
          dispatch(update_field({ key: "email", value: e.target.value }))
        }
      />
      <TextField
        type="text"
        multiline
        minRows={3}
        label={t("contact.forms.general.form_content.message")}
        name="message"
        id="message"
        value={message}
        onChange={(e) =>
          dispatch(update_field({ key: "message", value: e.target.value }))
        }
      />
    </>
  );
}
