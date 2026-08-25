"use client";

import DashboardStat from "@/components/dashboard/DashboardStat";
import { useDashboardStats } from "@/lib/hooks/queries/useShipment";
import {
  DeliveryTruckBolt,
  DeliveryTruckSpeed,
  Orders,
  PendingClipboard,
} from "@/components/icons";
import ShipmentVolume from "@/components/insights/ShipmentVolume";
import { useCompanyInsight } from "@/lib/hooks/queries/useCompanyInsights";
import SpendingTrend from "@/components/insights/SpendingTrend";

export default function InsightsPage() {
  const { data, isLoading } = useCompanyInsight();
  console.log("Data:", data);

  const getDashboardStats = () => {
    const dashboardStats = [
      {
        title: "Total Shipments",
        icon: Orders,
        figure: data?.totalShipment || 0,
      },
      {
        title: "Delivered",
        icon: DeliveryTruckSpeed,
        figure: data?.delivered || 0,
      },
      {
        title: "Not Delivered",
        icon: PendingClipboard,
        figure: data?.cancelledDelivered || 0,
      },
      {
        title: "Total Spend",
        icon: DeliveryTruckBolt,
        figure: data?.totalSpend || 0,
      },
    ];

    return dashboardStats;
  };

  const dashboardStats = getDashboardStats();
  const shipmentVolume = data?.shipmentVolume || [];
  const spendingTrend = data?.spendingTrend || [];

  return (
    <div>
      <section className="flex max-md:flex-col md:gap-2 justify-between md:items-end">
        <div>
          <h1 className="text-lg md:text-xl leading-7 font-bold">Insights</h1>
          <p className="mt-1.5 md:mt-2 text-sm md:text-base font-light md:leading-6">
            Analytics and performance for your business
          </p>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section className="mt-5 md:mt-7 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {dashboardStats.map((shipment, idx) => (
          <DashboardStat
            key={idx}
            title={shipment.title}
            figure={shipment.figure}
            isLoading={isLoading}
            Icon={shipment.icon}
          />
        ))}
      </section>

      {/* shipment & spending charts */}
      <section className="mt-7 grid md:grid-cols-2 gap-6">
        <ShipmentVolume volumeData={shipmentVolume} />
        <SpendingTrend trendData={spendingTrend} />
      </section>
    </div>
  );
}
