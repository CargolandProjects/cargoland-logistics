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
  isTodayOrFuture,
  isValidPickupTime,
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
import PaymentModal from "./PaymentModal";
import { useChargeWallet } from "@/lib/hooks/mutation/useWallet";
import { normalizeCountryName } from "@/lib/utils/countryOptions";

export type PaymentMethod = "WALLET" | "ONLINE";

const ShipmentForm = () => {
  const { mutate: createShipment } = useCreateShipment();
  const { mutate: createShipmentUser } = useCreateShipmentUser();
  const { mutate: makePayment, isPending: isPaying } = useMakePayment();
  const { mutate: chargeWallet, isPending: isCharging } = useChargeWallet();
  const formData = useShipmentStore((s) => s.formData);
  const createdShipment = useShipmentStore((s) => s.createdShipment);
  const setShipmentFlow = useShipmentStore((s) => s.setShipmentFlow);
  const freightType = useShipmentStore((s) => s.freightType);
  const shipmentType = useShipmentStore((s) => s.shipmentType);
  const saveShipmentData = useShipmentStore((s) => s.setFormData);
  const saveCreatedShipment = useShipmentStore((s) => s.setCreatedShipment);
  const clearShipment = useShipmentStore((s) => s.clearShipment);
  const { isAuthenticated } = useSession();
  const router = useRouter();

  const [step, setStep] = useState(3);
  const [open, setOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasHydrated = useRef(false);

  //   clearShipmentForm();
  // console.log("form data: ", formData);

  const form = useForm<ShipmentDataType>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: defaultShipmentValues,
    // defaultValues: defaultShipmentValues as unknown as ShipmentDataType,
  });

  const formValues = useWatch({ control: form.control });
  const isDomestic = shipmentType === "DOMESTIC";

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
    setStep(formData.step ?? 0);

    // Restore form values
    const restoredData = {
      ...defaultShipmentValues,
      ...formData.data,
      ...(shipmentType && { shipmentType }),
    };

    // If domestic and country not set, default to Nigeria
    if (isDomestic) {
      if (!restoredData.country) {
        restoredData.country = "Nigeria";
      }
      if (!restoredData.receiverCountry) {
        restoredData.receiverCountry = "Nigeria";
      }
    }

    form.reset(restoredData);
    hasHydrated.current = true;
  }, [form, formData, isDomestic, shipmentType]);

  // React to shipmentType changes during the session
  useEffect(() => {
    if (isDomestic) {
      form.setValue("country", "Nigeria", { shouldValidate: false });
      form.setValue("receiverCountry", "Nigeria", { shouldValidate: false });
    }
    // When switching to INTERNATIONAL, we leave the country as-is (user can change)
  }, [form, isDomestic]);

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
      "fromState",
      "fromCity",
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
      "toWhereState",
      "toWhereCity",
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
    // 1. First, run the standard field validation for the current step

    const isValid = await form.trigger(stepFields[step]);
    if (!isValid) {
      // console.log("form errors", form.formState.errors);
      //   console.log("IsValid ? ", isValid);
      return;
    }

    // 2. Get current form values
    const data = form.getValues();

    // 3. Step 0 specific cross-field validations
    if (step === 0) {
      let hasError = false;

      // 3a. clear pickup date/time if the address is DROP_OFF
      if (
        data.pickUpAddressType === "DROP_OFF" &&
        (data.pickupDate || data.pickupTime)
      ) {
        form.setValue("pickupDate", "");
        form.setValue("pickupTime", "");
      }

      // 3b. Validate State/City based on shipment type
      if (shipmentType === "INTERNATIONAL") {
        if (!data.stateOrCity || data.stateOrCity.trim() === "") {
          form.setError("stateOrCity", {
            type: "manual",
            message: "State/City is required",
          });
          hasError = true;
        }
      } else if (isDomestic) {
        if (!data.fromState || data.fromState.trim() === "") {
          form.setError("fromState", {
            type: "manual",
            message: "Origin State is required",
          });
          hasError = true;
        }
        if (!data.fromCity || data.fromCity.trim() === "") {
          form.setError("fromCity", {
            type: "manual",
            message: "Origin City is required",
          });
          hasError = true;
        }
      }

      // 3c. Validate Pickup Date/Time based on pickup address type
      if (data.pickUpAddressType !== "DROP_OFF") {
        if (!data.pickupDate || data.pickupDate.trim() === "") {
          form.setError("pickupDate", {
            type: "manual",
            message: "Pickup date is required",
          });
          hasError = true;
        }
        if (!data.pickupTime || data.pickupTime.trim() === "") {
          form.setError("pickupTime", {
            type: "manual",
            message: "Pickup time is required",
          });
          hasError = true;
        }
      }

      // 3d. Validate date/time validity if both are provided
      if (data.pickupDate && data.pickupTime) {
        if (!isTodayOrFuture(data.pickupDate)) {
          form.setError("pickupDate", {
            type: "manual",
            message: "Pickup date must be today or a future date",
          });
          hasError = true;
        }
        if (!isValidPickupTime(data.pickupTime)) {
          form.setError("pickupTime", {
            type: "manual",
            message: "Pickup time must be between 8:00 AM and 8:00 PM",
          });
          hasError = true;
        }
        const pickupDateTime = new Date(
          `${data.pickupDate}T${data.pickupTime}`,
        );
        const now = new Date();
        if (pickupDateTime.getTime() <= now.getTime()) {
          form.setError("pickupTime", {
            type: "manual",
            message: "Pickup date and time must be in the future",
          });
          hasError = true;
        }
      }

      if (hasError) {
        // Focus on the first error field
        const firstError = Object.keys(
          form.formState.errors,
        )[0] as keyof ShipmentDataType;
        if (firstError) {
          const element = document.querySelector(
            `[name="${firstError}"]`,
          ) as HTMLElement;
          if (element) element.focus();
        }
        return;
      }
    }

    // 4. Step 1 specific cross-field validations (Receiver details)
    if (step === 1) {
      let hasError = false;

      // Validate receiver state/city based on shipment type
      if (shipmentType === "INTERNATIONAL") {
        if (
          !data.receiverStateOrCity ||
          data.receiverStateOrCity.trim() === ""
        ) {
          form.setError("receiverStateOrCity", {
            type: "manual",
            message: "State/City is required",
          });
          hasError = true;
        }
      } else if (isDomestic) {
        if (!data.toWhereState || data.toWhereState.trim() === "") {
          form.setError("toWhereState", {
            type: "manual",
            message: "Destination State is required",
          });
          hasError = true;
        }
        if (!data.toWhereCity || data.toWhereCity.trim() === "") {
          form.setError("toWhereCity", {
            type: "manual",
            message: "Destination City is required",
          });
          hasError = true;
        }
      }

      if (hasError) {
        // Focus on the first error field
        const firstError = Object.keys(
          form.formState.errors,
        )[0] as keyof ShipmentDataType;
        if (firstError) {
          const element = document.querySelector(
            `[name="${firstError}"]`,
          ) as HTMLElement;
          if (element) element.focus();
        }
        return;
      }
    }

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

  // Create Shipment
  const onSubmit = (data: ShipmentDataType) => {
    if (!isAuthenticated) {
      toast.error("Please login to create shipment");
      router.push("/login");
      return;
    }

    // remove unnecessary fields depending on shipment type
    const payload = isDomestic
      ? {
          ...data,
          shipmentType: shipmentType,
          freightType: freightType,
          stateOrCity: "",
          receiverStateOrCity: "",
          // Normalize or return country name
          country: normalizeCountryName(data.country),
          receiverCountry: normalizeCountryName(data.receiverCountry),
        }
      : {
          ...data,
          shipmentType: shipmentType!,
          freightType: freightType,
          fromState: "",
          fromCity: "",
          toWhereState: "",
          toWhereCity: "",
          // Normalize or return country name
          country: normalizeCountryName(data.country),
          receiverCountry: normalizeCountryName(data.receiverCountry),
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

  // Make Payment
  const handlePayment = (method: PaymentMethod) => {
    if (!isAuthenticated) {
      toast.error("Please login to make payment");
      router.push("/login");
      return;
    }

    if (!createdShipment?.id) return;

    if (method === "WALLET")
      chargeWallet(
        {
          amount: createdShipment.price,
          shipmentId: createdShipment.id,
        },
        {
          onSuccess: (res) => {
            toast.success(res.message || "Payment SUccessful");
            clearShipment();
            router.push(`/my-shipment/${createdShipment.id}`);
          },
        },
      );

    if (method === "ONLINE")
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
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            // Show toast for validation errors
            const firstErrorKey = Object.keys(
              errors,
            )[0] as keyof ShipmentDataType;
            if (firstErrorKey) {
              const error = errors[firstErrorKey];
              if (error?.message) {
                toast.error(error.message);
              } else {
                toast.error(
                  "Please complete all required fields in previous steps.",
                );
              }
            } else {
              toast.error(
                "Please complete all required fields in previous steps.",
              );
            }
          })}
          autoComplete="off"
        >
          <div className="mt-5 md:mt-7.5 p-4 md:p-6 md:py-8 bg-white rounded-lg">
            {shipmentForms()}

            {/* Action Buttons */}
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
                  onClick={() => setOpen(true)}
                  disabled={isPaying || isCharging}
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

      <PaymentModal
        open={open}
        setOpen={setOpen}
        handlePayment={handlePayment}
      />

      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        onConfirm={clearShipment}
        desc="You are about to cancel this shipment. This action may stop delivery processing and cannot always be reversed. Do you want to proceed?"
      />
    </div>
  );
};

export default ShipmentForm;
