"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PasswordSuccessfulPage() {
  const router = useRouter();
  const handleRoute = () => router.push("/login");

  return (
    <div className="margin-y padding-x flex justify-center ">
      <div className="max-w-[747px] w-full p-6 bg-white rounded-lg">
        <div className="flex justify-center ">
          {/* check */}
          <div className="flex justify-center items-center size-25 bg-[#008000] rounded-full">
            <Check className="size-18 text-white " />
          </div>
        </div>
        <div className="mt-5 max-w-[571px] mx-auto">
          <h1 className="text-2xl font-bold leading-8 text-center">
            Password Reset Successful
          </h1>
          <p className="mt-2 text-base leading-6 text-center text-[#8C94A6]">
            Your password has been updated. You can now use your new password to
            log in securely.
          </p>
        </div>
        <Button onClick={handleRoute} className="submit-button mt-8">
          Login
        </Button>
      </div>
    </div>
  );
}
