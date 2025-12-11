import { Box, Button, Skeleton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { generate_page_count } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";

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

const PageSkeleton = styled(Skeleton)({
  height: "100%",
  aspectRatio: "4/3",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function PageControl() {
  const { loading } = useSelector((state: RootState) => state.blogs);
  const { page, total_pages, page_size } =
    useSelector((state: RootState) => state.blogs.data) || {};
  const pages_count = generate_page_count(page ?? 0, total_pages ?? 0);
  const navigate = useNavigate();

  return (
    <PageControlWrapper>
      {loading &&
        Array.from({ length: 5 }).map((_, idx) => (
          <PageSkeleton variant="rectangular" key={idx} />
        ))}
      {!loading &&
        page &&
        pages_count.map((temp_page) => {
          return (
            <PageBox
              isActive={temp_page === page}
              variant="text"
              key={temp_page}
              onClick={() => navigate(`?limit=${page_size}&page=${temp_page}`)}
            >
              {temp_page}
            </PageBox>
          );
        })}
    </PageControlWrapper>
  );
}
