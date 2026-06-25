"use client";

import { boxChecked } from "@/assets/images";
import DashboardStat from "@/components/dashboard/DashboardStat";
import {
  ArrowRight,
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
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import ShipmentTable from "@/components/dashboard/ShipmentTable";

export default function DashboardPage() {
  const { data, isLoading: isLoadingStats } = useDashboardStats();
  const { data: shipments, isSuccess, isLoading, isError } = useAllShipments();
  const { isAuthenticated, session } = useSession();
  const { isChecking } = useProtectedRoute();

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
            variant="outline"
            className="text-primary border-primary w-[81px]"
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
            <div className="max-md:hidden">
              <ShipmentTable shipments={allShipments} />
            </div>

            <div className="md:hidden mt-3 rounded-[16px] bg-white">
              {allShipments.map((shipment, idx) => (
                <div
                  key={idx}
                  className="px-5.25 py-6 flex flex-col justify-start border-b"
                >
                  <div className="space-y-2">
                    <p className="text-xs leading-5">{shipment.trackingId}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-base leading-5.5">
                        {shipment.country}
                      </p>
                      <ArrowRight className="size-4.5 text-primary" />
                      <p className="text-base leading-5.5">
                        {shipment.receiverCountry}
                      </p>
                    </div>
                    <p className="leading-5.5">
                      {Number(shipment.price).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="capitalize text-xs leading-5">
                        {shipment.freightType.replace("_", " ").toLowerCase()}
                      </p>
                      <div className="size-1 bg-neutral-300 rounded-full" />
                      <p className="capitalize text-xs leading-5">
                        {formatDate(shipment.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* <section></section> */}
    </div>
  );
}
