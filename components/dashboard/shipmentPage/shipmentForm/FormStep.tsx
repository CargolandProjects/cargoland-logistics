import CheckboxMarkedCircle from "@/components/icons/CheckboxMarkedCircle";
import CheckboxMarkedOutline from "@/components/icons/CheckboxMarkedOutline";
import EditCircle from "@/components/icons/EditCircle";
import { Separator } from "@/components/ui/separator";

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
    <section className="px-6 pt-8 bg-white">
      <div className="flex justify-between">
        {steps.map((step, idx) => {
          const activeStep = currentStep === idx;
          const finishedStep = idx < currentStep;
          const showEdit = finishedStep || activeStep;
          return (
            <div className="flex flex-col items-center" key={idx}>
              <div className="relative">
                {activeStep || finishedStep ? (
                  <CheckboxMarkedCircle className="text-primary z-10 relative" />
                ) : (
                  <CheckboxMarkedOutline className="text-brand-gray" />
                )}
                {idx !== steps.length - 1 && (
                  <div
                    className={` ${
                      idx === steps.length - 2
                        ? "w-[18vw] sm:w-[120px] md:w-[20vw] lg:w-[18vw]  "
                        : "w-[22vw] sm:w-[160px] md:w-[240px]"
                    } h-px absolute left-5 top-1/2 transform translate-y-1/2 bg-brand-gray/40`}
                  />
                )}
              </div>
              <div className="flex gap-0.5 mt-2 items-center">
                <p
                  className={`text-base md:text-lg ${
                    activeStep || finishedStep
                      ? "text-black"
                      : "text-brand-gray"
                  } `}
                >
                  {step}
                </p>
                {showEdit && (
                  <button onClick={() => setStep(idx)}>
                    <EditCircle className="size-4.5 text--black" />
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
