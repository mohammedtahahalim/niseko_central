import { Box, styled } from "@mui/material";

interface LineSeparatorProps {
  dir: "v" | "h";
  w: number;
  h: number;
}

const Line = styled(Box)<LineSeparatorProps>(({ dir, w, h, theme }) => ({
  width: dir === "v" ? `${w}px` : `${w}%`,
  height: dir === "v" ? `${h}%` : `${h}px`,
  backgroundColor: theme.palette.divider,
}));

export default function LineSeparator({ dir, w, h }: LineSeparatorProps) {
  return <Line dir={dir} h={h} w={w}></Line>;
}
