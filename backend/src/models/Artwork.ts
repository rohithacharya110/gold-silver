import mongoose, { Schema, type InferSchemaType } from "mongoose";

export const MATERIALS = ["gold", "silver"] as const;
export const SOURCES = ["customer", "workshop"] as const;

export type Material = (typeof MATERIALS)[number];
export type Source = (typeof SOURCES)[number];

const artworkSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    imageUrl: { type: String, required: true },
    material: {
      type: String,
      enum: MATERIALS,
      required: true,
    },
    source: {
      type: String,
      enum: SOURCES,
      required: true,
    },
  },
  { timestamps: true }
);

artworkSchema.index({ material: 1, source: 1, createdAt: -1 });
artworkSchema.index({ title: 1 });

export type ArtworkDoc = InferSchemaType<typeof artworkSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const Artwork =
  mongoose.models.Artwork ?? mongoose.model<ArtworkDoc>("Artwork", artworkSchema);
