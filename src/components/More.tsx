import { styled, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import { useNavigate } from "react-router-dom";

interface MoreProps {
  url: string;
  content_key: string;
}

const MoreButton = styled(Button)({
  width: "fit-content",
  borderRadius: "50px",
  padding: "5px 20px",
  textTransform: "capitalize",
  fontFamily: "Inter",
  fontSize: "0.85rem",
  fontStyle: "italic",
  gap: "8px",
});

export default function More({ url, content_key }: MoreProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();

  const handleKeyboardClick = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate(`${url}`);
    }
  };

  return (
    <MoreButton
      variant="contained"
      endIcon={isArabic ? <WestIcon /> : <EastIcon />}
      onClick={() => navigate(`${url}`)}
      role="button"
      onKeyDown={handleKeyboardClick}
    >
      {t(`${content_key}`)}
    </MoreButton>
  );
}
