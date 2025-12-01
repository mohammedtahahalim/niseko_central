import { Box, Button, styled } from "@mui/material";
import Accomodation from "./Accomodation";
import General from "./General";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { switch_type } from "../contact/contactSlice";

const TabsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const Tabs = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Tab = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ isActive, theme }) => ({
  color: isActive ? theme.palette.primary.main : theme.palette.textColor?.main,
  padding: "12px 18px",
  fontFamily: "Figtree",
  textTransform: "capitalize",
  fontSize: "1rem",
  borderBottom: isActive ? `3px solid ${theme.palette.primary.main}` : "",
  borderRadius: "0px",
  letterSpacing: "1.1px",
  fontWeight: "600",
}));

const ContactForm = styled(Box)(({ theme }) => ({
  padding: "25px 0px",
  [theme.breakpoints.down("nav_break")]: {
    padding: "25px",
  },
}));

export default function ContactTabs() {
  const { t } = useTranslation();
  const { type } = useSelector((state: RootState) => state.contact.formData);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <TabsWrapper>
      <Tabs>
        <Tab
          onClick={() => dispatch(switch_type("accommodation"))}
          isActive={type === "accommodation"}
        >
          {t("contact.forms.accommodation.tab_title")}
        </Tab>
        <Tab
          onClick={() => {
            dispatch(switch_type("general"));
          }}
          isActive={type === "general"}
        >
          {t("contact.forms.general.tab_title")}
        </Tab>
      </Tabs>
      <ContactForm>
        {type === "accommodation" ? <Accomodation /> : <General />}
      </ContactForm>
    </TabsWrapper>
  );
}
