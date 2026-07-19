import { ArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { LocalPricing } from "@/lib/services/pricing.service";
import { useRouter } from "next/navigation";
import CardSkeleton from "./CardSkeleton";

const DomesticCards = ({
  localPrices,
  isLoading,
  isError,
  isSuccess,
}: {
  localPrices: LocalPricing[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="md:hidden bg-white rounded-lg  overflow-hidden">
      <h3 className="p-4 uppercase font-roboto border-b">Location</h3>

      {isLoading && <CardSkeleton ShipmentType="DOMESTIC" colCount={8} />}

      {/* Error State */}
      {isError && (
        <div className="p-6 text-center text-red-400">
          Failed to Load Prices
        </div>
      )}

      {isSuccess && (
        <>
          {/* Empty State */}
          {localPrices.length === 0 && (
            <div className="p-6 text-center">No data found</div>
          )}

          <div>
            {localPrices.length > 0 &&
              localPrices.map((price, idx) => (
                <div
                  key={idx}
                  className={`${idx !== localPrices.length - 1 && "border-b"} p-6 `}
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3.5">
                      <p className="text-base capitalize">{price.fromState}</p>
                      <ArrowRight className="size-4.5 text-primary" />
                      <p className="text-base capitalize">
                        {price.toWhereState}
                      </p>
                    </div>
                  </div>

                  {/* prices/kg */}
                  <div className="mt-4.5 flex gap-2 max-xxs:justify-between w-full xxs:gap-6 overflow-x-auto">
                    <div className="shrink-0 space-y-2">
                      <p className="text-lg font-semibold leading-6.5 text-gray-400">
                        0-3(kg)
                      </p>
                      <p className="text-base font-bold">
                        ₦{price.brackets[0]?.ratePerkg}
                      </p>
                    </div>

                    {price.brackets.map((b, idx) => (
                      <div key={idx} className="shrink-0 space-y-2">
                        <p className="text-lg font-semibold leading-6.5 text-gray-400">
                          {idx + 3} (kg)
                        </p>
                        <p
                          className={`${!b?.ratePerkg && "text-center"} text-base font-bold`}
                        >
                          {b?.ratePerkg ? ` ₦${b.ratePerkg}` : "-"}
                        </p>
                      </div>
                    ))}
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
export default DomesticCards;
