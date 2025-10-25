import { Box, Select, styled, Typography } from "@mui/material";

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

const Label = styled(Typography)({});

const Input = styled(Select)({
  flex: "1",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export default function Filters() {
  return (
    <FiltersContainer>
      <FilterWrapper>
        <Label variant="body2">1</Label>
        <Input size="small"></Input>
      </FilterWrapper>
      <FilterWrapper>
        <Label variant="body2">2</Label>
        <Input size="small"></Input>
      </FilterWrapper>
      <FilterWrapper>
        <Label variant="body2">3</Label>
        <Input size="small"></Input>
      </FilterWrapper>
    </FiltersContainer>
  );
}
