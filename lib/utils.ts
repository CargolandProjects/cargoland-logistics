import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  if (!date) return null;

  return `${format(date, "MMM d, yyyy")}`;
}

export function formatDayOfWeek(date: Date | string) {
 return `${format(date, "EEE")}`
}

export function formatTime(date: Date | string) {
return `${format(date, "h:m")}`
}