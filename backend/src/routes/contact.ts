import { Router } from "express";
import { ContactMessage } from "../models/ContactMessage.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/messages", requireAdmin, async (_req, res) => {
  try {
    const data = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    return res.json({ data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to load messages" });
  }
});

router.post("/", async (req, res) => {
  try {
    const name = String(req.body?.name ?? "").trim();
    const email = String(req.body?.email ?? "").trim();
    const message = String(req.body?.message ?? "").trim();

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    await ContactMessage.create({ name, email, message });
    return res.status(201).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Could not send message" });
  }
});

export default router;
