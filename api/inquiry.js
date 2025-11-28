import { generalSchema, accommodationSchema } from "../helpers/schemas.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed ..." });
  }
  try {
    const { type, data } = req.body;
    if (!data || !type || !["accommodation", "general"].includes(type)) {
      return res
        .status(400)
        .json({ message: "Type And Data Are Required ..." });
    }
    const isValidFormat =
      type === "accommodation"
        ? accommodationSchema.safeParse(data)
        : generalSchema.safeParse(data);
    if (!isValidFormat.success) {
      return res.status(400).json({
        message: isValidFormat.error.issues
          .map((issue) => issue.message)
          .join(", "),
      });
    }
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error..." });
  }
}
