import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { ShipmentStatus } from "./services/shipment.service";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return `${format(date, "MMM d, yyyy")}`;
}

export function formatDayOfWeek(date: Date | string) {
  return `${format(date, "EEE")}`;
}

export function formatTime(date: Date | string) {
  return `${format(date, "h:m")}`;
}
export function formatMeridiem(date: Date | string) {
  return `${format(date, "a")}`;
}

export function formatMinSecMill(date: Date | string) {
  return `${format(date, "h:m:ss a")}`;
}

export const statusStyles: Partial<
  Record<ShipmentStatus, { bgcolor: string; containerStyles: string }>
> = {
  PENDING: {
    bgcolor: "bg-cargo-warning",
    containerStyles:
      "border-cargo-warning bg-cargo-warning/5 text-cargo-warning",
  },

  PICKED_UP: {
    bgcolor: "bg-blue-500",
    containerStyles: "border-blue-500 bg-blue-500/5 text-blue-500",
  },

  AT_ORIGIN_HUB: {
    bgcolor: "bg-teal-500",
    containerStyles: "border-teal-500 bg-teal-500/5 text-teal-500",
  },

  IN_TRANSIT: {
    bgcolor: "bg-secondary",
    containerStyles: "border-secondary bg-secondary/5 text-secondary",
  },

  DESTINATION: {
    bgcolor: "bg-cyan-500",
    containerStyles: "border-cyan-500 bg-cyan-500/5 text-cyan-500",
  },

  CUSTOM_CLEARANCE: {
    bgcolor: "bg-slate-500",
    containerStyles: "border-slate-500 bg-slate-500/5 text-slate-500",
  },

  DELIVERED: {
    bgcolor: "bg-cargo-success",
    containerStyles:
      "border-cargo-success bg-cargo-success/5 text-cargo-success",
  },

  CANCELLED: {
    bgcolor: "bg-primary",
    containerStyles: "border-primary bg-primary/5 text-primary",
  },
};

export function getAddressComponent(
  components: google.maps.places.AddressComponent[],
  type: string,
): string {
  return components.find((c) => c.types.includes(type))?.longText || "";
}
