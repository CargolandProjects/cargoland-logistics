import { wallet } from "@/lib/services/wallet.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFundWallet = () => {
  return useMutation({
    mutationFn: wallet.fundWallet,
  });
};

export const useChargeWallet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wallet.chargeWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
    },
  });
};
