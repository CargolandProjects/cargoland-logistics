"use client";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[747px] bg-white rounded-[10px] p-6 md:p-[24px]">
        <div className="text-center">
          <h1 className="text-[32px] md:text-[36px] font-bold text-[#0B112B] mb-2">
            Reset Your Password
          </h1>
          <p className="text-[14px] md:text-[16px] text-[#878FA4]">
            Enter your email to receive password reset instructions.
          </p>
        </div>
      </div>
    </div>
  );
}
