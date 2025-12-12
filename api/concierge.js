import dbConnection from "../helpers/dbConnection.js";
import { conciergeSchema, conciergeArticleSchema } from "../helpers/schemas.js";
import { sanitizeURL } from "../helpers/constants.js";

const langs = ["en", "ja", "ar", "fr"];

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Allowed ..." });
  try {
    const connection = dbConnection();
    let { category, id, title, ...rest } = req.query;
    if (Object.keys(rest).length)
      return res.status(400).json({ message: "Bad Request" });
    if (id) {
      if (isNaN(Number(id)))
        return res.status(400).json({ message: "Bad Request" });
      const query = `
        SELECT
          c.id,
          c.category,
          c.image,
          c.blur_image,
          JSON_OBJECTAGG(ct.lang_code, JSON_OBJECT('title', ct.title, 'subtitle', ct.subtitle, 'content', ct.content, 'prices', ct.prices)) as translations
        FROM concierge_articles c
        INNER JOIN concierge_articles_translations ct
          ON c.id = ct.concierge_article_id
        WHERE 
          c.id = ?
        GROUP BY
          c.id, 
          c.category, 
          c.image, 
          c.blur_image
      `;
      const [result] = await connection.query(query, [id]);
      if (!result.length)
        return res.status(404).json({ message: "No Article Found ..." });
      const { translations, ...rest } = result[0];
      const titles = langs.map((lang) => sanitizeURL(translations[lang].title));
      if (!titles.includes(sanitizeURL(title)))
        return res.status(400).json({ message: "id and title mismatch" });
      const article = { ...rest, ...translations };
      const isValidArticle = conciergeArticleSchema.safeParse(article).success;
      if (!isValidArticle)
        return res.status(404).json({ message: "No Article Found ..." });
      return res.status(200).json({ article });
    }
    if (category) {
      if (typeof category !== "string")
        return res.status(400).json({ message: "Bad Request" });
      const query = `
        SELECT
          c.id,
          c.category,
          c.image,
          c.blur_image,
          JSON_OBJECTAGG(ct.lang_code, JSON_OBJECT('title', ct.title)) as translations
        FROM concierge_articles c
        INNER JOIN concierge_articles_translations ct
          ON c.id = ct.concierge_article_id
        WHERE 
          c.category = ?
        GROUP BY
          c.id,
          c.category,
          c.image,
          c.blur_image
      `;
      const [rows] = await connection.query(query, [category.toLowerCase()]);
      if (!rows.length)
        return res.status(404).json({ message: "No Article Found ..." });
      const valid_rows = rows
        .map((row) => {
          const { translations, ...rest } = row;
          const article = { ...rest, ...translations };
          return article;
        })
        .filter((row) => conciergeSchema.safeParse(row).success);
      if (!valid_rows.length)
        return res.status(404).json({ message: "No Article Found ..." });
      return res.status(200).json({ article: valid_rows });
    }
    const query = `
      WITH CTE AS (
        SELECT 
          c.id as id,
          c.category as category,
          c.image as image,
          c.blur_image as blur_image,
          JSON_OBJECTAGG(ct.lang_code, JSON_OBJECT('title', ct.title)) as articles
        FROM concierge_articles c
        INNER JOIN concierge_articles_translations ct
          ON c.id = ct.concierge_article_id
        GROUP BY
          c.id,
          c.category,
          c.image,
          c.blur_image
      )
      SELECT 
        category,
        JSON_ARRAYAGG(JSON_OBJECT('id', id, 'image', image, 'blur_image', blur_image, 'articles', articles)) as articles
      FROM CTE
      GROUP BY
        category
    `;
    const [rows] = await connection.query(query);
    if (!rows.length)
      return res.status(404).json({ message: "No Article Found ..." });
    const valid_rows = rows.map((row) => {
      let { category, articles } = row;
      articles = articles
        .map((article) => {
          const { articles, ...rest } = article;
          return { ...rest, ...articles };
        })
        .filter(
          (article) =>
            conciergeSchema.omit({ category: true }).safeParse(article).success
        );
      return { category, articles };
    });
    return res.status(200).json({ article: valid_rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
