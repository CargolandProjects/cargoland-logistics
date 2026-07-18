"use client";

import { useWalletBalance } from "@/lib/hooks/queries/useBalance";
import { Wallet } from "../icons";
import FundWalletModal from "./FundWalletModal";

const WalletBanner = () => {
  const { data, isLoading } = useWalletBalance();

  return (
    <div className="mt-6 px-6 py-8 rounded-[16px] bg-secondary">
      <div className="flex items-center gap-3">
        <Wallet className="size-6 text-primary" />
        <p className="text-gray-500 leading-5.5">Available Balance</p>
      </div>

      <h1
        className={`${isLoading && "animate-pulse"} mt-4 text-[32px] md:text-5xl font-bold leading-10 md:leading-14 text-white wrap-break-word`}
      >
        ₦{Number(data?.balance || 0).toLocaleString()}
      </h1>

      <FundWalletModal walletId={data?.id || ""} />
    </div>
  );
};

export default WalletBanner;
