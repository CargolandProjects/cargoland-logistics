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
import { getAddressComponent } from "@/lib/utils";
import { CityAutocomplete } from "@/components/googlePlaces/CityAutocomplete";
import { AddressAutocomplete } from "@/components/googlePlaces/AddressAutocomplete";

const ReceiverDetailsForm = () => {
  const { control, watch, setValue, setError, clearErrors, trigger } =
    useFormContext<ShipmentDataType>();
  const phoneInputRef = useRef<IntlTelInputRef>(null);

  const selectedCountryLabel = watch("receiverCountry");
  const selectedCountry = countryOptions.find(
    (c) => c.label === selectedCountryLabel,
  );
  const countryCode = selectedCountry?.value?.toLowerCase();

  // Update phone input country when country selector changes
  useEffect(() => {
    if (!phoneInputRef.current || !selectedCountry?.value) return;

    // Access the underlying intl-tel-input instance
    const iti = phoneInputRef.current.getInstance();
    if (iti && iti.setCountry) {
      iti.setCountry(selectedCountry.value.toLowerCase() as Iso2);
    }
  }, [selectedCountry?.value]);

  // ---------- Handlers for autocomplete selection ----------
  const handleCitySelect = (place: google.maps.places.Place) => {
    const components = place.addressComponents || [];

    const city =
      getAddressComponent(components, "locality") ||
      getAddressComponent(components, "administrative_area_level_2");
    const state = getAddressComponent(
      components,
      "administrative_area_level_1",
    );

    setValue("receiverStateOrCity", city || state || "");

    // Optionally auto-fill postal code
    const postalCode = getAddressComponent(components, "postal_code");
    if (postalCode) setValue("postalCode", postalCode);
  };

  const handleAddressSelect = (place: google.maps.places.Place) => {
    const components = place.addressComponents || [];

    const city =
      getAddressComponent(components, "locality") ||
      getAddressComponent(components, "administrative_area_level_2");
    const state = getAddressComponent(
      components,
      "administrative_area_level_1",
    );
    const postalCode = getAddressComponent(components, "postal_code");

    setValue("receiverAddress", place.formattedAddress || "");
    setValue("receiverStateOrCity", city || state || "");
    setValue("recieverPostalCode", postalCode || "");
  };

  const handleFocus = (
    fieldName: "receiverStateOrCity" | "receiverAddress",
  ) => {
    if (!countryCode) {
      if (fieldName === "receiverStateOrCity") {
        setError("receiverStateOrCity", {
          type: "manual",
          message: "Please select a country first",
        });
      } else
        setError("receiverAddress", {
          type: "manual",
          message: "Please select a country first",
        });
    } else {
      clearErrors(fieldName);
    }
  };

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
                <CityAutocomplete
                  value={field.value}
                  onChange={field.onChange}
                  onFocus={() => handleFocus("receiverStateOrCity")}
                  onBlur={() => trigger("stateOrCity")}
                  onSelect={handleCitySelect}
                  placeholder={
                    !countryCode
                      ? "Please select a country first"
                      : "Start typing city name..."
                  }
                  countryCode={countryCode}
                  readOnly={!countryCode}
                  inputClassName="form-input h-10 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <AddressAutocomplete
                  value={field.value}
                  onChange={field.onChange}
                  onFocus={() => handleFocus("receiverAddress")}
                  onBlur={() => trigger("address")}
                  onSelect={handleAddressSelect}
                  placeholder={
                    !countryCode
                      ? "Please select a country first"
                      : "Start typing your address..."
                  }
                  countryCode={countryCode}
                  readOnly={!countryCode}
                  inputClassName="form-input h-10 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <Controller
            name="recieverPostalCode"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name} className="form-label">
                  Postal Code
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
            name="recieverCityCode"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name} className="form-label">
                  City Code{" "}
                  <span className="form-label text-gray-400!">(Optional)</span>
                </FieldLabel>
                <Input
                  autoComplete="new-cityCode"
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
