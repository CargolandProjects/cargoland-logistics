"use client";

import {
  useAllShipments,
  useDashboardStats,
  useMyShipments,
} from "@/lib/hooks/queries/useShipment";
import DashboardStat from "./DashboardStat";
import {
  ArrowRight,
  DeliveryTruckBolt,
  DeliveryTruckSpeed,
  Orders,
  PendingClipboard,
} from "./icons";
import { Button } from "./ui/button";
import { ShipmentStatus } from "@/lib/services/shipment.service";
import { useState } from "react";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { formatDate } from "@/lib/utils";
import Loader from "./Loader";
import { MoreVertical } from "lucide-react";
import { statusStyles } from "@/lib/utils";
import Image from "next/image";
import { boxChecked } from "@/assets/images";
import { useRouter } from "next/navigation";

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

const MyShipmentPageContent = () => {
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
          <Table className="mt-3 bg-white rounded-lg">
            <TableHeader>
              <TableRow className="h-[53px]">
                <TableHead className="pl-6 text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                  Tracking ID
                </TableHead>
                <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                  Route
                </TableHead>
                <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                  Shipping Type
                </TableHead>
                <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                  Price
                </TableHead>
                <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                  Date
                </TableHead>
                <TableHead className="pr-6 text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {activeData.map((shipment, idx) => (
                <TableRow key={idx} className="h-15.5">
                  <TableCell className="pl-6 leading-5.5">
                    {shipment.trackingId}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 leading-5.5">
                      {shipment.country}
                      <ArrowRight className="size-4.5 text-primary" />
                      {shipment.receiverCountry}
                    </div>
                  </TableCell>
                  <TableCell className="leading-5.5 capitalize">
                    {shipment.freightType.replace("_", " ").toLowerCase()}
                  </TableCell>
                  <TableCell className="leading-5.5">
                    ₦{Number(shipment.price).toLocaleString()}
                  </TableCell>
                  <TableCell className="leading-5.5">
                    {formatDate(shipment.createdAt)}
                  </TableCell>
                  <TableCell className="">
                    <div
                      className={`px-2 py-0.5 size-fit ${
                        statusStyles[shipment.status]?.containerStyles
                      } flex items-center justify-center gap-1 border rounded-full text-center leading-5.5 capitalize`}
                    >
                      <div
                        className={` ${
                          statusStyles[shipment.status]?.bgcolor
                        } size-1.5 rounded-full`}
                      />
                      {shipment.status}
                    </div>
                  </TableCell>
                  <TableCell className="pr-6">
                    <button className="size-6 flex items-center justify-center border border-neutral-200 rounded-[4px]">
                      <MoreVertical className="size-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </div>
  );
};

export default MyShipmentPageContent;
