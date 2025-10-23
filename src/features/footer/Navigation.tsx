import { Box, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NavigationWrapper = styled(Box)(({ theme }) => ({
  flex: "1",
  width: "100%",
  display: "flex",
  minHeight: "250px",
  maxWidth: "750px",
  marginLeft: "auto",
  [theme.breakpoints.down("nav_break")]: {
    flexDirection: "column",
    gap: "40px",
    maxWidth: "1000px",
  },
}));

const StayWrapper = styled(Box)(({ theme }) => ({
  flex: "1",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("nav_break")]: {
    flexDirection: "row",
  },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  padding: "10px 15px",
  fontSize: "0.9rem",
  gap: "3px",
  [theme.breakpoints.down("sm")]: {
    padding: "0px 5px",
    fontSize: "0.8rem",
    gap: "6px",
  },
}));

const MenuWrapper = styled(Box)(({ theme }) => ({
  flex: "2",
  width: "100%",
  display: "flex",
  [theme.breakpoints.down("nav_break")]: {
    flex: "1",
  },
}));

const LinkField = styled(Link)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  fontFamily: "Inter",
  fontWeight: "500",
  fontSize: "inherit",
  "&:first-of-type": {
    color: theme.palette.primary.main,
  },
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export default function Navigation() {
  const { t } = useTranslation();
  return (
    <NavigationWrapper role="navigation">
      <StayWrapper>
        <Wrapper>
          {(t("footer.menu.stay", { returnObjects: true }) as any[]).map(
            (link) => {
              return (
                <LinkField key={link.path} to={link.element}>
                  {link.path}
                </LinkField>
              );
            }
          )}
        </Wrapper>
        <Wrapper>
          {(t("footer.menu.map", { returnObjects: true }) as any[]).map(
            (link) => {
              return (
                <LinkField key={link.path} to={link.element}>
                  {link.path}
                </LinkField>
              );
            }
          )}
        </Wrapper>
      </StayWrapper>
      <MenuWrapper>
        <Wrapper>
          {(t("footer.menu.concierge", { returnObjects: true }) as any[]).map(
            (link) => {
              return (
                <LinkField key={link.path} to={link.element}>
                  {link.path}
                </LinkField>
              );
            }
          )}
        </Wrapper>
        <Wrapper>
          {(t("footer.menu.about", { returnObjects: true }) as any[]).map(
            (link) => {
              return (
                <LinkField key={link.path} to={link.element}>
                  {link.path}
                </LinkField>
              );
            }
          )}
        </Wrapper>
      </MenuWrapper>
    </NavigationWrapper>
  );
}
