import StateCityAutocomplete from "@/components/googlePlaces/StateCityAutocomplete";
import { Location } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
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
import { useGetAllPricing } from "@/lib/hooks/mutation/useGetPricing";
import { getAddressComponent } from "@/lib/utils";
import {
  countryOptions,
  normalizeCountryName,
} from "@/lib/utils/countryOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const intlPricingSchema = z.object({
  shipmentType: z.enum(["INTERNATIONAL"], {
    error: "Please select a shipment type",
  }),
  currency: z.enum(["Naira"], {
    error: "Please select a currency",
  }),
  fromCountry: z.string().min(2, "Origin country is required").max(100),
  fromState: z.string().min(2, "Origin state is required").max(100),
  fromCity: z.string().min(2, "Origin city is required").max(100),
  toCountry: z.string().min(2, "Destination country is required").max(100),
  toState: z.string().min(2, "Destination state is required").max(100),
  toCity: z.string().min(2, "Destination city is required").max(100),
  weight: z
    .string("Weight is required")
    .regex(/^\d+(\.\d+)?$/, "Must be a valid number")
    .refine((val) => parseFloat(val) >= 0.5, {
      error: "Weight must be at least 0.5kg",
    })
    .refine((val) => parseFloat(val) <= 1000, {
      message: "Weight cannot exceed 1000 kg",
    }),
});

type IntlPricingData = z.infer<typeof intlPricingSchema>;

