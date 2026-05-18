import { useCallback, useEffect, useRef, useState } from "react";
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
import { useForm, FormProvider, DeepPartial, useWatch } from "react-hook-form";
import { useShipmentStore } from "@/lib/stores/useShipmentStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ShipmentForm = () => {
  const [step, setStep] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasHydrated = useRef(false);

  const router = useRouter();

  const formData = useShipmentStore((s) => s.formData);
  const saveFormData = useShipmentStore((s) => s.setFormData);
  //   clearShipmentForm();
  console.log("form data: ", formData);

  const form = useForm<ShipmentFormType>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: defaultShipmentValues,
  });

  const formValues = useWatch({ control: form.control });

  const save = useCallback(
    (value: { step: number; data: DeepPartial<ShipmentFormType> }) => {
      if (!value) return;
      saveFormData(value);
    },
    [saveFormData]
  );

  const cancel = () => {
    if (!timeoutRef.current) return;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  // Restores shipment step and form data
  useEffect(() => {
    if (!formData || hasHydrated.current) return;

    //Restore step
    if (formData.step !== null) {
      const step = () => setStep(formData.step ?? 0);
      step();
    }

    // Restore form values

    form.reset({
      ...defaultShipmentValues,
      ...formData.data,
    });

    hasHydrated.current = true;
  }, [form, formData]);

  //   autosaves form progress
  useEffect(() => {
    cancel();

    timeoutRef.current = setTimeout(() => {
      save({ step, data: formValues as DeepPartial<ShipmentFormType> });
    }, 1000);

    return cancel;
  }, [save, formValues, step]);

  const onSubmit = (data: ShipmentFormType) => {
    console.log("The submitted Data: ", data);
    setStep(3);
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

  const handlePayment = () => {
    setTimeout(() => {
      router.push("/payment-successful");
    }, 400);
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
      <FormStep currentStep={step} setStep={setStep} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {shipmentForms()}

          <div className="flex justify-end mt-12.5">
            {step < 2 && (
              <Button
                onClick={handleNext}
                type="button"
                className="w-[215px] h-13.75 rounded-md"
              >
                Next Step
              </Button>
            )}

            {/* Separate button of type 'submit" to submit shipment details is needed rather than
            conditionally using step to assign button type due to some funny
            default form behaviour thereby introducing a bug */}
            {step === 2 && (
              <Button type="submit" className="w-[215px] h-13.75 rounded-md">
                Next Step
              </Button>
            )}

            {step === 3 && (
              <Button
                onClick={handlePayment}
                type="button"
                className="w-[215px] h-13.75 rounded-md"
              >
                Make Payment
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ShipmentForm;
