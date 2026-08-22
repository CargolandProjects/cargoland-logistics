import { useState } from "react";
import { Separator } from "../ui/separator";
import KycVerificationModal from "./KycVerificationModal";

const Verification = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg">
      <h2 className="text-lg sm:text-base font-semibold sm:font-bold leading-7 sm:leading-6">
        Verification
      </h2>

      <Separator className="mt-2" />

      <div
        onClick={() => setOpen(true)}
        className="mt-11.5 px-4 py-3.5 flex justify-between items-center rounded-lg bg-gray-100/89 cursor-pointer"
      >
        <div>
          <h3 className="font-semibold leading-5.5">KYC Verification</h3>
          <p className="text-xs font-light text-gray-500">
            Complete verification to access features
          </p>
        </div>
        {/* Status */}
        <div className="py-0.5 px-2 flex gap-2 items-center border border-cargo-success rounded-full">
          <div className="size-2 rounded-full bg-cargo-success" />
          <p className="text-xs leading-5.5 text-cargo-success">Active</p>
        </div>
      </div>

      <KycVerificationModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Verification;
