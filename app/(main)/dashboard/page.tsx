"use client";

import { boxChecked } from "@/assets/images";
import DashboardStat from "@/components/dashboard/DashboardStat";
import {
  DeliveryTruckBolt,
  DeliveryTruckSpeed,
  Orders,
  PendingClipboard,
} from "@/components/icons";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

import {
  useAllShipments,
  useDashboardStats,
} from "@/lib/hooks/queries/useShipment";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";
import { useSession } from "@/lib/hooks/useSession";
import Image from "next/image";
import ShipmentTable from "@/components/dashboard/ShipmentTable";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import ShipmentCard from "@/components/dashboard/ShipmentCard";

export default function DashboardPage() {
  const { data, isLoading: isLoadingStats } = useDashboardStats();
  const { data: shipments, isSuccess, isLoading, isError } = useAllShipments();
  const { isAuthenticated, session } = useSession();
  const { isChecking } = useProtectedRoute();
  const router = useRouter();

  console.log("DashboardStats", data);
  console.log("session", session, isAuthenticated);

  const getDashboardStats = () => {
    const dashboardStats = [
      {
        title: "Total Shipments",
        icon: Orders,
        figure: data?.totalShipments || 0,
      },
      {
        title: "Active Shipments",
        icon: DeliveryTruckSpeed,
        figure: data?.activeShipments || 0,
      },
      {
        title: "Pending Shipments",
        icon: PendingClipboard,
        figure: data?.pendingShipments || 0,
      },
      {
        title: "Delivered Shipments",
        icon: DeliveryTruckBolt,
        figure: data?.deliveredShipments || 0,
      },
    ];

    return dashboardStats;
  };

  const dashboardStats = getDashboardStats();
  const allShipments = shipments?.shipments || [];

  const fullName = `${session?.firstName || ""} ${session?.lastName || ""}`;

  const handleRoute = (path: string) => {
    if (!path) return;
    router.push(path);
  };

  const handleView = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    handleRoute(`/my-shipment/${id}`);
  };
  const handleTrack = (e: MouseEvent, trackingId: string) => {
    e.stopPropagation();
    handleRoute(`/track-shipment/?trackingId=${trackingId}`);
  };

  if (isChecking) {
    return null;
  }

  return (
    <div className="padding-x sec-mt">
      <section className="">
        <h1 className="font-bold text-[32px] leading-10 ">
          Welcome, {fullName}
        </h1>
        <p className="text-base font-light leading-6">
          Manage your shipments easily with fast tracking and reliable delivery.
        </p>
      </section>

      <section className="mt-5 md:mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-6 ">
        {dashboardStats.map((shipment, idx) => (
          <DashboardStat
            key={idx}
            title={shipment.title}
            figure={shipment.figure}
            isLoading={isLoadingStats}
            Icon={shipment.icon}
          />
        ))}
      </section>

      <section className="mt-[76px] md:mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-7">Recent Shipments</h2>
          <Button
            onClick={() => router.push("/my-shipment")}
            variant="outline"
            className="text-primary border-primary w-[81px] hover:text-primary"
          >
            See All
          </Button>
        </div>

        {isLoading && (
          <div className="mt-3 min-h-[237px] md:min-h-[337px] flex flex-col items-center justify-center rounded-lg bg-white">
            <Loader styles="size-9 sm:size-12 " />
          </div>
        )}

        {isError && (
          <div className="mt-3 min-h-[237px] md:min-h-[337px] flex flex-col rounded-lg bg-white">
            <p className="text-red-600 font-roboto ">
              Failed to fetch all shipments
            </p>
          </div>
        )}

        {isSuccess && allShipments.length === 0 && (
          <div className="mt-3 min-h-[437px] flex flex-col rounded-lg bg-white">
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Image */}
              <div className="size-40 relative">
                <Image
                  src={boxChecked}
                  alt="box package checked icon"
                  className="size-full object-cover"
                  fill
                />
              </div>

              <div className="mt-4 space-y-2 max-w-[370px] ">
                <h3 className="text-xl font-normal leading-6 font-roboto text-center">
                  No Recent Orders
                </h3>

                <p className="text-base font-light leading-6 text-center text-neutral-700">
                  Manage your shipments easily with fast tracking and reliable
                  delivery.
                </p>
              </div>
            </div>
          </div>
        )}

        {isSuccess && allShipments.length > 0 && (
          <div>
            {/* Desktop screen */}
            <div className="max-md:hidden">
              <ShipmentTable
                handleRoute={handleRoute}
                handleTrack={handleTrack}
                handleView={handleView}
                shipments={allShipments}
              />
            </div>

            {/* Mobile screen */}
            <div className="md:hidden mt-3 rounded-[16px] bg-white">
              {allShipments.map((shipment, idx) => (
                <ShipmentCard
                  key={idx}
                  shipment={shipment}
                  handleView={handleView}
                  handleTrack={handleTrack}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* <section></section> */}
    </div>
  );
}
