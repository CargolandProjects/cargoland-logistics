import { pricing } from "@/lib/services/pricing.service";
import { useMutation } from "@tanstack/react-query";

export const useGetAllPricing = () => {
  return useMutation({
    mutationFn: pricing.getAllPricing,
  });
};

export const useGetLocalPricing = () => {
  return useMutation({
    mutationFn: pricing.getAllLocalPricing,
  });
};
