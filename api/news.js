import dbConnection from "../helpers/dbConnection.js";

const MAX_LIMIT = 7;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "method not allowed" });
  }
  const connection = dbConnection();
  try {
    let { id, limit = MAX_LIMIT, ...rest } = req.query;
    // Reject Unknow Queries
    if (Object.keys(rest).length)
      return res.status(400).json({ message: "Bad Request ..." });

    // Fetch news by id
    id = Number(id);
    if (!isNaN(id) && id !== 0) {
      const query = `
      SELECT 
        n.id,
        n.image,
        n.blur_image,
        JSON_OBJECTAGG(nt.lang_code, JSON_OBJECT('title', nt.title, 'content', nt.content)) AS article
      FROM news n
      LEFT JOIN news_translations nt 
        ON n.id = nt.news_id
      WHERE n.id = ?
      GROUP BY n.id, n.image, n.blur_image
      `;
      const [result] = await connection.query(query, [id]);
      if (!result.length)
        return res.status(404).json({ message: "No News Found" });
      return res.status(200).message({ news: result });
    }

    // fetch news by limit
    limit = Number(limit);
    if (isNaN(limit)) {
      return res.status(400).json({ message: "Bad Request ..." });
    }
    limit = Math.min(limit, MAX_LIMIT);
    const query = `
    SELECT 
      n.id,
      n.image,
      n.blur_image,
      JSON_OBJECTAGG(nt.lang_code, JSON_OBJECT('title', nt.title)) AS article
    FROM news n
    LEFT JOIN news_translations nt 
      ON n.id = nt.news_id
    GROUP BY n.id, n.image, n.blur_image
    ORDER BY RAND()
    LIMIT ?
    `;
    const [result] = await connection.query(query, limit);
    if (!result.length) {
      return res.status(404).json({ message: "No News Found" });
    }
    return res.status(200).json({ news: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  } finally {
    await connection.end();
  }
}
