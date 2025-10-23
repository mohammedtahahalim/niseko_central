import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import type { MobileMenuItemType } from "../../utils/Types";

interface HeadLinkState {
  isHeadLink: boolean;
}

const MobileMenuWrapper = styled(Box)(({ theme }) => ({
  flex: "1",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "40px 60px",
  gap: "10px",
  margin: "0px auto",
  [theme.breakpoints.down("sm")]: {
    padding: "40px 10px",
  },
}));

const MobileMenuLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isHeadLink",
})<HeadLinkState>(({ theme, isHeadLink }) => ({
  textDecoration: "none",
  fontFamily: "Source Code Pro",
  fontWeight: "500",
  fontSize: "1.1rem",
  color: isHeadLink ? theme.palette.primary.main : theme.palette.icons?.main,
  "&:hover": {
    color: theme.palette.primary.main,
    transition: "color 0.2s ease-in-out",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

export default function MobileMenuItem({
  path,
  element,
  children,
}: MobileMenuItemType) {
  return (
    <MobileMenuWrapper>
      <MobileMenuLink
        isHeadLink={true}
        to={element}
        aria-label="Navigation Header"
      >
        {path}
      </MobileMenuLink>
      {children?.map((link) => {
        return (
          <MobileMenuLink key={link.path} to={link.element} isHeadLink={false}>
            {link.path}
          </MobileMenuLink>
        );
      })}
    </MobileMenuWrapper>
  );
}
