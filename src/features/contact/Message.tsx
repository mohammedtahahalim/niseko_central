import { styled, Box, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { update_field } from "./contactSlice";
import { useTranslation } from "react-i18next";

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

export default function Message() {
  const { t } = useTranslation();
  const { comments } = useSelector(
    (state: RootState) => state.contact.formData.accommodation_data,
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
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
        name="comments"
        id="comments"
        label="Comments"
      />
    </MessageWrapper>
  );
}
