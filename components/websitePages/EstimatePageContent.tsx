"use client";

import { boxChecked } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Country, CountryDropdown } from "@/components/ui/country-dropdown";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import z from "zod";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { nigeriaStates } from "@/lib/utils/countryOptions";

const deliveryType = ["DOMESTIC", "INTERNATIONAL"] as const;
const freightType = ["AIR_FREIGHT", "OCEAN_FREIGHT", "ROAD_FREIGHT"] as const;

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

  shipmentType: z.enum(deliveryType, "Please select a delivery type"),
  freightType: z.enum(freightType, "Please select a freight type"),

  fromCountry: z
    .string("must provid a valid country")
    .min(2, "pickup zone is required"),

  fromCountryText: z
    .string("must provid a valid country")
    .min(2, "Country of origin is required")
    .optional()
    .or(z.literal("")),

  toCountry: z
    .string("must provid a valid country")
    .min(2, "drop-off zone is required"),

  toCountryText: z
    .string("must provid a valid country")
    .min(2, "Destination Country is required")
    .optional()
    .or(z.literal("")),
});

type EstimateData = z.infer<typeof estimateSchema>;

const EstimatePageContent = () => {
  const { mutate, isPending, data } = useShipmentEstimate();
  const router = useRouter();
  const { handleSubmit, control, setValue } = useForm<EstimateData>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      shipmentType: "INTERNATIONAL",
      freightType: undefined,
      fromCountry: "",
      fromCountryText: "",
      toCountry: "",
      toCountryText: "",
      height: "",
      length: "",
      breadth: "",
      weight: "",
    },
  });
  const [fromCountry, setFromCountry] = useState<Country | null>(null);
  const [toCountry, setToCountry] = useState<Country | null>(null);
  const [open, setOpen] = useState(false);

  const shipmentType = useWatch({ control, name: "shipmentType" });

  const estimate = data?.data;

  useEffect(() => {
    if (shipmentType !== "DOMESTIC") return;

    setValue("fromCountry", "");
    setValue("fromCountryText", "");
    setValue("toCountry", "");
    setValue("toCountryText", "");
  }, [setValue, shipmentType]);

  const onSubmit = (data: EstimateData) => {
    console.log("Estimate Data: ", data);

    const payload = {
      shipmentType: data.shipmentType,
      fromCountry:
        shipmentType === "DOMESTIC" ? data.fromCountry : fromCountry?.name,
      toCountry: shipmentType === "DOMESTIC" ? data.toCountry : toCountry?.name,
      freightType: data.freightType,
      weight: Number(data.weight),
      length: Number(data.length),
      breadth: Number(data.breadth),
      height: Number(data.height),
    };

    mutate(payload, {
      onSuccess: () => {
        setOpen(true);
      },
    });
  };

  return (
    <div className="relative pt-16.5 ">
      {/* backgound color */}
      <div className="bg-primary/8 absolute top-0 h-[449px] w-full" />
      <section className="padding-x">
        <div className="max-w-[758px] mx-auto relative">
          <h1 className="text-2xl md:text-[60px] font-extrabold leading-8 md:leading-[72px] text-center">
            Get Shipping Estimate
          </h1>
          <p className="mt-2 text-sm md:text-lg font-light leading-5.5 md:leading-7 max-w-[695px] mx-auto text-center">
            Get an instant estimate for your shipment based on your cargo,
            destination, and preferred shipping method.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 md:mt-15 mb-10 md:mb-18.75 p-4 sm:p-6 md:px-25 md:py-20 bg-white rounded-[16px]"
          >
            <FieldSet className="gap-0">
              <FieldTitle className="font-heading text-lg md:text-2xl font-semibold md:font-bold leading-8 ">
                Enter the following details
              </FieldTitle>

              <FieldGroup className="mt-6 gap-6">
                <Controller
                  name="shipmentType"
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
                          className="form-input h-14! capitalize"
                        >
                          <SelectValue
                            placeholder={field.value || "Domestic deliveries"}
                          />
                        </SelectTrigger>

                        <SelectContent position="popper">
                          {deliveryType.map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              className="capitalize!"
                            >
                              {type.toLowerCase()}
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
                  name="freightType"
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
                          className="form-input h-14! capitalize"
                        >
                          <SelectValue
                            placeholder={field.value || "Air Freight"}
                          />
                        </SelectTrigger>

                        <SelectContent position="popper">
                          {freightType.map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              className="capitalize"
                            >
                              {type.replace("_", " ").toLowerCase()}
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
                  {shipmentType === "INTERNATIONAL" && (
                    <h2 className="form-label">Select Pickup Zone</h2>
                  )}

                  {shipmentType === "INTERNATIONAL" ? (
                    <div className="flex gap-4.5 mt-1">
                      <Controller
                        name="fromCountry"
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
                                setFromCountry(country);
                                setValue("fromCountryText", country.name);
                              }}
                              className="form-input gap-3 max-md:px-3!"
                              slim
                            />
                          </Field>
                        )}
                      />

                      <Controller
                        name="fromCountryText"
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
                              readOnly
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
                  ) : (
                    <Controller
                      name="fromCountry"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="gap-1"
                        >
                          <FieldLabel
                            htmlFor={field.name}
                            className="form-label"
                          >
                            Select Pickup Zone
                          </FieldLabel>

                          <Combobox
                            items={nigeriaStates}
                            value={field.value}
                            // defaultValue="Destination"
                            onValueChange={field.onChange}
                            aria-invalid={fieldState.invalid}
                          >
                            <ComboboxInput className="form-input text-brand-black" />

                            <ComboboxContent>
                              <ComboboxEmpty>No country found</ComboboxEmpty>
                              <ComboboxList>
                                {(from) => (
                                  <ComboboxItem
                                    key={from.value}
                                    value={from.label}
                                    className="font-roboto"
                                  >
                                    {from.label}
                                  </ComboboxItem>
                                )}
                              </ComboboxList>
                            </ComboboxContent>
                          </Combobox>

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
                </div>

                {/* drop off zone */}
                <div>
                  {shipmentType === "INTERNATIONAL" && (
                    <h2 className="form-label">Select Drop-off Zone</h2>
                  )}

                  {shipmentType === "INTERNATIONAL" ? (
                    <div className="flex gap-4.5 mt-1">
                      <Controller
                        name="toCountry"
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
                                setToCountry(country);
                                setValue("toCountryText", country.name);
                              }}
                              className="form-input gap-3 max-md:px-3!"
                              slim
                            />
                          </Field>
                        )}
                      />

                      <Controller
                        name="toCountryText"
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
                              readOnly
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
                  ) : (
                    <Controller
                      name="toCountry"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="gap-1"
                        >
                          <FieldLabel
                            htmlFor={field.name}
                            className="form-label"
                          >
                            Select Drop-off Zone
                          </FieldLabel>

                          <Combobox
                            items={nigeriaStates}
                            value={field.value}
                            // defaultValue="Destination"
                            onValueChange={field.onChange}
                            aria-invalid={fieldState.invalid}
                          >
                            <ComboboxInput className="form-input text-brand-black" />

                            <ComboboxContent>
                              <ComboboxEmpty>No country found</ComboboxEmpty>
                              <ComboboxList>
                                {(from) => (
                                  <ComboboxItem
                                    key={from.value}
                                    value={from.label}
                                    className="font-roboto"
                                  >
                                    {from.label}
                                  </ComboboxItem>
                                )}
                              </ComboboxList>
                            </ComboboxContent>
                          </Combobox>

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
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dialog min-h-0! flex flex-col items-center pt-15! pb-10! overflow-auto!">
          <h2 className="text-2xl font-bold leading-8 text-center">
            Your Delivery Estimate
          </h2>
          <div className="mt-6 size-20 relative shrink-0">
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
              ₦{Number(estimate?.estimatedPrice).toLocaleString()}
            </h3>
            {/* <p className="mt-4 font-light text-center text-neutral-400">
              Book by 09/03/2026 by 05:00 pm for a pick-up today
            </p> */}

            <p className="mt-4 font- text-center text-neutral-600">
              Total Shipment Weight:{" "}
              <span className="font-semibold text-black">
                {estimate?.totalShipmentWeight}kg
              </span>
            </p>
          </div>
          <DialogFooter className="flex flex-col gap-2 md:gap-4 mt-6 w-full p-0">
            <Button
              onClick={() => router.push("/shipment")}
              className="submit-button md:flex-1"
            >
              Continue Shipment
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="md:flex-1 submit-button border-primary text-primary! hover:border-primary hover:text-primary"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EstimatePageContent;
