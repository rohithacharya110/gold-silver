import { Router } from "express";
import mongoose from "mongoose";
import { Artwork, MATERIALS, SOURCES, type Material, type Source } from "../models/Artwork.js";
import { requireAdmin } from "../middleware/auth.js";
import { uploadMemory } from "../middleware/upload.js";
import { uploadImageBuffer } from "../utils/uploadBuffer.js";

const router = Router();

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function errorDetail(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (e && typeof e === "object") {
    const obj = e as Record<string, unknown>;
    if (typeof obj.message === "string") return obj.message;
    try {
      return JSON.stringify(obj);
    } catch {
      return "Unknown error";
    }
  }
  return String(e);
}

router.get("/", async (req, res) => {
  try {
    const material = String(req.query.material ?? "").toLowerCase();
    const source = String(req.query.source ?? "").toLowerCase();
    const search = String(req.query.search ?? "").trim();
    const page = Math.max(1, parseInt(String(req.query.page ?? "1"), 10) || 1);
    const limit = Math.min(48, Math.max(1, parseInt(String(req.query.limit ?? "12"), 10) || 12));

    const filter: Record<string, unknown> = {};
    if (material && (MATERIALS as readonly string[]).includes(material)) {
      filter.material = material as Material;
    }
    if (source && (SOURCES as readonly string[]).includes(source)) {
      filter.source = source as Source;
    }
    if (search) {
      const rx = new RegExp(escapeRegex(search), "i");
      filter.$or = [{ title: rx }, { description: rx }];
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Artwork.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Artwork.countDocuments(filter),
    ]);

    return res.json({
      data: items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to load artworks" });
  }
});

router.get("/stats", requireAdmin, async (_req, res) => {
  try {
    const [
      total,
      gold,
      silver,
      customer,
      workshop,
    ] = await Promise.all([
      Artwork.countDocuments(),
      Artwork.countDocuments({ material: "gold" }),
      Artwork.countDocuments({ material: "silver" }),
      Artwork.countDocuments({ source: "customer" }),
      Artwork.countDocuments({ source: "workshop" }),
    ]);

    return res.json({ total, gold, silver, customer, workshop });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to load stats" });
  }
});

router.post("/", requireAdmin, uploadMemory.single("image"), async (req, res) => {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const title = String(req.body.title ?? "").trim();
    const description = String(req.body.description ?? "").trim();
    const material = String(req.body.material ?? "").toLowerCase() as Material;
    const source = String(req.body.source ?? "").toLowerCase() as Source;

    if (!title) return res.status(400).json({ error: "Title is required" });
    if (!(MATERIALS as readonly string[]).includes(material)) {
      return res.status(400).json({ error: "Invalid material" });
    }
    if (!(SOURCES as readonly string[]).includes(source)) {
      return res.status(400).json({ error: "Invalid source" });
    }

    const uploaded = await uploadImageBuffer(req.file.buffer);
    const doc = await Artwork.create({
      title,
      description,
      imageUrl: uploaded.secure_url,
      material,
      source,
    });

    return res.status(201).json(doc);
  } catch (e) {
    console.error("Create artwork failed:", e);
    return res.status(500).json({ error: `Failed to create artwork: ${errorDetail(e)}` });
  }
});

router.put("/:id", requireAdmin, uploadMemory.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const existing = await Artwork.findById(id);
    if (!existing) return res.status(404).json({ error: "Not found" });

    const title = req.body.title !== undefined ? String(req.body.title).trim() : existing.title;
    const description =
      req.body.description !== undefined
        ? String(req.body.description).trim()
        : existing.description;
    let material = (req.body.material !== undefined
      ? String(req.body.material).toLowerCase()
      : existing.material) as Material;
    let source = (req.body.source !== undefined
      ? String(req.body.source).toLowerCase()
      : existing.source) as Source;

    if (!(MATERIALS as readonly string[]).includes(material)) {
      return res.status(400).json({ error: "Invalid material" });
    }
    if (!(SOURCES as readonly string[]).includes(source)) {
      return res.status(400).json({ error: "Invalid source" });
    }

    let imageUrl = existing.imageUrl;
    if (req.file?.buffer) {
      const uploaded = await uploadImageBuffer(req.file.buffer);
      imageUrl = uploaded.secure_url;
    }

    existing.set({ title, description, material, source, imageUrl });
    await existing.save();

    return res.json(existing);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to update artwork" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const deleted = await Artwork.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Not found" });

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to delete artwork" });
  }
});

export default router;
