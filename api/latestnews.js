export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed ..." });
  }
  try {
    const limit = req.query;
    const newsLimit = typeof limit === "number" ? Math.min(limit, 6) : 6;
    const fakeNews = [
      {
        en: "Top Things to Do in Niseko Year-Round",
        fr: "Les meilleures activités à faire toute l'année à Niseko",
        ar: "أفضل الأنشطة التي يمكن القيام بها في نيسيكو على مدار السنة",
        ja: "ニセコで一年中楽しめること",
        image:
          "https://d1z517741srsht.cloudfront.net/accommodation/_1536xAUTO_crop_center-center_none/332395/20231201_NisekoCentral_YW601PH_LivingRoom_Winter_Lores_8.webp",
      },
      {
        en: "A Guide to Booking Ski Resorts in Hokkaido",
        fr: "Guide pour réserver des stations de ski à Hokkaido",
        ar: "دليل لحجز منتجعات التزلج في هوكايدو",
        ja: "北海道のスキーリゾート予約ガイド",
        image:
          "https://d1z517741srsht.cloudfront.net/blog/_1536xAUTO_crop_center-center_none/270844/20240516_Niseko_Flower_Nature_Stock_%E4%B8%89%E5%B3%B6_DSC9946_Lores_5.webp",
      },
      {
        en: "Exploring Sapporo: Where to Stay and What to Do",
        fr: "Explorer Sapporo : où séjourner et que faire",
        ar: "استكشاف سابورو: أين تقيم وماذا تفعل",
        ja: "札幌を探検：宿泊先と観光スポット",
        image:
          "https://d1z517741srsht.cloudfront.net/blog/_1536xAUTO_crop_center-center_none/322126/20231213_NisekoCentral_Konkurito_Yukibana_KONQ_Exterior_Winter_Lores_1.webp",
      },
      {
        en: "Luxury vs Budget: Accommodation Options in Niseko",
        fr: "Luxe vs Budget : options d'hébergement à Niseko",
        ar: "الفخامة مقابل الميزانية: خيارات الإقامة في نيسيكو",
        ja: "ニセコの高級宿と格安宿の比較",
        image:
          "https://d1z517741srsht.cloudfront.net/general/_1536xAUTO_crop_center-center_none/321963/20240119_NisekoCentral_ShuttleBus_Kisetsukan_Winter__DSC5291_Lores_1_2025-03-25-022640_kavw.webp",
      },
      {
        en: "Booking Tips for Hokkaido's Winter Season",
        fr: "Conseils de réservation pour la saison hivernale à Hokkaido",
        ar: "نصائح الحجز لموسم الشتاء في هوكايدو",
        ja: "北海道の冬の予約のコツ",
        image:
          "https://d1z517741srsht.cloudfront.net/general/_960xAUTO_crop_center-center_none/263812/20231227_GrandHirafu_OnSnowPhotos_Lores_5.webp",
      },
      {
        en: "Family-Friendly Hotels in Sapporo",
        fr: "Hôtels adaptés aux familles à Sapporo",
        ar: "فنادق مناسبة للعائلات في سابورو",
        ja: "札幌の家族向けホテル",
        image:
          "https://d1z517741srsht.cloudfront.net/accommodation/_1280xAUTO_crop_center-center_none/2067/yama-shizen-winter-exterior-2.webp",
      },
    ];
    const returnedNews = fakeNews.slice(0, newsLimit);

    return res.status(200).json({ latestNews: returnedNews });
  } catch (err) {
    return res.status(500).json({ message: "Internal" });
  }
}
