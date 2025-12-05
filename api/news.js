import dbConnection from "../helpers/dbConnection.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "method not allowed" });
  }
  let { id, limit } = req.query;
  id = Number(id) || 0;
  limit = Number(limit) || 5;
  const randomSet = new Set();
  if (!id) {
    while (randomSet.size < limit) {
      const randomNumber = Math.floor(Math.random() * 7) + 1;
      randomSet.add(randomNumber);
    }
  }
  try {
    const connection = dbConnection();
    const query =
      id !== 0
        ? `SELECT 
          n.id,
          n.image,
          n.blur_image,
          JSON_OBJECTAGG(nt.lang_code, JSON_OBJECT('title', nt.title, 'content', nt.content)) AS article
        FROM news n
        LEFT JOIN news_translations nt 
          ON n.id = nt.news_id
        WHERE n.id = ?
        GROUP BY n.id, n.image, n.blur_image
        `
        : `SELECT 
          n.id,
          n.image,
          n.blur_image,
          JSON_OBJECTAGG(nt.lang_code, JSON_OBJECT('title', nt.title)) AS article
        FROM news n
        LEFT JOIN news_translations nt 
          ON n.id = nt.news_id
        WHERE n.id IN (${Array.from({ length: randomSet.size }, () => "?").join(
          ", "
        )})
        GROUP BY n.id, n.image, n.blur_image
        `;
    const [result] = await connection.query(query, id ? [id] : [...randomSet]);
    if (!result.length) {
      return res.status(404).json({ message: "No News Found" });
    }
    return res.status(200).json({ news: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
