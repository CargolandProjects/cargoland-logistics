import { companyImg } from "@/assets/images";
import Image from "next/image";

const OurMissionVision = () => {
  return (
    <section className="padding-x pb-20 ">
      <div className="py-20 md:py-25 grid md:grid-cols-2 gap-6 md:gap-10">
        {/* Vision */}
        <div className="px-4 md:px-8.5 py-6 md:py-10 space-y-4">
          <p className="text-base font-medium font-montserrat">
            Our{" "}
            <span className="text-base font-medium font-montserrat text-primary">
              Vision
            </span>
          </p>
          <h2 className="text-xl md:text-2xl font-bold leading-5 md:leading-8">
            To build Africa&apos;s most trusted logistics infrastructure.
          </h2>
          <p className="text-sm md:text-lg font-light md:leading-7">
            Cargoland Africa is a trusted logistics platform providing fast,
            secure, and reliable shipping solutions across Africa and globally,
            offering air, ocean, and road freight with real-time tracking and
            seamless booking experience.
          </p>
        </div>

        {/* Mission */}
        <div className="px-4 md:px-8.5 py-6 md:py-10 space-y-4">
          <p className="text-base font-medium font-montserrat">
            Our{" "}
            <span className="text-base font-medium font-montserrat text-primary">
              Mission
            </span>
          </p>
          <h2 className="text-xl md:text-2xl font-bold leading-5 md:leading-8">
            To build Africa&apos;s most trusted logistics infrastructure.{" "}
          </h2>
          <p className="text-sm md:text-lg font-light md:leading-7">
            Cargoland Africa is a trusted logistics platform providing fast,
            secure, and reliable shipping solutions across Africa and globally,
            offering air, ocean, and road freight with real-time tracking and
            seamless booking experience.
          </p>
        </div>
      </div>

      <div className="h-[451px] rounded-lg overflow-hidden bg-amber-100">
        <Image src={companyImg} alt="section image" className="size-full object-cover object-top max-xs:object-[-350px_0]" />
      </div>
    </section>
  );
};

export default OurMissionVision;
