"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTrackShipment } from "@/lib/hooks/mutation/useMutateShipment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const trackShipmentSchema = z.object({
  trackingId: z
    .string()
    .min(1, "Tracking ID is required")
    .max(100, "Tracking ID must be less than 100 characters long"),
});

type TrackShipmentData = z.infer<typeof trackShipmentSchema>;

export default function TrackShipmentPage() {
  const { mutate, isPending, data } = useTrackShipment();

  const { handleSubmit, control, setError } = useForm<TrackShipmentData>({
    resolver: zodResolver(trackShipmentSchema),
    defaultValues: {
      trackingId: "",
    },
  });

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
    <div className="py-16.5">
      {/* Enter Tracking Number */}
      {!data && (
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
    </div>
  );
}
