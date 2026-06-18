import { ArrowRight, DeliveryTruck, Plane, Ship } from "../icons";
import { Button } from "../ui/button";

const freights = [
  {
    title: "Air Freight",
    desc: "Fast air freight shipping with secure handling globally.",
    action: "Ship via air",
    icon: Plane,
  },
  {
    title: "Ocean Freight",
    desc: "Reliable ocean freight shipping with large capacity and affordability.",
    action: "Ship via air",
    icon: Ship,
  },
  {
    title: "Road Freight",
    desc: "Reliable road freight with tracked vehicles and delivery.",
    action: "Ship via air",
    icon: DeliveryTruck,
  },
];

const ChooseFreight = () => {
  return (
    <section className="padding-y px-4 md:px-6 lg:px-28">
      <div>
        <h2 className="sec-heading">
          Choose Your Freight
        </h2>
        <p className="sec-paragraph">
          Flexible shipping solutions tailored to your needs from express air to
          economical ocean freight.
        </p>
      </div>

      <div className="mt-6 md:mt-10 grid md:grid-cols-3 gap-6 max-w-[1216px] mx-auto">
        {freights.map((freight, idx) => (
          <div
            key={idx}
            className="relative flex flex-col px-7 pt-8 pb-[51px] rounded-lg bg-[#FBDEDF] overflow-hidden"
          >
            <freight.icon className="size-75 absolute -bottom-34.5 -right-15 text-[#F6BABC]" />
            
            <div className="size-14 flex items-center justify-center bg-primary rounded-full">
              <freight.icon className="size-8 text-white" />
            </div>

            <div className="flex-1 mt-3 relative flex flex-col">
              <h3 className="text-2xl font-bold leading-8">{freight.title}</h3>
              <p className="grow mt-4 text-base font-light leading-6">
                {freight.desc}
              </p>

              <Button className="mt-8 h-12 w-fit px-5 gap-2 text-primary rounded-lg bg-primary-light">
                {freight.action}
                <ArrowRight className="size-4.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChooseFreight;
