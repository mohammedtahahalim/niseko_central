import { Box, Button, styled } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

// TODO: fix the logic for the last page, to ensure array do not go out of bounds

const PageControlWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  gap: "5px",
  height: "50px",
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const PageBox = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  height: "100%",
  aspectRatio: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ...(isActive
    ? {
        borderTop: `2px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
      }
    : { color: theme.palette.icons?.main }),
  padding: "0px",
  borderRadius: "0px",
}));

export default function PageControl() {
  const { current_page, last_page } =
    useSelector((state: RootState) => state.blogs.data) || {};
  const first_page = Math.max(1, (current_page ?? 0) - 2);

  return (
    <PageControlWrapper>
      {Array.from({ length: 5 }, (_, idx) => first_page + idx).map((page) => {
        return (
          <PageBox isActive={current_page === page} variant="text" key={page}>
            {page}
          </PageBox>
        );
      })}
    </PageControlWrapper>
  );
}
