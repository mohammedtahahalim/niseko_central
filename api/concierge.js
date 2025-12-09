import dbConnection from "../helpers/dbConnection.js";

export default async function handler(req, res) {
  const connection = await dbConnection();
  console.log(connection);
  const testQuery = "SELECT * FROM news";
  const [result] = await connection.query(testQuery);
  return res.status(200).json({ message: "ok..." });
}
