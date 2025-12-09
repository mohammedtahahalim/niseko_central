import { Box, styled } from "@mui/material";

interface DangerousHTMLProps {
  content: string;
}

const DangerousHTMLWrapper = styled(Box)({});

export default function DangerousHTML({ content }: DangerousHTMLProps) {
  return <DangerousHTMLWrapper>DangerousHTML</DangerousHTMLWrapper>;
}
