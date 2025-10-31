import dbConnection from "../helpers/dbConnection.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed ..." });
  }
  let { limit } = req.query;
  if (limit && isNaN(Number(limit))) {
    return res.status(403).json({ message: "Bad Request ..." });
  }
  const randomDenom = Math.floor(Math.random() * Math.floor(limit / 3));
  try {
    const connection = dbConnection();
    const query = `
        SELECT p.id, p.images, p.max_pax, p.lifts_distance, JSON_OBJECTAGG(pt.language_code, JSON_OBJECT('title', pt.title, 'type', pt.type)) as translations
        FROM property p INNER JOIN property_translations pt ON p.id = pt.property_id
        GROUP BY p.id
        ORDER BY RAND()
        LIMIT ?
    `;
    const [result] = await connection.query(query, [Number(limit)]);
    if (!result.length) {
      return res.status(404).json({ message: "No Bookings Found ..." });
    }
    const filteredResults = result.map((property, idx) => {
      return {
        id: property.id,
        image: JSON.parse(property.images)[0],
        max_pax: property.max_pax,
        lifts_distance: property.lifts_distance,
        ...property.translations,
        tag: Math.floor(Math.random() * 3),
      };
    });
    return res.status(200).json({ properties: filteredResults });
  } catch (err) {
    console.log(err);
  }
}
