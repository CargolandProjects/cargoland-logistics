import { ArrowRight } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { ShipmentType } from "@/lib/services/pricing.service";

const CardSkeleton = ({
  ShipmentType,
  rowCount = 5,
  colCount = 3,
}: {
  ShipmentType: ShipmentType;
  rowCount?: number;
  colCount?: number;
}) => {
  return (
    <div>
      {Array.from({ length: rowCount }).map((_, idx) => (
        <div key={idx} className={`${idx !== 4 && "border-b"} p-6`}>
          <div className="flex justify-between">
            <div className="flex items-center gap-3.5">
              <Skeleton className="h-5 w-16 capitalize" />
              <ArrowRight className="size-4.5 text-neutral-200 animate-pulse" />
              <Skeleton className="h-5 w-16 capitalize" />
            </div>
          </div>

          {ShipmentType === "INTERNATIONAL" && (
            <div className="mt-4.5 flex gap-2 max-xxs:justify-between xxs:gap-6">
              <div className="space-y-2">
                <p className="text-lg font-semibold leading-6.5 uppercase text-neutral-700 animate-pulse">
                  Air/kg
                </p>
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold leading-6.5 uppercase text-neutral-700 animate-pulse">
                  Land/kg
                </p>
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold leading-6.5 uppercase text-neutral-700 animate-pulse">
                  Ocean/kg
                </p>
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          )}

          {ShipmentType === "DOMESTIC" && (
            <div className="mt-4.5 flex gap-2 max-xxs:justify-between xxs:gap-6 overflow-x-auto hide-scrollbar">
              <div className="space-y-2 shrink-0">
                <p className="text-lg font-semibold leading-6.5 uppercase text-neutral-700 animate-pulse">
                  0-3 (Kg)
                </p>
                <Skeleton className="h-5 w-16" />
              </div>
              {Array.from({ length: colCount }).map((_, i) => (
                <div key={i} className="shrink-0 space-y-2">
                  <p className="text-lg font-semibold leading-6.5 uppercase text-neutral-700 animate-pulse">
                    {i + 3} kg
                  </p>
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
            </div>
          )}

          <Skeleton className="mt-6 h-11 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
