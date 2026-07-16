import { whyUs } from "@/assets/images";
import { LocationPin } from "@/components/icons";
import { Globe, ShieldCheck, Tag } from "lucide-react";
import Image from "next/image";

const services = [
  { 
    title: "Fully Insured Shipments",
    description:
      "Delivering your shipments safely, on time, and with complete peace of mind.",
    icon: ShieldCheck,
  },
  {
    title: "Real-Time Visibility",
    description:
      "Monitor every shipment with live updates from pickup to delivery.",
    icon: LocationPin,
  },
  {
    title: "Transparent Live Pricing",
    description:
      "Get instant shipping quotes with no hidden fees or unexpected costs.",
    icon: Tag,
  },
  {
    title: "Wide Global Coverage",
    description:
      "Ship across Africa and worldwide through our trusted logistics network.",
    icon: Globe,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="padding-y px-4 md:px-6 lg:px-28">
      <div>
        <h2 className="sec-heading">Why Client Choose Us</h2>
        <p className="sec-paragraph">
          We don’t just deliver package, we deliver peace of mind.
        </p>
      </div>

      <div className=" mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="grid grid-rows-2 gap-4">
          {services.slice(0, 2).map((service, idx) => (
            <div
              key={idx}
              className="p-4 md:px-6 md:py-8.5 flex-1 rounded-[16px] bg-[#FCFCFC]"
            >
              <div className="bg-primary/10  rounded-full size-10 flex items-center justify-center">
                <service.icon className="size-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-bold leading-8">
                {service.title}
              </h3>
              <p className="mt-1 text-base text-gray-400 leading-6 ">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-lg:hidden bg-neutral-200/20 rounded-[16px] overflow-hidden ">
          <Image
            src={whyUs}
            alt="what we do image"
            className="size-full object-cover"
          />
        </div>

        <div className="grid grid-rows-2 gap-4">
          {services.slice(2, 4).map((service, idx) => (
            <div
              key={idx}
              className="p-6 md:px-6 md:py-8.5 flex-1 rounded-[16px] bg-[#FCFCFC]"
            >
              <div className="bg-primary/10  rounded-full size-10 flex items-center justify-center">
                <service.icon className="size-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-bold leading-8">
                {service.title}
              </h3>
              <p className="mt-1 text-base text-gray-400 leading-6 ">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
