import emailjs from "@emailjs/nodejs";
import { generalSchema, accommodationSchema } from "../helpers/schemas.js";
import dotenv from "dotenv";

dotenv.config();

const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed..." });
  }
  try {
    const { type, data, ...rest } = req.body;

    // Reject Unknown Queries
    if (Object.keys(rest).length)
      return res.status(400).json({ message: "Bad Request ..." });

    // Only 'Accomodation' and 'General' Requests are allowed
    if (!["accommodation", "general"].includes(type)) {
      return res.status(400).json({ message: "Bad Request..." });
    }

    const isValidFormat =
      type === "accommodation"
        ? accommodationSchema.safeParse(data)
        : generalSchema.safeParse(data);
    if (!isValidFormat.success) {
      return res.status(400).json({
        message: isValidFormat.error.issues.map((i) => i.message).join(", "),
      });
    }

    const email_response = await emailjs.send(
      "service_gxs9l81",
      "template_p83yoeu",
      data,
      { publicKey: PUBLIC_KEY, privateKey: PRIVATE_KEY }
    );

    if (email_response.status !== 200) {
      return res.status(email_response.status).json({
        success: false,
        rejection_error: email_response.text,
      });
    }
    return res.status(200).json({
      success: true,
      rejection_error: "",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error..." });
  }
}
