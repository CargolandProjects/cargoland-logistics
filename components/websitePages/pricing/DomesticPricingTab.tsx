import { Button } from "@/components/ui/button";
import { useGetLocalPricing } from "@/lib/hooks/mutation/useGetPricing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { RoutePricing } from "./RoutePricing";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { MapPin } from "lucide-react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { nigeriaStates } from "@/lib/utils/countryOptions";
import StateCityAutocomplete from "@/components/googlePlaces/StateCityAutocomplete";
import { getAddressComponent } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const localPricingSchema = z.object({
  shipmentType: z.enum(["DOMESTIC", "INTERNATIONAL"], {
    error: "Please select a shipment type",
  }),
  fromState: z.string().min(2, "Origin State is required").max(100),
  fromCity: z.string().min(2, "Origin City is required").max(100),
  toWhereState: z.string().min(2, "Destination state is required").max(100),
  toWhereCity: z.string().min(2, "Destination city is required").max(100),
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

type LocalPricingData = z.infer<typeof localPricingSchema>;

const DomesticPricingTab = () => {
  const { handleSubmit, control, setValue, trigger, setError, clearErrors } =
    useForm<LocalPricingData>({
      resolver: zodResolver(localPricingSchema),
      defaultValues: {
        shipmentType: "DOMESTIC",
        fromState: "",
        fromCity: "",
        toWhereState: "",
        toWhereCity: "",
        weight: "",
      },
    });

  const { mutate, isPending, data } = useGetLocalPricing();
  const [view, setView] = useState<"form" | "result">("form");
  const [selectedWeight, setSelectedWeight] = useState("");

  const fromStateLabel = useWatch({ control, name: "fromState" });
  const toStateLabel = useWatch({ control, name: "toWhereState" });

  // ---------- Handlers for autocomplete selection ----------
  const handleCitySelect = (
    place: google.maps.places.Place,
    field: "fromCity" | "toWhereCity",
  ) => {
    const components = place.addressComponents || [];

    const city =
      getAddressComponent(components, "locality") ||
      getAddressComponent(components, "administrative_area_level_2");

    setValue(field, city);
  };

  const handleFocus = (
    fieldName: keyof LocalPricingData,
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

  const onSubmit = (data: LocalPricingData) => {
    console.log(data);

    mutate(data, {
      onError: (error) => {
        toast.error(error.message || "Failed to get pricing");
      },
      onSuccess: () => {
        setSelectedWeight(data.weight);
        setView("result");
      },
    });
  };

  const pricingData = data?.data || [];
  const countryCode = "NG";

  // console.log("Rates: ", freightPrices);
  const weightNum = parseFloat(selectedWeight) || 0;

  return (
    <div>
      {view === "form" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 p-4 sm:p-6 md:p-10 rounded-[12px] bg-white"
        >
          <FieldSet className="gap-6 md:gap-10">
            {/*  Shipping from */}
            <FieldGroup className="gap-0">
              <FieldTitle className="text-base font-bold leading-6 font-roboto text-[#2F3237]">
                Where are you shipping from?
              </FieldTitle>

              <div className="mt-3 grid md:grid-cols-2 gap-4">
                <Controller
                  name="fromState"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <div className="relative">
                        <MapPin className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Combobox
                          autoComplete="new-state"
                          items={nigeriaStates}
                          name={field.name}
                          value={field.value ?? ""}
                          onValueChange={(value) => {
                            //  Convert null/undefined to empty string
                            field.onChange(value ?? "");
                          }}
                        >
                          <ComboboxInput
                            autoComplete="new-state"
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="form-input h-14! pl-8! [&>input]:placeholder:text-sm"
                            placeholder="Select State"
                          />

                          <ComboboxContent>
                            <ComboboxEmpty>No state found</ComboboxEmpty>
                            <ComboboxList>
                              {(state) => (
                                <ComboboxItem
                                  key={state.value}
                                  value={state.label}
                                  className="font-roboto"
                                >
                                  {state.label}
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
                  name="fromCity"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <div className="relative">
                        <MapPin className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <StateCityAutocomplete
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          onFocus={() => handleFocus("fromCity", countryCode)}
                          onBlur={() => trigger("fromCity")}
                          onSelect={(place: google.maps.places.Place) =>
                            handleCitySelect(place, "fromCity")
                          }
                          placeholder={
                            !countryCode
                              ? "Please select a country first"
                              : "City"
                          }
                          countryCode={countryCode}
                          readOnly={!countryCode}
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
              <div className="mt-3 grid md:grid-cols-2 gap-4">
                <Controller
                  name="toWhereState"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <div className="relative">
                        <MapPin className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Combobox
                          autoComplete="new-state"
                          items={nigeriaStates}
                          name={field.name}
                          value={field.value ?? ""}
                          onValueChange={(value) => {
                            //  Convert null/undefined to empty string
                            field.onChange(value ?? "");
                          }}
                        >
                          <ComboboxInput
                            autoComplete="new-state"
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="form-input h-14! pl-8! [&>input]:placeholder:text-sm"
                            placeholder="Select State"
                          />

                          <ComboboxContent>
                            <ComboboxEmpty>No state found</ComboboxEmpty>
                            <ComboboxList>
                              {(state) => (
                                <ComboboxItem
                                  key={state.value}
                                  value={state.label}
                                  className="font-roboto"
                                >
                                  {state.label}
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
                  name="toWhereCity"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <div className="relative">
                        <MapPin className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <StateCityAutocomplete
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          onFocus={() =>
                            handleFocus("toWhereCity", countryCode)
                          }
                          onBlur={() => trigger("toWhereCity")}
                          onSelect={(place: google.maps.places.Place) =>
                            handleCitySelect(place, "toWhereCity")
                          }
                          placeholder={
                            !countryCode
                              ? "Please select a country first"
                              : "City"
                          }
                          countryCode={countryCode}
                          readOnly={!countryCode}
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
              className="submit-button w-55.5! font-normal!"
            >
              Get Price
            </Button>
          </div>
        </form>
      )}

      {view === "result" && data && (
        <div className="mt-6 p-4 sm:p-6 md:p-10 rounded-[12px] bg-white">
          <h3 className="text-lg md:text-2xl font-semibold md:font-bold leading-7 md:leading-8 font-roboto">
            Avaliable Rates
          </h3>

          {pricingData.length === 0 && (
            <div className="mt-6 md:mt-10 p-4 border rounded-lg bg-gray-50 text-center">
              <p className="text-xl font-medium leading-7">
                {fromStateLabel} → {toStateLabel}
              </p>
              <p className="mt-1 text-gray-500">
                No freight options for this weight
              </p>
            </div>
          )}

          {pricingData.length > 0 && (
            <div className="mt-6 md:mt-10 grid gap-6">
              {pricingData.map((freightPrice) => (
                <RoutePricing
                  key={freightPrice.id}
                  fromWhere={freightPrice.fromState}
                  toWhere={freightPrice.toWhereState}
                  brackets={freightPrice.brackets}
                  weight={weightNum}
                />
              ))}
            </div>
          )}

          <div className="mt-6 md:mt-10 flex justify-center ">
            <Button
              onClick={() => setView("form")}
              className="px-12 py-4.5 h-auto text-primary bg-primary/28 hover:bg-primary/33"
            >
              Get Another Price
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomesticPricingTab;
