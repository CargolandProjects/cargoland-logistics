import { ArrowRight } from "../../icons";

const popularRoutes = [
  {
    from: "Nigeria (NG)",
    to: "Ghana (GH)",
    time: "Delivery 2-3 Business Days",
  },
  {
    from: "Nigeria (NG)",
    to: "Ghana (GH)",
    time: "Delivery 2-3 Business Days",
  },
  {
    from: "Nigeria (NG)",
    to: "Ghana (GH)",
    time: "Delivery 2-3 Business Days",
  },
  {
    from: "Nigeria (NG)",
    to: "Ghana (GH)",
    time: "Delivery 2-3 Business Days",
  },
];

const PopularRoutes = () => {
  return (
    <div className="padding-x py-15 bg-primary">
      <div className="max-w-[402px] mx-auto text-white">
        <h2 className="sec-heading">Popular Routes</h2>
        <p className="sec-paragraph">
          Most active routes for fast shipping decisions
        </p>
      </div>

      <div className="mt-6 p-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8 bg-white rounded-lg">
        {popularRoutes.map((route, idx) => (
          <div key={idx} className="flex-1 p-6 rounded-lg bg-neutral-100 ">
            <div className="flex gap-2 items-center justify-center">
              <p className="text-base font-semibold">{route.from}</p>
              <ArrowRight className="size-4.5" />
              <p className="text-base font-semibold">{route.to}</p>
            </div>
            {/* <p className="mt-4 text-center">{route.time}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;
