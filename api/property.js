import dbConnection from "../helpers/dbConnection.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed ..." });
  }
  const { id, title } = req.query;
  if (!id) return res.status(403).json({ message: "Bad Request ..." });
  try {
    const connection = dbConnection();
    const query = `
        SELECT p.*, JSON_OBJECTAGG(pt.language_code, JSON_OBJECT('title', pt.title, 'type', pt.type, 'description', pt.description, 'location', pt.location)) as translations
        FROM property p 
            INNER JOIN property_translations pt ON p.id = pt.property_id
        WHERE p.id = ?
        GROUP BY p.id
    `;
    const [result] = await connection.query(query, [id]);
    if (!result.length) {
      return res.status(404).json({ message: "Property Not Found" });
    }
    return res.status(200).json({ property: result[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
