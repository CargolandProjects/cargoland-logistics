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
    select: (res) => res.data
  });
};

export const useAllShipments = () => {
  return useQuery({
    queryKey: ["allShipments"],
    queryFn: shipment.allShipments,
    select: (res) => res.data,
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
