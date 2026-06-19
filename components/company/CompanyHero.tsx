import { howItWorks } from "@/assets/images";
import Image from "next/image";

const CompanyHero = () => {
  return (
    <section className="padding-x pb-[80px] mt-15 md:mt-11.5 md:pb-15">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 max-md:py-6 flex flex-col justify-center">
          <h1 className="text-2xl md:text-[60px] font-extrabold leading-8 md:leading-[72px]">
            Fast, Reliable{" "}
            <span className="font-montserrat text-2xl md:text-[60px] font-extrabold leading-8 md:leading-[72px] text-primary">
              Global
            </span>{" "}
            <br className="sm:hidden" />
            Shipping Solutions
          </h1>
          <p className="mt-4 text-sm md:text-lg font-light leading-5 md:leading-7">
            Cargoland Africa is a trusted logistics platform providing fast,
            secure, and reliable shipping solutions across Africa and globally,
            offering air, ocean, and road freight with real-time tracking and
            seamless booking experience.
          </p>
          <p className="mt-4 text-sm md:text-lg font-light leading-5 md:leading-7">
            Cargoland Africa delivers fast, secure logistics across Africa and
            beyond, offering air, ocean, and road freight with real-time
            tracking.
          </p>
        </div>

        <div className="max-md:h-[372px] lg:max-h-[569px] max-md:rounded-lg overflow-hidden bg-amber-100">
          <Image
            src={howItWorks}
            alt="company page hero image"
            className="size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default CompanyHero;
