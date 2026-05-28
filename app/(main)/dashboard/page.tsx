"use client";

import { boxChecked } from "@/assets/images";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAllShipments,
  useDashboardStats,
} from "@/lib/hooks/queries/useShipment";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";
import { useSession } from "@/lib/hooks/useSession";
import { formatDate } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import Image from "next/image";

type ShipmentStatus = "pending" | "in transit" | "delivered" | "cancelled";

interface ShimentData {
  trackingId: string;
  origin: string;
  destination: string;
  shipingType: string;
  price: string;
  date: string;
  status: ShipmentStatus;
}

const shipmentData: ShimentData[] = [
  {
    trackingId: "CLD-12345678",
    origin: "Nigeria",
    destination: "Ghana",
    shipingType: "Air Freight",
    price: "45,000",
    date: "2026-03-12T10:00:00Z",
    status: "pending",
  },
  {
    trackingId: "CLD-12345678",
    origin: "Nigeria",
    destination: "Ghana",
    shipingType: "Air Freight",
    price: "45,000",
    date: "2026-03-12T10:00:00Z",
    status: "in transit",
  },
  {
    trackingId: "CLD-12345678",
    origin: "Nigeria",
    destination: "Ghana",
    shipingType: "Ocean Freight",
    price: "45,000",
    date: "2026-03-12T10:00:00Z",
    status: "delivered",
  },
  {
    trackingId: "CLD-12345678",
    origin: "Nigeria",
    destination: "Ghana",
    shipingType: "Road Freight",
    price: "45,000",
    date: "2026-03-12T10:00:00Z",
    status: "cancelled",
  },
  {
    trackingId: "CLD-12345678",
    origin: "Nigeria",
    destination: "Ghana",
    shipingType: "Air Freight",
    price: "45,000",
    date: "2026-03-12T10:00:00Z",
    status: "delivered",
  },
  {
    trackingId: "CLD-12345678",
    origin: "Nigeria",
    destination: "Ghana",
    shipingType: "Road Freight",
    price: "45,000",
    date: "2026-03-12T10:00:00Z",
    status: "delivered",
  },
];

const statusStyles = {
  PENDING: {
    bgcolor: "bg-cargo-warning",
    containerStyles:
      "border-cargo-warning bg-cargo-warning/5 text-cargo-warning",
  },
  "in transit": {
    bgcolor: "bg-secondary",
    containerStyles: "border-secondary bg-secondary/5 text-secondary",
  },
  delivered: {
    bgcolor: "bg-cargo-success",
    containerStyles:
      "border-cargo-success bg-cargo-success/5 text-cargo-success",
  },
  cancelled: {
    bgcolor: "bg-primary",
    containerStyles: "border-primary bg-primary/5 text-primary",
  },
};

export default function DashboardPage() {
  const { data, isLoading: isLoadingStats } = useDashboardStats();
  const { data: shipments, isSuccess, isLoading, isError } = useAllShipments();
  const { isAuthenticated, session, signOut } = useSession();
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

  const fullName = `${session?.firstName} ${session?.lastName} `;

  if (isChecking) {
    return null;
  }

  return (
    <div className="px-4 sm:px-6 md:px-16 lg:px-[112px]">
      <section className="mt-16.5">
        <h1 className="font-bold text-[32px] leading-10 ">
          Welcome, {fullName}
        </h1>
        <p className="text-base font-light leading-6">
          Manage your shipments easily with fast tracking and reliable delivery.
        </p>
      </section>

      <section className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-6 ">
        {dashboardStats.map((shipment, idx) => (
          <div className=" px-5.25 py-6.75 bg-white rounded-[16px]" key={idx}>
            <div className="flex items-center gap-3">
              <shipment.icon className="size-6 text-primary" />
              <p className="leading-5.5 text-neutral-500">{shipment.title}</p>
            </div>

            <p className={` ${
              isLoadingStats && "animate-pulse duration-300"
            } mt-5 text-xl font-semibold leading-7`}>
              {Number(shipment.figure).toLocaleString()}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-7">Recent Shipments</h2>
          <Button
            onClick={() => signOut()}
            variant="outline"
            className="text-primary border-primary w-[81px]"
          >
            See All
          </Button>
        </div>

        {isLoading && (
          <div className="h-20 flex items-center justify-center">
            <Loader styles="size-9 sm:size-12 " />
          </div>
        )}

        {isError && (
          <p className="text-red-600 font-roboto ">
            Failed to fetch all shipments
          </p>
        )}

        {isSuccess && allShipments.length === 0 && (
          <div className="min-h-[437px] md:min-h-[537px] flex flex-col">
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
              {allShipments.map((shipment, idx) => (
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

      {/* <section></section> */}
    </div>
  );
}
