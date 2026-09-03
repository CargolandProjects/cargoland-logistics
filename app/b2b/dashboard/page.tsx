"use client";

import { boxChecked, verifiedUser } from "@/assets/images";
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
import { MouseEvent, useRef, useState } from "react";
import ShipmentCard from "@/components/dashboard/ShipmentCard";
import { Pagination } from "@/components/Pagination";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function B2BDashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const shipmentsRef = useRef<HTMLElement>(null);
  const { data, isLoading: isLoadingStats } = useDashboardStats();
  const {
    data: shipments,
    isSuccess,
    isLoading,
    isError,
  } = useAllShipments(currentPage);
  const { session, isB2BAdmin } = useSession();
  const router = useRouter();

  // console.log("DashboardStats", data);
  // console.log("session", session, isAuthenticated);

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
  const pagination = shipments?.pagination;

  const totalPages = pagination?.totalPages || 1;
  const page = pagination?.page || 1;

  const fullName = `${session?.firstName || ""} ${session?.lastName || ""}`;

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
    handleRoute(`/b2b/my-shipment/${id}`);
  };
  const handleTrack = (e: MouseEvent, trackingId: string) => {
    e.stopPropagation();
    handleRoute(`/track-shipment/?trackingId=${trackingId}`);
  };

  return (
    <div>
      <section className="flex max-md:flex-col md:gap-2 justify-between md:items-end">
        <div>
          <h1 className="text-lg md:text-xl leading-7 font-bold">
            Welcome, {fullName}
          </h1>
          <p className="mt-1.5 md:mt-2 text-sm md:text-base font-light md:leading-6">
            Manage your shipments easily with fast tracking and reliable
            delivery.
          </p>
        </div>

        <Button
          onClick={() => router.push("/b2b/book-shipment")}
          className="max-md:mt-5 md:w-fit text-base h-10 md:h-13.75 px-10.5 font-medium font-roboto py-4"
        >
          Book Shipment
        </Button>
      </section>

      {isB2BAdmin && (
        <Link
          href="/b2b/settings?tab=VERIFICATION"
          className="relative mt-5 md:mt-7 pr-3 md:pr-5.5 flex items-center justify-between rounded-[16px] bg-[#FFFBF0] overflow-hidden border border-[#FFB703]"
        >
          <div className="absolute top-1.75 -left-6 size-[72px] md:size-[87.79px] rotate-[21.86deg]">
            <Image
              src={verifiedUser}
              alt="verified user image"
              className="size-full object-cover"
            />
          </div>
          <div className="py-5.5 md:py-6 pl-12.5 md:pl-17.5 ">
            <h3 className="text-xs md:text-base font-semibold font-montserrat ">
              Identity Verification Required
            </h3>
            <p className="mt-0.5 text-[10px] md:text-sm font-roboto font-light">
              Verify your business identity to unlock all services.
            </p>
          </div>
          <ChevronRight className="size-6 text-[#BF8902]" />
        </Link>
      )}

      {/* Dashboard Stats */}
      <section className="mt-5 md:mt-7 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
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

      <section ref={shipmentsRef} className="mt-5 md:mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-base md:text-xl font-semibold leading-7">
            Recent Shipments
          </h2>
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
              <div className="size-25 md:size-40 relative">
                <Image
                  src={boxChecked}
                  alt="box package checked icon"
                  className="size-full object-cover"
                  fill
                />
              </div>

              <div className="mt-4 max-w-[370px] ">
                <h3 className="text-base md:text-xl font-semibold md:font-normal leading-6 font-roboto text-center">
                  No Recent Orders
                </h3>

                <p className="mt-1 md:mt-2 text-sm md:text-base font-light md:leading-6 text-center text-neutral-700">
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
                // handleRoute={handleRoute}
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

      {isSuccess && totalPages > 1 && (
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
