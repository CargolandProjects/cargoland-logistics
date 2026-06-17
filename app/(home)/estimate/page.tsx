"use client";

import { boxChecked } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Country, CountryDropdown } from "@/components/ui/country-dropdown";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShipmentEstimate } from "@/lib/hooks/mutation/useMutateShipment";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const estimateSchema = z.object({
  weight: z
    .string("Weight is required")
    .min(0.1, "Weight must be at least 0.1 kg")
    .max(10000, "Weight cannot exceed 10000 kg")
    .regex(/^\d+(\.\d+)?$/, "Must be a valid number"),

  length: z
    .string("Length is required")
    .min(1, "Length must be at least 1 cm")
    .max(500, "Length cannot exceed 500 cm")
    .regex(/^\d+(\.\d+)?$/, "Must be a valid number"),

  breadth: z
    .string("Breadth is required ")
    .min(1, "Breadth must be at least 1 cm")
    .max(500, "Breadth cannot exceed 500 cm")
    .regex(/^\d+(\.\d+)?$/, "Must be a valid number"),

  height: z
    .string("Height is required ")
    .min(1, "Height must be at least 1 cm")
    .max(500, "Height cannot exceed 500 cm")
    .regex(/^\d+(\.\d+)?$/, "Must be a valid number"),

  deliveryType: z.string("Please select a package type"),
  deliveryMode: z.string("Please select a delivery type"),

  pickup: z.string("must provid a valid country"),
  pickupText: z.string("must provid a valid country"),
  destination: z.string("must provid a valid country"),
  destinationText: z.string("must provid a valid country"),
});

type EstimateData = z.infer<typeof estimateSchema>;

const deliveryType = ["Domestic", "International"];
const deliveryMode = ["Air Freight", "Road Freight", "Sea Freight"];

