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
import { Controller, useFormContext } from "react-hook-form";
import { docTypes, KycData } from "./KycVerificationModal";
import { toast } from "sonner";
import { useSession } from "@/lib/hooks/useSession";
import { UseMutateFunction } from "@tanstack/react-query";
import { Upload, UploadResponse } from "@/lib/services/uploadImage.service";
import { Input } from "@/components/ui/input";

const PersonalInfo = ({
  upload,
  isUploading,
}: {
  upload: UseMutateFunction<UploadResponse, Error, Upload, unknown>;
  isUploading: boolean;
}) => {
  const { control, watch, setValue } = useFormContext<KycData>();
  const { session } = useSession();

  const isNIN = watch("personalDocumentType") === "NIN";

  const uploadDocument = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof KycData,
  ) => {
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
          const newAsset = { imageUrl: res.url, publicId: res.publicId };
          setValue(name, [newAsset]);
        },
      },
    );
  };

  return (
    <FieldGroup className="md:gap-6">
      <Controller
        name="fullName"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <FieldLabel
              htmlFor={field.name}
              className="form-label font-semibold! leading-5!"
            >
              Full Name
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Your name"
              className="form-input"
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} className="form-error" />
            )}
          </Field>
        )}
      />

      <Controller
        name="personalDocumentType"
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
                  placeholder={field.value || "NIN, Driver Lience, Passport"}
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
              <FieldError errors={[fieldState.error]} className="form-error" />
            )}
          </Field>
        )}
      />

      {isNIN && (
        <Controller
          name="ninNumber"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel
                htmlFor={field.name}
                className="form-label font-semibold! leading-5!"
              >
                NIN Number
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "" || /^\d+$/.test(v)) {
                    field.onChange(v);
                  }
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Add number"
                className="form-input"
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="form-error"
                />
              )}
            </Field>
          )}
        />
      )}

      <Controller
        name="document"
        control={control}
        render={({ fieldState }) => (
          <Field className="gap-1">
            <FieldLabel
              htmlFor="document-upload"
              className="py-6 justify-center text-base font-medium leading-6 text-center border border-[#D0D5DD] rounded-sm cursor-pointer"
            >
              <Input
                id="document-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={(e) => uploadDocument(e, "document")}
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

export default PersonalInfo;
