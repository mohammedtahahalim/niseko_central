import { Box, styled } from "@mui/material";

interface BannerProps {
  image: string;
  blur_image: string;
}

const BannerWrapper = styled(Box)({});

export default function Banner({ image, blur_image }: BannerProps) {
  console.log(image, blur_image);
  return <BannerWrapper>Banner</BannerWrapper>;
}
