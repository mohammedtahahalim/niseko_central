import { Box, Select, styled, Typography } from "@mui/material";

const CategoriesContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  gap: "10px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const CategoryWrapper = styled(Box)({
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

export default function Categories() {
  return (
    <CategoriesContainer>
      <CategoryWrapper>
        <Label variant="body2">1</Label>
        <Input size="small"></Input>
      </CategoryWrapper>
      <CategoryWrapper>
        <Label variant="body2">2</Label>
        <Input size="small"></Input>
      </CategoryWrapper>
      <CategoryWrapper>
        <Label variant="body2">3</Label>
        <Input size="small"></Input>
      </CategoryWrapper>
    </CategoriesContainer>
  );
}
