import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { connectDb } from "./config/db.js";
import { configureCloudinary } from "./config/cloudinary.js";
import authRoutes from "./routes/auth.js";
import artworkRoutes from "./routes/artworks.js";
import contactRoutes from "./routes/contact.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

const allowed = (process.env.CORS_ORIGIN ?? "http://localhost:3000")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function isPrivateDevOrigin(origin: string) {
  if (process.env.NODE_ENV === "production") return false;

  try {
    const { hostname, protocol } = new URL(origin);
    if (protocol !== "http:" && protocol !== "https:") return false;
    if (hostname === "localhost" || hostname === "127.0.0.1") return true;
    if (hostname.startsWith("192.168.")) return true;
    if (hostname.startsWith("10.")) return true;

    const parts = hostname.split(".").map(Number);
    return (
      parts.length === 4 &&
      parts[0] === 172 &&
      parts[1] >= 16 &&
      parts[1] <= 31
    );
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowed.includes(origin) || isPrivateDevOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/", authRoutes);
app.use("/artworks", artworkRoutes);
app.use("/contact", contactRoutes);

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "Image must be 8MB or smaller" });
      }
      return res.status(400).json({ error: err.message });
    }
    const message = err instanceof Error ? err.message : "Server error";
    if (message === "Only image uploads are allowed") {
      return res.status(400).json({ error: message });
    }
    return res.status(500).json({ error: "Server error" });
  }
);

async function start() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Missing MONGODB_URI");
    process.exit(1);
  }

  configureCloudinary();
  await connectDb(uri);

  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});
