"use client";

import CopyButton from "@/components/CopyButton";
import {
  ArrowLeft,
  CheckboxMarkedOutline,
  DeliveryTruckSpeedOutline,
  DepartmentStore,
  Location3Line,
  NoticeOutline,
  Package,
} from "@/components/icons";
import LoadingOverlay from "@/components/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTrackShipment } from "@/lib/hooks/mutation/useMutateShipment";
import { ShipmentStatus } from "@/lib/services/shipment.service";
import { formatDayOfWeek, formatTime } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Stamp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const trackShipmentSchema = z.object({
  trackingId: z
    .string()
    .min(1, "Tracking ID is required")
    .max(100, "Tracking ID must be less than 100 characters long"),
});

type TrackShipmentData = z.infer<typeof trackShipmentSchema>;

const TrackShipmentPageContent = () => {
  const { mutate, isPending, data } = useTrackShipment();
  const [step, setStep] = useState<"track" | "details">("track");

  const { handleSubmit, control, setError } = useForm<TrackShipmentData>({
    resolver: zodResolver(trackShipmentSchema),
    defaultValues: {
      trackingId: "",
    },
  });

  const searchParams = useSearchParams();
  const trackingId = searchParams.get("trackingId");

  const shipment = data?.data;
  const status: ShipmentStatus =
    shipment?.status === "ASSIGNED" ? "PENDING" : shipment?.status || "PENDING";
  // const isCanceled = shipment?.status === "CANCELLED";

  // console.log("SHipment Status:", status)

  const shipmentProgress = useMemo(() => {
    const statusOrder: ShipmentStatus[] = [
      "PICKED_UP",
      "AT_ORIGIN_HUB",
      "IN_TRANSIT",
      "DESTINATION",
      "CUSTOM_CLEARANCE",
      "DELIVERED",
    ];

    const currentIndex = statusOrder.indexOf(status);

    const progressStatus = [
      {
        title: "Picked Up",
        location: "Lagos, NG",
        time: "2026-05-27T09:42:00",
        icon: Package,
        status: "idle",
      },
      {
        title: "At Origin Hub",
        location: "Lagos, Sorting",
        time: "2026-05-27T14:13:00",
        icon: DepartmentStore,
        status: "idle",
      },
      {
        title: "In Transit",
        location: "Abuja, Sorting Facility",
        time: "2026-05-27T09:22:00",
        icon: DeliveryTruckSpeedOutline,
        status: "idle",
      },
      {
        title: "Destination",
        location: "Nairobi Hub",
        time: "2026-05-27T16:34:00",
        icon: Location3Line,
        status: "idle",
      },
      {
        title: "Custom Clearance",
        location: "Abuja, Sorting Facility",
        time: "2026-05-27T09:16:00",
        icon: Stamp,
        status: "idle",
      },
      {
        title: "Delivered",
        location: "Abuja, Sorting Facility",
        time: "2026-05-27T09:16:00",
        icon: CheckboxMarkedOutline,
        status: "idle",
      },
    ];

    progressStatus.forEach((state, index) => {
      if (index < currentIndex) {
        // Previous steps are completed (success)
        state.status = "success";
      } else if (index === currentIndex) {
        // Current step is in progress (pending)
        state.status = "pending";
      } else {
        // Future steps are idle
        state.status = "idle";
      }
    });

    const percentage =
      currentIndex === -1
        ? 0
        : Math.round(((currentIndex + 1) / statusOrder.length) * 100);

    return { progressStatus, percentage };
  }, [status]);

  useEffect(() => {
    if (!trackingId) return;

    mutate(trackingId, {
      onSuccess: () => {
        setStep("details");
      },
      onError: (res) => {
        setError("trackingId", {
          message: res.message,
        });
      },
    });
  }, [trackingId, mutate, setError]);

  // console.log("shipment", shipmentProgress);

  const onSubmit = (data: TrackShipmentData) => {
    mutate(data.trackingId, {
      onSuccess: () => {
        setStep("details");
      },
      onError: (res) => {
        setError("trackingId", {
          message: res.message,
        });
      },
    });
  };

  return (
    <div className="sec-mt padding-x">
      {step === "details" && (
        <Button
          onClick={() => setStep("track")}
          variant="ghost"
          className="mb-6 p-0 h-fit hover:bg-transparent"
        >
          <ArrowLeft /> back
        </Button>
      )}
      <LoadingOverlay loading={isPending} />

      <div>
        {/* Enter Tracking Number */}
        {step === "track" && !isPending && (
          <div>
            <h1 className="text-2xl md:text-[32px] font-bold leading-8 md:leading-10 md:text-center">
              Track Shipment
            </h1>
            <p className="mt-2 text-sm md:text-base font-light leading-5 md:leading-6 text-center ">
              Manage your shipments easily with fast tracking and reliable
              delivery.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-5 md:mt-6 py-10 md:py-20 px-6 md:px-25 rounded-[16px] bg-white max-w-[758px] mx-auto"
            >
              <FieldSet className="gap-0">
                <Controller
                  name="trackingId"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel htmlFor={field.name} className="form-label">
                        Enter your tracking number
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Number"
                        className="form-input"
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="form-error"
                        />
                      )}
                    </Field>
                  )}
                />
              </FieldSet>

              <Button
                disabled={isPending}
                type="submit"
                className="mt-6 submit-button"
              >
                Track Shipment
              </Button>
            </form>
          </div>
        )}
        {step === "details" && shipment && (
          <div>
            <div>
              <h1 className="text-2xl md:text-[32px] font-bold leading-8 md:leading-10 ">
                Truck CLA-NGR-22
              </h1>
              <p className="text-sm md:text-base font-light leading-5 md:leading-6">
                Your shipment is currently in transit and progressing smoothly
                to it&apos;s destination.
              </p>
            </div>

            <div className="mt-6">
              <div className="p-6 bg-white rounded-lg">
                {/* Status Badge */}
                <div className="px-2 py-0.5 bg-secondary/8 rounded-full w-fit border border-secondary flex items-center gap-1 ">
                  <div className="bg-secondary size-1.5 rounded-full " />
                  <p className="text-xs leading-5 text-secondary">In Transit</p>
                </div>

                <p className="text-xs leading-5 text-slate-600 mt-2">
                  Tracking ID
                </p>

                <div className="mt-2 flex items-center gap-3.75">
                  <h2 className="text-xl md:text-[32px] font-bold leading-7 md:leading-10">
                    {shipment.trackingId}
                  </h2>
                  <CopyButton text={shipment.trackingId} />
                </div>

                <div className="mt-2 flex items-center gap-3 text-slate-700">
                  <p className="flex items-center leading-5.5">
                    {shipment.country}
                    <ArrowRight className="size-4.5 text-primary inline mx-2" />
                    {shipment.receiverCountry}
                  </p>

                  <div className="size-1.5 bg-neutral-300 rounded-full" />

                  <p className="leading-5.5">
                    {shipment.numberOfItems} {shipment.packageType}
                  </p>
                  <div className="size-1.5 bg-neutral-300 rounded-full" />

                  <p className="leading-5.5">
                    {shipment.totalShipmentWeight} kg
                  </p>
                </div>
              </div>

              <div className="mt-5 md:mt-6 flex gap-2.5 bg-primary-light p-4 md:px-6 rounded-lg">
                <div className="size-10 flex justify-center items-center shrink-0 rounded-full bg-primary/5">
                  <NoticeOutline className="size-6 text-primary" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold leading-5.5 text-primary">
                    Minor delay detected
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

              <div className="mt-5 md:mt-6 p-6 bg-white rounded-lg">
                <div className="flex justify-between">
                  <h3 className="text-5 font-bold leading-7 ">Live Progress</h3>

                  <div className="flex items-center md:items-end gap-2">
                    <p className="text-xl md:text-[32px] font-bold leading-7 md;leading-10  font-montserrat">
                      {shipmentProgress.percentage}%
                    </p>
                    <p className="text-xs leading-5 text-slate-600">complete</p>
                  </div>
                </div>

                <div className="relative mt-10 flex max-sm:flex-col max-sm:gap-10 justify-between">
                  {/* background unfilled progress bar */}
                  <div className="h-full sm:h-1.5 absolute w-1.5 sm:w-full max-sm:left-[16.75] sm:top-3.5 sm:translate-y-1/2 rounded-full bg-primary-light " />

                  {shipmentProgress.progressStatus.map((progress, idx) => {
                    const isCompleted = progress.status === "success";
                    const isIdle = progress.status === "idle";
                    return (
                      <div
                        className="flex-1 flex sm:flex-col sm:items-center max-sm:gap-3"
                        key={idx}
                      >
                        <div className="relative flex max-sm:flex-col sm:justify-center sm:w-full">
                          {/* icon */}
                          <div
                            className={`${
                              !isIdle ? "bg-primary" : "bg-primary-light"
                            } relative size-10 z-12 flex items-center justify-center rounded-full`}
                          >
                            <progress.icon
                              className={` ${
                                !isIdle ? "text-white" : "text-primary"
                              } size-6`}
                            />
                          </div>

                          {/* Right hand side bar fill for the first status */}
                          {idx === 0 && !isIdle && (
                            <div
                              className={`max-md:hidden h-1.5 absolute w-1/2 right-1/2 top-1/2 transform -translate-y-1/2 bg-primary rounded-full`}
                            />
                          )}

                          {/*large screens Progress bar */}
                          {!isIdle && (
                            <div
                              className={`max-sm:hidden h-1.5 absolute ${
                                isCompleted ? "w-full" : "w-1/2"
                              }  left-1/2 top-1/2 transform -translate-y-1/2 bg-primary rounded-full `}
                            />
                          )}

                          {/*mobile screens Progress bar */}
                          {!isIdle && idx !== 0 && (
                            <div
                              className={`sm:hidden h-full max-md:w-1.5 md:h-1.5 absolute md:left-1/2 md:top-1/2 bottom-full transform left-1/2 -translate-x-1/2 md:-translate-y-1/2 bg-primary rounded-full`}
                            />
                          )}
                        </div>

                        <div className="mt-3.5 flex flex-col sm:items-center gap-1">
                          <h3 className="text-base font-roboto font-medium leading-5 sm:text-center">
                            {progress.title}
                          </h3>
                          <div className="flex sm:flex-col items-center gap-1">
                            <p className="text-xs leading-5 text-slate-700 sm:text-center">
                              {progress.location}
                            </p>
                            <div className="flex items-center gap-1 text-slate-700">
                              <p className="text-xs leading-5">
                                {formatDayOfWeek(progress.time)}
                              </p>
                              <div className="size-1 bg-neutral-300/80 rounded-full" />
                              <p className="text-xs leading-5">
                                {formatTime(progress.time)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function TrackShipmentPage() {
  return (
    <Suspense>
      <TrackShipmentPageContent />
    </Suspense>
  );
}
