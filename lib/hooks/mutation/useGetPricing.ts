import { pricing } from "@/lib/services/pricing.service";
import { useMutation } from "@tanstack/react-query";

export const useGetAllPricing = () => {
  return useMutation({
    mutationFn: pricing.getAllPricing,
  });
};
