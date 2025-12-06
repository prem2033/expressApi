import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const router = express.Router();

const JWT_TOKEN = process.env.JWT_TOKEN;
const EXPIRES_IN = "5m";

export function generateToken(
  payload: Record<string, string | number>
): string {
  return jwt.sign(payload, JWT_TOKEN!, { expiresIn: EXPIRES_IN });
}

router.post("/auth/token", (req: Request, res: Response) => {
  try {
    const { id, username, secrets } = req.body;

    if (!id || !username || !secrets) {
      return res.status(400).json({ error: "id and username are required." });
    }

    const token = generateToken({ id, username });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Failed to generate token" });
  }
});

export default router;
