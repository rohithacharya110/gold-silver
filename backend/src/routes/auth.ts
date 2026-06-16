import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

// An admin is considered "active" if seen within this window (ms).
const PRESENCE_WINDOW_MS = 90 * 1000;

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

    admin.set({ lastSeenAt: new Date() });
    await admin.save();

    return res.json({ token, admin: { username: admin.username } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Login failed" });
  }
});

// Keep the logged-in admin marked as active (called periodically by the client).
router.post("/heartbeat", requireAdmin, async (req, res) => {
  try {
    await Admin.findByIdAndUpdate(req.admin?.sub, { lastSeenAt: new Date() });
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Heartbeat failed" });
  }
});

// Mark the admin inactive immediately on logout.
router.post("/logout", requireAdmin, async (req, res) => {
  try {
    await Admin.findByIdAndUpdate(req.admin?.sub, { lastSeenAt: null });
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Logout failed" });
  }
});

// Public: is any admin currently active? Used to hide the Admin button.
router.get("/admin-active", async (_req, res) => {
  try {
    const threshold = new Date(Date.now() - PRESENCE_WINDOW_MS);
    const active = await Admin.exists({ lastSeenAt: { $gte: threshold } });
    return res.json({ active: Boolean(active) });
  } catch (e) {
    console.error(e);
    return res.json({ active: false });
  }
});

export default router;
