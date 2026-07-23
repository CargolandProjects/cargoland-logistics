import { ArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Pricing } from "@/lib/services/pricing.service";
import { useRouter } from "next/navigation";
import CardSkeleton from "../websitePages/pricing/CardSkeleton";

const InternationalCards = ({
  livePrices,
  isLoading,
  isError,
  isSuccess,
}: {
  livePrices: Pricing[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="md:hidden bg-white rounded-lg  overflow-hidden">
      <h3 className="py-3 px-4 bg-primary-light  uppercase font-roboto">
        Route
      </h3>

      {isLoading && <CardSkeleton ShipmentType="INTERNATIONAL" />}

      {/* Error State */}
      {isError && (
        <div className="p-6 text-center text-red-400">
          Failed to Load Prices
        </div>
      )}

      {isSuccess && (
        <>
          {/* Empty State */}
          {livePrices.length === 0 && (
            <div className="p-6 text-center">No data found</div>
          )}

          <div>
            {livePrices.length > 0 &&
              livePrices.map((price, idx) => (
                <div
                  key={idx}
                  className={`${idx !== livePrices.length - 1 && "border-b"} p-6 `}
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3.5">
                      <p className="text-base capitalize">{price.fromWhere}</p>
                      <ArrowRight className="size-4.5 text-primary" />
                      <p className="text-base capitalize">{price.toWhere}</p>
                    </div>
                    {/* Trend */}
                    {/* <p
                            className={`${price.trend < 0 ? " text-red-500" : " text-green-500"} text-base font-bold flex gap-0.75 items-center`}
                          >
                            {price.trend < 0 ? (
                              <TrendingDown className="size-4.5" />
                            ) : (
                              <TrendingUp className="size-4.5" />
                            )}
                            {price.trend > 0 ? `+${price.trend}` : price.trend}%
                          </p> */}
                  </div>

                  {/* <div className="mt-2 flex gap-1 items-center">
                          <p className="text-gray-400">{price.routeAir}</p>
                          <div className="size-1 rounded-full bg-neutral-200" />
                          <p className="text-gray-400">{price.routeOcean}</p>
                        </div> */}
                  <div className="mt-4.5 flex gap-2 max-xxs:justify-between xxs:gap-6">
                    <div className="space-y-2">
                      <p className="text-lg font-semibold leading-6.5 uppercase">
                        Air/kg
                      </p>
                      <p className="text-base font-bold">
                        {/* ₦{price.airFreightRate} */}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold leading-6.5 uppercase">
                        Land/kg
                      </p>
                      <p className="text-base font-bold">
                        {/* ₦{price.roadFreightRate} */}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold leading-6.5 uppercase">
                        Ocean/kg
                      </p>
                      <p className="text-base font-bold">
                        {/* ₦{price.oceanFreightRate} */}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => router.push("/shipment")}
                    variant="outline"
                    className="mt-6 py-3 h-auto w-full border-primary text-base font-normal text-primary hover:text-primary"
                  >
                    Book Now
                  </Button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
export default InternationalCards;
