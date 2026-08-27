import { SpendingTrend as STrend } from "@/lib/services/company.service";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";

// const testData = [
//   { month: "Mar", amount: 305 },
//   { month: "Apr", amount: 408 },
//   { month: "May", amount: 302 },
//   { month: "Jun", amount: 450 },
//   { month: "Jul", amount: 405 },
//   { month: "Aug", amount: 550 },
// ];

const SpendingTrend = ({ trendData }: { trendData: STrend[] }) => {
  const chartConfig = {
    amount: {
      label: "Spend",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  // Check if there's any real data
  const hasData = trendData?.some((item) => item.amount > 0);

  return (
    <div className="p-6 rounded-md bg-white">
      <h2 className="text-base font-bold">Spending Trend</h2>
      <p className="mt-1 font-light">Monthly logistics spend</p>

      <ChartContainer
        config={chartConfig}
        className="relative mt-4 xs:h-[200px] sm:h-[280px] w-full "
      >
        <AreaChart
          accessibilityLayer
          data={trendData}
          // 🔥 Fixed margin to remove the left gap
          margin={{ left: -12, right: 16, top: 16, bottom: 0 }}
        >
          {/* Gradient fill under the line */}
          <defs>
            <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#F6BABC" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Light dotted horizontal grid lines */}
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
            dataKey="amount"
            type="number"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            allowDecimals={false}
            // domain={[0, "dataMax + 1000"]}
            hide={!hasData}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `₦${value.toLocaleString()}`}
          />

          <ChartTooltip
            cursor={false}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const value = payload[0].value;
                return (
                  <div className="px-2.5 py-1.5 rounded-lg bg-white shadow-lg">
                    <p className="text-xs font-medium text-gray-900">{label}</p>
                    <p className="mt-0.5 text-[12px] text-primary">
                      Spend: ₦{Number(value).toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Area
            dataKey="amount"
            type="natural"
            fill="url(#fillAmount)"
            fillOpacity={0.6}
            stroke="var(--color-amount)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: "#ffffff",
              stroke: "var(--primary)",
              strokeWidth: 2,
            }}
          />
        </AreaChart>

        {/* Empty state overlay */}
        {!hasData && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-sm text-gray-400 bg-white/80 px-4 py-2 rounded-md">
              No spending data for these months yet
            </p>
          </div>
        )}
      </ChartContainer>
    </div>
  );
};

export default SpendingTrend;
