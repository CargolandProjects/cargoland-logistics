"use client";

import {
  CheckboxMarkedOutline,
  DeliveryTruckSpeedOutline,
  DepartmentStore,
  Location3Line,
  NoticeOutline,
  Package,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTrackShipment } from "@/lib/hooks/mutation/useMutateShipment";
import { formatDayOfWeek, formatTime } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Copy } from "lucide-react";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const trackShipmentSchema = z.object({
  trackingId: z
    .string()
    .min(1, "Tracking ID is required")
    .max(100, "Tracking ID must be less than 100 characters long"),
});

type TrackShipmentData = z.infer<typeof trackShipmentSchema>;

type ProgressOrder =
  | "new"
  | "Picked Up"
  | "At Origin Hub"
  | "In Transit"
  | "Destination"
  | "Custom Clearance";

const status = "In Transit" as ProgressOrder;

export default function TrackShipmentPage() {
  const { mutate, isPending, data } = useTrackShipment();

  const { handleSubmit, control, setError } = useForm<TrackShipmentData>({
    resolver: zodResolver(trackShipmentSchema),
    defaultValues: {
      trackingId: "",
    },
  });

  const shipment = data?.data;

  const shipmentProgress = useMemo(() => {
    const statusOrder: ProgressOrder[] = [
      "Picked Up",
      "At Origin Hub",
      "In Transit",
      "Destination",
      "Custom Clearance",
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

    return progressStatus;
  }, []);

  console.log("shipment", shipmentProgress);

  const onSubmit = (data: TrackShipmentData) => {
    console.log(data);

    mutate(data.trackingId, {
      onError: (res) => {
        setError("trackingId", {
          message: res.message,
        });
      },
    });
  };

  return (
    <div className="py-16.5 margin-x ">
      {/* Enter Tracking Number */}
      {!shipment && (
        <div className=" px-4 max-w-[638px] mx-auto">
          <h1 className="text-[32px] font-bold leading-10 text-center">
            Track Shipment
          </h1>
          <p className="text-base font-light leading-6 text-center mt-2">
            Manage your shipments easily with fast tracking and reliable
            delivery.
          </p>
          <div className="mt-6 py-20 px-10  rounded-[16px] bg-white">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 bg-white rounded-lg max-w-[747px] mx-auto "
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
        </div>
      )}

      {shipment && (
        <div>
          <div>
            <h1 className="text-[32px] font-bold leading-10 ">
              Truck CLA-NGR-22
            </h1>
            <p className="text-base font-light leading-6">
              Your shipment is currently in transit and progressing smoothly to
              it&apos;s destination.
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
                <h2 className="text-[32px] font-bold leading-10">
                  {shipment.trackingId}
                </h2>

                <Copy className="size-[16px] text-secondary" />
              </div>

              <div className="mt-2 flex items-center gap-3 text-slate-700">
                <p className="flex items-center">
                  {shipment.country}
                  <ArrowRight className="size-4.5 text-primary inline mx-2" />
                  {shipment.receiverCountry}
                </p>

                <div className="size-1.5 bg-neutral-300 rounded-full" />

                <p className="">
                  {shipment.numberOfItems} {shipment.packageType}
                </p>
                <div className="size-1.5 bg-neutral-300 rounded-full" />

                <p>{shipment.totalShipmentWeight} kg</p>
              </div>
            </div>

            <div className="flex gap-2.5 bg-primary-light py-4 px-6 rounded-lg">
              <div className="size-10 flex justify-center items-center shrink-0 rounded-full bg-primary/5">
                <NoticeOutline className="size-6 text-primary" />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold leading-5.5 text-primary">
                  Minor delay detected
                </h3>
                <p className="text-sm font-light leading-5.5 text-primary">
                  Heavy rainfall along the{" "}
                  <span className="font-medium">Abuja → Kano corridor </span> is
                  slowing road transit. Your shipment is being rerouted via the
                  Kaduna hub. New ETA:{" "}
                  <span className="font-medium">Thursday, 16:00 EAT.</span>
                </p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-white rounded-lg">
              <div className="flex justify-between">
                <h3 className="text-5 font-bold leading-7 ">Live Progress</h3>

                <div className="flex items-end gap-2">
                  <p className="text-[32px] font-bold leading-10  font-montserrat">
                    70%
                  </p>
                  <p className="text-xs leading-5 text-slate-600">complete</p>
                </div>
              </div>

              <div className="relative mt-10 flex justify-between">
                <div className="h-1.5 absolute w-full left-0 top-3.5 translate-y-1/2 bg-primary-light " />

                {shipmentProgress.map((progress, idx) => {
                  const isCompleted = progress.status === "success";
                  const isIdle = progress.status === "idle";
                  return (
                    <div
                      className="flex-1 flex flex-col items-center pr-1"
                      key={idx}
                    >
                      <div className="relative flex justify-center w-full">
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
                            className={`h-1.5 absolute w-1/2 right-1/2 top-1/2 transform -translate-y-1/2 bg-primary rounded-full`}
                          />
                        )}

                        {/* Progress bar */}
                        {!isIdle && (
                          <div
                            className={` h-1.5 absolute ${
                              isCompleted ? "w-full" : "w-1/2"
                            }  left-1/2 top-1/2 transform -translate-y-1/2 bg-primary rounded-full `}
                          />
                        )}
                      </div>

                      <div className="mt-3.5 flex flex-col items-center gap-1">
                        <p className="text-base font-medium leading-5">
                          {progress.title}
                        </p>
                        <p className="text-xs leading-5 text-slate-700">
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
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
