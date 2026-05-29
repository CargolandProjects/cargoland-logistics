"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRequestPassword } from "@/lib/hooks/mutation/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const resetPasswordSchema = z.object({
  email: z
    .email("Enter a valid email address")
    .max(100, "email must be less than 100 characters long"),
});

export type resetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function ForgotPasswordPage() {
  const { mutate, isPending } = useRequestPassword();
  //   const { isChecking, isAuthenticated } = useProtectedRoute();

  const router = useRouter();

  const { control, handleSubmit } = useForm<resetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Block render until initial check completes
  //   if (isChecking) {
  //     return null;
  //   }

  const onSubmit = (data: resetPasswordData) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success(res.message);
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}&intent=${encodeURIComponent("reset-password")}`);
      },
      onError: (res) => {
        toast.error(res.message || "failed to send request");
      },
    });
  };

  return (
    <div className="margin-y padding-x px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded-lg max-w-[747px] mx-auto "
      >
        <FieldSet className="gap-0">
          <div className="flex flex-col items-center">
            <FieldTitle className="font-heading text-2xl font-bold leading-8 text-center">
              Reset Password
            </FieldTitle>
            <FieldLegend className="mt-2 font-roboto text-brand-gray text-base font-normal leading-6 text-center">
              You’ll receive a verification code shortly.
            </FieldLegend>
          </div>

          <FieldGroup className="mt-8 gap-6">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="form-label">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email Address"
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
          </FieldGroup>
        </FieldSet>

        <Button
          disabled={isPending}
          type="submit"
          className="mt-6 submit-button"
        >
          Next Step
        </Button>
      </form>
    </div>
  );
}
