import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useWatch } from "react-hook-form";
import z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeft, EyeOff } from "../icons";
import { Separator } from "../ui/separator";
import { Check, Eye } from "lucide-react";
import { useChangePassword } from "@/lib/hooks/mutation/useAuth";
import { toast } from "sonner";

interface UpdatePasswordProps {
  setShowMobile: (val: boolean) => void;
}

const signUpSchema = z
  .object({
    oldPassword: z
      .string()
      .max(100, "Password must be more than 100 characters long"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must not be more than 20 characters")
      .regex(
        /(?=.*[a-z])/,
        "Password must contain at least one lowercase letter",
      )
      .regex(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter",
      )
      .regex(/(?=.*\d)/, "Password must contain at least one number")
      .regex(
        /(?=.*[!@#$%^&*])/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((val) => val.confirmPassword === val.newPassword, {
    path: ["confirmPassword"],
    error: "password do not match",
  });

export type ChangePasswordData = z.infer<typeof signUpSchema>;

const UpdatePassword = ({ setShowMobile }: UpdatePasswordProps) => {
  const { mutate, isPending } = useChangePassword();
  const [isVisible, setIsVisible] = useState({
    oldPassword: false,
    createPassword: false,
    confirmPassword: false,
  });

  const { handleSubmit, control } = useForm<ChangePasswordData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({ control: control, name: "newPassword" }) || "";

  const passwordReq = {
    letterAndNumber: /(?=.*[a-z])/.test(password) && /(?=.*\d)/.test(password),
    characterCount: password.length >= 8 && password.length <= 20,
    specialCharacter: /(?=.*[!@#$%^&*])/.test(password),
  };

  const onSubmit = (data: ChangePasswordData) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success(res.message || "Password updated successfully");
      },
      onError: (res) => {
        toast.error(res.message || "Failed to update password");
      },
    });
  };

  return (
    <div className="bg-background-screen max-sm:px-4">
      <Button
        onClick={() => setShowMobile(false)}
        variant="ghost"
        type="button"
        className="sm:hidden gap-1 p-0 h-5 bg-transparent text-black hover:bg-transparent"
      >
        <ArrowLeft className="size-4" /> Back
      </Button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 pb-6 md:p-6 max-sm:mt-5 rounded-lg bg-white"
      >
        <FieldSet className="gap-0">
          <FieldTitle className="text-lg sm:text-base font-semibold sm:font-bold leading-7 sm:leading-6">
            Reset Password
          </FieldTitle>

          <Separator className="mt-2" />

          <FieldGroup className="mt-8 gap-6">
            <Controller
              name="oldPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="form-label">
                    Old Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      type={isVisible.oldPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Create Password"
                      className="form-input"
                    />
                    <button
                      onClick={() =>
                        setIsVisible((prev) => ({
                          ...prev,
                          oldPassword: !prev.oldPassword,
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
              name="newPassword"
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
          className="mt-12 sm:mt-6 submit-button"
        >
          Save Update
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
