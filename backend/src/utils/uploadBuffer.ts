import type { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../config/cloudinary.js";

export function uploadImageBuffer(
  buffer: Buffer,
  folder = "gold-silver-workshop"
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => {
        if (err || !result) reject(err ?? new Error("Cloudinary upload failed"));
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}
