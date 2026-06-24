"use client";

import { useState } from "react";
import Image from "next/image";
import { AlertCircle, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Field, FieldLabel } from "@/components/ui/field";
import { useUploadImage, useDeleteImage } from "@/lib/hooks/mutation/useImage";

export type ImageAsset = {
  url: string;
  publicId: string;
};

type FileItem = {
  id: string;
  file: File;
  status: "idle" | "uploading" | "error";
  error?: string;
};

const ALLOWED_IMAGE_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_IMAGES = 6;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const generateId = () => crypto.randomUUID?.() || Date.now().toString();

interface ImageUploadFieldProps {
  value: ImageAsset[]; // current image assets from form state
  onChange: (assets: ImageAsset[]) => void; // function to update form state
  email: string; // shipper email for upload
  disabled?: boolean;
}

export const ImageUploadField = ({
  value: imageAssets,
  onChange,
  email,
  disabled = false,
}: ImageUploadFieldProps) => {
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();
  const { mutate: deleteImage } = useDeleteImage();

  const [fileItems, setFileItems] = useState<FileItem[]>([]);
  const [deletingPublicIds, setDeletingPublicIds] = useState<Set<string>>(
    new Set(),
  );

  // ----- Upload (using mutate with callbacks) -----
  const uploadFile = (item: FileItem) => {
    if (!email) {
      setFileItems((prev) =>
        prev.map((f) =>
          f.id === item.id
            ? { ...f, status: "error", error: "Shipper email is missing" }
            : f,
        ),
      );
      toast.warning("Please fill in your email address in the previous step.");
      return;
    }

    setFileItems((prev) =>
      prev.map((f) => (f.id === item.id ? { ...f, status: "uploading" } : f)),
    );

    uploadImage(
      { file: item.file, userEmail: email },
      {
        onSuccess: (data) => {
          const newAsset: ImageAsset = {
            url: data.url,
            publicId: data.publicId,
          };
          // Add to form state
          onChange([...imageAssets, newAsset]);
          // Remove from local state
          setFileItems((prev) => prev.filter((f) => f.id !== item.id));
        },
        onError: (error) => {
          setFileItems((prev) =>
            prev.map((f) =>
              f.id === item.id
                ? { ...f, status: "error", error: error.message }
                : f,
            ),
          );
          toast.error(error.message || "Upload failed");
        },
      },
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (fileItems.length + imageAssets.length + files.length > MAX_IMAGES) {
      toast.warning(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const validFiles = files.filter((file) => {
      const isValidType = ALLOWED_IMAGE_FORMATS.includes(file.type);
      const isValidSize = file.size <= MAX_FILE_SIZE;
      if (!isValidType)
        toast.error(`${file.name} is not a supported image type.`);
      if (!isValidSize) toast.error(`${file.name} exceeds 10MB.`);
      return isValidType && isValidSize;
    });

    if (validFiles.length === 0) return;

    const newItems: FileItem[] = validFiles.map((file) => ({
      id: generateId(),
      file,
      status: "idle",
    }));

    setFileItems((prev) => [...prev, ...newItems]);
    newItems.forEach((item) => uploadFile(item));
  };

  // ----- Delete (mutate with callbacks) -----
  const handleDeleteImage = (asset: ImageAsset) => {
    if (deletingPublicIds.has(asset.publicId)) return;

    setDeletingPublicIds((prev) => new Set(prev).add(asset.publicId));

    deleteImage(asset.publicId, {
      onSuccess: () => {
        const updatedAssets = imageAssets.filter(
          (a) => a.publicId !== asset.publicId,
        );
        onChange(updatedAssets);
        toast.success("Image deleted");
      },
      onError: () => {
        toast.error("Failed to delete image");
      },
      onSettled: () => {
        setDeletingPublicIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(asset.publicId);
          return newSet;
        });
      },
    });
  };

  // ----- Render helpers -----
  const renderExistingImage = (asset: ImageAsset) => (
    <div key={asset.publicId} className="relative size-15 shrink-0">
      <Image
        src={asset.url}
        alt="uploaded"
        className="size-full object-cover rounded"
        width={60}
        height={60}
      />
      <button
        type="button"
        onClick={() => handleDeleteImage(asset)}
        disabled={deletingPublicIds.has(asset.publicId)}
        className="absolute -top-2 -right-2 size-5 flex justify-center items-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
      >
        {deletingPublicIds.has(asset.publicId) ? (
          <Loader2 className="size-3 animate-spin" />
        ) : (
          <X className="size-3 stroke-[2.5]" />
        )}
      </button>
    </div>
  );

  const renderLocalFileItem = (item: FileItem) => (
    <div
      key={item.id}
      className="relative size-15 shrink-0 bg-gray-100 rounded flex items-center justify-center"
    >
      {item.status === "uploading" ? (
        <Loader2 className="size-5 animate-spin text-primary" />
      ) : item.status === "error" ? (
        <div className="text-red-500 text-xs text-center">
          <AlertCircle className="size-4 mx-auto" />
          Error
        </div>
      ) : (
        <span className="text-gray-400 text-xs">Pending</span>
      )}
      <button
        type="button"
        onClick={() =>
          setFileItems((prev) => prev.filter((f) => f.id !== item.id))
        }
        className="absolute -top-2 -right-2 size-5 flex justify-center items-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
      >
        <X className="size-3 stroke-[2.5]" />
      </button>
    </div>
  );

  const isMaxReached = fileItems.length + imageAssets.length >= MAX_IMAGES;

  return (
    <Field className="gap-1">
      <FieldLabel htmlFor="image-upload" className="form-label grid">
        <p className="form-label">Upload Pictures of Item</p>
        <input
          id="image-upload"
          type="file"
          multiple
          disabled={isMaxReached || isUploading || disabled}
          onChange={handleFileChange}
          className="hidden"
          accept="image/jpeg,image/jpg,image/png,image/webp"
        />

        <div
          className="relative mt-1 p-6 flex flex-col justify-center items-center rounded-sm cursor-pointer border-2 border-dashed border-gray-300 hover:border-primary transition-colors"
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          <Upload className="size-9.5 text-gray-400" />
          <p className="mt-2 text-xs leading-4.5 text-gray-500 text-center">
            Click to upload or drag and drop
          </p>
          <p className="mt-1 text-xs leading-4.5 text-gray-400 text-center">
            JPG, PNG, WEBP (Max 10MB each, up to 6 images)
          </p>
          {!email && (
            <p className="mt-2 text-xs text-amber-600 flex items-center gap-1">
              <AlertCircle className="size-3" />
              Please fill in your email address in the previous step to enable
              upload.
            </p>
          )}
        </div>
      </FieldLabel>

      <div className="mt-5 flex flex-wrap gap-3">
        {imageAssets.map((asset) => renderExistingImage(asset))}
        {fileItems.map((item) => renderLocalFileItem(item))}
      </div>
      {isMaxReached && (
        <p className="text-sm text-amber-600">
          Maximum {MAX_IMAGES} images reached.
        </p>
      )}
    </Field>
  );
};
