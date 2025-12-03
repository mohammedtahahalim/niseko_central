import { Box, styled, TextField } from "@mui/material";
import InHouse from "./InHouse";
import OutHouse from "./OutHouse";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const GeneralWrapper = styled("form")({});

const NameWrapper = styled(Box)({
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
});

export default function General() {
  const { in_house } = useSelector(
    (state: RootState) => state.contact.formData.general_data
  );
  return (
    <GeneralWrapper name="contact">
      <NameWrapper>
        <TextField type="username" label="First Name" size="small" />
        <TextField type="username" label="Last Name" size="small" />
      </NameWrapper>
      <TextField type="checkbox" id="in_house" />
      {in_house && <InHouse />}
      {!in_house && <OutHouse />}
    </GeneralWrapper>
  );
}
