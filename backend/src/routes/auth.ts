import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const username = String(req.body?.username ?? "").trim();
    const password = String(req.body?.password ?? "");
    const secret = process.env.JWT_SECRET;

    if (!username || !password || !secret) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { sub: String(admin._id), role: "admin" as const },
      secret,
      { expiresIn: "7d" }
    );

    return res.json({ token, admin: { username: admin.username } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Login failed" });
  }
});

export default router;
