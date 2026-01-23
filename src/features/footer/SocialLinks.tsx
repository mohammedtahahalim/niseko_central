import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";

const SocialLinksWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "250px",
  width: "100%",
  minHeight: "100px",
  display: "flex",
  flexDirection: "column",
  marginLeft: "50px",
  gap: "25px",
  alignSelf: "center",
  padding: "10px",
  [theme.breakpoints.down("nav_break")]: {
    marginLeft: "0px",
  },
}));

const Logos = styled(Box)({
  width: "100%",
  display: "flex",
});

const NisekoLogo = styled(Box)({
  flex: "1.5",
  display: "flex",
  justifyContent: "center",
});

const AntaLogo = styled(Box)({
  flex: "1",
  display: "flex",
  justifyContent: "center",
});

const Trademark = styled(Typography)({
  width: "100%",
  fontFamily: "Inter",
  fontSize: "0.7rem",
});

const SocialMedia = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
});

const Link = styled("a")(({ theme }) => ({
  color: theme.palette.icons?.main,
  display: "flex",
  alignItems: "center",
}));

export default function SocialLinks() {
  const { t } = useTranslation();
  return (
    <SocialLinksWrapper>
      <Logos>
        <NisekoLogo tabIndex={0}>
          <img
            src={"/img/logo.png"}
            alt=""
            style={{ width: "90%", objectFit: "contain", scale: 1.5 }}
          />
        </NisekoLogo>
        <AntaLogo tabIndex={0}>
          <img
            src="/img/anta.webp"
            alt=""
            style={{ width: "90%", objectFit: "contain" }}
          />
        </AntaLogo>
      </Logos>
      <Trademark>{t("footer.trademark")}</Trademark>
      <SocialMedia>
        <Link
          href="https://www.instagram.com/nisekocentral/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <InstagramIcon fontSize="medium" color="inherit" />
        </Link>
        <Link
          href="https://www.facebook.com/nisekocentral/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FacebookIcon fontSize="medium" color="inherit" />
        </Link>
        <Link
          href="https://vimeo.com/nisekocentral"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
        >
          <XIcon fontSize="small" color="inherit" />
        </Link>
      </SocialMedia>
    </SocialLinksWrapper>
  );
}
