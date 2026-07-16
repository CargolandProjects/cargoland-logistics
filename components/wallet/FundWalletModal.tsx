"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const FundWalletModal = () => {
  const [amount, setAmount] = useState("");
  const amounts = ["2000", "5000", "10000", "25000", "50000", "100000"];

  const formatNumber = (value: string) => {
    if (!value) return "";
    const number = value.replace(/\D/g, ""); // remove non-digits
    return new Intl.NumberFormat("en-US").format(Number(number));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-6 h-auto py-3 px-6 gap-2">
          <Plus /> Fund Wallet
        </Button>
      </DialogTrigger>

      <DialogContent className="px-8 pt-15 pb-10 md:max-w-128.5! rounded-[16px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold leading-8">
            Fund Wallet
          </DialogTitle>
        </DialogHeader>

        <div className="">
          <div>
            <label htmlFor="amount" className="form-label">
              Amount (₦)
            </label>
            <input
              id="amount"
              value={formatNumber(amount)}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              className="m-0.5 form-input block border w-full"
            />
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-medium font-roboto text-gray-400">
              Quick select
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {amounts.map((amount) => (
                <Button
                  key={amount}
                  onClick={() => setAmount(amount)}
                  variant="ghost"
                  className="px-[11.5px] py-2.5 h-auto font-normal text-gray-500/90 hover:text-gray-500 rounded-md"
                >
                  ₦{Number(amount).toLocaleString()}
                </Button>
              ))}
            </div>
          </div>

          <Button className="mt-6 submit-button">Fund</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FundWalletModal;
