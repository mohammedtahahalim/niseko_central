import dbConnection from "../helpers/dbConnection.js";
import { propertySchema } from "../helpers/schemas.js";
import { z } from "zod";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed ..." });
  }
  const { id, title } = req.query;
  if (!id) return res.status(403).json({ message: "Bad Request ..." });
  try {
    const connection = dbConnection();
    const query = `
        SELECT p.*, JSON_OBJECTAGG(pt.language_code, JSON_OBJECT('title', pt.title, 'type', pt.type, 'description', pt.description, 'location', pt.location, 'amenities', pt.amenities)) as translations
        FROM property p 
            INNER JOIN property_translations pt ON p.id = pt.property_id
        WHERE p.id = ?
        GROUP BY p.id
    `;
    const [result] = await connection.query(query, [id]);
    if (!result.length) {
      return res.status(404).json({ message: "Property Not Found" });
    }
    const isValid = propertySchema.safeParse(result[0]);
    if (!isValid.success) {
      throw new Error(
        "Property Does not correspong valid format : ",
        isValid.error.issues.map((issue) => issue.message).join(", ")
      );
    }
    return res.status(200).json({ property: result[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
