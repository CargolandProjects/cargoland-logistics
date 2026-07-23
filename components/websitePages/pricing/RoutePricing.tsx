// components/RoutePricing.tsx
import { CurveArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ShipmentType } from "@/lib/services/pricing.service";
import { useRouter } from "next/navigation";

// Bracket type to support both international and domestic
type Bracket = {
  minWeight: string;
  maxWeight: string;
  // International
  airFreightRate?: string;
  oceanFreightRate?: string;
  roadFreightRate?: string;
  // Domestic
  ratePerkg?: string;
};

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
      <div className="mt-6 md:mt-10 p-4 border rounded-lg bg-gray-50 text-center">
        <p className="text-xl font-medium leading-7">
          {fromWhere} → {toWhere}
        </p>
        <p className="mt-1 text-gray-500">No freight options for this weight</p>
      </div>
    );
  }

  // Determine which fields are present
  const hasInternationalRates =
    matchingBracket.airFreightRate !== undefined ||
    matchingBracket.oceanFreightRate !== undefined ||
    matchingBracket.roadFreightRate !== undefined;

  let freightPrices: { key: string; label: string; rate: number }[] = [];

  if (hasInternationalRates) {
    const rates = {
      air: parseFloat(matchingBracket.airFreightRate || "0") || 0,
      ocean: parseFloat(matchingBracket.oceanFreightRate || "0") || 0,
      road: parseFloat(matchingBracket.roadFreightRate || "0") || 0,
    };
    freightPrices = [
      { key: "air", label: "Air Freight", rate: rates.air },
      { key: "ocean", label: "Ocean Freight", rate: rates.ocean },
      { key: "road", label: "Road Freight", rate: rates.road },
    ].filter(({ rate }) => rate > 0);
  } else if (matchingBracket.ratePerkg !== undefined) {
    const rate = parseFloat(matchingBracket.ratePerkg) || 0;
    if (rate > 0) {
      freightPrices = [{ key: "domestic", label: "Road Freight", rate }];
    }
  }

  // console.log("Freight Prices: ", freightPrices);

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

  const route = hasInternationalRates
    ? "/shipment"
    : "/shipment?shipmentType=DOMESTIC";

  return (
    <div className="space-y-6">
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
                onClick={() => router.push(route)}
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
