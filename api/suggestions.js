const languages = ["en", "ja", "ar", "fr"];
export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Allowed" });
  const { limit = 10 } = req.query;
  const bookings = Array.from({ length: Number(limit) }, () => {
    const temp = {};
    languages.forEach((lang) => {
      temp[lang] = {
        booking_main_image:
          "https://d1z517741srsht.cloudfront.net/accommodation/_1536xAUTO_crop_center-center_none/12710/Hirafu-Woods-April-2019-Shoot-LR.webp",
        booking_title: "4 Bedroom House",
        booking_location: "Hirafu Woods",
        distance: 1000,
        max_capacity: 10,
        tag: {
          tag_title: "Vehicle Included",
          tag_subtitle: "Winter Only",
          tag_color: "primary",
        },
      };
    });
    return temp;
  });
  return res.status(200).json({ bookings });
}
