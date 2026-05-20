"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountSuccessfulPage() {
  const router = useRouter();
  const handleRoute = () => router.push("/login");

  return (
    <div className="mx-4 flex justify-center mt-[75px] mb-[123px]">
      <div className="max-w-[747px] w-full p-6 bg-white rounded-lg">
        <div className="flex justify-center ">
          {/* check */}
          <div className="flex justify-center items-center size-25 bg-[#008000] rounded-full">
            <Check className="size-18 text-white " />
          </div>
        </div>
        <div className="mt-5 max-w-[571px] mx-auto">
          <h1 className="text-2xl font-bold leading-8 text-center">
            Account Created Successfully
          </h1>
          <p className="mt-2 text-base leading-6 text-center text-[#8C94A6]">
            Your account is ready. You can now start booking shipments and
            tracking deliveries with ease.
          </p>
        </div>
        <Button onClick={handleRoute} className="submit-button mt-8">
          Login
        </Button>
      </div>
    </div>
  );
}
