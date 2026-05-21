import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDb } from "../config/db.js";
import { Admin } from "../models/Admin.js";

async function main() {
  const uri = process.env.MONGODB_URI;
  const username = process.env.SEED_ADMIN_USERNAME;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!uri || !username || !password) {
    console.error("Set MONGODB_URI, SEED_ADMIN_USERNAME, and SEED_ADMIN_PASSWORD in .env");
    process.exit(1);
  }

  await connectDb(uri);

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log("Admin already exists:", username);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.create({ username, passwordHash });
  console.log("Seeded admin:", username);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
