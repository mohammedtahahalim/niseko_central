import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface MissionType {
  headline: string;
  contents: string[];
}

const MissionWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
});

const MissionContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const MissionTitle = styled(Typography)({
  fontFamily: "VAGRundschriftD",
  fontWeight: "bold",
  letterSpacing: "1.2px",
});

const MissionBody = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

const MissionText = styled(Typography)({
  fontStyle: "italic",
  fontWeight: "300",
  fontFamily: "Inter",
});

export default function Mission() {
  const { t } = useTranslation();
  const missionValues = t("about.services", {
    returnObjects: true,
  }) as MissionType[];
  return (
    <MissionWrapper>
      {missionValues.map((value) => {
        return (
          <MissionContent key={value.headline}>
            <MissionTitle variant="h5">{value.headline}</MissionTitle>
            <MissionBody>
              {value.contents.map((content) => {
                return (
                  <MissionText key={content} variant="subtitle1">
                    {content}
                  </MissionText>
                );
              })}
            </MissionBody>
          </MissionContent>
        );
      })}
    </MissionWrapper>
  );
}
