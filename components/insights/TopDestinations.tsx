import { TopDestination } from "@/lib/services/company.service";
import React from "react";

const TopDestinations = ({
  topDestData,
}: {
  topDestData: TopDestination[];
}) => {
  //   const maxCount = topDestData[0]?.shipmentCount;
  const total = topDestData.reduce((sum, item) => sum + item.shipmentCount, 0);

  //   console.log("Total:", total, "And Max Count: ", maxCount);
  return (
    <div className="p-6 rounded-md bg-white">
      <h2 className="text-base font-bold">Top Destinations</h2>

      {topDestData.length === 0 && (
        <div className="mt-4 flex items-center justify-center min-h-[200px]">
          <p className="text-sm text-gray-400">No destination data yet</p>
        </div>
      )}

      {topDestData.length > 0 && (
        <div className="mt-6 space-y-6 md:space-y-10">
          {topDestData.map((dest, idx) => {
            //   const fillWidth = (dest.shipmentCount / maxCount) * 100;
            const percentage = ((dest.shipmentCount / total) * 100).toFixed(0);

            return (
              <div key={idx} className="">
                <div className="flex justify-between items-end">
                  <p className="text-[#2F3237]">
                    {idx + 1}. {dest.city}, {dest.state}
                  </p>

                  <p className="text-xs text-[#2F3237] leading-4.5">
                    {dest.shipmentCount} shipments · {percentage}%
                  </p>
                </div>
                {/* Progress bar track */}
                <div className="mt-2 flex-1 h-2 bg-[#BCC0D9] rounded-full overflow-hidden">
                  {/* Fill bar */}
                  <div
                    className="h-full bg-[#273583] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopDestinations;
