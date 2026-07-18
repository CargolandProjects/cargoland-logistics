"use client";

import { useWalletBalance } from "@/lib/hooks/queries/useBalance";
import { ArrowDownLeft, ArrowUpRight } from "../icons";

const Overview = () => {
  const { data, isLoading } = useWalletBalance();

  return (
    <div className="mt-5 md:mt-8 grid xxs:grid-cols-2 gap-4.5 md:gap-8 rounded-[16px] bg-white">
      <div className="px-5.25 py-6.75">
        <div className="flex items-center gap-3">
          <ArrowDownLeft className="size-6 text-[#16A34A]" />
          <p className="leading-5 text-neutral-600/90">Total Funded</p>
        </div>
        <h2
          className={`${isLoading && "animate-pulse"} mt-5 text-xl font-bold leading-7`}
        >
          ₦{Number(data?.totalFunded || 0).toLocaleString()}
        </h2>
      </div>

      <div className="px-5.25 py-6.75">
        <div className="flex items-center gap-3">
          <ArrowUpRight className="size-6 text-primary" />
          <p className="leading-5 text-neutral-600/90">Total Spent</p>
        </div>
        <h2
          className={`${isLoading && "animate-pulse"} mt-5 text-xl font-bold leading-7`}
        >
          ₦{Number(data?.totalSpent || 0).toLocaleString()}
        </h2>
      </div>
    </div>
  );
};

export default Overview;
