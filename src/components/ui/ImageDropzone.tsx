"use client";

import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiUploadCloud, FiX, FiImage } from "react-icons/fi";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

interface ImageDropzoneProps {
  // Called with the Cloudinary secure_url + public_id once upload succeeds
  onUploaded: (url: string, publicId: string) => void;
  // Called when the user removes the selected image
  onRemove: () => void;
  // Currently selected image URL (if any) — lets the parent control/reset it
  imageUrl: string;
}

export default function ImageDropzone({
  onUploaded,
  onRemove,
  imageUrl,
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // Local preview shown immediately, before Cloudinary finishes uploading
  const [localPreview, setLocalPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** Core handler: validates the file, shows a preview, then uploads it. */
  const handleFile = useCallback(
    async (file: File) => {
      // Basic client-side validation
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file (JPG, PNG, WEBP...)");
        return;
      }
      const maxSizeMb = 10;
      if (file.size > maxSizeMb * 1024 * 1024) {
        toast.error(`Image must be smaller than ${maxSizeMb}MB`);
        return;
      }

      // Show an instant local preview while the real upload happens
      const objectUrl = URL.createObjectURL(file);
      setLocalPreview(objectUrl);

      setIsUploading(true);
      const uploadToastId = toast.loading("Uploading image...");

      try {
        const result = await uploadImageToCloudinary(file);
        toast.success("Image uploaded!", { id: uploadToastId });
        onUploaded(result.secure_url, result.public_id);
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        toast.error(
          err instanceof Error ? err.message : "Image upload failed",
          { id: uploadToastId },
        );
        // Roll back the local preview since the upload failed
        setLocalPreview("");
      } finally {
        setIsUploading(false);
      }
    },
    [onUploaded],
  );

  // --- Drag & drop event handlers ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  // --- Click-to-browse handler ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // reset input so selecting the same file again still fires onChange
    e.target.value = "";
  };

  const handleRemove = () => {
    setLocalPreview("");
    onRemove();
  };

  // Prefer the Cloudinary URL once available, otherwise fall back to local preview
  const previewToShow = imageUrl || localPreview;

  return (
    <div>
      {/* Hidden native file input, triggered by clicking the dropzone */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      {previewToShow ? (
        // ---- PREVIEW STATE ----
        <div className="relative group rounded-xl overflow-hidden border border-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewToShow}
            alt="Cover preview"
            className="w-full h-56 object-cover"
          />

          {isUploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-medium">
              Uploading...
            </div>
          )}

          {!isUploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5 shadow-sm transition-colors"
              aria-label="Remove image"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
      ) : (
        // ---- EMPTY / DRAGZONE STATE ----
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 h-56 rounded-xl border-2 border-dashed cursor-pointer transition-colors
            ${
              isDragging
                ? "border-emerald-500 bg-emerald-50"
                : "border-gray-300 bg-gray-50 hover:border-emerald-400 hover:bg-emerald-50/40"
            }`}
        >
          {isDragging ? (
            <FiUploadCloud className="text-emerald-500" size={28} />
          ) : (
            <FiImage className="text-gray-400" size={28} />
          )}
          <p className="text-sm text-gray-600">
            <span className="font-medium text-emerald-600">Drag and drop</span>{" "}
            or click to upload
          </p>
          <p className="text-xs text-gray-400">
            High resolution landscape images work best (16:9)
          </p>
        </div>
      )}
    </div>
  );
}
