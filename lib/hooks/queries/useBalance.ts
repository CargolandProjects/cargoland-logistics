import { wallet } from "@/lib/services/wallet.service";
import { useQuery } from "@tanstack/react-query";

export const useWalletBalance = () => {
  return useQuery({
    queryKey: ["walletBalance"],
    queryFn: wallet.getBalance,
    select: (res) => res.data,
  });
};
