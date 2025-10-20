const languages = ["en", "ja", "ar", "fr"];
const fakeContent = {
  en: {
    booking_title: "4 Bedroom House",
    booking_location: "Hirafu Woods",
  },
  ja: {
    booking_title: "4ベッドルームハウス",
    booking_location: "ヒラフの森",
  },
  ar: {
    booking_title: "منزل مكون من 4 غرف نوم",
    booking_location: "غابات هيرافو",
  },
  fr: {
    booking_title: "Maison de 4 chambres",
    booking_location: "Bois d'Hirafu",
  },
};
const fakeTags = {
  en: {
    tag_title: "Vehicle Included",
    tag_subtitle: "Winter Only",
    tag_color: "primary",
  },
  ja: {
    tag_title: "車両を含む",
    tag_subtitle: "冬季限定",
    tag_color: "primary",
  },
  ar: {
    tag_title: "السيارة متضمنة",
    tag_subtitle: "الشتاء فقط",
    tag_color: "primary",
  },
  fr: {
    tag_title: "Véhicule inclus",
    tag_subtitle: "Hiver seulement",
    tag_color: "primary",
  },
};
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
        ...fakeContent[lang],
        distance: 1000,
        max_capacity: 10,
        tag: fakeTags[lang],
      };
    });
    return temp;
  });
  return res.status(200).json({ bookings });
}
