import { shipment } from "@/lib/services/shipment.service";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: shipment.dashboardStats,
    select: (res) => res.data,
  });
};

export const useShipment = (id: string) => {
  return useQuery({
    queryKey: ["shipment", id],
    queryFn: () => shipment.getShipment(id),
    select: (res) => res.data,
    enabled: !!id,
  });
};

export const useAllShipments = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["allShipments", { page, limit }],
    queryFn: () => shipment.allShipments(page, limit),
    select: (res) => res.data,
    placeholderData: (prev) => prev,
  });
};

export const useMyShipments = (query: string) => {
  return useQuery({
    queryKey: ["myShipments", query],
    queryFn: () => shipment.myShipments(query),
    select: (res) => res.data,
    enabled: !!query,
  });
};
