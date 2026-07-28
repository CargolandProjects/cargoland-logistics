// components/RoutePricing.tsx
import { CurveArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ShipmentType } from "@/lib/services/pricing.service";
import { useRouter } from "next/navigation";

interface RoutePricingProps {
  fromWhere: string;
  toWhere: string;
  freightType: string; // "Air Freight", "Ocean Freight", etc.
  shipmentType: ShipmentType;
  rate: number;
  weight: number;
  // "/shipment?shipmentType=..."
}

export const RoutePrice = ({
  fromWhere,
  toWhere,
  freightType,
  shipmentType,
  rate,
  weight,
}: RoutePricingProps) => {
  const router = useRouter();

  const route =
    shipmentType === "INTERNATIONAL"
      ? "/shipment?shipmentType=INTERNATIONAL"
      : "/shipment?shipmentType=DOMESTIC";

  return (
    <div className="px-4 py-4.5 flex max-md:flex-col md:gap-1 justify-between rounded-lg bg-white overflow-hidden">
      {/* origin - destination & freight Type */}
      <div className="">
        <div className="flex items-center max-md:justify-between gap-4">
          <p className="md:text-lg font-medium leading-5 md:leading-7">
            {fromWhere}
          </p>
          <CurveArrowRight className="size-4.5" />
          <p className="md:text-lg font-medium leading-5 md:leading-7">
            {toWhere}
          </p>
        </div>

        <p className="max-md:hidden mt-3 uppercase">{freightType}</p>
      </div>

      {/* Price & Book btn */}
      <div className="max-md:mt-4  max-md:grid grid-cols-2">
        <p className="md:hidden mt-2 uppercase text-[10px] leading-4.5">
          {freightType}
        </p>
        <p className="text-xl md:text-2xl font-semibold leading-6 md:leading-7 max-md:justify-self-end truncate max-w-[160px] xxs:max-w-[220px] sm: md:max-w-[160px] lg:max-w-[220px]">
          {weight > 0 && (
            <span className="font-semibold leading-6 text-gray-400">
              {weight}kg @{" "}
            </span>
          )}
          NGN{rate.toLocaleString()}
        </p>
        <div className="mt-1 flex justify-end col-span-2">
          <Button
            onClick={() => router.push(route)}
            className="px-9.5 max-md:w-full h-10 md:h-12 text-sm md:text-base font-normal leading-5.5 md:leading-6 max-md:col-span-2"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};
