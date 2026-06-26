import { Method, pricing } from "@/lib/services/pricing.service";
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
  method?: Method;
} = {}) => {
  return useQuery({
    queryKey: ["pricing", { page, limit, origin, destination, method }],
    queryFn: () =>
      pricing.getAllPricing(page, limit, origin, destination, method),
    select: (res) => res.data,
  });
};
