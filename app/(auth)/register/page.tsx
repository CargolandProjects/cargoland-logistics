"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "NG",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const passwordRequirements = {
    minLength: formData.password.length >= 8 && formData.password.length <= 20,
    hasLetterAndNumber:
      /[a-zA-Z]/.test(formData.password) &&
      /\d/.test(formData.password),
    hasSpecialChar:
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password),
  };

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
  };

  return (
    <div className="bg-[#FAFAFA] flex items-start justify-center pt-8 pb-12 px-4">
      <div className="w-full max-w-[747px] bg-white rounded-[10px] px-6 pt-6 pb-10 md:px-[24px] md:pt-[24px] md:pb-[40px]">
        {/* Header */}
        <div className="text-center mb-[20px]">
          <h1 className="font-montserrat text-[24px] leading-[32px] font-[700] text-[#101928] mb-3">
            Create Your CargoLand Account
          </h1>

          <p className="font-roboto text-[16px] leading-[24px] font-[400] text-[#98A2B3] max-w-[620px] mx-auto">
            Sign up to start shipping smarter and track every delivery with
            ease.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-[20px]">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            <div>
              <label className="block text-[14px] font-[400] text-[#475367] mb-2">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#DEE3E7] rounded-[8px] text-[14px] placeholder-[#C5CDD2] focus:outline-none focus:border-[#E32027]"
              />
            </div>

            <div>
              <label className="block text-[14px] font-[400] text-[#475367] mb-2">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                placeholder="Last number"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#DEE3E7] rounded-[8px] text-[14px] placeholder-[#C5CDD2] focus:outline-none focus:border-[#E32027]"
              />
            </div>
          </div>

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

          {/* Country + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-[20px] md:gap-[16px] items-end">
            <div>
              <label className="block text-[14px] font-[400] text-[#475367] mb-2">
                Country
              </label>

              <div className="relative flex items-center border border-[#DEE3E7] rounded-[8px] px-3 py-3 bg-white min-w-[80px]">
                <Image
                  src="/assets/icons/Nigerian_flag.png"
                  alt="Nigeria"
                  width={24}
                  height={24}
                  className="mr-2"
                />

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="bg-transparent text-[14px] focus:outline-none appearance-none pr-4"
                >
                  <option value="NG">NG</option>
                </select>

                <svg
                  className="absolute right-3 w-4 h-4 text-[#667185]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-[400] text-[#475367] mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Mobile number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#DEE3E7] rounded-[8px] text-[14px] placeholder-[#C5CDD2] focus:outline-none focus:border-[#E32027]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[14px] font-[400] text-[#475367] mb-2">
              Create Password
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
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
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

          {/* Confirm Password */}
          <div>
            <label className="block text-[14px] font-[400] text-[#475367] mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Email address"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#DEE3E7] rounded-[8px] text-[14px] placeholder-[#C5CDD2] focus:outline-none focus:border-[#E32027]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#878FA4]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {showConfirmPassword ? (
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

          {/* Requirements */}
       {/* Requirements */}
          <div className="pt-2">
            <p className="text-[12px] font-[500] text-[#344054] uppercase mb-3">
              Requirements:
            </p>

            <div className="flex flex-wrap gap-y-3">
              {/* Requirement 1 */}
              <div className="flex items-center gap-2 text-[13px] w-1/2">
                <div
                  className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors ${
                    passwordRequirements.minLength
                      ? "border-[#12B76A] bg-[#12B76A]"
                      : "border-[#D0D5DD] bg-white"
                  }`}
                >
                  {passwordRequirements.minLength && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                <span className={passwordRequirements.minLength ? "text-[#101928]" : "text-[#98A2B3]"}>
                  8 Characters (20 max)
                </span>
              </div>

              {/* Requirement 2 */}
              <div className="flex items-center gap-2 text-[13px] w-1/2">
                <div
                  className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors ${
                    passwordRequirements.hasLetterAndNumber
                      ? "border-[#12B76A] bg-[#12B76A]"
                      : "border-[#D0D5DD] bg-white"
                  }`}
                >
                  {passwordRequirements.hasLetterAndNumber && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                <span className={passwordRequirements.hasLetterAndNumber ? "text-[#101928]" : "text-[#98A2B3]"}>
                  1 letter and 1 number
                </span>
              </div>

              {/* Requirement 3 */}
              <div className="flex items-center gap-2 text-[13px] w-full">
                <div
                  className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors ${
                    passwordRequirements.hasSpecialChar
                      ? "border-[#12B76A] bg-[#12B76A]"
                      : "border-[#D0D5DD] bg-white"
                  }`}
                >
                  {passwordRequirements.hasSpecialChar && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                <span className={passwordRequirements.hasSpecialChar ? "text-[#101928]" : "text-[#98A2B3]"}>
                  1 special character (e.g #,*,%)
                </span>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="flex gap-3 items-start pt-2">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mt-1 w-5 h-5 border border-[#DEE3E7] rounded cursor-pointer"
            />

            <label className="text-[13px] text-[#667185] leading-relaxed">
              By signing up, you agree to our{" "}
              <a
                href="/terms-conditions"
                className="text-[#E32027] underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                className="text-[#E32027] underline"
              >
                Privacy Policy
              </a>
              , and consent to receive important shipping updates from
              Cargoland Africa.
            </label>
          </div>

          {/* Divider */}
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









