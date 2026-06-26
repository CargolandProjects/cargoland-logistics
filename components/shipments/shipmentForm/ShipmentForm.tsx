import { useCallback, useEffect, useRef, useState } from "react";
import FormStep from "./FormStep";
import ShipperDetailsForm from "./ShipperDetailsForm";
import ReceiverDetailsForm from "./ReceiverDetailsForm";
import ShipmentDetailsForm from "./ShipmentDetailsForm";
import Payment from "./Payment";
import {
  ShipmentDataType,
  shipmentSchema,
  defaultShipmentValues,
} from "@/lib/schemas/shipmentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, DeepPartial, useWatch } from "react-hook-form";
import { useShipmentStore } from "@/lib/stores/useShipmentStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  useCreateShipment,
  useCreateShipmentUser,
  useMakePayment,
} from "@/lib/hooks/mutation/useMutateShipment";
import { useSession } from "@/lib/hooks/useSession";
import { toast } from "sonner";
import AuthPrompt from "../AuthPrompt";
import { ArrowLeft } from "@/components/icons";
import ConfirmDialog from "@/components/ConfirmDialog";

const ShipmentForm = () => {
  const { mutate: createShipment } = useCreateShipment();
  const { mutate: createShipmentUser } = useCreateShipmentUser();
  const { mutate: makePayment, isPending: isPaying } = useMakePayment();
  const formData = useShipmentStore((s) => s.formData);
  const createdShipment = useShipmentStore((s) => s.createdShipment);
  const setShipmentFlow = useShipmentStore((s) => s.setShipmentFlow);
  const freightType = useShipmentStore((s) => s.freightType);
  const shipmentType = useShipmentStore((s) => s.shipmentType);
  const saveShipmentData = useShipmentStore((s) => s.setFormData);
  const saveCreatedShipment = useShipmentStore((s) => s.setCreatedShipment);
  const cancelShipment = useShipmentStore((s) => s.clearShipment);
  const { isAuthenticated } = useSession();
  const router = useRouter();

  const [step, setStep] = useState(3);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasHydrated = useRef(false);

  //   clearShipmentForm();
  console.log("form data: ", formData);

  const form = useForm<ShipmentDataType>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: defaultShipmentValues,
    // defaultValues: defaultShipmentValues as unknown as ShipmentDataType,
  });

  const formValues = useWatch({ control: form.control });

  const save = useCallback(
    (value: { step: number; data: DeepPartial<ShipmentDataType> }) => {
      if (!value) return;
      saveShipmentData(value);
    },
    [saveShipmentData],
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
    const step = () => setStep(formData.step ?? 0);
    step();

    // Restore form values
    form.reset({
      ...defaultShipmentValues,
      ...formData.data,
    });

    hasHydrated.current = true;
  }, [form, formData]);

  //   autosaves form progress
  useEffect(() => {
    if (hasSubmitted) return;
    cancel();

    timeoutRef.current = setTimeout(() => {
      save({ step, data: formValues as DeepPartial<ShipmentDataType> });
    }, 1000);

    return cancel;
  }, [save, formValues, step, hasSubmitted]);

  const stepFields = [
    [
      "fullName",
      "email",
      "country",
      "phoneNumber",
      "stateOrCity",
      "address",
      "postalCode",
      "cityCode",

      "pickUpAddressType",
      "pickupDate",
      "pickupTime",
    ],
    [
      "receiverName",
      "receiverEmail",
      "receiverCountry",
      "receiverNumber",
      "receiverStateOrCity",
      "receiverAddress",
      "recieverCityCode",
      "recieverPostalCode",
    ],
    [
      "packageType",
      "numberOfItems",
      "weight",
      "length",
      "breadth",
      "height",
      "imageUrl",
      "descriptionOfGoods",
    ],
  ] as const;

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

  const handleBack = () => {
    if (step === 0) {
      setShipmentFlow("freightType");
      return;
    }

    setStep((prev) => prev - 1);
  };

  const onSubmit = (data: ShipmentDataType) => {
    const payload = {
      ...data,
      shipmentType: shipmentType,
      freightType: freightType,
    };
    // console.log("IsAuthenticated", payload);

    if (isAuthenticated)
      createShipmentUser(payload, {
        onSuccess: (res) => {
          setHasSubmitted(true);
          toast.success(res.message || "Shipment created successfully");
          saveCreatedShipment(res.data);
          // save next step
          setStep((prev) => {
            const next = prev + 1;
            saveShipmentData({ step: next });
            return next;
          });
        },
        onError: (res) => {
          toast.error(res.message || "Failed to create shipment");
        },
      });
    else
      createShipment(payload, {
        onSuccess: (res) => {
          setHasSubmitted(true);
          toast.success(res.message || "Shipment created successfully");
          saveCreatedShipment(res.data);
          // save next step
          setStep((prev) => {
            const next = prev + 1;
            saveShipmentData({ step: next });
            return next;
          });
        },
        onError: (res) => {
          toast.error(res.message || "Failed to create shipment");
        },
      });
  };

  const handlePayment = () => {
    if (!isAuthenticated) {
      toast.error("Please login to make payment");
      router.push("/login");
    }

    if (!createdShipment?.id) return;

    makePayment(createdShipment.id, {
      onSuccess: (res) => {
        const authUrl = res.data.data.authorization_url;

        if (!authUrl) {
          toast.error("Payment initiation failed");
          return;
        }

        window.location.href = authUrl;
      },
    });
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
    <div>
      <Button
        onClick={handleBack}
        variant="ghost"
        className="mb-2.5 md:mb-5 p-0 h-fit hover:bg-transparent"
      >
        <ArrowLeft /> back
      </Button>
      {!isAuthenticated && <AuthPrompt />}

      <FormStep currentStep={step} setStep={setStep} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
          <div className="mt-5 md:mt-7.5 p-4 md:p-6 md:py-8 bg-white rounded-lg">
            {shipmentForms()}

            <div className="flex max-md:flex-col justify-between gap-4 w-full mt-12 md:mt-12.5">
              <Button
                onClick={() => setShowConfirm(true)}
                variant="outline"
                type="button"
                className="md:w-[215px] h-13.75 rounded-md border-brand-gray/40"
              >
                Cancel Shipment
              </Button>
              {step < 2 && (
                <Button
                  onClick={handleNext}
                  type="button"
                  className="w-full md:w-[215px] h-13.75 rounded-md"
                >
                  Next Step
                </Button>
              )}

              {/* Separate button of type 'submit" to submit shipment details is needed rather than
            conditionally using step to assign button type due to some funny
            default form behaviour thereby introducing a bug */}
              {step === 2 && (
                <Button
                  type="submit"
                  className="w-full md:w-[215px] h-13.75 rounded-md"
                >
                  Next Step
                </Button>
              )}

              {step === 3 && (
                <Button
                  onClick={handlePayment}
                  type="button"
                  className="w-full md:w-[215px] h-13.75 rounded-md"
                >
                  Make Payment
                </Button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>

      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        onConfirm={cancelShipment}
        desc="You are about to cancel this shipment. This action may stop delivery processing and cannot always be reversed. Do you want to proceed?"
      />
    </div>
  );
};

export default ShipmentForm;
