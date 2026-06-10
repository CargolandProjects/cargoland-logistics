"use client";

import {
  useAllShipments,
  useDashboardStats,
  useMyShipments,
} from "@/lib/hooks/queries/useShipment";
import DashboardStat from "@/components/dashboard/DashboardStat";
import {
  ArrowRight,
  DeliveryTruckBolt,
  DeliveryTruckSpeed,
  Orders,
  PendingClipboard,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ShipmentStatus } from "@/lib/services/shipment.service";
import { useState } from "react";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";

import { formatDate } from "@/lib/utils";
import Loader from "@/components/Loader";

import Image from "next/image";
import { boxChecked } from "@/assets/images";
import { useRouter } from "next/navigation";
import ShipmentTable from "@/components/dashboard/ShipmentTable";

const statuses: ShipmentStatus[] = [
  "PENDING",
  "IN_TRANSIT",
  "DELIVERED",
  "CANCELLED",
  "PICKED_UP",
  "AT_ORIGIN_HUB",
  "DESTINATION",
  "CUSTOM_CLEARANCE",
];

export default function MyShipmentPage() {
  const { data, isLoading: isLoadingStats } = useDashboardStats();
  const {
    data: shipments,
    isSuccess: isSuccessAll,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useAllShipments();
  const [tblView, setTblView] = useState<ShipmentStatus | null>(null);
  const {
    data: myShipments,
    isLoading,
    isError,
    isSuccess,
  } = useMyShipments(tblView || "");
  const router = useRouter();

  const { isChecking } = useProtectedRoute();

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

  const isFiltered = tblView !== null;

  const isLoadingActive = isFiltered ? isLoading : isLoadingAll;
  const isErrorActive = isFiltered ? isError : isErrorAll;
  const isSuccessActive = isFiltered ? isSuccess : isSuccessAll;

  const allShipments = shipments?.shipments || [];
  const activeData = isFiltered ? myShipments || [] : allShipments;

  if (isChecking) {
    return null;
  }

  return (
    <div className="padding-x sec-mt">
      <section className="flex max-md:flex-col gap-2 justify-between md:items-end">
        <div>
          <h1 className="font-bold text-[32px] leading-10 ">My Shipment</h1>
          <p className="mt-2 text-base font-light leading-6">
            Manage active deliveries, resume saved drafts, and complete pending
            bookings across the continent.
          </p>
        </div>
        <Button
          onClick={() => router.push("/shipment")}
          className="max-md:mt-5 w-fit text-base h-13.75 px-10.5 font-medium font-roboto py-4"
        >
          Book a Shipment
        </Button>
      </section>

      <section className="mt-5 md:mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 ">
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

      <section className="mt-5 md:mt-6">
        <div className="overflow-x-auto max-w-[513px] flex hide-scrollbar border rounded-md ">
          <Button
            onClick={() => setTblView(null)}
            className={` ${
              !tblView ? "bg-neutral-200/50 " : "bg-white"
            } px-4 h-13 text-black border-r border-r-border rounded-none capitalize font-roboto`}
          >
            All Shipment
          </Button>

          {statuses.map((status, idx) => {
            const isActive = status === tblView;

            return (
              <Button
                onClick={() => setTblView(status)}
                key={idx}
                className={`${
                  isActive ? "bg-neutral-200/50" : "bg-white"
                } px-4 h-13 text-black border-r border-r-border rounded-none capitalize font-roboto`}
              >
                {status.replace("_", " ").toLowerCase()}
              </Button>
            );
          })}
        </div>

        {isLoadingActive && (
          <div className="mt-3 min-h-[237px] md:min-h-[337px] flex flex-col items-center justify-center rounded-lg bg-white">
            <Loader styles="size-9 sm:size-12 " />
          </div>
        )}

        {isErrorActive && (
          <div className="mt-3 min-h-[237px] md:min-h-[337px] flex flex-col rounded-lg bg-white">
            <p className="text-red-600 font-roboto p-4">
              Failed to fetch{" "}
              {isFiltered ? tblView.replace("_", " ").toLowerCase() : "all"}{" "}
              shipments
            </p>
          </div>
        )}

        {isSuccessActive && activeData.length === 0 && (
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

        {isSuccessActive && activeData.length > 0 && (
          <div>
            <div className="max-md:hidden">
              <ShipmentTable shipments={activeData} />
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
    </div>
  );
}
