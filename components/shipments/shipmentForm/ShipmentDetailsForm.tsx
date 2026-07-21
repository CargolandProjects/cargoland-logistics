import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { packageType, ShipmentDataType } from "@/lib/schemas/shipmentSchema";
import { useFormContext, Controller } from "react-hook-form";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useShipmentEstimate } from "@/lib/hooks/mutation/useMutateShipment";
import { useEffect } from "react";
import Loader from "@/components/Loader";
import { ImageUploadField } from "./ImageUploadField";
import { useShipmentStore } from "@/lib/stores/useShipmentStore";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { toast } from "sonner";

const ShipmentDetailsForm = () => {
  const { mutate, isPending, data: estimate } = useShipmentEstimate();
  const freightType = useShipmentStore((s) => s.freightType);
  const shipmentType = useShipmentStore((s) => s.shipmentType);
  const { control, watch, setValue } = useFormContext<ShipmentDataType>();

  const shipperEmail = watch("email");

  const weight = watch("weight");
  const length = watch("length");
  const height = watch("height");
  const breadth = watch("breadth");

  const debouncedWeight = useDebounce(weight);
  const debouncedLength = useDebounce(length);
  const debouncedHeight = useDebounce(height);
  const debouncedBreadth = useDebounce(breadth);

  const totalWeight = estimate?.data.totalShipmentWeight || 0;

  const fromCountry = watch("country");
  const toCountry = watch("receiverCountry");
  const fromState = watch("fromState");
  const toWhereState = watch("toWhereState");

  const isDomestic = shipmentType === "DOMESTIC";

  // Get shipment estimate
  useEffect(() => {
    if (!shipmentType || !freightType) return;

    if (
      isPending ||
      !debouncedLength ||
      !debouncedBreadth ||
      !debouncedHeight ||
      !debouncedWeight
    )
      return;

    const location = isDomestic
      ? { fromCountry, fromState, toWhereState }
      : { fromCountry, toCountry };

    const payload = {
      shipmentType,
      freightType,
      ...location,
      weight: Number(debouncedWeight),
      length: Number(debouncedLength),
      breadth: Number(debouncedBreadth),
      height: Number(debouncedHeight),
    };
    mutate(payload, {
      onError: (error) => {
        if (error.message.includes("No pricing configured"))
          toast.warning("No pricing configured for this weight", {
            description:
              " Please kindly contact the cargoland support team for shipmets higher than 10kg",
          });
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mutate,
    freightType,
    fromCountry,
    toCountry,
    debouncedLength,
    debouncedBreadth,
    debouncedHeight,
    debouncedWeight,
    shipmentType,
  ]);

  return (
    <div>
      <FieldSet className="gap-6 md:gap-10">
        <FieldLegend className="text-lg font-semibold font-roboto leading-7 m-0">
          Please enter your shipment details
        </FieldLegend>
        <Separator className="mt-2 bg-brand-gray/35" />

        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {/* package type */}
          <Controller
            name="packageType"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name} className="form-label">
                  Package Type
                </FieldLabel>

                <Combobox
                  items={packageType}
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Document, Parcel, Bulk, Fragile, etc"
                    className="form-input h-14!"
                  />

                  <ComboboxContent>
                    <ComboboxEmpty>No package type found</ComboboxEmpty>
                    <ComboboxList>
                      {(type) => (
                        <ComboboxItem
                          key={type}
                          value={type}
                          className="font-roboto"
                        >
                          {type}
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

          {/* item number */}
          <Controller
            name="numberOfItems"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name} className="form-label">
                  Number of Items
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="number"
                  placeholder=""
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

        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {/* weight (kg)*/}
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
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type="number"
                      placeholder="Length (cm)"
                      className="form-input max-md:px-2!"
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
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type="number"
                      placeholder="Breadth (cm)"
                      className="form-input max-md:px-2!"
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
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type="number"
                      placeholder="Height (cm)"
                      className="form-input max-md:px-2!"
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
        </div>

        {/* image upload */}
        <Controller
          name="imageUrl"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <ImageUploadField
                value={field.value || []}
                onChange={(assets) =>
                  setValue("imageUrl", assets, { shouldValidate: false })
                }
                email={shipperEmail}
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="form-error mt-1"
                />
              )}
            </div>
          )}
        />

        {/* description */}
        <Controller
          name="descriptionOfGoods"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor={field.name} className="form-label">
                Description of Goods (Optional)
              </FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                maxLength={500}
                // placeholder="Description of Goods (Optional)"
                className="form-input h-[155px]! font-roboto"
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

      <p className="mt-4 md:mt-6 text-sm font-bold leading-5 font-roboto  flex gap-2 items-center">
        Total Shipment Weight:{" "}
        {isPending ? <Loader size={16} /> : `${totalWeight.toFixed(2)} kg`}
      </p>
    </div>
  );
};

export default ShipmentDetailsForm;
