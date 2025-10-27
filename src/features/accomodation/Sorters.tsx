import { Box, styled } from "@mui/material";
import type { SortingType } from "../../utils/Types";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { sortBookings } from "./bookingsSlice";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";

type TSort = {
  sort_key: SortingType;
  sort_value: string;
};

const SortersWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
});

const Sorter = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  fontSize: "0.8rem",
  fontFamily: "Source Code Pro",
  color: isActive ? theme.palette.primary.main : theme.palette.icons?.main,
  display: "flex",
  alignItems: "center",
  gap: "2px",
  cursor: "pointer",
}));

export default function Sorters() {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState<number | null>(null);
  const { type, guests, property } = useSelector(
    (state: RootState) => state.bookings.filters
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsActive(null);
  }, [type, guests, property]);

  return (
    <SortersWrapper>
      {(t("accomodation.sorters", { returnObjects: true }) as TSort[]).map(
        (sortElement, idx) => {
          return (
            <Sorter
              key={sortElement.sort_key}
              isActive={isActive === idx}
              onClick={() => {
                setIsActive(idx);
                dispatch(sortBookings(sortElement.sort_key));
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter") {
                  setIsActive(idx);
                  dispatch(sortBookings(sortElement.sort_key));
                }
              }}
              tabIndex={0}
            >
              <UnfoldMoreIcon sx={{ fontSize: "0.7rem" }} />
              {sortElement.sort_value}
            </Sorter>
          );
        }
      )}
    </SortersWrapper>
  );
}
