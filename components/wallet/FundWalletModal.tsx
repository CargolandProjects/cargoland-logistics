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
import { useFundWallet } from "@/lib/hooks/mutation/useWallet";
import { toast } from "sonner";

const FundWalletModal = ({ walletId }: { walletId: string }) => {
  const { mutate: fundWallet, isPending } = useFundWallet();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const amounts = ["2000", "5000", "10000", "25000", "50000", "100000"];
  const minAmount = Number(amounts[0]);
  const maxAmount = 100000000;

  const formatNumber = (value: string) => {
    if (!value) return "";
    const number = value.replace(/\D/g, ""); // remove non-digits
    return new Intl.NumberFormat("en-US").format(Number(number));
  };

  const handleFund = () => {
    if (!walletId) return;

    if (!amount || Number(amount) < minAmount) {
      setMessage(`Funding amount must be at least ₦${minAmount}`);
      return;
    }

    if (Number(amount) >= maxAmount) {
      setMessage(`Funding amount must be less than ₦${maxAmount.toLocaleString()}`);
      return;
    }

    fundWallet(
      { amount, walletId },
      {
        onSuccess: (res) => {
          const authUrl = res.data.data.authorization_url;

          if (!authUrl) {
            toast.error("Payment initiation failed");
            return;
          }

          window.location.href = authUrl;
        },
        onError: (res) => {
          toast.error(res.message || "Failed to fund wallet");
        },
      },
    );
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

        <div>
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

          <div className="mt-6 ">
            {message && (
              <p className="mb-1.5 text-red-500 text-center text-sm  relative">
                {message}
              </p>
            )}

            <Button
              onClick={handleFund}
              disabled={!amount || isPending}
              className="submit-button"
            >
              Fund
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FundWalletModal;
