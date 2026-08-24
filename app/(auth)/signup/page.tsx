"use client";

import { Building, BuildingFill, EyeOff, User } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Country, CountryDropdown } from "@/components/ui/country-dropdown";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PhoneInput, phoneSchema } from "@/components/ui/phone-input";
import { useSignUp } from "@/lib/hooks/mutation/useAuth";
import { useSession } from "@/lib/hooks/useSession";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const signUpSchema = z
  .object({
    role: z.enum(["USER", "B2B"]),
    firstName: z
      .string()
      .min(3, "First name must be at least 3 characters long")
      .max(100, "First name must be less than 100 characters long")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "First name can only contain letters, spaces, hyphens, and apostrophes",
      )
      .or(z.literal("")),
    lastName: z
      .string()
      .min(3, "Last name must be at least 3 characters long")
      .max(100, "Last name must be less than 100 characters long")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "last name can only contain letters, spaces, hyphens, and apostrophes",
      )
      .or(z.literal("")),
    companyName: z
      .string()
      .min(3, "Business name must be at least 3 characters long")
      .max(100, "Business name must be less than 100 characters long")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Business name can only contain letters, spaces, hyphens, and apostrophes",
      )
      .or(z.literal("")),
    email: z
      .email("Enter a valid email address")
      .max(100, "email must be less than 100 characters long"),

    country: z
      .string("must provide a valid country")
      .max(200, "country must be less than 100 characters long"),
    phoneNumber: phoneSchema,
    // z.string()
    //   .min(7, "Phone number is too short")
    //   .max(15, "Phone number is too long")
    //   .regex(/^\+?\d+$/, "Phone number must contain only digits")
    password: z
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
    termsAndCondition: z
      .boolean()
      .refine(
        (val) => val === true,
        "Please accept the terms and conditions to proceed",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  }) // Role-based requirements – new
  .superRefine((data, ctx) => {
    if (data.role === "USER") {
      if (!data.firstName?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "First name is required",
          path: ["firstName"],
        });
      }
      if (!data.lastName?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Last name is required",
          path: ["lastName"],
        });
      }
    } else if (data.role === "B2B") {
      if (!data.companyName?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company name is required",
          path: ["companyName"],
        });
      }
    }
  });

export type SignUpData = z.infer<typeof signUpSchema>;

