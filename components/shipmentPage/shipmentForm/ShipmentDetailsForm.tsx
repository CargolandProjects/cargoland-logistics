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
import { packageType, ShipmentFormType } from "@/lib/schemas/shipmentSchema";
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

const ShipmentDetailsForm = () => {
  const { control, watch } = useFormContext<ShipmentFormType>();

  const weightKg = watch("shipment.weightKg");
  const itemNumber = watch("shipment.itemNumber");

  const totalWeightInKg = Number(weightKg ?? 0) * Number(itemNumber ?? 0);

  return (
    <div className="mt-7.5 px-6 py-8 bg-white rounded-lg">
      <FieldSet className="gap-10">
        <FieldLegend className="text-lg font-semibold leading-7 m-0">
          Please enter your shipment details
        </FieldLegend>
        <Separator className="mt-2 bg-brand-gray/35"   />

        <div className="grid md:grid-cols-2 gap-10">
          {/* package type */}
          <Controller
            name="shipment.packageType"
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
            name="shipment.itemNumber"
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

        <div className="grid md:grid-cols-2 gap-10">
          {/* weight (kg)*/}
          <Controller
            name="shipment.weightKg"
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
            <FieldGroup className="flex-row items-center gap-2.5">
              <Controller
                name="shipment.lengthCm"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
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
                name="shipment.breadthCm"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
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
                name="shipment.heightCm"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
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
        </div>

        {/* description */}
        <div>
          <Controller
            name="shipment.description"
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
                  className="form-input min-h-[155px] max-h-[155px] font-roboto"
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
      </FieldSet>

      <h3 className="text-sm font-bold leading-5 font-roboto mt-6">{`Total Shipment Weight: ${totalWeightInKg.toFixed(
        2
      )} kg `}</h3>
    </div>
  );
};

export default ShipmentDetailsForm;
