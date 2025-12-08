import dbConnection from "../helpers/dbConnection.js";
import { bookingsSchema } from "../helpers/schemas.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed ..." });
  }
  const { start_date, end_date, adults, children, infants } = req.query;
  try {
    const connection = dbConnection();
    const max_pax = (Number(adults) + Number(children) + Number(infants)) || 0;
    const query = `
      SELECT p.id, p.images, p.blurred_images, p.max_pax, p.lifts_distance,p.size, p.beds, JSON_OBJECTAGG(pt.language_code, JSON_OBJECT('title', pt.title, 'type', pt.type)) as translations
      FROM property p INNER JOIN property_translations pt ON p.id = pt.property_id
      WHERE p.max_pax > ?
      GROUP BY p.id
    `;
    const [result] = await connection.query(query, [max_pax]);
    if (!result.length) {
      return res.status(404).json({ message: "Found No Bookings ..." });
    }
    const validProperties = result
      .map((property) => {
        return {
          ...property,
          price: Math.floor(Math.random() * 100 + 100) * 100,
        };
      })
      .filter((property) => bookingsSchema.safeParse(property).success);
    return res.status(200).json({ properties: validProperties });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
