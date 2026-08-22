import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UploadCloud, X } from "lucide-react";
import { useUploadImage } from "@/lib/hooks/mutation/useImage";
import { useSubmitKyc } from "@/lib/hooks/mutation/useAuth";
import { useSession } from "@/lib/hooks/useSession";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Image from "next/image";

const docTypes = [
  "Business Registration Certificate",
  "NIN",
  "National Passport",
  "Voter's Card",
] as const;

const kycSchema = z.object({
  docType: z.enum(docTypes),
});

type KycData = z.infer<typeof kycSchema>;

const OldKycVModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();
  const { mutate: submitKyc, isPending: isSubmitting } = useSubmitKyc();
  const { session } = useSession();

  const { handleSubmit, control, watch } = useForm<KycData>({
    resolver: zodResolver(kycSchema),
    defaultValues: { docType: undefined },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedDocType = watch("docType");

  // Local file state (NOT uploaded yet)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // ----- Validate and store file -----
  const handleFileAccepted = (file: File) => {
    setFileError(null);

    // Validate type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setFileError("Please upload a JPG, PNG, or WebP image");
      return;
    }
    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size must be under 5MB");
      return;
    }

    // Clean up previous preview
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    // Set new file and preview
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !session?.email) return;

    handleFileAccepted(file);
    e.target.value = ""; // allow re-selecting same file
  };

  // ----- Drag & Drop -----
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // if (!disabled && !isUploading) {
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    handleFileAccepted(files[0]);
  };

  // ----- Remove selected file -----
  const removeFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileError(null);
  };

  const onSubmit = (data: KycData) => {
    if (!selectedFile) {
      toast.error("Please select a document to upload");
      return;
    }
    if (!session?.email) {
      toast.error("User session not found");
      return;
    }

    // Step 1: Upload the file
    uploadImage({ file: selectedFile, userEmail: session.email });
  };

  // ----- Cleanup on modal close -----
  useEffect(() => {
    if (!open) {
      // Revoke object URL to avoid memory leaks
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setSelectedFile(null);
      setPreviewUrl(null);
      setFileError(null);
      setIsDraggingOver(false);
    }
  }, [open, previewUrl]);

  // Whether we are in a loading state (uploading or submitting)
  const isLoading = isUploading || isSubmitting;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="py-10 px-8 gap-0 max-w-[520px]! rounded-[16px] h-[95vh]! overflow-auto hide-scrollbar">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-2xl font-bold leading-8">
            KYC Verification
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Please upload valid identification to verify your business
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-6" />

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <FieldGroup>
            <Controller
              name="docType"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor={field.name}
                    className="form-label font-semibold! leading-5!"
                  >
                    Document Type
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="form-input !h-14 relative"
                    >
                      <SelectValue
                        placeholder={field.value || "Select a document type"}
                      />
                    </SelectTrigger>

                    <SelectContent position="popper">
                      {docTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="form-error"
                    />
                  )}
                </Field>
              )}
            />

            <Field className="gap-0">
              <p className="form-label font-semibold! leading-5!">
                Upload Document
              </p>
              <FieldLabel
                htmlFor="image-upload"
                className="form-label grid gap-0"
              >
                <input
                  id="image-upload"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  disabled={isLoading || !!selectedFile}
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!selectedFile ? (
                  // --- Drop zone when no file selected ---
                  <div
                    className={`relative mt-1 p-6 flex flex-col justify-center items-center rounded-sm cursor-pointer border-2 border-dashed transition-colors ${
                      isDraggingOver
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 hover:border-primary"
                    } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {isLoading ? (
                      <Loader2 className="size-8 animate-spin text-primary" />
                    ) : (
                      <>
                        <div className="size-12 flex items-center justify-center rounded-full bg-gray-200">
                          <UploadCloud className="size-6 text-[#273583]" />
                        </div>
                        <p className="mt-2 md:mt-4 max-md:text-xs leading-4 text-gray-500 text-center">
                          <span className="font-bold leading-4 text-[#273583]">
                            Click to upload{" "}
                          </span>
                          or drag and drop
                        </p>
                        <p className="mt-1 text-xs leading-4.5 text-gray-400 text-center">
                          JPG, PNG, WEBP (max 5MB)
                        </p>
                        {fileError && (
                          <p className="mt-2 text-sm text-red-600">
                            {fileError}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  // --- File preview when selected ---
                  <div className="relative mt-1 p-2 md:p-4 flex items-center gap-2 md:gap-4 flex-wrap rounded-md border border-gray-300 bg-gray-50">
                    <div className="relative w-20 h-12.75">
                      <Image
                        src={previewUrl!}
                        alt="Document preview"
                        className="object-cover rounded-md border border-gray-200"
                        fill
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={removeFile}
                      disabled={isLoading}
                      className="text-gray-500 hover:text-red-600 rounded-full"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                )}
              </FieldLabel>
            </Field>
          </FieldGroup>

          {/* Requirements */}
          <div className="mt-6 p-4 border border-slate-300 rounded-md bg-gray-50">
            <h4 className="text-sm font-semibold leading-5">Requirements:</h4>

            <ul className="mt-3 space-y-2">
              <li className="flex gap-2 items-center text-[10px] font-light leading-3.5">
                <div className="size-1.5 rounded-full bg-primary" />
                Document must be valid, clear, and perfectly legible{" "}
              </li>
              <li className="flex gap-2 items-center text-[10px] font-light leading-3.5">
                <div className="size-1.5 rounded-full bg-primary" />
                File size must be under 5MB
              </li>
              <li className="flex gap-2 items-center text-[10px] font-light leading-3.5">
                <div className="size-1.5 rounded-full bg-primary" />
                Information must match your registered business details
                precisely{" "}
              </li>
            </ul>
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="mt-6 submit-button"
          >
            Done
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OldKycVModal;
