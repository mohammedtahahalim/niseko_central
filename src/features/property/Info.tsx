import { Box, Skeleton, styled, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useTranslation } from "react-i18next";
import Modal from "../modal/Modal";
import RenderOnView from "../render_on_view/RenderOnView";

const InfoContainer = styled(Box)(({ theme }) => ({
  width: "90%",
  minHeight: "80px",
  alignSelf: "center",
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0px 10px",
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "20px",
    alignItems: "flex-start",
  },
}));

const PropertyInfo = styled(Box)({
  display: "flex",
  height: "100%",
  gap: "30px",
  flexWrap: "wrap",
});

const PropertyLocation = styled(Box)({
  display: "flex",
  height: "100%",
  gap: "40px",
  flexWrap: "wrap",
});

const InfoPiece = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  alignItems: "center",
  color: theme.palette.icons?.main,
}));

const SvgContainer = styled(Box)(({ theme }) => ({
  minWidth: "27.5px",
  aspectRatio: "1",
  color: "inherit",
  [theme.breakpoints.down("md")]: {
    minWidth: "20px",
  },
}));

const InfoText = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  fontFamily: "Figtree",
  color: theme.palette.textColor?.main,
  textTransform: "capitalize",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
}));

const PopUpContainer = styled(Box)(({ theme }) => ({
  maxWidth: "85vw",
  maxHeight: "85vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100vw",
    aspectRatio: 1,
    maxHeight: "50vh",
  },
}));

const SkeltonContainer = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
});

const LeftSkeltons = styled(Box)({
  display: "flex",
  height: "100%",
  gap: "30px",
  flexWrap: "wrap",
});

const RightSkeltons = styled(Box)({
  display: "flex",
  height: "100%",
  gap: "40px",
  flexWrap: "wrap",
});

const SkeltonPiece = styled(Skeleton)({
  height: "60px",
  aspectRatio: "1",
});

