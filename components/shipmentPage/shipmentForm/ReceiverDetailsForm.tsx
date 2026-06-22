import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShipmentDataType } from "@/lib/schemas/shipmentSchema";
import { useFormContext, Controller } from "react-hook-form";

import { countryOptions } from "@/lib/utils/countryOptions";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import IntlTelInput, { IntlTelInputRef } from "@intl-tel-input/react";
import "intl-tel-input/styles";
import { useEffect, useRef } from "react";
import { Iso2 } from "intl-tel-input";

const ReceiverDetailsForm = () => {
  const { control, watch } = useFormContext<ShipmentDataType>();
  const phoneInputRef = useRef<IntlTelInputRef>(null);

  const selectedCountryLabel = watch("receiverCountry");
  const selectedCountry = countryOptions.find(
    (c) => c.label === selectedCountryLabel,
  );

  // Update phone input country when country selector changes
  useEffect(() => {
    if (!phoneInputRef.current || !selectedCountry?.value) return;

    // Access the underlying intl-tel-input instance
    const iti = phoneInputRef.current.getInstance();
    if (iti && iti.setCountry) {
      iti.setCountry(selectedCountry.value.toLowerCase() as Iso2);
    }
  }, [selectedCountry?.value]);

  return (
    <div>
      <FieldSet className="gap-6 md:gap-10">
        <FieldLegend className="text-lg! font-semibold font-roboto leading-7 m-0">
          Please enter the receiver&apos;s details
        </FieldLegend>
        <Separator className="mt-4 md:mt-2 bg-brand-gray/35" />

        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <Controller
            name="receiverName"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name} className="form-label">
                  Full Name
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="First Name and Last Name"
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
            name="receiverEmail"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name} className="form-label">
                  Email Address
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
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

        {/* country & phone number */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <Controller
            name="receiverCountry"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name} className="form-label">
                  Country
                </FieldLabel>

                <Combobox
                  autoComplete="new-country"
                  items={countryOptions}
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput
                    autoComplete="new-country"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="form-input h-14!"
                  />

                  <ComboboxContent>
                    <ComboboxEmpty>No country found</ComboboxEmpty>
                    <ComboboxList>
                      {(country) => (
                        <ComboboxItem
                          key={country.value}
                          value={country.label}
                          className="font-roboto"
                        >
                          {country.label}
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

          <Controller
            name="receiverNumber"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name} className="form-label">
                  Phone Number
                </FieldLabel>
                <IntlTelInput
                  ref={phoneInputRef}
                  value={field.value}
                  onChangeNumber={field.onChange}
                  initialCountry={(selectedCountry?.value as Iso2) || "ng"}
                  loadUtils={() => import("intl-tel-input/utils")}
                  inputProps={{
                    className: "form-input border",
                    inputMode: "tel",
                    id: field.name,
                  }}
                  aria-invalid={fieldState.invalid}
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

        {/* state/city & address */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <Controller
            name="receiverStateOrCity"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name} className="form-label">
                  State/City
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  // placeholder=""
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
            name="receiverAddress"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name} className="form-label">
                  Address
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  // placeholder="First Name and Last Name"
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
      </FieldSet>
    </div>
  );
};

export default ReceiverDetailsForm;
