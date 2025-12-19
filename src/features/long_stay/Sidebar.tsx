import { styled } from "@mui/material";
import type { SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  setArticleChosen: React.Dispatch<SetStateAction<number>>;
  articleChosen: number;
}

const SidebarWrapper = styled("ul")({
  listStyleType: "none",
  width: "100%",
  padding: "10px",
});

const StyledLi = styled("li", {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ isActive, theme }) => ({
  ...(isActive
    ? {
        backgroundColor: theme.palette.hero?.main,
        color: theme.palette.textColor?.main,
      }
    : {
        backgroundColor: "transparent",
        color: theme.palette.primary.main,
      }),
  padding: "10px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  fontSize: "0.9rem",
  fontFamily: "Figtree",
  cursor: "pointer",
}));

export default function Sidebar({
  setArticleChosen,
  articleChosen,
}: SidebarProps) {
  const { t } = useTranslation();
  const links = t("long-stay.links", { returnObjects: true }) as string[];
  return (
    <SidebarWrapper role="navigation" aria-label="Browser Articles">
      {Array.isArray(links) &&
        links.map((link, idx) => {
          return (
            <StyledLi
              isActive={idx === articleChosen}
              key={idx}
              onClick={() => setArticleChosen(idx)}
            >
              {link}
            </StyledLi>
          );
        })}
    </SidebarWrapper>
  );
}
