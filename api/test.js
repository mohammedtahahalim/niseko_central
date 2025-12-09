import mysql from "mysql2/promise";
import fs from "fs";

const handler = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "mysql-240ab229-taha-portfolio.e.aivencloud.com",
      user: "avnadmin",
      password: "AVNS_Rb3gc8NgG_Pu1YUv5Dt",
      port: 14157,
      database: "niseko_central",
    });
    console.log("Connected!");
    await connection.end();
  } catch (err) {
    console.error(err);
  }
};

handler();
