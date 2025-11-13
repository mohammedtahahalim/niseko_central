import { Box, styled, Typography } from "@mui/material";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface AccordionProps {
  title: string;
  content: string;
}

const AccordionContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Heading = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "5px",
  padding: "10px",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    padding: "10px 0px",
  },
}));

const Title = styled(Typography)({
  textTransform: "capitalize",
  fontFamily: "Inter",
  fontSize: "0.9rem",
});

const Content = styled(Typography)(({ theme }) => ({
  fontFamily: "Figtree",
  fontStyle: "italic",
  fontSize: "0.9rem",
  textTransform: "capitalize",
  padding: "10px 10px 10px 20px",
  color: theme.palette.icons?.main,
}));

const ContentMotion = motion.create(Content);

export default function Accordion({ title, content }: AccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsOpen((prev) => !prev);
    }
  };
  return (
    <AccordionContainer>
      <Heading
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <ArrowDropDownIcon fontSize="medium" />
        ) : (
          <ArrowRightIcon fontSize="medium" />
        )}
        <Title>{title}</Title>
      </Heading>
      {
        <AnimatePresence>
          {isOpen && (
            <ContentMotion
              initial={{ maxHeight: "0px" }}
              animate={{ maxHeight: "500px" }}
              transition={{ duration: 1 }}
            >
              {content}
            </ContentMotion>
          )}
        </AnimatePresence>
      }
    </AccordionContainer>
  );
}
