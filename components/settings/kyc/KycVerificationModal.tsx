import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Separator } from "../../ui/separator";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitKyc } from "@/lib/hooks/mutation/useAuth";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { useUploadImage } from "@/lib/hooks/mutation/useImage";
import { useEffect, useState } from "react";
import KycStep from "./KycStep";
import PersonalInfo from "./PersonalInfo";
import BusinessVerification from "./BusinessVerification";

export const docTypes = [
  "NIN",
  "Driver License",
  "National Passport",
  "Voter's Card",
] as const;

export const businessDocType = ["CAC Document"] as const;

const kycSchema = z
  .object({
    personalDocumentType: z.enum(docTypes),
    businessDocumentType: z.enum(businessDocType),
    document: z
      .array(
        z.object({
          imageUrl: z.string(),
          publicId: z.string(),
        }),
      )
      .min(1, "Document image is required"),
    b2bDocumentUrl: z.string().min(1, "Document URL is required"),
    b2bDocumentPublicUrl: z.string(),
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(100, "Full name must be less than 100 characters"),
    ninNumber: z
      .string()
      .min(11, "NIN number must be at least 11 characters")
      .max(11, "NIN number must be less than 11 characters")
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.personalDocumentType === "NIN" && !data.ninNumber.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Nin number is required",
        path: ["ninNumber"],
      });
    }

    if (!data.b2bDocumentUrl.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Please upload your business document",
        path: ["b2bDocumentUrl"],
      });
    }

    if (!data.b2bDocumentPublicUrl.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Please upload your business document",
        path: ["b2bDocumentUrl"],
      });
    }
  });

export type KycData = z.infer<typeof kycSchema>;

const KycVerificationModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const { mutate: submitKyc, isPending: isSubmitting } = useSubmitKyc();
  const { mutate: upload, isPending: isUploading } = useUploadImage({
    showSuccess: true,
  });
  const [step, setStep] = useState(0);

  const form = useForm<KycData>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      personalDocumentType: undefined,
      document: [],
      fullName: "",
      ninNumber: "",
      b2bDocumentPublicUrl: "",
      b2bDocumentUrl: "",
      businessDocumentType: "CAC Document",
    },
  });

  // useEffect(() => {
  //   console.log("FORM ERRORS: ", form.formState.errors);
  // }, [form.formState.errors]);

  const kycFields = [
    ["personalDocumentType", "document", "fullName", "ninNumber"],
    ["b2bDocumentPublicUrl", "b2bDocumentUrl", "businessDocumentType"],
  ] as const;

  const handleNext = async () => {
    const isValid = await form.trigger(kycFields[step]);
    if (!isValid) {
      console.error("form errors", form.formState.errors);
      //   console.log("IsValid ? ", isValid);
      return;
    }

    setStep((step) => step + 1);
  };

  const onSubmit = (data: KycData) => {
    submitKyc(data, {
      onSuccess: (res) => {
        toast.success(res.message);
        setOpen(false);
        setStep(0)
        form.reset();
      },
      onError: (res) => {
        toast.error(res.message);
      },
    });
  };

  const kycStep = () => {
    switch (step) {
      case 0:
        return <PersonalInfo upload={upload} isUploading={isUploading} />;
      case 1:
        return (
          <BusinessVerification upload={upload} isUploading={isUploading} />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="py-10 px-4 sm:px-8 gap-0 sm:max-w-[520px]! rounded-[16px] h-[95vh]! overflow-auto hide-scrollbar">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-2xl font-bold leading-8">
            KYC Verification
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Please upload valid identification to verify your business
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-6" />

        <KycStep currentStep={step} setStep={setStep} />

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
            {kycStep()}

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

            {/* Action Buttons */}
            {step === 0 && (
              <Button
                onClick={handleNext}
                disabled={isUploading}
                type="button"
                className="mt-6 submit-button"
              >
                Next
              </Button>
            )}

            {step === 1 && (
              <Button
                disabled={isUploading || isSubmitting}
                type="submit"
                className="mt-6 submit-button"
              >
                Done
              </Button>
            )}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default KycVerificationModal;