export default function SignupPage() {
  const { mutate: signUp, isPending } = useSignUp();
  const [step, setStep] = useState<"ROLE" | "SIGNUP">("ROLE");
  const [role, setRole] = useState<"USER" | "B2B" | null>(null);
  const router = useRouter();
  const { isAuthenticated } = useSession();

  // const { isChecking, isAuthenticated } = useProtectedRoute();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isVisible, setIsVisible] = useState({
    createPassword: false,
    confirmPassword: false,
  });

  const { handleSubmit, control, setValue } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      country: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      termsAndCondition: false,
    },
  });

  // route user to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const password = useWatch({ control: control, name: "password" }) || "";

  const passwordReq = {
    letterAndNumber: /(?=.*[a-z])/.test(password) && /(?=.*\d)/.test(password),
    characterCount: password.length >= 8 && password.length <= 20,
    specialCharacter: /(?=.*[!@#$%^&*])/.test(password),
  };
  //   console.log("passwordRequirements: ", passwordReq);

  const onSubmit = (data: SignUpData) => {
    if (!selectedCountry?.name) return;
    // console.log("Form data submitted:", data);

    const payload = { ...data, role: data.role, country: selectedCountry.name };

    signUp(payload, {
      onSuccess: (res) => {
        toast.success("Signup successful!");
        router.push(
          `/verify-email?email=${encodeURIComponent(res.data.email)}`,
        );
      },
      onError: (res) => {
        toast.error(res.message || "Signup failed!");
      },
    });
  };

  const handleNext = () => {
    if (!role) {
      toast.error("Please select a role");
      return;
    }

    setStep("SIGNUP");
  };

  return (
    <div className="margin-y padding-x">
      {step === "ROLE" && (
        <div className="">
          <h1 className="text-xl font-semibold leading-6 text-center">
            Ready to ship? Let&apos;s begin.🌍
          </h1>
          <div className="mt-6 p-4 sm:p-10 max-w-[468px] mx-auto rounded-lg bg-white flex flex-col">
            <h2 className="text-base font-medium text-center">
              Which of these best describes you?
            </h2>

            {/* Select rolses buttons */}
            <div className="mt-6 flex max-sm:flex-col gap-3">
              <Button
                onClick={() => {
                  setRole("B2B");
                  setValue("role", "B2B");
                }}
                variant="ghost"
                className={`${role === "B2B" ? " text-primary bg-primary-light border-primary/30 hover:text-primary hover:bg-primary-light" : ""} p-4! h-auto flex-col gap-4 sm:gap-6 items-start border-gray-200/80`}
              >
                {role === "B2B" ? (
                  <BuildingFill className="size-6" />
                ) : (
                  <Building className="size-6" />
                )}
                <span className="font-montserrat">
                  Logistics business (B2B)
                </span>
              </Button>

              <Button
                onClick={() => {
                  setRole("USER");
                  setValue("role", "USER");
                }}
                variant="ghost"
                className={`${role === "USER" ? " text-primary bg-primary-light border-primary/30 hover:text-primary hover:bg-primary-light [&>svg]:fill-primary" : ""} p-4! h-auto flex-col gap-4 sm:gap-6 items-start border-gray-200/80`}
              >
                <User className="size-6" />

                <span className="font-montserrat">Individual / Personal</span>
              </Button>
            </div>

            {/* Roles descriptions */}
            {role === "B2B" && (
              <div className="mt-6 sm:mt-5 p-4 border border-slate-300 rounded-lg">
                <h4 className="text-xs font-medium leading-5">
                  Save up to 50% on shipping with a Cargoland Express Business
                  Account. Sign up today!
                </h4>

                <ul className="mt-2.5 space-y-3">
                  <li className="flex gap-2 items-center text-[10px] font-light leading-3.5">
                    <div className="size-1 rounded-full bg-primary" />
                    Preferential Business Shipping Rates{" "}
                  </li>
                  <li className="flex gap-2 items-center text-[10px] font-light leading-3.5">
                    <div className="size-1 rounded-full bg-primary" />
                    Flexible Delivery Options{" "}
                  </li>
                  <li className="flex gap-2 items-center text-[10px] font-light leading-3.5">
                    <div className="size-1 rounded-full bg-primary" />
                    Easy International Shipping{" "}
                  </li>
                  <li className="flex gap-2 items-center text-[10px] font-light leading-3.5">
                    <div className="size-1 rounded-full bg-primary" />
                    Trusted Advisor{" "}
                  </li>
                </ul>
              </div>
            )}

            {role === "USER" && (
              <div className="mt-6 sm:mt-5 p-4 border border-slate-300 rounded-lg">
                <h4 className="text-xs font-medium leading-5">
                  Individual / Personal
                </h4>

                <ul className="mt-2.5 space-y-3">
                  <li className="flex gap-2 items-center text-[10px] font-light leading-3.5">
                    <div className="size-1 rounded-full bg-primary" />
                    Sending items to friends and family.
                  </li>
                  <li className="flex gap-2 items-center text-[10px] font-light leading-3.5">
                    <div className="size-1 rounded-full bg-primary" />
                    Receiving items from international brands.{" "}
                  </li>
                  <li className="flex gap-2 items-center text-[10px] font-light leading-3.5">
                    <div className="size-1 rounded-full bg-primary" />
                    Accessing packaging items for deliveries.{" "}
                  </li>
                </ul>
              </div>
            )}

            <Button
              onClick={handleNext}
              className="mt-10 submit-button max-w-[248px] mx-auto"
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {step === "SIGNUP" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 md:p-6 bg-white rounded-lg max-w-[747px] mx-auto"
        >
          <FieldSet className="gap-0">
            <div className="flex flex-col items-center">
              <FieldTitle className="font-heading text-2xl font-bold leading-8 text-center">
                {role === "USER" && " Create Your CargoLand Account"}
                {role === "B2B" && "Get Started for Business"}
              </FieldTitle>
              <FieldLegend className="mt-2 font-roboto text-brand-gray text-base font-normal leading-6 text-center">
                {role === "USER"
                  ? "Sign up to start shipping smarter and track every delivery with ease."
                  : "Simplify your business shipping with one powerful platform."}
              </FieldLegend>
            </div>

            <FieldGroup className="mt-8 gap-6">
              <div className="grid grid-cols-2 gap-3 md:gap-4.5">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel htmlFor={field.name} className="form-label">
                        First Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="First Name"
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

                <Controller
                  name="lastName"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel htmlFor={field.name} className="form-label">
                        Last Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Last Name"
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
              </div>

              {role === "B2B" && (
                <div className="grid grid-cols-2 gap-3 md:gap-4.5">
                  <Controller
                    name="companyName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-1"
                      >
                        <FieldLabel htmlFor={field.name} className="form-label">
                          Company Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Company Name"
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
                </div>
              )}

              {role === "USER" && (
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
              )}

              <div className="flex gap-3 md:gap-4.5">
                <Controller
                  name="country"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="min-w-20 md:min-w-[108px] flex-1 gap-1"
                    >
                      <FieldLabel className="form-label">Country</FieldLabel>
                      <CountryDropdown
                        defaultValue={field.value}
                        onChange={(country) => {
                          field.onChange(country.alpha2);
                          setSelectedCountry(country);
                          setValue(
                            "phoneNumber",
                            country.countryCallingCodes[0],
                          );
                        }}
                        className="form-input gap-3"
                        slim
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

                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel htmlFor={field.name} className="form-label">
                        Phone Number
                      </FieldLabel>
                      <PhoneInput
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        defaultCountry={selectedCountry?.alpha2}
                        onCountryChange={(country) => {
                          if (!country) return;
                          setSelectedCountry(country as Country);
                          setValue("country", country?.alpha2);
                        }}
                        inline
                        aria-invalid={fieldState.invalid}
                        className="form-input border"
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
              </div>

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="form-label">
                      Create Password
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

          <Controller
            name="termsAndCondition"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-4 mt-6">
                  <FieldLabel
                    htmlFor={field.name}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Input
                      id={field.name}
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      aria-invalid={fieldState.invalid}
                      className="peer hidden"
                    />

                    <div className="size-4.5 border-2 shrink-0 border-slate-600/90 rounded-[2px] peer-checked:bg-primary peer-checked:border-primary peer-checked:[&>svg]:block flex items-center justify-center">
                      <svg
                        className="hidden text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </FieldLabel>
                  <FieldDescription className="text-slate-600/85 block">
                    By signing up, you agree to our
                    <Link
                      href="/terms-conditions"
                      className="text-primary underline-offset-[1.5px]! "
                    >
                      {" "}
                      Terms of Service{" "}
                    </Link>{" "}
                    and
                    <Link
                      href="/privacy-policy"
                      className="text-primary underline-offset-[1.5px]!"
                    >
                      {" "}
                      Privacy Policy,{" "}
                    </Link>
                    and consent to receive important shipping updates from
                    Cargoland Africa.
                  </FieldDescription>
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

          <Button
            disabled={isPending}
            type="submit"
            className="mt-6 submit-button"
          >
            Sign Up
          </Button>
        </form>
      )}
    </div>
  );
}