export default function Info() {
  const {
    max_pax,
    beds,
    size,
    village_distance,
    lifts_distance,
    floor_plan,
    map,
  } = useSelector((state: RootState) => state.propertySlice.propertyData) || {};
  const { loading } = useSelector((state: RootState) => state.propertySlice);
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <InfoContainer>
      {loading && (
        <RenderOnView animationDirection="top">
          <SkeltonContainer>
            <LeftSkeltons>
              {Array.from({ length: 5 }).map((_, idx) => (
                <SkeltonPiece variant="rounded" key={idx} />
              ))}
            </LeftSkeltons>
            <RightSkeltons>
              {Array.from({ length: 2 }).map((_, idx) => (
                <SkeltonPiece variant="rounded" key={idx} />
              ))}
            </RightSkeltons>
          </SkeltonContainer>
        </RenderOnView>
      )}
      {!loading && (
        <>
          <PropertyInfo>
            <InfoPiece>
              <SvgContainer>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.0036,23.4772c-.555.2077-1.1576.2997-1.7205.2997H4.7169c-.5645,0-1.1671-.092-1.7221-.2997-.5518-.2061-1.0529-.5264-1.4224-.9815-.3822-.4694-.6168-1.0688-.6168-1.8109,0-.4821.1031-1.0291.333-1.6475.5994-1.6031,2.0218-2.9272,3.9278-3.8469,1.887-.9118,4.2639-1.4319,6.7836-1.4319s4.8966.5201,6.7852,1.4319c1.906.9197,3.3252,2.2453,3.9262,3.8469.2299.6168.333,1.1639.333,1.6475,0,.7437-.2347,1.3415-.6152,1.8109-.3695.4551-.8721.7754-1.424.9815h-.0016ZM12,.2231c1.7046,0,3.2491.6914,4.3654,1.8077,1.1179,1.1179,1.8093,2.6624,1.8093,4.367s-.6929,3.2491-1.8093,4.3654c-1.1163,1.1179-2.6608,1.8093-4.3654,1.8093s-3.2491-.6929-4.3654-1.8093c-1.1179-1.1163-1.8093-2.6608-1.8093-4.3654,0-1.7062.6929-3.2507,1.8093-4.367C8.7509.9144,10.2954.2231,12,.2231"></path>
                </svg>
              </SvgContainer>
              <InfoText variant="subtitle1" tabIndex={0}>
                {max_pax} {t("property.guests")}
              </InfoText>
            </InfoPiece>
            <InfoPiece>
              <SvgContainer>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.7448,18.738c0,.462.2932.7551.7551.7551h.533c.4531,0,.7551-.2931.7551-.7551v-1.3147c.0977.0266.3909.0444.6041.0444h17.216c.2132,0,.5064-.0178.6041-.0444v1.3147c0,.462.302.7551.7551.7551h.533c.462,0,.7551-.2931.7551-.7551v-5.2944c0-1.6968-.9416-2.6295-2.6384-2.6295H3.3831c-1.6967,0-2.6384.9328-2.6384,2.6295v5.2944Z"></path>
                  <path d="M2.8768,9.5438h2.2564v-1.2792c0-.8262.4619-1.2792,1.3059-1.2792h3.3135c.8351,0,1.297.4531,1.297,1.2792v1.2792h2.0165v-1.2792c0-.8262.462-1.2792,1.3503-1.2792h3.1091c.8884,0,1.3503.4531,1.3503,1.2792v1.2792h2.2652v-2.5495c0-1.6434-.8883-2.4873-2.4873-2.4873H5.3552c-1.599,0-2.4785.8439-2.4785,2.4873v2.5495Z"></path>
                </svg>
              </SvgContainer>
              <InfoText variant="subtitle1" tabIndex={0}>
                {beds} {t("property.beds")}
              </InfoText>
            </InfoPiece>
            <InfoPiece>
              <SvgContainer>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.6353,5.1812v12.5011c0,2.5106,2.0353,4.5459,4.5459,4.5459h4.9247c.8369,0,1.5153-.6784,1.5153-1.5153s-.6784-1.5153-1.5153-1.5153h-4.9247c-.8369,0-1.5153-.6784-1.5153-1.5153V5.1812c0-.8369.6784-1.5153,1.5153-1.5153h12.5011c.8369,0,1.5153.6784,1.5153,1.5153v4.9247c0,.8369.6784,1.5153,1.5153,1.5153s1.5153-.6784,1.5153-1.5153v-4.9247c0-2.5106-2.0353-4.5459-4.5459-4.5459H5.1812C2.6706.6353.6353,2.6706.6353,5.1812Z"></path>
                  <path d="M14.6517,21.7016c-.0816.8329.5274,1.5742,1.3603,1.6558.0515.005.1032.0075.155.0072h4.167c1.6737,0,3.0306-1.3568,3.0306-3.0306v-4.167c.004-.8369-.6712-1.5185-1.5081-1.5225-.0517-.0002-.1035.0022-.155.0072-.7931.0988-1.3834.7807-1.3675,1.5797v1.9585l-8.4629-8.4629h1.9585c.799.0158,1.4809-.5745,1.5797-1.3675.0816-.8329-.5274-1.5742-1.3603-1.6558-.0515-.005-.1032-.0075-.155-.0072h-4.167c-1.6737,0-3.0306,1.3568-3.0306,3.0306v4.1026c-.0158.799.5745,1.4809,1.3675,1.5797.8329.0816,1.5742-.5274,1.6558-1.3603.005-.0515.0075-.1032.0072-.155v-2.0229l8.4629,8.4629h-1.9585c-.799-.0158-1.4809.5745-1.5797,1.3675Z"></path>
                </svg>
              </SvgContainer>
              <InfoText variant="subtitle1" tabIndex={0}>
                {size} {t("property.sqm")}
              </InfoText>
            </InfoPiece>
            <InfoPiece>
              <SvgContainer>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.341,19.6125h-1.7955v-3.5525c.9357-.2819,1.669-1.6353,1.669-3.2705,0-1.8326-.9104-3.3269-2.0231-3.3269s-2.0231,1.4943-2.0231,3.3269c0,1.6353.7081,2.9886,1.669,3.2705v3.5525h-3.161V3.6827c0-.4511-.3287-.8176-.7334-.8176H7.0807c-.4046,0-.7334.3665-.7334.8176v15.9298h-3.1357v-3.5525c.9357-.2819,1.669-1.6353,1.669-3.2705,0-1.8326-.9104-3.3269-2.0231-3.3269s-2.0231,1.4943-2.0231,3.3269c0,1.6353.7081,2.9886,1.669,3.2705v3.5525H.6828C.3035,19.6125,0,19.9508,0,20.3737s.3035.7612.6828.7612h22.633c.3793,0,.6828-.3383.6828-.7612.0253-.4229-.2782-.7612-.6575-.7612ZM14.3384,4.9514c0-.1128.0759-.1974.177-.1974h1.2897c.1012,0,.177.0846.177.1974v1.3815c0,.1128-.0759.1974-.177.1974h-1.2897c-.1012,0-.177-.0846-.177-.1974v-1.3815ZM14.3384,8.5885c0-.1128.0759-.1974.177-.1974h1.2897c.1012,0,.177.0846.177.1974v1.3815c0,.1128-.0759.1974-.177.1974h-1.2897c-.1012,0-.177-.0846-.177-.1974v-1.3815ZM11.1774,4.9514c0-.1128.0759-.1974.177-.1974h1.2897c.1012,0,.177.0846.177.1974v1.3815c0,.1128-.0759.1974-.177.1974h-1.2897c-.1012,0-.177-.0846-.177-.1974v-1.3815ZM11.1774,8.5885c0-.1128.0759-.1974.177-.1974h1.2897c.1012,0,.177.0846.177.1974v1.3815c0,.1128-.0759.1974-.177.1974h-1.2897c-.1012,0-.177-.0846-.177-.1974v-1.3815ZM11.1774,12.2538c0-.1128.0759-.1974.177-.1974h1.2897c.1012,0,.177.0846.177.1974v1.3815c0,.1128-.0759.1974-.177.1974h-1.2897c-.1012,0-.177-.0846-.177-.1974v-1.3815ZM8.0164,4.9514c0-.1128.0759-.1974.177-.1974h1.2897c.1012,0,.177.0846.177.1974v1.3815c0,.1128-.0759.1974-.177.1974h-1.2644c-.1012,0-.177-.0846-.177-.1974v-1.3815h-.0253ZM8.0164,8.5885c0-.1128.0759-.1974.177-.1974h1.2897c.1012,0,.177.0846.177.1974v1.3815c0,.1128-.0759.1974-.177.1974h-1.2644c-.1012,0-.177-.0846-.177-.1974v-1.3815h-.0253ZM9.5084,13.8326h-1.2897c-.1012,0-.177-.0846-.177-.1974v-1.3815c0-.1128.0759-.1974.177-.1974h1.2897c.1012,0,.177.0846.177.1974v1.3815c0,.1128-.0759.1974-.177.1974ZM11.7843,19.0768c0,.1128-.0759.1974-.177.1974h-1.7196c-.1012,0-.177-.0846-.177-.1974v-3.186c0-.1128.0759-.1974.177-.1974h1.7196c.1012,0,.177.0846.177.1974v3.186ZM14.3384,19.0768c0,.1128-.0759.1974-.177.1974h-1.7196c-.1012,0-.177-.0846-.177-.1974v-3.186c0-.1128.0759-.1974.177-.1974h1.7196c.1012,0,.177.0846.177.1974v3.186ZM14.5154,13.8326c-.1012,0-.177-.0846-.177-.1974v-1.3815c0-.1128.0759-.1974.177-.1974h1.2897c.1012,0,.177.0846.177.1974v1.3815c0,.1128-.0759.1974-.177.1974h-1.2897Z"></path>
                </svg>
              </SvgContainer>
              <InfoText variant="subtitle1" tabIndex={0}>
                {t("property.village")} {village_distance}m
              </InfoText>
            </InfoPiece>
            <InfoPiece>
              <SvgContainer>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.8512,20.628L15.3438,6.1503c-.3141-.5332-1.0166-.7207-1.5693-.4188-.1899.1035-.3458.2569-.448.4431l-3.4587,6.2527c-.0463.0852-.045.1863.0037.2691l1.7543,2.9596c.3263.5503.224,1.243-.2459,1.6837-.2009-.0292-.252-.0365-.4529-.0657l-3.6292-6.1249c-.3153-.532-1.019-.7171-1.5705-.4139-.1911.1059-.347.2617-.4492.4492L.1442,20.6353c-.0743.1364-.0195.3044.1205.375.0414.0207.0877.0317.1339.0317h23.203c.1583,0,.2873-.1242.2873-.2776,0-.0475-.0122-.095-.0377-.1364M2.1226,6.7712c.0073-1.0068.8595-1.8188,1.9041-1.8115.3372,0,.6672.0852.9581.2484.3214-1.5218,1.8614-2.503,3.438-2.1926,1.5778.3092,2.5956,1.7933,2.2742,3.3138-.2678,1.2661-1.3964,2.1938-2.7343,2.2474H3.9c-.9934-.056-1.7714-.8461-1.7774-1.8054"></path>
                </svg>
              </SvgContainer>
              <InfoText variant="subtitle1" tabIndex={0}>
                {t("property.lifts")} {lifts_distance}m
              </InfoText>
            </InfoPiece>
          </PropertyInfo>
          <PropertyLocation>
            <Modal
              trigger={
                <InfoPiece
                  sx={{
                    cursor: "pointer",
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  <SvgContainer>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.1634,14.6142c-.312.1711-.3693.6187-.1169.8681.6459.6626.6459,1.7362,0,2.3987-.5029.5238.2723,1.2886.7961.7731,1.0684-1.0851,1.0684-2.8599,0-3.9513-.1836-.1836-.4622-.217-.6792-.0887h0Z" />
                      <path d="M20.6587,20.2015l-.7898-.7898c.1784-.2389.3391-.4956.4674-.7627,2.0325-4.1839-2.9173-8.3408-6.6162-5.4142-2.1274,1.6777-2.1358,5.2074,0,6.8894,1.5223,1.2604,3.8156,1.2844,5.364.072.4956.4977,1.7341,1.732,2.2422,2.2422.506.5196,1.299-.2692.7846-.7846l-1.4524-1.4524h.0001ZM14.432,19.2666c-3.2146-2.8057.5196-7.7773,4.0346-5.1751,3.2146,2.8078-.53,7.7837-4.0346,5.1751Z" />
                      <path d="M10.9981,16.5726c.0104-2.3622,1.6725-4.6054,3.9678-5.2085V3.6567c-.0177-.0042-6.0389-2.262-6.0547-2.2652.0083,1.6736.0595,13.5806.0668,15.2364l2.165,1.347c-.1043-.4487-.1659-.9265-.145-1.4023h.0001Z" />
                      <path d="M22.6785,1.7318c-.3057-.2055-.6897-.2504-1.035-.1169l-5.5643,2.1817c.0063.6552-.0052,6.5627,0,7.3787,3.0696-.3015,5.9025,2.4269,5.8261,5.5037,0,.3788-.0386.746-.1116,1.107l.7898-.4674c.3339-.2003.5457-.5676.5457-.9568V2.5727c0-.3339-.1669-.6459-.4507-.8399v-.0009Z" />
                      <path d="M7.8043,2.7001l-.0052-1.1801L1.5775,3.7069c-.4226.145-.7064.5342-.7064.963v13.0432c-.0167.721.8003,1.2333,1.4639.963l5.5309-2.0148-.0052-1.1853-.0553-12.7761h-.001Z" />
                    </svg>
                  </SvgContainer>
                  <InfoText variant="subtitle1" tabIndex={0}>
                    {t("property.floor_plan")}
                  </InfoText>
                </InfoPiece>
              }
              fullScreenWrapper={true}
              disableScroll={false}
              isTransparent={true}
            >
              <PopUpContainer>
                <img
                  src={floor_plan}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </PopUpContainer>
            </Modal>
            <Modal
              trigger={
                <InfoPiece
                  sx={{
                    cursor: "pointer",
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  <SvgContainer>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.2242,22.6489c-.1552.2508-.4294.4039-.7227.4039H3.4972c-.2954,0-.5675-.153-.7227-.4039s-.1679-.5633-.0361-.8268l2.5507-5.1013c.2104-.4209.7206-.5909,1.1414-.3805s.5909.7206.3805,1.1414l-1.9385,3.8707h14.254l-1.9364-3.8707c-.2104-.4209-.0404-.931.3805-1.1414.4187-.2104.931-.0404,1.1414.3805l2.5507,5.1013c.1318.2636.1169.576-.0383.8268h-.0001ZM4.7724,8.174c0-3.9853,3.2414-7.2267,7.2267-7.2267s7.2267,3.2414,7.2267,7.2267c0,5.8707-6.4233,11.0741-6.6954,11.2909-.1552.1254-.3443.187-.5314.187s-.3762-.0616-.5314-.187c-.2742-.2189-6.6954-5.4245-6.6954-11.2909h0ZM9.4487,8.174c0,1.4071,1.1435,2.5507,2.5507,2.5507s2.5507-1.1435,2.5507-2.5507-1.1435-2.5507-2.5507-2.5507-2.5507,1.1435-2.5507,2.5507Z"></path>
                    </svg>
                  </SvgContainer>
                  <InfoText variant="subtitle1" tabIndex={0}>
                    {t("property.map")}
                  </InfoText>
                </InfoPiece>
              }
              fullScreenWrapper={true}
              disableScroll={false}
              isTransparent={true}
            >
              <PopUpContainer>
                <iframe
                  src={map}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </PopUpContainer>
            </Modal>
          </PropertyLocation>
        </>
      )}
    </InfoContainer>
  );
}
