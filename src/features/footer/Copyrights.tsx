import { Box, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

const CopyrightsWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1150px",
  padding: "20px",
  display: "flex",
  borderTop: `1px solid ${theme.palette.divider}`,
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const TermsAndPrivacy = styled(Box)({
  display: "flex",
  gap: "10px",
});

const StyledLink = styled("a")({
  textDecoration: "none",
  fontFamily: "Inter",
  fontSize: "0.7rem",
  color: "inherit",
});

const Rights = styled(Box)({
  fontFamily: "Inter",
  fontSize: "0.7rem",
  color: "inherit",
});

export default function Copyrights() {
  const { t } = useTranslation();
  return (
    <CopyrightsWrapper>
      <TermsAndPrivacy>
        <StyledLink
          href="https://www.nisekocentral.com/terms-and-conditions"
          target="_blank"
        >
          {t("footer.terms")}
        </StyledLink>
        <StyledLink
          href="https://www.nisekocentral.com/privacy-policy"
          target="_blank"
        >
          {t("footer.privacy")}
        </StyledLink>
      </TermsAndPrivacy>
      <Rights>
        {`© ${new Date().getFullYear()} `}
        {t("footer.rights")}
      </Rights>
    </CopyrightsWrapper>
  );
}
