import sharp from "sharp";

export default async function blurrifyImage(image) {
  try {
    const response = await fetch(image);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const blurredImage = await sharp(buffer)
      .resize(20)
      .blur()
      .toBuffer()
      .then((data) => `data:image/jpeg;base64,${data.toString("base64")}`);
    return blurredImage;
  } catch (err) {
    console.log(err);
    return "";
  }
}
