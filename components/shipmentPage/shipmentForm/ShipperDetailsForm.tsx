import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

import IntlTelInput from "@intl-tel-input/react";
import "intl-tel-input/styles";
import { useEffect, useRef } from "react";
import { Iso2 } from "intl-tel-input";

const ShipperDetailsForm = () => {
  const { control, watch } = useFormContext<ShipmentDataType>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const phoneInputRef = useRef<any>(null);

  const selectedCountryLabel = watch("country");
  const selectedCountry = countryOptions.find(
    (c) => c.label === selectedCountryLabel,
  );

  // Update phone input country when country selector changes
  useEffect(() => {
    if (!phoneInputRef.current || !selectedCountry?.value) return;

    // Access the underlying intl-tel-input instance
    const iti = phoneInputRef.current.getInstance();
    if (iti && iti.setCountry) {
      iti.setCountry(selectedCountry.value.toLowerCase());
    }
  }, [selectedCountry?.value]);

  return (
    <div>
      <FieldSet className="gap-6 md:gap-10">
        <FieldLegend className="text-lg! font-semibold font-roboto leading-7 m-0">
          Please enter the shipper&apos;s details
        </FieldLegend>
        <Separator className="mt-4 md:mt-2 bg-brand-gray/35" />

        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <Controller
            name="fullName"
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
        </div>

        {/* country & phone number */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <Controller
            name="country"
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
                  onValueChange={(val) => {
                    console.log("Country Value:", val, typeof val);
                    field.onChange(val);
                  }}
                >
                  <ComboboxInput
                    autoComplete="new-country"
                    onFocus={(e) => e.target.removeAttribute("autoComplete")}
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
            name="phoneNumber"
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
            name="stateOrCity"
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
            name="address"
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

        <div className="grid md:grid-cols-2">
          <Controller
            name="pickUpAddressType"
            control={control}
            render={({ field, fieldState }) => (
              <FieldSet>
                <FieldLegend className="form-label text-sm!">
                  Pickup Address Type
                </FieldLegend>
                <RadioGroup
                  orientation="horizontal"
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-3 gap-2 md:gap-5.5 w-fit"
                >
                  {/* home */}
                  <FieldLabel
                    htmlFor={`${field.name}-home`}
                    className="form-label rounded-sm! h-14"
                  >
                    <Field
                      data-invalid={fieldState.invalid}
                      orientation="horizontal"
                      className="md:px-4! h-full gap-[9.5px]"
                    >
                      <FieldTitle className="font-normal text-sm text-brand-gray">
                        Home
                      </FieldTitle>
                      <RadioGroupItem
                        value="HOME"
                        id={`${field.name}-home`}
                        aria-invalid={fieldState.invalid}
                        className="border-brand-gray/90"
                      />
                    </Field>
                  </FieldLabel>

                  {/* office */}
                  <FieldLabel
                    htmlFor={`${field.name}-office`}
                    className="form-label rounded-sm! h-14"
                  >
                    <Field
                      data-invalid={fieldState.invalid}
                      orientation="horizontal"
                      className="md:px-4! h-full gap-[9.5px]"
                    >
                      <FieldTitle className="font-normal text-sm text-brand-gray">
                        Office
                      </FieldTitle>
                      <RadioGroupItem
                        value="OFFICE"
                        id={`${field.name}-office`}
                        aria-invalid={fieldState.invalid}
                        className="border-brand-gray/90"
                      />
                    </Field>
                  </FieldLabel>

                  {/* drop off */}
                  <FieldLabel
                    htmlFor={`${field.name}-dropOff`}
                    className="form-label rounded-sm! h-14"
                  >
                    <Field
                      data-invalid={fieldState.invalid}
                      orientation="horizontal"
                      className="pmd:x-4! h-full gap-[9.5px]"
                    >
                      <FieldTitle className="font-normal text-sm text-brand-gray ">
                        Drop Off
                      </FieldTitle>
                      <RadioGroupItem
                        value="DROP_OFF"
                        id={`${field.name}-dropOff`}
                        aria-invalid={fieldState.invalid}
                        className="border-brand-gray/90"
                      />
                    </Field>
                  </FieldLabel>
                </RadioGroup>

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="form-error"
                  />
                )}
              </FieldSet>
            )}
          />
        </div>

        {/* pickup date & time */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <Controller
            name="pickupDate"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name} className="form-label">
                  Pickup Date
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="date"
                  min={new Date().toISOString().split("T")[0]} // Today's date in YYYY-MM-DD format
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
            name="pickupTime"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name} className="form-label">
                  Pickup Time
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="time"
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

export default ShipperDetailsForm;
