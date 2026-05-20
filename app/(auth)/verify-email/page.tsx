"use client";

import { ArrowLeft } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useResendOtp, useVerifyEmail } from "@/lib/hooks/mutation/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const otpSchema = z.object({
  verificationCode: z.string("Verification code is required"),
  // .min(6, `Verification code must 6 characters long`),
});

export type OtpData = z.infer<typeof otpSchema>;

export default function VerifyEmailPage() {
  const { mutate, isPending } = useVerifyEmail();
  const { mutate: resendOtp, isPending: isResendingOtp } = useResendOtp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const { handleSubmit, control } = useForm<OtpData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const otp = useWatch({ control: control, name: "verificationCode" });
  const isOtpComplete = otp.length === 6;

  const onSubmit = (data: OtpData) => {
    console.log("OTP Data: ", data);

    const payload = { ...data, email };

    mutate(payload, {
      onSuccess: () => router.replace("/account-successful"),
      onError: (res) => toast.error(res.message || "Email verified!"),
    });
  };

  const handleResendOtp = () => {
    if (!email) return;
    resendOtp(email, {
      onSuccess: () => {
        toast.success("OTP sent successfully!");
      },
      onError: () => toast.error("Failed to send OTP!"),
    });
  };

  return (
    <div className="mx-4 flex justify-center mt-[75px] mb-[123px]">
      <div className="max-w-[747px] w-full p-6 bg-white rounded-lg">
        <button onClick={() => router.back()} className="flex gap-2 items-center">
          <ArrowLeft className="size-4 " />
          <span>Back</span>
        </button>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 flex flex-col items-center"
        >
          <FieldSet>
            <div className="flex flex-col items-center">
              <FieldTitle className="font-heading text-2xl font-bold leading-8 text-center">
                Verify Your Email
              </FieldTitle>
              <FieldLegend className="mt-2 font-roboto text-brand-gray text-base font-normal leading-6 text-center max-w-[571px]">
                A verification code has been sent to your email address {email}.
                Please enter the OTP to verify your account.
              </FieldLegend>
            </div>

            <FieldGroup>
              <Controller
                name="verificationCode"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      {...field}
                    >
                      <InputOTPGroup className="gap-2 w-fit mx-auto">
                        <InputOTPSlot
                          index={0}
                          className="w-12 h-14 border border-[#D0D5DD] font-montserrat text-2xl font-medium leading-8 rounded-sm"
                        />
                        <InputOTPSlot
                          index={1}
                          className="w-12 h-14 border border-[#D0D5DD] font-montserrat text-2xl font-medium leading-8 rounded-sm"
                        />
                        <InputOTPSlot
                          index={2}
                          className="w-12 h-14 border border-[#D0D5DD] font-montserrat text-2xl font-medium leading-8 rounded-sm"
                        />
                        <InputOTPSlot
                          index={3}
                          className="w-12 h-14 border border-[#D0D5DD] font-montserrat text-2xl font-medium leading-8 rounded-sm"
                        />
                        <InputOTPSlot
                          index={4}
                          className="w-12 h-14 border border-[#D0D5DD] font-montserrat text-2xl font-medium leading-8 rounded-sm"
                        />
                        <InputOTPSlot
                          index={5}
                          className="w-12 h-14 border border-[#D0D5DD] font-montserrat text-2xl font-medium leading-8 rounded-sm"
                        />
                      </InputOTPGroup>
                    </InputOTP>

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="form-error"
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <Button
            onClick={handleResendOtp}
            disabled={isPending || isResendingOtp}
            type="button"
            variant="outline"
            className="mt-6 h-6.5 px-3! border-secondary text-secondary hover:text-secondary font-roboto text-xs font-normal leading-4.5 rounded-full"
          >
            Re-send code
          </Button>
          <Button
            disabled={!isOtpComplete || isPending}
            className="mt-6 submit-button"
          >
            Verify Email
          </Button>
        </form>
      </div>
    </div>
  );
}
