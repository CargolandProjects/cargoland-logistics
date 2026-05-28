import { shipment } from "@/lib/services/shipment.service";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: shipment.dashboardStats,
    select: (res) => res.data,
  });
};

export const useAllShipments = () => {
  return useQuery({
    queryKey: ["allShipments"],
    queryFn: shipment.allShipments,
    select: (res) => res.data,
  });
};
