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
import { Shipment, ShipmentStatus } from "@/lib/services/shipment.service";
import { MouseEvent, useRef, useState } from "react";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";
import Loader from "@/components/Loader";
import Image from "next/image";
import { boxChecked } from "@/assets/images";
import { useRouter } from "next/navigation";
import ShipmentTable from "@/components/dashboard/ShipmentTable";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ShipmentCard from "@/components/dashboard/ShipmentCard";
import { Pagination } from "@/components/Pagination";

const statuses: ShipmentStatus[] = [
  "PENDING",
  "PICKED_UP",
  "AT_ORIGIN_HUB",
  "IN_TRANSIT",
  "DESTINATION",
  "CUSTOM_CLEARANCE",
  "DELIVERED",
  "CANCELLED",
];

export default function MyShipmentPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const shipmentsRef = useRef<HTMLElement>(null);
  const { data, isLoading: isLoadingStats } = useDashboardStats();
  const {
    data: shipments,
    isSuccess: isSuccessAll,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useAllShipments(currentPage);
  const [tabView, setTabView] = useState<ShipmentStatus | null>(null);
  const [search, setSearch] = useState("");
  const {
    data: myShipments,
    isLoading,
    isError,
    isSuccess,
  } = useMyShipments(tabView || "");
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

  const isFiltered = tabView !== null;

  const isLoadingActive = isFiltered ? isLoading : isLoadingAll;
  const isErrorActive = isFiltered ? isError : isErrorAll;
  const isSuccessActive = isFiltered ? isSuccess : isSuccessAll;

  const allShipments = shipments?.shipments || [];
  const currentData = isFiltered ? myShipments || [] : allShipments;
  const pagination = shipments?.pagination;

  const totalPages = pagination?.totalPages || 1;
  const page = pagination?.page || 1;

  const searchableFields: (keyof Shipment)[] = [
    "shipmentType",
    "freightType",
    "status",
    "fullName",
    "email",
    "phoneNumber",
    "country",
    "stateOrCity",
    "address",
    "receiverName",
    "receiverEmail",
    "receiverCountry",
    "receiverNumber",
    "receiverStateOrCity",
    "receiverAddress",
    "packageType",
    "descriptionOfGoods",
    "trackingId",
    "price",
    "pickupDate",
    "pickupTime",
    "bookingId",
    "carrierName",
    "currentLocation",
    "driverName",
    "driverPhoneNumber",
    "vehicleName",
    "vehiclePlate",
    "routeOrigin",
    "routeDestination",
  ];

  const getActiveData = () => {
    const term = search.trim().toLowerCase();
    if (!term) return currentData;

    return currentData.filter((item) =>
      searchableFields.some((field) => {
        const value = item[field];
        return value && String(value).toLowerCase().includes(term);
      }),
    );
  };

  const activeData = getActiveData();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the table when page changes
    if (shipmentsRef.current) {
      shipmentsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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

      {/* Tabs and search section */}
      <section ref={shipmentsRef} className="mt-5 md:mt-6">
        <div className="flex max-md:flex-col-reverse gap-4 md:justify-between">
          {/* Tabs */}
          <div className="overflow-x-auto md:max-w-[513px] flex hide-scrollbar border rounded-md ">
            <Button
              onClick={() => setTabView(null)}
              variant="ghost"
              className={` ${
                !tabView ? "bg-neutral-200/50 " : "bg-white"
              } px-4 h-13 text-black border-r border-r-border rounded-none capitalize font-roboto`}
            >
              All Shipment
            </Button>

            {statuses.map((status, idx) => {
              const isActive = status === tabView;

              return (
                <Button
                  onClick={() => setTabView(status)}
                  variant="ghost"
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

          {/* search input */}
          <div className="relative w-full md:max-w-[291px]">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search here"
              className="form-input h-12.5! pl-10! min-w-[219px] placeholder:text-slate-600/90!"
            />
            <Search className="size-5 absolute top-1/2 -translate-y-1/2 left-3 text-slate-600/90" />
          </div>
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
              {isFiltered ? tabView.replace("_", " ").toLowerCase() : "all"}{" "}
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

      {!isFiltered && isSuccessAll && totalPages > 1 && (
        <div className="mt-9.25 mb-10">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            siblings={totalPages > 3 ? 1 : 0}
          />
          {/* <div className="text-center text-sm text-gray-500 mt-2">
                Showing {allShipments.length} of {totalPages} shipments
              </div> */}
        </div>
      )}
    </div>
  );
}
