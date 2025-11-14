import dbConnection from "../helpers/dbConnection.js";

const sanitizeTitle = (title) => {
  return title.trim().replaceAll(/[^\w]+/g, "-");
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "method not allowed" });
  }
  let { id, title, limit } = req.query;
  title = sanitizeTitle(title || "");
  limit = Number(limit) || 4;
  const randomSet = new Set();
  if (!id) {
    while (randomSet.size < limit) {
      const randomNumber = Math.floor(Math.random() * 7) + 1;
      randomSet.add(randomNumber);
    }
  }
  try {
    const connection = dbConnection();
    const query = id
      ? "SELECT * FROM news WHERE id = ?"
      : `SELECT * FROM news WHERE id IN (${Array.from(
          {
            length: randomSet.size,
          },
          () => "?"
        ).join(", ")})`;
    const [result] = await connection.query(query, id ? [id] : [...randomSet]);
    if (!result.length) {
      return res.status(404).json({ message: "No News Found" });
    }
    const formatted_result = result.map((element) => ({
      ...element,
      article: JSON.parse(element.article),
    }));
    if (id && sanitizeTitle(formatted_result[0].article.en.title) !== title) {
      return res.status(404).json({ message: "No News Found" });
    }
    return res.status(200).json({ news: formatted_result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
