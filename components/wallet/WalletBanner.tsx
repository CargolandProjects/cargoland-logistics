import {Plus } from "lucide-react";
import { Wallet } from "../icons";
import { Button } from "../ui/button";

const WalletBanner = () => {
  return (
    <div className="mt-6 px-6 py-8 rounded-[16px] bg-secondary">
      <div className="flex items-center gap-3">
        <Wallet className="size-6 text-primary" />
        <p className="text-gray-500 leading-5.5">Available Balance</p>
      </div>
      <h1 className="mt-4 text-5xl font-bold leading-14 text-white">₦0.00</h1>

      <Button className="mt-6 h-auto py-3 px-6 gap-2">
        <Plus/> Fund Wallet
      </Button>
    </div>
  );
};

export default WalletBanner;
