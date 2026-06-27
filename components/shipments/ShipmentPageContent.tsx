"use client";

import { ArrowLeft, ArrowRight, NoticeOutline } from "@/components/icons";
import { RenderExistingImage } from "@/components/shipments/shipmentForm/ImageUploadField";
import { Separator } from "@/components/ui/separator";
import { useShipment } from "@/lib/hooks/queries/useShipment";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { notFound, useRouter } from "next/navigation";
import LoadingOverlay from "../LoadingOverlay";

const ShipmentPageContent = ({ id }: { id: string }) => {
  const { data: shipmentData, isLoading, isError, isSuccess } = useShipment(id);
  const router = useRouter();

  const isCancelled = shipmentData?.status === "CANCELLED";
  const images = shipmentData?.imageUrl || [];

  if (isError) return notFound();

  return (
    <>
      <LoadingOverlay loading={isLoading} />

      {isSuccess && (
        <div className="mt-15 md:mt-16.5 padding-x rounded-lg">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="p-0 h-fit hover:bg-transparent"
          >
            <ArrowLeft /> back
          </Button>

          <h2 className="mt-6 md:mt-10 text-2xl md:text-[32px] font-bold leading-10 font-montserrat">
            Shipment{" "}
            <span className="text-2xl md:text-[32px] font-normal leading-10 font-montserrat">
              ({shipmentData?.trackingId})
            </span>
          </h2>

          <div className="mt-6 md:mt-10 p-4 md:p-8 bg-white rounded-lg">
            {isCancelled && (
              <div className="mb-6 md:mb-10  flex gap-2.5 bg-primary-light p-4 md:px-6 rounded-lg">
                <div className="size-10 flex justify-center items-center shrink-0 rounded-full bg-primary/5">
                  <NoticeOutline className="size-6 text-primary" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold leading-5.5 text-primary font-roboto">
                    Cancelled
                  </h3>
                  <p className="text-sm font-light leading-5.5 text-primary">
                    Heavy rainfall along the{" "}
                    <span className="font-medium">Abuja → Kano corridor </span>{" "}
                    is slowing road transit. Your shipment is being rerouted via
                    the Kaduna hub. New ETA:{" "}
                    <span className="font-medium">Thursday, 16:00 EAT.</span>
                  </p>
                </div>
              </div>
            )}

            <h2 className="text-lg font-semibold leading-7 font-roboto">
              Summary
            </h2>
            <Separator className="mt-2 bg-brand-gray/35" />

            <div className="mt-4 grid sm:grid-cols-2 max-md:gap-y-6 md:grid-cols-4 gap-1">
              <div>
                <h3 className="bill-sub-title">From</h3>

                <div className="mt-2 space-y-1.5">
                  <p>{shipmentData?.fullName}</p>
                  <p className="text-[#475367]">{shipmentData?.address}</p>
                  <p className="text-[#475367]">{shipmentData?.phoneNumber}</p>
                </div>
              </div>

              <div>
                <h3 className="bill-sub-title">To</h3>

                <div className="mt-2 space-y-1.5">
                  <p>{shipmentData?.receiverName}</p>
                  <p className="text-[#475367]">
                    {shipmentData?.receiverAddress}
                  </p>
                  <p className="text-[#475367]">
                    {shipmentData?.receiverNumber}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 col-span-2">
                <div>
                  <h3 className="bill-sub-title">Invoice Date</h3>

                  <p className="mt-2 text-sm font-normal">
                    {formatDate(shipmentData?.createdAt ?? "")}
                  </p>
                </div>

                <div>
                  <h3 className="bill-sub-title">Subject</h3>

                  <p className="mt-2 text-sm font-normal capitalize">
                    {shipmentData?.freightType?.toLowerCase().replace("_", " ")}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="mt-10 mb-6 bg-brand-gray/35" />

            <div className="grid grid-cols-2 max-md:gap-y-6 md:grid-cols-4 gap-x-1">
              <div>
                <h3 className="bill-sub-title">Shipment Summary</h3>

                <p className="mt-2 text-sm font-normal capitalize">
                  {shipmentData?.country}
                  <ArrowRight className="size-4.5 text-primary inline mx-2.5" />
                  {shipmentData?.receiverCountry}
                </p>
              </div>

              <div>
                <h3 className="bill-sub-title">Due Date</h3>

                <p className="mt-2 text-sm font-normal capitalize">
                  {formatDate(new Date().toISOString())}
                </p>
              </div>

              <div>
                <h3 className="bill-sub-title">ID Number</h3>

                <p className="mt-2 text-sm font-normal capitalize">
                  {shipmentData?.trackingId}
                </p>
              </div>

              <div>
                <h3 className="bill-sub-title">Invoice of Naira</h3>

                <p className="mt-2 text-[32px] font-semibold leading-10 text-primary capitalize">
                  ₦{Number(shipmentData?.price).toLocaleString()}
                </p>
              </div>
            </div>

            {/* <Separator className="mt-10 mb-6" /> */}
            <div className="mt-10 grid md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="bill-sub-title">Shipment Weight</h3>
                <p className="text-sm font-medium leading-5.5">
                  Total Shipment Weight: {shipmentData?.totalShipmentWeight} kg
                </p>
              </div>

              <div className="mt-2 mt-3 md:mt-2 flex flex-wrap gap-3">
                {images.length > 0 &&
                  images.map((img) => (
                    <RenderExistingImage key={img.publicId} asset={img} />
                  ))}
              </div>
            </div>

            <Separator className="mt-6 mb-4 bg-brand-gray/35" />
            <p className="text-sm font-normal leading-5.5 text-primary">
              Please note that VAT is included in the total payment amount.
            </p>

            <div
              className={`${isCancelled ? "justify-between" : "justify-end"} flex gap-2`}
            >
              {isCancelled && (
                <Button
                  variant="outline"
                  className="mt-10 submit-button w-fit! px-[87px] border-gray-400! text-gray-600!"
                >
                  Reach via Whatsapp
                </Button>
              )}
              <Button className="mt-10 submit-button w-fit! px-[87px]">
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShipmentPageContent;
