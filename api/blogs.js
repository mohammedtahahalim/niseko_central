import dbConnection from "../helpers/dbConnection.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "method not allowed" });
  }
  const { id, title } = req.query;
  try {
    const connection = dbConnection();
    const query = id
      ? "SELECT * FROM blogs WHERE id = ?"
      : `SELECT * FROM blogs ORDER BY RAND() LIMIT 4`;
    const [result] = await connection.query(query, id ? [id] : null);
    console.log(result);
    if (!result.length) {
      return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ blogs: result });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
