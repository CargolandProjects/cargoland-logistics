"use client";

import { EyeOff } from "@/components/icons";
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
import { useUpdatePassword } from "@/lib/hooks/mutation/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const createPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must not be more than 20 characters")
      .regex(
        /(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(/(?=.*\d)/, "Password must contain at least one number")
      .regex(
        /(?=.*[!@#$%^&*])/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type createPasswordData = z.infer<typeof createPasswordSchema>;

const CreatePasswordPageContent = () => {
  const { mutate, isPending } = useUpdatePassword();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [isVisible, setIsVisible] = useState({
    createPassword: false,
    confirmPassword: false,
  });

  const router = useRouter();

  const { control, handleSubmit } = useForm<createPasswordData>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({ control: control, name: "password" }) || "";

  const passwordReq = {
    letterAndNumber: /(?=.*[a-z])/.test(password) && /(?=.*\d)/.test(password),
    characterCount: password.length >= 8 && password.length <= 20,
    specialCharacter: /(?=.*[!@#$%^&*])/.test(password),
  };
  const onSubmit = (data: createPasswordData) => {
    if (!email) {
      toast.error("Email is required to update password");
      return;
    }
    const payload = { ...data, email };

    mutate(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        router.replace("/password-successful");
      },
      onError: (res) => {
        toast.error(res.message || "failed to send request");
      },
    });
  };

  return (
    <div className="margin-y padding-x flex justify-center my-[75px]">
      <div className="max-w-[747px] w-full p-6 bg-white rounded-lg">
        <button
          onClick={() => router.back()}
          className="flex gap-2 items-center"
        >
          <ArrowLeft className="size-4 " />
          <span>Back</span>
        </button>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg-white rounded-lg max-w-[747px] mx-auto "
        >
          <FieldSet className="gap-0">
            <div className="flex flex-col items-center">
              <FieldTitle className="font-heading text-2xl font-bold leading-8 text-center">
                Create Password
              </FieldTitle>
              <FieldLegend className="mt-2 font-roboto text-brand-gray text-base font-normal leading-6 text-center">
                Create a new password to regain access to your Cargoland
                account.
              </FieldLegend>
            </div>

            <FieldGroup className="mt-8 gap-6">
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="form-label">
                      New Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        type={isVisible.createPassword ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                        placeholder="Create Password"
                        className="form-input"
                      />
                      <button
                        onClick={() =>
                          setIsVisible((prev) => ({
                            ...prev,
                            createPassword: !prev.createPassword,
                          }))
                        }
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        {isVisible.createPassword ? (
                          <Eye className="size-6 text-slate-600/85" />
                        ) : (
                          <EyeOff className="size-6 text-slate-600/85" />
                        )}
                      </button>
                    </div>
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
                name="confirmPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="form-label">
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        type={isVisible.confirmPassword ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                        placeholder="Confirm Password"
                        className="form-input"
                      />
                      <button
                        onClick={() =>
                          setIsVisible((prev) => ({
                            ...prev,
                            confirmPassword: !prev.confirmPassword,
                          }))
                        }
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        {isVisible.confirmPassword ? (
                          <Eye className="size-6 text-slate-600/85" />
                        ) : (
                          <EyeOff className="size-6 text-slate-600/85" />
                        )}
                      </button>
                    </div>
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
          <div className="mt-6">
            <h3 className="font-roboto text-sm font-normal leading-5.25 uppercase text-slate-700 ">
              Requirements:
            </h3>

            <div className="flex flex-wrap gap-y-3 gap-x-4 max-w-[348px]">
              <div className="flex gap-2.5 items-center min-w-[148px]">
                <Check
                  className={`${
                    passwordReq.characterCount
                      ? "text-cargo-success"
                      : "text-brand-gray"
                  } size-4.5 `}
                />
                <p
                  className={`${
                    passwordReq.characterCount
                      ? "text-brand-black"
                      : "text-brand-gray"
                  }`}
                >
                  8 Characters (20 max)
                </p>
              </div>

              <div className="flex gap-2.5 items-center min-w-[148px]">
                <Check
                  className={`${
                    passwordReq.letterAndNumber
                      ? "text-cargo-success"
                      : "text-brand-gray"
                  } size-4.5 `}
                />
                <p
                  className={`${
                    passwordReq.letterAndNumber
                      ? "text-brand-black"
                      : "text-brand-gray"
                  }`}
                >
                  1 letter and 1 number
                </p>
              </div>

              <div className="flex gap-2.5 items-center min-w-[148px]">
                <Check
                  className={`${
                    passwordReq.specialCharacter
                      ? "text-cargo-success"
                      : "text-brand-gray"
                  } size-4.5 `}
                />
                <p
                  className={`${
                    passwordReq.specialCharacter
                      ? "text-brand-black"
                      : "text-brand-gray"
                  }`}
                >
                  1 special character (e.g #,*,%)
                </p>
              </div>
            </div>
          </div>

          <Button
            disabled={isPending}
            type="submit"
            className="mt-6 submit-button"
          >
            Create Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default function CreatePasswordPage() {
  return (
    <Suspense>
      <CreatePasswordPageContent />
    </Suspense>
  );
}
