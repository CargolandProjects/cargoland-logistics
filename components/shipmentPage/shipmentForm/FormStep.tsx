import CheckboxMarkedCircle from "@/components/icons/CheckboxMarkedCircle";
import CheckboxMarkedOutline from "@/components/icons/CheckboxMarkedOutline";
import EditCircle from "@/components/icons/EditCircle";

const steps = [
  "Shipper details",
  "Receiver details",
  "Shipment details",
  "Payment",
];

const FormStep = ({
  currentStep,
  setStep,
}: {
  currentStep: number;
  setStep: (value: number) => void;
}) => {
  return (
    <section className="px-6 pt-8 pb-6 bg-white">
      <div className="flex justify-between">
        {steps.map((step, idx) => {
          const activeStep = currentStep === idx;
          const finishedStep = idx < currentStep;
          const showEdit = finishedStep || activeStep;
          const showHbar = idx !== steps.length - 1;
          return (
            <div
              className="relative flex-1 flex flex-col items-center"
              key={idx}
            >
              <div className="relative z-10 bg-white">
                {activeStep || finishedStep ? (
                  <CheckboxMarkedCircle className="text-primary z-10 relative" />
                ) : (
                  <CheckboxMarkedOutline className="text-brand-gray" />
                )}
              </div>
              {showHbar && (
                <div className="absolute top-3 left-1/2 h-px w-full z-2 bg-brand-gray/35 " />
              )}

              <div className="flex gap-1 mt-2 items-center">
                <p
                  className={` text-xs max-md:font-medium max-md:leading-4.5 max-md:text-center md:text-lg ${
                    activeStep || finishedStep
                      ? "text-black"
                      : "text-brand-gray"
                  } `}
                >
                  {step}
                </p>
                {showEdit && (
                  <button onClick={() => setStep(idx)}>
                    <EditCircle className="size-4.5 text-black" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FormStep;
