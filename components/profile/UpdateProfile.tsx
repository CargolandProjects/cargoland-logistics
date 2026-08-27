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
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AddImage, ArrowLeft } from "../icons";
import { useUpdateProfile } from "@/lib/hooks/mutation/useAuth";
import { toast } from "sonner";
import { useSession } from "@/lib/hooks/useSession";
import { countries } from "country-data-list";
import { Mode } from "../sharedPages/MyShipmentPageContent";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Camera, Check, Loader2 } from "lucide-react";
import { useUploadImage } from "@/lib/hooks/mutation/useImage";

interface ProfileUpdateFormProps {
  setShowMobile?: (open: boolean) => void;
  mode?: Mode;
}

const profileSchema = z
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
    email: z
      .email("Enter a valid email address")
      .max(100, "email must be less than 100 characters long")
      .or(z.literal("")),
    userProfileUrl: z.string().optional(),
    userProfilePubId: z.string().optional(),

    phoneNumber: phoneSchema,
    country: z.string("must provid a valid country").or(z.literal("")),
    companyName: z
      .string()
      .min(3, "First name must be at least 3 characters long")
      .max(100, "First name must be less than 100 characters long")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "First name can only contain letters, spaces, hyphens, and apostrophes",
      )
      .or(z.literal("")),
    businessAddress: z
      .string()
      .min(3, "Adress must be at least 5 characters long")
      .max(100, "Address must be less than 500 characters long")
      .or(z.literal("")),
  })
  .partial();

export type ProfileUpdateData = z.infer<typeof profileSchema>;

const UpdateProfile = ({
  setShowMobile,
  mode = "USER",
}: ProfileUpdateFormProps) => {
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: uploadImage, isPending: isUploadingAvatar } =
    useUploadImage();

  const { session, isAuthenticated } = useSession();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // ---------- Avatar upload state ----------
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { control, handleSubmit, setValue, setValues } =
    useForm<ProfileUpdateData>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        role: session?.role,
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        phoneNumber: "",
        businessAddress: "",
        companyName: "",
        userProfilePubId: "",
        userProfileUrl: "",
      },
    });

  // populate profile default values
  useEffect(() => {
    if (!isAuthenticated || !session) return;

    // console.log("Session: ", session);
    const baseValues = {
      email: session.email,
      country: session.country,
      phoneNumber: session.phoneNumber,
      firstName: session.firstName,
      lastName: session.lastName,
      ...(session.role === "B2B" && {
        companyName: session.companyName ?? "",
        businessAddress: session.businessAddress ?? "",
      }),
    };

    setValues(baseValues);

    const defaultCountry = countries.all.find(
      (country) => country.name === session.country,
    );
    if (!defaultCountry) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedCountry(defaultCountry);

    setValue("country", defaultCountry?.alpha2 || "");
  }, [isAuthenticated, session, setValue, setValues]);

  const onSubmit = (data: ProfileUpdateData) => {
    if (!selectedCountry) return;

    const payload = { ...data, country: selectedCountry?.name };
    updateProfile(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update user");
      },
    });
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
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

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    if (!session?.email) return;

    // Trigger upload
    uploadImage(
      { file: file, userEmail: session.email },
      {
        onSuccess: (res) => {
          updateProfile(
            {
              userProfileUrl: res.url,
              userProfilePubId: res.publicId,
            },
            {
              onSuccess: () => {
                toast.success("Profile image updated");
              },
              onSettled: () => {
                setAvatarPreview(null);
              },
            },
          );
        },
      },
    );

    // Reset input to allow re-uploading the same file
    event.target.value = "";
  };

  const initials = `${session?.firstName.charAt(0)} ${session?.lastName.charAt(0)}`;
  const avatarSrc = avatarPreview || session?.userProfileUrl || undefined;
  const isUploading = isUploadingAvatar || isUpdating;

  return (
    <div
      className={`bg-background-screen ${mode === "USER" ? "max-sm:px-4" : ""} `}
    >
      {setShowMobile && (
        <Button
          onClick={() => setShowMobile(false)}
          variant="ghost"
          type="button"
          className="sm:hidden gap-1 p-0 h-5 bg-transparent text-black hover:bg-transparent"
        >
          <ArrowLeft className="size-4" /> Back
        </Button>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 pb-6 md:p-6 max-sm:mt-5 rounded-lg bg-white"
      >
        <FieldSet className="gap-0">
          <FieldTitle className="text-lg sm:text-base font-semibold sm:font-bold leading-7 sm:leading-6">
            Profile
          </FieldTitle>

          <Separator className="mt-2" />

          {/* Profile Update */}
          {mode === "B2B" && (
            <div className="relative mt-8 flex items-center gap-4 md:gap-8">
              {/* Profile Image */}
              <Avatar className="size-20 md:size-30 border-2 border-gray-200">
                <AvatarImage
                  src={avatarSrc}
                  alt={session?.firstName}
                  className="size-full object-cover"
                />
                <AvatarFallback>{initials}</AvatarFallback>
                {/* Loading overlay (grayed out) */}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full" />
                )}

                <AvatarBadge className="size-8! flex items-center justify-center bg-[#1671D9]">
                  {isUploading ? (
                    <Loader2 className="size-5! animate-spin text-white" />
                  ) : (
                    <Check className="size-5.5!" />
                  )}
                </AvatarBadge>
              </Avatar>

              {/* Updaate Profile image section */}
              <label
                htmlFor="avatar-upload"
                className={`px-3 py-2 border-[1.5px] rounded-md border-primary ${isUploading ? "grayscale-45 cursor-default" : "cursor-pointer"} `}
              >
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />

                <div className="text-primary flex gap-2 items-center">
                  <AddImage className="size-5" />
                  <p className="">Change Photo</p>
                </div>
              </label>
            </div>
          )}

          <FieldGroup className="mt-8 gap-4 md:gap-6">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
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

              {mode === "B2B" && (
                <>
                  <Controller
                    name="companyName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-1"
                      >
                        <FieldLabel htmlFor={field.name} className="form-label">
                          Business Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Name"
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
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-1"
                      >
                        <FieldLabel htmlFor={field.name} className="form-label">
                          Email Address
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="email"
                          disabled
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
                </>
              )}
            </div>

            {mode === "USER" && (
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={field.name} className="form-label">
                      Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      disabled
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

            <div className="flex gap-2.5 md:gap-4.5">
              <Controller
                name="country"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="min-w-20 md:min-w-27 flex-1 gap-1"
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

            {mode === "B2B" && (
              <Controller
                name="businessAddress"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={field.name} className="form-label">
                      Business Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Address"
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
          </FieldGroup>
        </FieldSet>

        <Button
          disabled={isUpdating}
          type="submit"
          className={`${mode === "B2B" ? "max-w-62 mt-10" : "mt-12 sm:mt-6"} submit-button`}
        >
          Save Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
