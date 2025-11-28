import emailjs from "@emailjs/nodejs";
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
    const email_response = await emailjs.send(
      "service_gxs9l81",
      "template_p83yoeu",
      data,
      { publicKey: "LIsU78Pl67CFON2Rp", privateKey: "w1oo5G0zxLNgPuFoYLzZe" }
    );
    return res.status(200).json({
      success: email_response.status === 200,
      rejection_error: email_response.status !== 200 ? email_response.text : "",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error..." });
  }
}
