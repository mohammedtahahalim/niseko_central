import { Box, Button, styled } from "@mui/material";
import { useState } from "react";
import Accomodation from "./Accomodation";
import General from "./General";
import { useTranslation } from "react-i18next";

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
}));

const ContactForm = styled(Box)({
  padding: "25px 0px",
});

export default function ContactTabs() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  return (
    <TabsWrapper>
      <Tabs>
        <Tab onClick={() => setActiveTab(0)} isActive={activeTab === 0}>
          {t("contact.forms.accommodation.tab_title")}
        </Tab>
        <Tab onClick={() => setActiveTab(1)} isActive={activeTab === 1}>
          {t("contact.forms.general.tab_title")}
        </Tab>
      </Tabs>
      <ContactForm>
        {activeTab === 0 ? <Accomodation /> : <General />}
      </ContactForm>
    </TabsWrapper>
  );
}
