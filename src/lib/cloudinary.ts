// Pull config from environment variables (set in .env.local)
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

// The endpoint Cloudinary exposes for unsigned image uploads
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

/**
 * Shape of the response Cloudinary sends back after a successful upload.
 * (Trimmed down to the fields we actually use — Cloudinary returns more.)
 */
export interface CloudinaryUploadResult {
  secure_url: string; // the HTTPS URL of the uploaded image
  public_id: string; // Cloudinary's unique id for the asset (useful for deleting later)
  width: number;
  height: number;
  format: string;
}

/**
 * Uploads a single image File to Cloudinary using an UNSIGNED upload preset.
 * Returns the Cloudinary result (most importantly `secure_url`) on success.
 *
 * Throws an Error if config is missing or the upload fails, so callers
 * can catch it and show a toast/error message.
 */
export async function uploadImageToCloudinary(
  file: File,
): Promise<CloudinaryUploadResult> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary is not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local",
    );
  }

  // Cloudinary's unsigned upload endpoint expects multipart/form-data
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.error?.message || "Failed to upload image to Cloudinary",
    );
  }

  const data: CloudinaryUploadResult = await response.json();
  return data;
}
