import { ArrowLeft, DeliveryTruck, Plane, Ship } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FreightType, useShipmentStore } from "@/lib/stores/useShipmentStore";

import { useEffect, useState } from "react";
import { toast } from "sonner";

const SelectFreight = () => {
  const [value, setValue] = useState<FreightType | null>(null);

  const setFreightType = useShipmentStore((s) => s.setFreightType);
  const freightType = useShipmentStore((s) => s.freightType);
  const setShipmentFlow = useShipmentStore((s) => s.setShipmentFlow);
  const shipmentType = useShipmentStore((s) => s.shipmentType);

  // console.log("SHIPMENT TYPE FROM WHERETO:", freightType);

  useEffect(() => {
    if (!freightType) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(freightType);
  }, [freightType]);

  const handleNext = () => {
    if (!value || (shipmentType === "DOMESTIC" && value !== "ROAD_FREIGHT")) {
      toast.error("Set a freight type");
      return;
    }

    setFreightType(value);
  };

  const handleBack = () => {
    setShipmentFlow("shipmentType");
  };

  return (
    <div>
      <Button
        onClick={handleBack}
        variant="ghost"
        className="p-0 h-fit hover:bg-transparent"
      >
        <ArrowLeft /> back
      </Button>
      <section className="mt-2.5 md:mt-5 p-4 md:p-6 md:py-8 rounded-lg bg-white">
        <h2 className="text-lg font-semibold leading-7 font-roboto">
          Select a Freight?
        </h2>
        <p className="text-sm font-light leading-5.5">
          Flexible shipping solutions tailored to your needs.
        </p>

        <RadioGroup
          value={value}
          onValueChange={(value: FreightType) => setValue(value)}
          className={`${shipmentType === "INTERNATIONAL" && "md:grid-cols-3"} grid  mt-6 md:mt-8 gap-3 md:gap-6`}
        >
          {shipmentType !== "DOMESTIC" && (
            <>
              <FieldLabel
                htmlFor="air-freight"
                className="p-4 md:p-6 border border-neutral-200 rounded-[16px] cursor-pointer"
              >
                <Field orientation="horizontal" className="p-0! ">
                  <FieldContent>
                    <Plane className="text-primary size-10" />

                    <FieldTitle className="mt-5 text-base font-medium leading-6">
                      Air Freight
                    </FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value="AIR_FREIGHT"
                    id="air-freight"
                    className="size-5 border-2 border-neutral-400"
                  />
                </Field>
              </FieldLabel>

              <FieldLabel
                htmlFor="ocean-freight"
                className="p-4 md:p-6 border border-neutral-200 rounded-[16px] cursor-pointer"
              >
                <Field orientation="horizontal" className="p-0! ">
                  <FieldContent>
                    <Ship className="text-primary size-10" />

                    <FieldTitle className="mt-5 text-base font-medium leading-6">
                      Ocean Freight
                    </FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value="OCEAN_FREIGHT"
                    id="ocean-freight"
                    className="size-5 border-2 border-neutral-400"
                  />
                </Field>
              </FieldLabel>
            </>
          )}
          <FieldLabel
            htmlFor="road-freight"
            className="p-4 md:p-6 border border-neutral-200 rounded-[16px] cursor-pointer"
          >
            <Field orientation="horizontal" className="p-0! ">
              <FieldContent>
                <DeliveryTruck className="text-primary size-10" />

                <FieldTitle className="mt-5 text-base font-medium leading-6">
                  Road Freight
                </FieldTitle>
              </FieldContent>
              <RadioGroupItem
                value="ROAD_FREIGHT"
                id="road-freight"
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
    </div>
  );
};

export default SelectFreight;
