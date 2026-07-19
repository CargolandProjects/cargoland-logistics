import { ShipmentType, pricing } from "@/lib/services/pricing.service";
import { useQuery } from "@tanstack/react-query";

export const usePricing = ({
  page = 1,
  limit = 10,
  origin,
  destination,
  method,
}: {
  page?: number;
  limit?: number;
  origin?: string;
  destination?: string;
  method?: ShipmentType;
} = {}) => {
  return useQuery({
    queryKey: ["pricing", { page, limit, origin, destination, method }],
    queryFn: () =>
      pricing.getAllPricing(page, limit, origin, destination, method),
    select: (res) => res.data,
  });
};

export const useLocalPricing = ({
  page = 1,
  limit = 10,
  origin,
  destination,
  shipmentType = "DOMESTIC",
}: {
  page?: number;
  limit?: number;
  origin?: string;
  destination?: string;
  shipmentType?: ShipmentType;
} = {}) => {
  return useQuery({
    queryKey: ["localPricing", { page, limit, origin, destination, shipmentType }],
    queryFn: () =>
      pricing.getAllLocalPricing(
        page,
        limit,
        origin,
        destination,
        shipmentType,
      ),
    select: (res) => res.data,
  });
};