const IntlPricingTab = () => {
  const { handleSubmit, control, setValue, trigger, setError, clearErrors } =
    useForm<IntlPricingData>({
      resolver: zodResolver(intlPricingSchema),
      defaultValues: {
        shipmentType: "INTERNATIONAL",
        currency: "Naira",
        fromCountry: "",
        fromState: "",
        fromCity: "",
        toCountry: "",
        toState: "",
        toCity: "",
        weight: "",
      },
    });

  const [view, setView] = useState<"form" | "result">("form");
  const [selectedWeight, setSelectedWeight] = useState("");
  const { mutate, data, isPending } = useGetAllPricing();

  const fromCountryLabel = useWatch({ control, name: "fromCountry" });
  const toCountryLabel = useWatch({ control, name: "toCountry" });

  const fromCountryCode = countryOptions
    .find((c) => c.label === fromCountryLabel)
    ?.value?.toLowerCase();
  const toCountryCode = countryOptions
    .find((c) => c.label === toCountryLabel)
    ?.value?.toLowerCase();

  console.log("Selected Weight", selectedWeight);

  const handleStateSelect = (
    place: google.maps.places.Place,
    field: "fromState" | "toState",
  ) => {
    const components = place.addressComponents || [];
    const state = getAddressComponent(
      components,
      "administrative_area_level_1",
    );
    setValue(field, state);
    // Optionally auto-fill postal code? Not recommended for state only.
  };

  // ---------- Handlers for autocomplete selection ----------
  const handleCitySelect = (
    place: google.maps.places.Place,
    field: "fromCity" | "toCity",
  ) => {
    const components = place.addressComponents || [];

    const city =
      getAddressComponent(components, "locality") ||
      getAddressComponent(components, "administrative_area_level_2");

    setValue(field, city);
  };

  const handleFocus = (
    fieldName: keyof IntlPricingData,
    countryCode: string | undefined,
  ) => {
    if (!countryCode) {
      setError(fieldName, {
        type: "manual",
        message: "Please select a country first",
      });
    } else {
      clearErrors(fieldName);
    }
  };

  const onSubmit = (data: IntlPricingData) => {
    console.log(data);
    const { currency: _c, ...rest } = data;
    const payload = {
      ...rest,
      fromCountry: normalizeCountryName(data.fromCountry),
      toCountry: normalizeCountryName(data.toCountry),
    };

    mutate(payload, {
      onError: (error) => {
        toast.error(error.message || "Failed to get pricing");
      },
      onSuccess: () => {
        setSelectedWeight(data.weight);
        setView("result");
      },
    });
  };

  return (
    <div className="">
      {view === "form" && !data && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 p-10  rounded-[12px] bg-white"
        >
          <FieldSet className="gap-10">
            {/*  Shipping from */}
            <FieldGroup className="gap-0">
              <FieldTitle className="text-base font-bold leading-6 font-roboto text-[#2F3237]">
                Where are you shipping from?
              </FieldTitle>

              <div className="mt-3 grid md:grid-cols-3 gap-4">
                <Controller
                  name="fromCountry"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <div className="relative">
                        <MapPin className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Combobox
                          autoComplete="new-country"
                          items={countryOptions}
                          name={field.name}
                          value={field.value}
                          onValueChange={(value) => {
                            //  Convert null/undefined to empty string
                            field.onChange(value ?? "");
                          }}
                        >
                          <ComboboxInput
                            autoComplete="new-country"
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Country"
                            className="form-input h-14! pl-8!"
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
                      </div>
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
                  name="fromState"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <div className="relative">
                        <MapPin className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <StateCityAutocomplete
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          type="state"
                          onFocus={() =>
                            handleFocus("fromState", fromCountryCode)
                          }
                          onBlur={() => trigger("fromState")}
                          onSelect={(place: google.maps.places.Place) =>
                            handleStateSelect(place, "fromState")
                          }
                          placeholder={
                            !fromCountryCode
                              ? "Please select a country first"
                              : "State"
                          }
                          countryCode={fromCountryCode}
                          readOnly={!fromCountryCode}
                          inputClassName="form-input h-10 w-full border rounded-md pl-10.5! py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
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
                  name="fromCity"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <div className="relative">
                        <MapPin className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <StateCityAutocomplete
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          onFocus={() =>
                            handleFocus("fromCity", fromCountryCode)
                          }
                          onBlur={() => trigger("fromCity")}
                          onSelect={(place: google.maps.places.Place) =>
                            handleCitySelect(place, "fromCity")
                          }
                          placeholder={
                            !fromCountryCode
                              ? "Please select a country first"
                              : "City"
                          }
                          countryCode={fromCountryCode}
                          readOnly={!fromCountryCode}
                          inputClassName="form-input h-10 w-full border rounded-md pl-10.5! py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
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

            {/* Shipping from */}
            <FieldGroup className="gap-0">
              <FieldTitle className="text-base font-bold leading-6 font-roboto text-[#2F3237]">
                Where are you shipping to?
              </FieldTitle>
              <div className="mt-3 grid md:grid-cols-3 gap-4">
                <Controller
                  name="toCountry"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <div className="relative">
                        <MapPin className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Combobox
                          autoComplete="new-country"
                          items={countryOptions}
                          name={field.name}
                          value={field.value}
                          onValueChange={(value) => {
                            //  Convert null/undefined to empty string
                            field.onChange(value ?? "");
                          }}
                        >
                          <ComboboxInput
                            autoComplete="new-country"
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Country"
                            className="form-input h-14! pl-8!"
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
                      </div>
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
                  name="toState"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <div className="relative">
                        <MapPin className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <StateCityAutocomplete
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          type="state"
                          onFocus={() => handleFocus("toState", toCountryCode)}
                          onBlur={() => trigger("toState")}
                          onSelect={(place: google.maps.places.Place) =>
                            handleStateSelect(place, "toState")
                          }
                          placeholder={
                            !toCountryCode
                              ? "Please select a country first"
                              : "State"
                          }
                          countryCode={toCountryCode}
                          readOnly={!toCountryCode}
                          inputClassName="form-input h-10 w-full border rounded-md pl-10.5! py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
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
                  name="toCity"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <div className="relative">
                        <MapPin className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <StateCityAutocomplete
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          onFocus={() => handleFocus("toCity", toCountryCode)}
                          onBlur={() => trigger("toCity")}
                          onSelect={(place: google.maps.places.Place) =>
                            handleCitySelect(place, "toCity")
                          }
                          placeholder={
                            !toCountryCode
                              ? "Please select a country first"
                              : "City"
                          }
                          countryCode={toCountryCode}
                          readOnly={!toCountryCode}
                          inputClassName="form-input h-10 w-full border rounded-md pl-10.5! py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
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

            {/* currency & weight */}
            <FieldGroup className="gap-0">
              <div className="grid md:grid-cols-2 gap-4">
                <Controller
                  name="currency"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-3">
                      <FieldLabel className="text-base font-bold leading-6 font-roboto text-[#2F3237]">
                        Select Currency
                      </FieldLabel>
                      <div className="relative">
                        <MapPin className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="form-input h-14! pl-10.5! w-full"
                          >
                            <SelectValue placeholder={"Nigeria Naira (₦)"} />
                          </SelectTrigger>

                          <SelectContent position="popper">
                            <SelectItem value="Naira">Naira</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
                  name="weight"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-3">
                      <FieldLabel className="text-base font-bold leading-6 font-roboto text-[#2F3237]">
                        Estimated Weight (kg)
                      </FieldLabel>
                      <div className="relative">
                        <MapPin className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          type="number"
                          placeholder="3kg"
                          className="form-input pl-10.5!"
                        />
                      </div>
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

          <div className="mt-10 flex justify-center">
            <Button
              disabled={isPending}
              className="submit-button w-[222px]! font-normal!"
            >
              Get Price
            </Button>
          </div>
        </form>
      )}

    </div>
  );
};

export default IntlPricingTab;
