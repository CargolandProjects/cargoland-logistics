"use client";

import { boxChecked } from "@/assets/images";
import CopyButton from "@/components/CopyButton";
import ErrorState from "@/components/ErrorState";
import { FileDownload } from "@/components/icons";
import LoadingOverlay from "@/components/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { useShipmentInvoice } from "@/lib/hooks/mutation/useMutateShipment";
import { useShipmentByReference } from "@/lib/hooks/queries/useShipment";
import { useShipmentStore } from "@/lib/stores/useShipmentStore";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";

const PaymentSuccessfulContent = () => {
  const { mutate: getInvoice, isPending } = useShipmentInvoice();
  const clearShipmentData = useShipmentStore((s) => s.clearShipment);
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || "";

  const router = useRouter();

  const { data, isLoading, isError, isSuccess } =
    useShipmentByReference(reference);

  useEffect(() => {
    clearShipmentData();
  }, [clearShipmentData]);

  const handleinvoice = () => {
    if (!reference) return;

    getInvoice(reference, {
      onSuccess: (blob) => {
        // Create a download URL
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice-${reference}.pdf`;

        // Trigger download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Invoice downloaded successfully!");
      },
      onError: () => {
        toast.error("failed to download invoice");
      },
    });
  };

  return (
    <>
      {isLoading && <LoadingOverlay loading={isLoading} />}

      {isError && (
        <div className=" h-[calc(100vh-100px)] md:h-[calc(100vh-125px)] flex justify-center items-center">
          <ErrorState message="Successful but couldn't fetch shipment details " />
        </div>
      )}

      {isSuccess && (
        <section className="padding-x mt-15 mb-16.25 flex justify-center bg-background-screen">
          <div className="bg-white p-8.5 rounded-lg flex flex-col items-center">
            <div className="size-[90px] relative">
              <Image
                src={boxChecked}
                alt="box package checked icon"
                className="size-full object-cover"
                fill
              />
            </div>

            <h1 className="mt-2 text-[32px] font-extrabold leading-10 text-primary">
              Thank You
            </h1>
            <div className="mt-2 space-y-2">
              <p className="text-base font-semibold leading-6 text-center">
                Your shipment was completed successfully
              </p>
              <p className=" text-center flex justify-center items-center gap-1">
                Tracking number: {data.trackingId}{" "}
                <CopyButton text={data.trackingId} />
              </p>
              {/* <p className=" text-center">
                Expected Delivery:{" "}
                <span className="font-semibold">
                  Wednesday 09/03/2026 by 05:00 pm
                </span>
              </p> */}
            </div>

            <div className="mt-6 space-y-2">
              <p className="text-base font-semibold leading-6 text-center">
                Download and print your document
              </p>

              <p className="text-center">
                Ensure each package has a shipment label attached on top.
              </p>
            </div>

            <Button
              onClick={handleinvoice}
              disabled={isPending}
              variant="ghost"
              className="mt-3.5 text-xs font-normal leading-5 font-roboto rounded-md bg-[#E9EBF3] text-secondary gap-1"
            >
              <FileDownload className="text-sm  text-secondary" />
              Download PDF
            </Button>

            <div className="mt-10 flex gap-4 max-md:flex-col w-full">
              <Button
                onClick={() => router.push("/dashboard")}
                className="md:w-[178px] h-[55px] rounded-md"
              >
                Go to dashboard
              </Button>
              <Button
                onClick={() =>
                  router.push(`/track-shipment?trackingId=${data.trackingId}`)
                }
                variant="outline"
                className="md:w-[178px] h-[55px] rounded-md text-primary border-2 border-primary hover:text-primary hover:bg-transparent"
              >
                Track Shipment
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default function PaymentSuccessfulPage() {
  return (
    <Suspense>
      <PaymentSuccessfulContent />
    </Suspense>
  );
}
