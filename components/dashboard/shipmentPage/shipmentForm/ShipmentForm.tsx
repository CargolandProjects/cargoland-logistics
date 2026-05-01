import { useEffect, useRef, useState } from "react";
import FormStep from "./FormStep";
import ShipperDetailsForm from "./ShipperDetailsForm";
import ReceiverDetailsForm from "./ReceiverDetailsForm";
import ShipmentDetailsForm from "./ShipmentDetailsForm";
import Payment from "./Payment";
import {
  ShipmentFormType,
  shipmentSchema,
  defaultShipmentValues,
} from "@/lib/schemas/shipmentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, DeepPartial } from "react-hook-form";
import { useShipmentStore } from "@/lib/stores/useShipmentStore";
import { Button } from "@/components/ui/button";

const ShipmentForm = () => {
  const [step, setStep] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearShipmentForm = useShipmentStore((s) => s.clearShipment);
  const formData = useShipmentStore((s) => s.formData);
  const saveFormData = useShipmentStore((s) => s.setFormData);
  //   clearShipmentForm();
  console.log("form data: ", formData);

  const form = useForm<ShipmentFormType>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: defaultShipmentValues,
  });

  const { watch } = form;

  const save = (value: {
    step: number;
    data: DeepPartial<ShipmentFormType>;
  }) => {
    if (!value) return;
    saveFormData(value);
  };

  const cancel = () => {
    if (!timeoutRef.current) return;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  //   autosaves form progress
  useEffect(() => {
    const sub = watch((data) => {
      cancel();

      timeoutRef.current = setTimeout(() => {
        save({ step, data });
      }, 1000);
    });

    return () => {
      sub.unsubscribe();
      cancel();
    };
  }, [watch]);

  const onSubmit = (data: ShipmentFormType) => {
    console.log("The submitted Data: ", data);
    clearShipmentForm();
  };

  const stepFields = [["sender"], ["receiver"], ["shipment"]] as const;

  const handleNext = async () => {
    const isValid = await form.trigger(stepFields[step]);
    if (!isValid) {
      console.log("form errors", form.formState.errors);
      //   console.log("IsValid ? ", isValid);
      return;
    }

    const data = form.getValues();

    cancel(); // stop oending autosave
    save({ step, data }); // save immediately

    setStep((step) => step + 1);
  };

  const shipmentForms = () => {
    switch (step) {
      case 0:
        return <ShipperDetailsForm />;
      case 1:
        return <ReceiverDetailsForm />;
      case 2:
        return <ShipmentDetailsForm />;
      case 3:
        return <Payment />;
    }
  };

  return (
    <div className="mt-7.5">
      <FormStep currentStep={step} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {shipmentForms()}

          <div className="flex justify-end mt-12.5">
            <Button
              onClick={handleNext}
              type="button"
              className="px-[69px] h-13.75 rounded-md"
            >
              Next Step
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ShipmentForm;
