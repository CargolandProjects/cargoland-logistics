import { ArrowRight } from "../icons";
import { Button } from "../ui/button";

const prices = [
  {
    origin: "NG",
    destination: "GB",
    freight: "Air Freight Express",
    period: "Delivery 2-3 Business Days",
    price: "₦30,500.50",
  },
  {
    origin: "NG",
    destination: "GB",
    freight: "Ocean Freight Express",
    period: "Delivery 2-3 Business Days",
    price: "₦30,500.50",
  },
  {
    origin: "NG",
    destination: "GB",
    freight: "Road Freight Express",
    period: "Delivery 2-3 Business Days",
    price: "₦30,500.50",
  },
];
const ShippingPrices = () => {
  return (
    <section className="padding-x py-20 md:py-25">
      <div className="grid md:grid-cols-2 gap-6 md:gap-4 lg:gap-15">
        <div className="max-md:flex flex-col">
          <h2 className="sec-heading">
            Shipping Prices Today
          </h2>
          <p className="sec-paragraph">
            Real-time shipping rates per kilogram across popular international
            routes.
          </p>

          <Button className="mt-6 py-3 px-5 h-auto text-base leading-6 rounded-lg w-fit mx-auto">
            Book Shipment
          </Button>
        </div>

        <div className="space-y-4">
          {prices.map((price, idx) => (
            <div
              key={idx}
              className="p-6 flex max-md:flex-col justify-between border rounded-lg bg-neutral-50/80"
            >
              {/* right side */}
              <div className="flex max-md:flex-col md:items-center gap-4.5">
                <div className="flex gap-2 items-center">
                  <p className="text-base font-semibold leading-6">
                    {price.origin}
                  </p>
                  <ArrowRight className="size-4.5" />
                  <p className="text-base font-semibold leading-6">
                    {price.destination}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xl font-bold leading-7.5">
                    {price.freight}
                  </p>
                  <p className="font-medium text-gray-500/80">{price.period}</p>
                </div>
              </div>

              {/* price + action */}
              <div className="max-md:mt-6 flex flex-col max-md:gap-6 justify-between">
                <p className="text-2xl font-bold leading-8">{price.price}</p>
                <Button variant="outline" className="py-3 px-5 h-auto rounded-lg border-primary">Book Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShippingPrices;
