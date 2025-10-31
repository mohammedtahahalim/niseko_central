import dbConnection from "../helpers/dbConnection.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed ..." });
  }
  const { limit } = req.query;
  if (limit && isNaN(Number(limit))) {
    return res.status(403).json({ message: "Bad Request ..." });
  }
  try {
    const connection = dbConnection();
    const query = limit
      ? `
        SELECT p.*, 
        JSON_OBJECTAGG(pt.language_code, JSON_OBJECT(
            'title', pt.title,
            'type', pt.type,
            'description', pt.description,
            'location', pt.location,
            'amenities', pt.amenities
        )) AS translations
        FROM niseko_central.property p
        INNER JOIN niseko_central.property_translations pt ON p.id = pt.property_id
        WHERE p.id >= FLOOR(RAND() * (SELECT MAX(id) FROM niseko_central.property))
        GROUP BY p.id
        LIMIT ?
      `
      : `
        SELECT p.*, 
        JSON_OBJECTAGG(pt.language_code, JSON_OBJECT(
            'title', pt.title,
            'type', pt.type,
            'description', pt.description,
            'location', pt.location,
            'amenities', pt.amenities
        )) AS translations
        FROM niseko_central.property p
        INNER JOIN niseko_central.property_translations pt ON p.id = pt.property_id
        GROUP BY p.id
      `;
    const [result] = await (limit
      ? connection.query(query, [Number(limit)])
      : connection.query(query));
    if (!result.length) {
      return res.status(404).json({ message: "Found No Bookings ..." });
    }
    return res.status(200).json({
      properties: result.map((elem) => {
        const { translations, ...rest } = elem;
        return { ...rest, ...translations };
      }),
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
