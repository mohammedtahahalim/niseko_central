import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool;

export default function dbConnection() {
  const { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_NAME } = process.env;
  if (!DB_HOST || !DB_USER || !DB_PASS || !DB_PORT || !DB_NAME)
    throw new Error("Missing DB Data From Environment Variables ...");
  if (!pool) {
    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      port: DB_PORT,
      database: DB_NAME,
      ssl: { rejectUnauthorized: false },
      connectTimeout: 10000,
      connectionLimit: 1000,
    });
  }
  return pool;
}
