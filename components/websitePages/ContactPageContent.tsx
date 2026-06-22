"use client";

import { Mail } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PhoneInput, phoneSchema } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const enquiryType = ["Local delivery", "International shipment"] as const;

const contactSchema = z.object({
  enquiryType: z.enum(enquiryType, {
    error: "Please select a package type",
  }),
  name: z
    .string()
    .min(3, "First name must be at least 3 characters long")
    .max(100, "First name must be less than 100 characters long")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes",
    ),
  email: z
    .email("Enter a valid email address")
    .max(100, "email must be less than 100 characters long"),
  phoneNumber: phoneSchema,
  message: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description is too long"),
  // .optional()
  // .or(z.literal(""))
});

export type ContactData = z.infer<typeof contactSchema>;

const ContactPageContent = () => {
  const { handleSubmit, control } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      enquiryType: undefined,
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });
  const onSubmit = (data: ContactData) => {
    console.log(data);
  };
  return (
    <div>
      <section className="padding-x bg-primary-light ">
        <div className="max-w-[386px] md:max-w-[880px] mx-auto max-md:py-15 pt-30 pb-[97px] ">
          <h1 className="text-2xl md:text-[60px] font-extrabold leading-8 md:leading-[72px] text-center">
            Contact Support
          </h1>
          <p className="mt-2 text-sm md:text-lg font-light leading-5.5 md:leading-7 max-w-[695px] mx-auto text-center">
            Our support team is always ready to assist you with any questions,
            concerns, or shipping needs anytime.
          </p>
        </div>
      </section>

      <div className="padding-x py-10 md:py-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg max-w-[864px] mx-auto bg-white"
        >
          <FieldSet className="gap-6">
            <div className="grid sm:grid-cols-2 gap-2.5 md:gap-4.5">
              <Controller
                name="enquiryType"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={field.name} className="form-label">
                      Select inquiry type
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
                          placeholder={field.value || "Local deliveries"}
                        />
                      </SelectTrigger>

                      <SelectContent position="popper">
                        {enquiryType.map((type) => (
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
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={field.name} className="form-label">
                      Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Your Name"
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

            <div className="grid sm:grid-cols-2 gap-2.5 md:gap-4.5">
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
                      placeholder="Your Email"
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
              name="message"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor={field.name} className="form-label">
                    Message
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    maxLength={500}
                    placeholder="Write us what you are really concern about..."
                    className="form-input h-[204px]! font-roboto"
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
          </FieldSet>

          <Button
            // disabled={isPending}
            type="submit"
            className="mt-12 sm:mt-6 submit-button"
          >
            Submit
          </Button>
        </form>
      </div>

      <div className="padding-x py-10 md:py-25">
        <div className="grid md:grid-cols-2 gap-6 max-w-[802px] mx-auto">
          <div className="px-4.5 py-6 space-y-2 bg-primary/10 rounded-lg">
            <div className="size-10 flex items-center justify-center bg-primary rounded-full">
              <Mail className="size-5 text-white" />
            </div>
            <h2 className="text-2xl font-semibold leading-8">
              Send us an Email
            </h2>
            <p className="text-base font-light leading-6">
              We&apos;re here to help
            </p>

            <a
              href="mailto:info@cargoland.africa"
              className="text-base font-normal leading-6 text-primary"
            >
              info@cargoland.africa
            </a>
          </div>

          <div className="px-4.5 py-6 space-y-2 bg-primary/10 rounded-lg">
            <div className="size-10 flex items-center justify-center bg-primary rounded-full">
              <Mail className="size-5 text-white" />
            </div>
            <h2 className="text-2xl font-semibold leading-8">
              Send us an Email
            </h2>
            <p className="text-base font-light leading-6">
              We&apos;re here to help
            </p>

            <a
              href="mailto:info@cargoland.africa"
              className="text-base font-normal leading-6 text-primary"
            >
              info@cargoland.africa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPageContent;
