export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "method not allowed" });
  }
  const fakeBlogsArr = [
    {
      en: "Your Guide to Vehicle Included Niseko Central Accommodations",
      ja: "ニセコセントラルの車両付き宿泊施設ガイド",
      ar: "دليلك للإقامة في وسط نيسيكو المتضمنة مركبة",
      fr: "Votre guide des hébergements avec véhicule inclus à Niseko Central",
      image:
        "https://d1z517741srsht.cloudfront.net/blog/_1024xAUTO_crop_center-center_none/225288/Snow-road-winter.webp",
      date: "September 20, 2025",
    },
    {
      en: "Discover Nature on Two Wheels at Tokyu Grand Hirafu Bike Park!",
      ja: "東急グランヒラフバイクパークで自転車に乗って自然を満喫！",
      ar: "اكتشف الطبيعة على عجلتين في منتزه طوكيو جراند هيرافو للدراجات!",
      fr: "Découvrez la nature sur deux roues au Tokyu Grand Hirafu Bike Park !",
      image:
        "https://d1z517741srsht.cloudfront.net/general/_2560xAUTO_crop_center-center_none/337243/20250619_GrandHirafu_Mountain_Bike_Cart_DSC05374_Lores_72_2025-06-27-083048_jlji.webp",
      date: "June 27, 2025",
    },
    {
      en: "Why You Should Try Spring Rafting in Niseko",
      ja: "ニセコで春ラフティングに挑戦すべき理由",
      ar: "لماذا يجب عليك تجربة التجديف الربيعي في نيسيكو",
      fr: "Pourquoi essayer le rafting à Niseko",
      image:
        "https://d1z517741srsht.cloudfront.net/blog/_480xAUTO_crop_center-center_none/8941/rafting1.webp",
      date: "April 10, 2025",
    },
    {
      en: "Effortless Travel: Niseko Central’s Shuttle Service for a Smooth Arrival & Departure",
      ja: "快適な旅を：ニセコセントラルのシャトルサービスでスムーズな到着と出発を",
      ar: "سفر سهل: خدمة النقل المكوكية من نيسيكو سنترال لضمان وصول ومغادرة سلسة",
      fr: "Voyagez sans effort : le service de navette de Niseko Central pour une arrivée et un départ en douceur",
      image:
        "https://d1z517741srsht.cloudfront.net/blog/_1536xAUTO_crop_center-center_none/322236/NC-Toyota-HiAce.webp",
      date: "March 22, 2025",
    },
    {
      en: "Niseko Central 2025/26: Discover Insider Tips for Securing Your Ideal Accommodation at the Best Rates",
      ja: "ニセコセントラル 2025/26：最高の料金で理想の宿泊施設を確保するためのヒント",
      ar: "نيسيكو سنترال 2025/26: اكتشف نصائح الخبراء لتأمين إقامتك المثالية بأفضل الأسعار",
      fr: "Niseko Central 2025/26 : découvrez nos conseils pour trouver l'hébergement idéal au meilleur prix.",
      image:
        "https://d1z517741srsht.cloudfront.net/blog/_1536xAUTO_crop_center-center_none/257806/Drone-Blue-Skies-Winter-Trees-01-11-18-2_2024-02-28-082708_ftbj.webp",
      date: "March 10, 2025",
    },
    {
      en: "Quick, Easy & Delicious: Snow Yakitori Bar",
      ja: "早くて簡単、そして美味しい：スノー焼き鳥バー",
      ar: "سريع، سهل ولذيذ: بار سنو ياكيتوري",
      fr: "Rapide, facile et délicieux : barre de yakitori aux neiges",
      image:
        "https://d1z517741srsht.cloudfront.net/blog/_2560xAUTO_crop_center-center_none/311045/20241225_Ki_Christmas_ReindeerDSC03456_Lores_257.webp",
      date: "January 8, 2025",
    },
  ];
  return res.status(200).json({ blogs: fakeBlogsArr });
}
