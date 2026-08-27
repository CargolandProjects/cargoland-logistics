import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, UploadResponse } from "@/lib/services/uploadImage.service";
import { UseMutateFunction } from "@tanstack/react-query";
import { Controller, useFormContext } from "react-hook-form";
import { businessDocType, KycData } from "./KycVerificationModal";
import { useSession } from "@/lib/hooks/useSession";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const BusinessVerification = ({
  upload,
  isUploading,
}: {
  upload: UseMutateFunction<UploadResponse, Error, Upload, unknown>;
  isUploading: boolean;
}) => {
  const { control, setValue } = useFormContext<KycData>();
  const { session } = useSession();

  const uploadDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate file type and size
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please select a valid image (JPEG, PNG, WebP)");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    if (!session?.email) {
      toast.warning("user email needed to upload");
      return;
    }

    upload(
      { file, userEmail: session.email },
      {
        onSuccess: (res) => {
          setValue("b2bDocumentPublicUrl", res.publicId);
          setValue("b2bDocumentUrl", res.url);
        },
      },
    );
  };

  return (
    <FieldGroup className="md:gap-6">
      <Controller
        name="businessDocumentType"
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
                <SelectValue placeholder={field.value || "Business document"} />
              </SelectTrigger>

              <SelectContent position="popper">
                {businessDocType.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} className="form-error" />
            )}
          </Field>
        )}
      />

      <Controller
        name="b2bDocumentUrl"
        control={control}
        render={({ fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel
              htmlFor="document-upload"
              className="py-6 justify-center text-base font-medium leading-6 text-center border border-[#D0D5DD] rounded-sm cursor-pointer"
            >
              <Input
                id="document-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={(e) => uploadDocument(e)}
                className="hidden"
                disabled={isUploading}
              />
              Upload Document
            </FieldLabel>
            {fieldState.invalid && (
              <FieldError
                errors={[fieldState.error]}
                className="form-error mt-1"
              />
            )}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export default BusinessVerification;
