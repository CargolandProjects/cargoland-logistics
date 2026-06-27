import { ArrowRight } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className={`${idx !== 4 && "border-b"} p-6`}>
          <div className="flex justify-between">
            <div className="flex items-center gap-3.5">
              <Skeleton className="h-5 w-16 capitalize" />
              <ArrowRight className="size-4.5 text-neutral-200 animate-pulse" />
              <Skeleton className="h-5 w-16 capitalize" />
            </div>
          </div>

          <div className="mt-4.5 flex gap-2 max-xxs:justify-between xxs:gap-6">
            <div className="space-y-2">
              <Skeleton className="text-lg font-semibold leading-6.5 uppercase text-neutral-700">
                Air/kg
              </Skeleton>
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="space-y-2">
              <Skeleton className="text-lg font-semibold leading-6.5 uppercase text-neutral-700">
                Land/kg
              </Skeleton>
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="space-y-2">
              <Skeleton className="text-lg font-semibold leading-6.5 uppercase text-neutral-700">
                Ocean/kg
              </Skeleton>
              <Skeleton className="h-5 w-16" />
            </div>
          </div>

          <Skeleton className="mt-6 h-11 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
