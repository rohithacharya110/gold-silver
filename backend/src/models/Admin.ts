import mongoose, { Schema, type InferSchemaType } from "mongoose";

const adminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export type AdminDoc = InferSchemaType<typeof adminSchema> & { _id: mongoose.Types.ObjectId };

export const Admin =
  mongoose.models.Admin ?? mongoose.model<AdminDoc>("Admin", adminSchema);
