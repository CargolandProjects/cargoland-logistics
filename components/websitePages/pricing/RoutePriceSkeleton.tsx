// components/RoutePriceSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export const RoutePriceSkeleton = () => {
  return (
    <div className="px-4 py-4.5 flex max-md:flex-col md:gap-1 justify-between rounded-lg bg-white overflow-hidden">
      {/* Left side: origin → destination */}
      <div className="">
        <div className="flex items-center max-md:justify-between gap-4">
          <Skeleton className="h-5 md:h-7 w-16" />
          <Skeleton className="h-4.5 w-6 text-gray-200" />
          <Skeleton className="h-5 md:h-7 w-16" />
        </div>
        <Skeleton className="max-md:hidden mt-3 h-4 w-24" />
      </div>

      {/* Right side: price & button */}
      <div className="max-md:mt-4 max-md:grid grid-cols-2">
        <Skeleton className="md:hidden mt-2 h-3 w-16" />
        <div className="text-xl md:text-2xl font-semibold leading-6 md:leading-7 max-md:justify-self-end truncate max-w-[160px] xxs:max-w-[220px] sm: md:max-w-[160px] lg:max-w-[220px]">
          <Skeleton className="h-6 w-28" />
        </div>
        <div className="mt-1 flex justify-end col-span-2">
          <Skeleton className="px-9.5 max-md:w-full h-10 md:h-12 w-32 rounded" />
        </div>
      </div>
    </div>
  );
};
