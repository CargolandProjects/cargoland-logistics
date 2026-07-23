// components/RoutePricing.tsx
import { CurveArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Bracket, ShipmentType } from "@/lib/services/pricing.service";
import { useRouter } from "next/navigation";

interface RoutePricingProps {
  id?: string;
  fromWhere: string;
  toWhere: string;
  shipmentType?: ShipmentType;
  brackets: Bracket[];
  weight: number; // numeric weight in kg
  isPopularRoute?: boolean;
}

export const RoutePricing = ({
  fromWhere,
  toWhere,
  brackets,
  weight,
}: RoutePricingProps) => {
  const router = useRouter();

  // Find matching bracket
  const matchingBracket = brackets.find((b) => {
    const min = parseFloat(b.minWeight);
    const max = parseFloat(b.maxWeight);
    return weight >= min && weight <= max;
  });

  if (!matchingBracket) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50 text-center text-gray-500">
        <p className="font-medium">
          {fromWhere} → {toWhere}
        </p>
        <p className="text-sm">No pricing available for {weight} kg</p>
      </div>
    );
  }

  const rates = {
    air: parseFloat(matchingBracket.airFreightRate) || 0,
    ocean: parseFloat(matchingBracket.oceanFreightRate) || 0,
    road: parseFloat(matchingBracket.roadFreightRate) || 0,
  };

  const freightPrices = [
    { key: "air", label: "Air Freight", rate: rates.air },
    { key: "ocean", label: "Ocean Freight", rate: rates.ocean },
    { key: "road", label: "Road Freight", rate: rates.road },
  ].filter(({ rate }) => rate > 0);

  console.log("Freight Prices: ", freightPrices);

  if (freightPrices.length === 0) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50 text-center text-gray-500">
        <p className="font-medium">
          {fromWhere} → {toWhere}
        </p>
        <p className="text-sm">No freight options for this weight</p>
      </div>
    );
  }

  return (
    <div>
      {freightPrices.map((price) => (
        <div key={price.key} className="p-4 rounded-lg bg-gray-200">
          <div className="px-4 py-4.5 flex max-md:flex-col justify-between rounded-lg bg-white">
            {/* origin - destination & freight Type */}
            <div>
              <div className="flex items-center gap-4">
                <p className="text-xl font-medium leading-7">{fromWhere}</p>
                <CurveArrowRight className="size-4.5" />
                <p className="text-xl font-medium leading-7">{toWhere}</p>
              </div>

              <p className="mt-2 uppercase">{price.label}</p>
            </div>
            {/* Price & Book btn */}
            <div className="max-md:mt-2.5 flex max-md:flex-col md:items-center gap-2.5">
              <p className="text-2xl font-semibold leading-7">
                ₦{price.rate.toLocaleString()}
              </p>
              <Button
                onClick={() => router.push("/shipment")}
                className="px-9.5 py-4.5 h-auto text-base font-normal leading-6"
              >
                Book Shipment
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
