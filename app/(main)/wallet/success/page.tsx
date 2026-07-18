"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import success from "@/assets/gifs/success.gif";

export default function WalletSuccessPage() {
  const router = useRouter();
  return (
    <div className="px-4 min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-125px)] flex justify-center items-center">
      <div className="w-[328px] flex flex-col items-center">
        <div className="relative size-[124px] sm:size-[180px]">
          <Image
            src={success.src}
            alt="payment success gif"
            className="size-full"
            fill
          />
        </div>
        <h1 className="text-xl sm:text-2xl font-medium sm:font-bold leading-7 sm:leading-8 mt-3 sm:mt-1">
          Transcation Successsful
        </h1>
        <p className="text-base sm:max-w-[287px] leading-5 text-center text-neutral-600 mt-3">
          Your payment was successful, you can now processd to your wallet
        </p>
        <Button
          onClick={() => router.push("/wallet")}
          className="submit-button mt-[52px] w-full"
        >
          Wallet
        </Button>
      </div>
    </div>
  );
}
