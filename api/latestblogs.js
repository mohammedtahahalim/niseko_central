export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "method not allowed" });
  }
  const fakeBlogsArr = [
    {
      title: "Your Guide to Vehicle Included Niseko Central Accommodations",
      image:
        "https://d1z517741srsht.cloudfront.net/blog/_1024xAUTO_crop_center-center_none/225288/Snow-road-winter.webp",
      date: "September 20, 2025",
    },
    {
      title: "Discover Nature on Two Wheels at Tokyu Grand Hirafu Bike Park!",
      image:
        "https://d1z517741srsht.cloudfront.net/general/_2560xAUTO_crop_center-center_none/337243/20250619_GrandHirafu_Mountain_Bike_Cart_DSC05374_Lores_72_2025-06-27-083048_jlji.webp",
      date: "June 27, 2025",
    },
    {
      title: "Why You Should Try Spring Rafting in Niseko",
      image:
        "https://d1z517741srsht.cloudfront.net/blog/_480xAUTO_crop_center-center_none/8941/rafting1.webp",
      date: "April 10, 2025",
    },
    {
      title:
        "Effortless Travel: Niseko Central’s Shuttle Service for a Smooth Arrival & Departure",
      image:
        "https://d1z517741srsht.cloudfront.net/blog/_1536xAUTO_crop_center-center_none/322236/NC-Toyota-HiAce.webp",
      date: "March 22, 2025",
    },
    {
      title:
        "Niseko Central 2025/26: Discover Insider Tips for Securing Your Ideal Accommodation at the Best Rates",
      image:
        "https://d1z517741srsht.cloudfront.net/blog/_1536xAUTO_crop_center-center_none/257806/Drone-Blue-Skies-Winter-Trees-01-11-18-2_2024-02-28-082708_ftbj.webp",
      date: "March 10, 2025",
    },
    {
      title: "Quick, Easy & Delicious: Snow Yakitori Bar",
      image:
        "https://d1z517741srsht.cloudfront.net/blog/_2560xAUTO_crop_center-center_none/311045/20241225_Ki_Christmas_ReindeerDSC03456_Lores_257.webp",
      date: "January 8, 2025",
    },
  ];
  return res.status(200).json({ blogs: fakeBlogsArr });
}
