import CheckboxMarkedCircle from "@/components/icons/CheckboxMarkedCircle";
import CheckboxMarkedOutline from "@/components/icons/CheckboxMarkedOutline";
import EditCircle from "@/components/icons/EditCircle";

const steps = [
  "Shipper details",
  "Receiver details",
  "Shipment details",
  "Payment",
];

const FormStep = ({ currentStep }: { currentStep: number }) => {
  return (
    <section className="px-6 pt-8 bg-white">
      <div className="flex justify-between">
        {steps.map((step, idx) => {
          const activeStep = currentStep === idx;
          const finishedStep = idx < currentStep;
          return (
            <div className="flex flex-col items-center " key={idx}>
              <div>
                {activeStep || finishedStep ? (
                  <CheckboxMarkedCircle className="text-primary" />
                ) : (
                  <CheckboxMarkedOutline className="text-brand-gray" />
                )}
              </div>
              <div className="flex gap-0.5 mt-2 items-center">
                <p
                  className={`text-base md:text-lg ${
                    activeStep || finishedStep ? "text-black" : "text-brand-gray"
                  } `}
                >
                  {step}
                </p>
                {activeStep && <EditCircle className="size-4.5 text--black" />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FormStep;
