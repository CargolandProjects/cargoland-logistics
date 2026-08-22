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

import { useSubmitKyc } from "@/lib/hooks/mutation/useAuth";
import { useSession } from "@/lib/hooks/useSession";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ImageUploadField } from "../shipments/shipmentForm/ImageUploadField";

const docTypes = [
  "Business Registration Certificate",
  "NIN",
  "National Passport",
  "Voter's Card",
] as const;

const kycSchema = z.object({
  docType: z.enum(docTypes),
  document: z.array(
    z.object({
      imageUrl: z.string().url(),
      publicId: z.string(),
    }),
  ),
});

type KycData = z.infer<typeof kycSchema>;

const KycVerificationModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const { mutate: submitKyc, isPending: isSubmitting } = useSubmitKyc();
  const { session } = useSession();

  const { handleSubmit, control, setValue, reset } = useForm<KycData>({
    resolver: zodResolver(kycSchema),
    defaultValues: { docType: undefined },
  });

  const onSubmit = (data: KycData) => {
    submitKyc(
      { documentType: data.docType, document: data.document },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          setOpen(false);
          reset();
        },
        onError: (res) => {
          toast.error(res.message);
        },
      },
    );
  };

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
            <Controller
              name="document"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <ImageUploadField
                    value={field.value || []}
                    onChange={(assets) =>
                      setValue("document", assets, { shouldValidate: false })
                    }
                    mode="B2B"
                    email={session?.email || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="form-error mt-1"
                    />
                  )}
                </div>
              )}
            />
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
            disabled={isSubmitting}
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

export default KycVerificationModal;
