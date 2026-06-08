import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { ShipmentStatus } from "./services/shipment.service";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  if (!date) return null;

  return `${format(date, "MMM d, yyyy")}`;
}

export function formatDayOfWeek(date: Date | string) {
  return `${format(date, "EEE")}`;
}

export function formatTime(date: Date | string) {
  return `${format(date, "h:m")}`;
}

export const statusStyles: Partial<
  Record<ShipmentStatus, { bgcolor: string; containerStyles: string }>
> = {
  PENDING: {
    bgcolor: "bg-cargo-warning",
    containerStyles:
      "border-cargo-warning bg-cargo-warning/5 text-cargo-warning",
  },
  IN_TRANSIT: {
    bgcolor: "bg-secondary",
    containerStyles: "border-secondary bg-secondary/5 text-secondary",
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
