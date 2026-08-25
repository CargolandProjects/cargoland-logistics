import { ShipmentVolume as SVolume } from "@/lib/services/company.service";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

//   const shipmentVolume = [
//     { month: "Mar", volume: 45 },
//     { month: "Apr", volume: 68 },
//     { month: "May", volume: 32 },
//     { month: "Jun", volume: 90 },
//     { month: "Jul", volume: 75 },
//     { month: "Aug", volume: 50 },
//   ];

const ShipmentVolume = ({ volumeData }: { volumeData: SVolume[] }) => {
  const chartConfig = {
    volume: {
      label: "shipments",
      color: "#273583",
    },
  } satisfies ChartConfig;

  // Check if all volumes are zero (or if data is empty)
  const hasData = volumeData?.some((item) => item.volume > 0);

  return (
    <div className="p-6 rounded-md bg-white">
      <h2 className="text-base font-bold">Shipment Volume</h2>
      <p className="mt-1 font-light">Monthly shipments over time</p>

      <ChartContainer
        config={chartConfig}
        className="relative xs:h-[200px] sm:h-[280px] w-full mt-4"
      >
        <BarChart
          accessibilityLayer
          data={volumeData}
          margin={{ left: -35, right: 16, top: 16, bottom: 0 }}
          barCategoryGap="9%"
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#e5e7eb"
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            tick={{ fontSize: 14 }}
          />
          <YAxis
            dataKey="volume"
            type="number"
            tickLine={false}
            axisLine={false}
            tickMargin={0}
            allowDecimals={false}
            hide={!hasData}
            // domain={[0, "dataMax + 10"]}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar
            dataKey="volume"
            fill="var(--color-volume)"
            radius={[8, 8, 0, 0]}
            // 🔥 FIX 4: Fixed bar width so it looks consistent
            // barSize={51}
          />
        </BarChart>
        {/* 🔥 FIX 5: Empty state overlay when all data is zero */}
        {!hasData && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-sm text-gray-400 bg-white/80 px-4 py-2 rounded-md">
              No shipment data for these months yet
            </p>
          </div>
        )}
      </ChartContainer>
    </div>
  );
};

export default ShipmentVolume;
