import z from "zod";
import { PhoneInput, phoneSchema } from "../ui/phone-input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "../ui/field";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country, CountryDropdown } from "../ui/country-dropdown";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "../icons";
import { useUpdateProfile } from "@/lib/hooks/mutation/useAuth";
import { toast } from "sonner";

interface ProfileUpdateFormProps {
  setShowMobile: (open: boolean) => void;
}

const profileSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters long")
    .max(100, "First name must be less than 100 characters long")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes"
    ),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters long")
    .max(100, "Last name must be less than 100 characters long")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "last name can only contain letters, spaces, hyphens, and apostrophes"
    ),
  email: z
    .email("Enter a valid email address")
    .max(100, "email must be less than 100 characters long"),

  country: z.string("must provid a valid country"),
  phoneNumber: phoneSchema,
});

export type ProfileUpdateData = z.infer<typeof profileSchema>;

const UpdateProfile = ({ setShowMobile }: ProfileUpdateFormProps) => {
  const { mutate, isPending } = useUpdateProfile();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const { control, handleSubmit, setValue } = useForm<ProfileUpdateData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data: ProfileUpdateData) => {
    console.log("Update Data: ", data);

    mutate(data, {
      onSuccess: (res) => {
        toast.success(res.message);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update user");
      },
    });
  };

  return (
    <div className="bg-background-screen max-sm:px-4">
      <Button
        onClick={() => setShowMobile(false)}
        type="button"
        className="sm:hidden gap-1 p-0 h-5 bg-transparent text-black"
      >
        <ArrowLeft className="size-4" /> Back
      </Button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 pb-6 md:p-6 max-sm:mt-5 rounded-lg bg-white"
      >
        <FieldSet className="gap-0">
          <FieldTitle className="font-heading text-lg sm:text-base font-semibold sm:font-bold leading-7 sm:leading-6">
            Profile
          </FieldTitle>

          <Separator className="mt-2" />

          <FieldGroup className="mt-8 gap-6">
            <div className="grid sm:grid-cols-2 gap-2.5 md:gap-4.5">
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

            <div className="flex gap-2.5 md:gap-4.5">
              <Controller
                name="country"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="min-w-20 md:min-w-27 flex-1"
                  >
                    <FieldLabel className="form-label">Country</FieldLabel>
                    <CountryDropdown
                      defaultValue={field.value}
                      onChange={(country) => {
                        field.onChange(country.alpha2);
                        setSelectedCountry(country);
                        setValue("phoneNumber", country.countryCallingCodes[0]);
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
          </FieldGroup>
        </FieldSet>

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

export default UpdateProfile;
