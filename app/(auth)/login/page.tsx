"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/auth-success?type=login");
  };

  return (
    <div className="bg-[#FAFAFA] flex items-start justify-center pt-8 pb-12 px-4">
      <div className="w-full max-w-[747px] bg-white rounded-[10px] px-6 pt-6 pb-10 md:px-[24px] md:pt-[24px] md:pb-[40px]">

        {/* Header */}
        <div className="text-center mb-[20px]">
          <h1 className="font-montserrat text-[24px] leading-[32px] font-[700] text-[#101928] mb-3">
            Cargoland Account Login
          </h1>
          <p className="text-[16px] leading-[24px] font-[400] text-[#98A2B3] max-w-[520px] mx-auto">
            Welcome back! Sign in to continue shipping and tracking your packages.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-[20px]">

          {/* Email */}
          <div>
            <label className="block text-[14px] font-[400] text-[#475367] mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#DEE3E7] rounded-[8px] text-[14px] placeholder-[#C5CDD2] focus:outline-none focus:border-[#E32027]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[14px] font-[400] text-[#475367] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Email address"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#DEE3E7] rounded-[8px] text-[14px] placeholder-[#C5CDD2] focus:outline-none focus:border-[#E32027]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#878FA4]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {showPassword ? (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  ) : (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-5 h-5 border border-[#DEE3E7] rounded cursor-pointer"
              />
              <span className="text-[13px] text-[#667185]">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-[13px] text-[#E32027] font-medium hover:underline"
            >
              Forget Password
            </Link>
          </div>

          {/* Submit */}
          <div className="border-t border-[#EAECF0] pt-6">
            <button
              type="submit"
              className="w-full bg-[#E32027] text-white font-bold text-[16px] py-4 rounded-[8px] hover:bg-[#C91F1F] transition-colors"
            >
              Next Step
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
