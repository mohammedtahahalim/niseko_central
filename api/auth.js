import dotenv from "dotenv";
import { parse, serialize } from "cookie";
import jwt from "jsonwebtoken";

dotenv.config();

const secret_key = process.env.SECRET_KEY;

if (!secret_key) throw new Error("Secret Key for jwt is not set ...");

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed ..." });
  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.token;
    if (!token) {
      return res.status(200).json({
        isAuthenticated: false,
        redirectTo: "/login",
        currentUser: null,
      });
    }
    const isValidToken = jwt.verify(token, secret_key);
    if (!isValidToken) {
      res.setHeader(
        "Set-Cookie",
        serialize("token", "", {
          maxAge: 6 * 60 * 60,
          sameSite: "strict",
          httpOnly: true,
          secure: true,
          path: "/",
        })
      );
      return res.status(200).json({
        isAuthenticated: false,
        redirectTo: "/login",
        currentUser: null,
      });
    }
    const { id, permissions, name } = isValidToken;
    return res.status(200).json({
      isAuthenticated: true,
      redirectTo: "/",
      currentUser: { id, permissions, name },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error ..." });
  }
}
