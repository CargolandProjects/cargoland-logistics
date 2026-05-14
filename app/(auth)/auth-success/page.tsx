"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const content = {
  register: {
    heading: "Account Created Successfully",
    subtext: "Your account is ready. You can now start booking shipments and tracking deliveries with ease.",
  },
  login: {
    heading: "Successfully Logged In",
    subtext: "Welcome back! You can now manage your shipments and track your deliveries.",
  },
};

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as "register" | "login") ?? "register";
  const { heading, subtext } = content[type] ?? content.register;

  return (
    <div className="bg-[#FAFAFA] flex items-start justify-center pt-8 pb-12 px-4">
      <div className="w-full max-w-[747px] bg-white rounded-[10px] shadow-sm px-6 py-16 md:px-[40px] text-center">

        {/* Check Icon */}
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/icons/check-mark.png"
            alt="Success"
            width={80}
            height={80}
          />
        </div>

        {/* Heading */}
        <h1 className="font-montserrat text-[28px] font-bold text-[#101928] mb-4">
          {heading}
        </h1>

        {/* Sub-text */}
        <p className="text-[15px] text-[#98A2B3] leading-relaxed max-w-[420px] mx-auto mb-12">
          {subtext}
        </p>

        {/* Go to Dashboard Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full bg-[#E32027] text-white font-bold text-[16px] py-4 rounded-[8px] hover:bg-[#C91F1F] transition-colors"
        >
          Go to Dashboard
        </button>

      </div>
    </div>
  );
}
