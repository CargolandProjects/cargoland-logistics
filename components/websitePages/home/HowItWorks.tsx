import { howItWorks } from "@/assets/images";
import { Target } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    title: "Select shipping mode",
    description: "Choose Air, Ocean, or Road freight.",
  },
  {
    title: "Enter shipment details",
    description: "Pickup location, destination, weight, package type.",
  },
  {
    title: "Choose carrier & pay",
    description: "Select available carrier and complete payment.",
  },
  {
    title: "Track shipment",
    description: "Receive a unique tracking ID and monitor delivery.",
  },
];

const HowItWorks = () => {
  return (
    <section className="padding-y padding-x">
      <div className="">
        <h2 className="sec-heading">How It Works</h2>
        <p className="sec-paragraph">
          Get your shipment booked and tracked in four simple steps.
        </p>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="h-[372px] md:h-[554px] rounded-lg overflow-hidden">
          <Image
            src={howItWorks}
            alt="how it works section image"
            className="size-full object-cover object-top"
          />
        </div>
        <div className="p-6 lg:px-[58px] lg:py-[67px] flex flex-col justify-center">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`${idx !== steps.length - 1 && "pb-15"} relative flex gap-4`}
            >
              {idx !== steps.length - 1 && (
                <div
                  className="absolute w-px h-full left-[19.25px] lg:left-4.75"
                  style={{
                    background:
                      "repeating-linear-gradient(to bottom, #E32027 0, #E32027 4px, transparent 4px, transparent 8px)",
                    backgroundPosition: "center",
                  }}
                />
              )}
              <div className="relative size-10 flex items-center justify-center rounded-full bg-primary-light shrink-0">
                <Target className="size-5 text-primary" />
              </div>

              <div>
                <h3 className="text-xl font-bold leading-8 font-roboto">
                  {step.title}
                </h3>
                <p className="text-base text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
