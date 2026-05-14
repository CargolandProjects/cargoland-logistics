"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const masked = local.slice(0, 5) + "*".repeat(Math.max(local.length - 5, 3));
  return `${masked}@${domain}`;
}

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const maskedEmail = email ? maskEmail(email) : "your email";

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // Clear current
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/auth-success?type=register");
  };

  return (
    <div className="bg-[#FAFAFA] flex items-start justify-center pt-8 pb-12 px-4">
      <div className="w-full max-w-[747px] bg-white rounded-[10px] shadow-sm px-6 pt-6 pb-10 md:px-[40px] md:pt-[32px] md:pb-[40px]">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-[#1a1a2e] text-[14px] font-medium hover:text-[#E32027] transition-colors mb-8"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-montserrat text-[28px] font-bold text-[#101928] mb-4">
            Verify Your Email
          </h1>
          <p className="text-[15px] text-[#98A2B3] leading-relaxed max-w-[480px] mx-auto">
            A verification code has been sent to your email address (
            <span className="text-[#98A2B3]">{maskedEmail}</span>
            ). Please enter the OTP to verify your account.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                placeholder="0"
                className="w-[60px] h-[60px] text-center text-[20px] font-medium text-[#101928] border border-[#DEE3E7] rounded-[8px] placeholder-[#D0D5DD] focus:outline-none focus:border-[#E32027] transition-colors"
              />
            ))}
          </div>

          {/* Resend Button */}
          <div className="flex justify-center mb-10">
            <button
              type="button"
              className="px-6 py-2 rounded-full border border-[#6366F1] text-[#6366F1] text-[13px] font-medium hover:bg-[#6366F1] hover:text-white transition-colors"
            >
              Re-send Code
            </button>
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full bg-[#E32027] text-white font-bold text-[16px] py-4 rounded-[8px] hover:bg-[#C91F1F] transition-colors"
          >
            Verify Email
          </button>
        </form>

      </div>
    </div>
  );
}
