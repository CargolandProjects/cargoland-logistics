"use client";

import FlightInternatonal from "@/components/icons/FlightInternational";
import { Location } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShipmentType, useShipmentStore } from "@/lib/stores/useShipmentStore";
import { useState } from "react";
import { toast } from "sonner";

const WhereTo = () => {
  const [value, setValue] = useState<ShipmentType | null>(null);
  const setShipmentType = useShipmentStore((s) => s.setShipmentType);

  const handleNext = () => {
    if (!value) {
      toast.error("Set a shipment Scope");
      return;
    }

    setShipmentType(value);
  };

  return (
    <section>
      <h2 className="text-lg font-semibold leading-7 font-roboto">Where to?</h2>
      <p className="text-sm font-light leading-5.5">
        Send your shipment with ease by following these simple steps
      </p>

      <RadioGroup
        value={value}
        onValueChange={(value: ShipmentType) => setValue(value)}
        className="grid md:grid-cols-2 mt-8 gap-3 md:gap-6"
      >
        <FieldLabel
          htmlFor="domestic-shipping"
          className="p-4 md:p-6 border border-neutral-200 rounded-[16px] cursor-pointer"
        >
          <Field orientation="horizontal" className="p-0! ">
            <FieldContent>
              <Location className="text-primary size-10" />

              <FieldTitle className="mt-5 text-base font-medium leading-6">
                A Domestic Shipment
              </FieldTitle>
            </FieldContent>
            <RadioGroupItem
              value="DOMESTIC"
              id="domestic-shipping"
              className="size-5 border-2 border-neutral-400"
            />
          </Field>
        </FieldLabel>

        <FieldLabel
          htmlFor="international-shipping"
          className="p-4 md:p-6 border border-neutral-200 rounded-[16px] cursor-pointer"
        >
          <Field orientation="horizontal" className="p-0! ">
            <FieldContent>
              <FlightInternatonal className="text-primary size-10" />

              <FieldTitle className="mt-5 text-base font-medium leading-6">
                An International Shipment
              </FieldTitle>
            </FieldContent>
            <RadioGroupItem
              value="INTERNATIONAL"
              id="international-shipping"
              className="size-5 border-2 border-neutral-400"
            />
          </Field>
        </FieldLabel>
      </RadioGroup>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          className="w-[180px] h-[55px] text-base font-semibold rounded-md mt-6"
        >
          Next Step
        </Button>
      </div>
    </section>
  );
};

export default WhereTo;
