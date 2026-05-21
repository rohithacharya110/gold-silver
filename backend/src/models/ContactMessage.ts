import mongoose, { Schema, type InferSchemaType } from "mongoose";

const contactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export type ContactMessageDoc = InferSchemaType<typeof contactSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ContactMessage =
  mongoose.models.ContactMessage ??
  mongoose.model<ContactMessageDoc>("ContactMessage", contactSchema);
