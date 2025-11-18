import dbConnection from "../helpers/dbConnection.js";
import { articleSchema } from "../helpers/schemas.js";
import { sanitizeURL } from "../helpers/constants.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id, title } = req.query;
  const sanitizedTitle = title ? sanitizeURL(String(title)) : null;
  const numId = id ? Number(id) : NaN;

  try {
    const connection = await dbConnection();

    // Single article by ID
    if (!isNaN(numId)) {
      const [rows] = await connection.query(
        "SELECT * FROM concierge WHERE id = ?",
        [numId]
      );

      if (!rows.length) {
        return res.status(404).json({ message: "Article not found" });
      }

      const article = rows[0];

      if (sanitizedTitle && sanitizedTitle !== sanitizeURL(article.title)) {
        return res.status(400).json({ message: "Title slug mismatch" });
      }

      const { success, data } = articleSchema.safeParse(article);
      return res.status(200).json({ article: success ? data : null });
    }

    // All articles grouped by category
    const [rows] = await connection.query(`
      SELECT 
        category,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', id,
            'title', title,
            'subtitle', subtitle,
            'content', content,
            'image', main_image,
            'blur_image', blurred_image
          )
        ) AS deals
      FROM concierge
      GROUP BY category
    `);

    if (!rows.length) {
      return res.status(404).json({ message: "No articles found" });
    }

    // Validate each deal inside groups
    const validated = rows.map((group) => ({
      ...group,
      deals: JSON.parse(group.deals).filter(
        (deal) => articleSchema.safeParse(deal).success
      ),
    }));

    return res.status(200).json({ articles: validated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
