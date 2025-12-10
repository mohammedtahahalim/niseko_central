import dbConnection from "../helpers/dbConnection.js";
import { blogSchema, blogsSchema } from "../helpers/schemas.js";

const MAX_LIMIT = 12;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "method not allowed" });
  }
  const connection = dbConnection();
  try {
    let { id, title, limit, page, ...rest } = req.query;
    if (Object.keys(rest).length)
      return res.status(400).json({ message: "Bad Request ..." });
    id = Number(id);
    if (!isNaN(id) && id) {
      const query = `
        SELECT b.id, 
          b.date, 
          b.image, 
          b.blur_image, 
          JSON_OBJECTAGG(bt.lang_code, JSON_OBJECT('title', bt.title, 'content', bt.content)) as blog_article
        FROM blogs b 
        INNER JOIN blogs_translations bt 
          ON b.id = bt.blog_id
        WHERE b.id = ?
        GROUP BY b.id, b.date, b.image, b.blur_image
      `;
      const [row] = await connection.query(query, [id]);
      if (!row.length)
        return res.status(404).json({ message: "No Blog Found ..." });
      const { blog_article, ...rest } = row[0];
      const article = { ...rest, ...blog_article };
      if (!blogSchema.safeParse(article).success)
        return res.status(404).json({ message: "No Article Found ..." });
      return res.status(200).json({ article });
    }
    if (page !== undefined && isNaN(Number(page)))
      return res.status(400).json({ message: "Bad Request ..." });
    page = page === undefined ? 1 : Math.max(1, Number(page));
    if (limit !== undefined && isNaN(Number(limit)))
      return res.status(400).json({ message: "Bad Request ..." });
    limit =
      limit === undefined ? MAX_LIMIT : Math.min(MAX_LIMIT, Number(limit));

    const query = `
        SELECT 
          b.id, 
          b.date,
          b.image, 
          b.blur_image, 
          JSON_OBJECTAGG(bt.lang_code, JSON_OBJECT('title', bt.title)) as blog_article
        FROM blogs b 
        INNER JOIN blogs_translations bt 
          ON b.id = bt.blog_id
        GROUP BY b.id, b.date, b.image, b.blur_image
        ORDER BY STR_TO_DATE(b.date, '%M %d, %Y') DESC
        LIMIT ?
        OFFSET ?
    `;
    const [rows] = await connection.query(query, [limit, page]);
    if (!rows.length)
      return res.status(404).json({ message: "No Blogs Found ..." });
    const blogs = rows
      .map((row) => {
        const { blog_article, ...rest } = row;
        return { ...rest, ...blog_article };
      })
      .filter((blog) => blogsSchema.safeParse(blog).success);

    return res.status(200).json({ blogs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error..." });
  } finally {
    await connection.end();
  }
}
