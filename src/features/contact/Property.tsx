import {
  Box,
  styled,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { memo, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { update_field } from "./contactSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";

interface Property {
  key: string;
  value: string;
}

const PropertiesContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
});

const PropertyWrapper = styled(FormControlLabel)({
  display: "flex",
  gap: "5px",
  minWidth: "225px",
  fontSize: "0.5rem",
});
const Property = memo(() => {
  const { i18n, t } = useTranslation();
  const { properties } = useSelector(
    (state: RootState) => state.contact.formData.accommodation_data
  );
  const properties_types = useMemo(() => {
    return t("contact.forms.accommodation.form_content.properties", {
      returnObjects: true,
    });
  }, [i18n.language]) as Property[];
  const propertiesSet = useMemo(() => new Set(properties), [properties]);
  const dispatch = useDispatch<AppDispatch>();
  const [all, setAll] = useState<boolean>(false);
  return (
    <PropertiesContainer>
      <PropertyWrapper
        control={
          <Checkbox
            checked={all}
            onChange={() => {
              setAll((all) => !all);
              dispatch(update_field({ key: "properties", value: [] }));
            }}
          />
        }
        label={
          <Typography variant="subtitle1" fontSize={"0.8rem"}>
            {t("contact.forms.accommodation.form_content.all_properties")}
          </Typography>
        }
      />
      {properties_types.map((elem) => {
        return (
          <PropertyWrapper
            control={
              <Checkbox
                checked={all || propertiesSet.has(Number(elem.key))}
                onChange={() => {
                  propertiesSet.has(Number(elem.key))
                    ? propertiesSet.delete(Number(elem.key))
                    : propertiesSet.add(Number(elem.key));
                  dispatch(
                    update_field({
                      key: "properties",
                      value: [...propertiesSet],
                    })
                  );
                }}
              />
            }
            label={
              <Typography variant="subtitle1" fontSize={"0.8rem"}>
                {elem.value}
              </Typography>
            }
            key={elem.value}
          />
        );
      })}
    </PropertiesContainer>
  );
});

export default Property;
