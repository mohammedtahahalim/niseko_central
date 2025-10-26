import { Box, MenuItem, Select, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface FilterOption {
  label: string;
  placeholder: string;
  options: {
    key: string;
    value: string;
  }[];
}

const FiltersContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  gap: "10px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const FilterWrapper = styled(Box)({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const Label = styled(Typography)({
  textTransform: "capitalize",
  fontFamily: "Inter",
  paddingLeft: "2px",
  fontSize: "0.75rem",
});

const Input = styled(Select)({
  flex: "1",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  borderRadius: "8px",
});

const Option = styled(MenuItem)({
  fontSize: "0.85rem",
  fontFamily: "Inter",
  textTransform: "capitalize",
});

export default function Filters() {
  const { t } = useTranslation();
  return (
    <FiltersContainer>
      {(
        t("accomodation.filters", { returnObjects: true }) as FilterOption[]
      ).map((filter) => {
        return (
          <FilterWrapper key={filter.label}>
            <Label variant="body2">{filter.label}</Label>
            <Input
              size="small"
              aria-label={filter.placeholder}
              tabIndex={0}
              value={""}
              onChange={(e) => console.log(e.target.value)}
            >
              {filter.options.map((option) => {
                return (
                  <Option
                    value={option.key}
                    sx={{ fontSize: "0.85rem" }}
                    tabIndex={0}
                  >
                    {option.value}
                  </Option>
                );
              })}
            </Input>
          </FilterWrapper>
        );
      })}
    </FiltersContainer>
  );
}