export default function EstimatePage() {
  const { mutate, isPending } = useShipmentEstimate();
  const { handleSubmit, control, setValue } = useForm<EstimateData>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      breadth: "",
      deliveryType: "",
      deliveryMode: "",
      destination: "",
      destinationText: "",
      height: "",
      length: "",
      pickup: "",
      pickupText: "",
      weight: "",
    },
  });
  const [estimate, setEstimate] = useState({
    open: false,
    data: {
      totalShipmentWeight: 0,
      estimatedPrice: 0,
    },
  });

  const onSubmit = (data: EstimateData) => {
    console.log("Estimate Data: ", data);

    const payload = {
      weight: Number(data.weight),
      length: Number(data.length),
      breadth: Number(data.breadth),
      height: Number(data.height),
    };

    mutate(payload, {
      onSuccess: (res) => {
        setEstimate((prev) => ({
          ...prev,
          open: true,
          data: res.data,
        }));
      },
    });
  };

  return (
    <div className="relative pt-16.5 ">
      <div className="bg-primary/8 absolute top-0 h-[449px] w-full" />
      <div className="padding-x">
        <div className="max-w-[758px] mx-auto relative">
          <h1 className="text-[32px] md:text-[60px] font-extrabold md:leading-[72px] text-center">
            Get Shipping Estimate
          </h1>
          <p className="text-lg font-light leading-6 md:leading-7 text-center mt-2 max-w-[682px]">
            Get an instant estimate for your shipment based on your cargo,
            destination, and preferred shipping method.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 md:mt-15 mb-10 md:mb-18.75 p-4 sm:p-6 md:px-25 md:py-20 bg-white rounded-[16px]">
            <FieldSet className="gap-0">
              <FieldTitle className="font-heading text-lg md:text-2xl font-semibold md:font-bold leading-8 ">
                Enter the following details
              </FieldTitle>

              <FieldGroup className="mt-6 gap-6">
                <Controller
                  name="deliveryType"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel htmlFor={field.name} className="form-label">
                        Select Delivery Type
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
                            placeholder={field.value || "Domestic deliveries"}
                          />
                        </SelectTrigger>

                        <SelectContent position="popper">
                          {deliveryType.map((type) => (
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
                  name="deliveryMode"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel htmlFor={field.name} className="form-label">
                        Select Delivery Mode
                      </FieldLabel>

                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          className="form-input !h-14 "
                        >
                          <SelectValue
                            placeholder={field.value || "Air Freight"}
                          />
                        </SelectTrigger>

                        <SelectContent position="popper">
                          {deliveryMode.map((type) => (
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

                {/* pickup zone */}
                <div>
                  <h2 className="form-label">Select Pickup Zone</h2>

                  <div className="flex gap-4.5 mt-1">
                    <Controller
                      name="pickup"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="min-w-20 md:min-w-[108px] flex-1"
                        >
                          <CountryDropdown
                            defaultValue={field.value}
                            onChange={(country) => {
                              field.onChange(country.alpha2);

                              setValue("pickupText", country.name);
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
                      name="pickupText"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="gap-1 self-end"
                        >
                          {/* <FieldLabel
                          htmlFor={field.name}
                          className="form-label"
                        ></FieldLabel> */}
                          <Input
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
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
                </div>

                {/* delivery zone */}
                <div>
                  <h2 className="form-label">Select Pickup Zone</h2>

                  <div className="flex gap-4.5 mt-1">
                    <Controller
                      name="destination"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="min-w-20 md:min-w-[108px] flex-1"
                        >
                          <CountryDropdown
                            defaultValue={field.value}
                            onChange={(country) => {
                              field.onChange(country.alpha2);
                              setValue("destinationText", country.name);
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
                      name="destinationText"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="gap-1 self-end"
                        >
                          {/* <FieldLabel
                          htmlFor={field.name}
                          className="form-label"
                        ></FieldLabel> */}
                          <Input
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
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
                </div>

                <Controller
                  name="weight"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel htmlFor={field.name} className="form-label">
                        Weight (kg)
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        type="number"
                        placeholder="Weight must be between 0.1kg - 10,000kg"
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
                {/* length, breadth and height */}
                <FieldSet>
                  <FieldLegend className="form-label text-sm!">
                    Dimensions
                  </FieldLegend>
                  <FieldGroup className="flex-row items-center gap-1 md:gap-2.5">
                    <Controller
                      name="length"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="gap-1"
                        >
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            type="number"
                            placeholder="Length (cm)"
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
                    <X className="size-5 shrink-0" />
                    <Controller
                      name="breadth"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="gap-1"
                        >
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            type="number"
                            placeholder="Breadth (cm)"
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
                    <X className="size-5 shrink-0" />
                    <Controller
                      name="height"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="gap-1"
                        >
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            type="number"
                            placeholder="Height (cm)"
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
              </FieldGroup>
            </FieldSet>

            <Button
              disabled={isPending}
              type="submit"
              className="mt-6 submit-button"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>

      <Dialog
        open={estimate.open}
        onOpenChange={(val) => setEstimate((prev) => ({ ...prev, open: val }))}
      >
        <DialogContent className="dialog min-h-0! flex flex-col items-center pt-15! pb-10!">
          <h2 className="text-2xl font-bold leading-8">
            Your Delivery Estimate
          </h2>
          <div className="mt-6 size-20 relative">
            <Image
              src={boxChecked}
              alt="box package checked icon"
              className="size-full object-cover"
              fill
            />
          </div>
          <div className="mt-4 flex flex-col items-center">
            <p className="text-center">Estimated delivery including VAT</p>
            <h3 className="mt-2 text-[32px] font-bold leading-10 text-center">
              ₦{Number(estimate.data.estimatedPrice).toLocaleString()}
            </h3>
            <p className="mt-4 font-light text-center text-neutral-400">
              Book by 09/03/2026 by 05:00 pm for a pick-up today
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-6 w-full">
            <Button className="submit-button">Continue Shipment</Button>
            <Button
              variant="outline"
              className="submit-button border-primary text-primary! hover:border-primary hover:text-primary"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
