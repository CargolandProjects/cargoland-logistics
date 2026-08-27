import { useCallback, useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import KycVerificationModal from "./kyc/KycVerificationModal";
import { useSession } from "@/lib/hooks/useSession";
import { toast } from "sonner";

const statusStyles = {
  PENDING: {
    bgcolor: "bg-orange-400",
    containerStyles: "border-orange-400 bg-orange-400/5 text-orange-400",
  },
  SUBMITTED: {
    bgcolor: "bg-orange-400",
    containerStyles: "border-orange-400 bg-orange-400/5 text-orange-400",
  },
  SUCCESS: {
    bgcolor: "bg-cargo-success",
    containerStyles:
      "border-cargo-success bg-cargo-success/5 text-cargo-success",
  },
  FAILED: {
    bgcolor: "bg-red-500",
    containerStyles: "border-primary bg-red-500/5 text-red-500",
  },
};

const Verification = ({ isTriggered }: { isTriggered: boolean }) => {
  const [open, setOpen] = useState(false);
  const { session, isAuthenticated } = useSession();

  const handleOpen = useCallback(() => {
    if (session?.kycVerified === "SUCCESS") return;

    if (session?.kycVerified === "SUBMITTED") {
      toast.warning("Currently under review");
      return;
    }

    setOpen(true);
  }, [session?.kycVerified]);

  useEffect(() => {
    if (!isTriggered) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleOpen();
  }, [isTriggered, handleOpen]);

  const showCursor =
    session?.kycVerified === "PENDING" || session?.kycVerified === "FAILED";

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg">
      <h2 className="text-lg sm:text-base font-semibold sm:font-bold leading-7 sm:leading-6">
        Verification
      </h2>

      <Separator className="mt-2" />

      <div
        onClick={handleOpen}
        className={`${showCursor ? "cursor-pointer" : "cursor-default"} mt-6 md:mt-11.5 px-4 py-3.5 flex justify-between items-center rounded-lg bg-gray-100/89`}
      >
        <div>
          <h3 className="font-semibold leading-5.5">KYC Verification</h3>
          <p className="text-xs font-light text-gray-500">
            Complete verification to access features
          </p>
        </div>

        {/* Status */}
        <div
          className={`${isAuthenticated ? `${statusStyles[session!.kycVerified].containerStyles}` : ""} py-0.5 px-2 flex gap-2 items-center border border-cargo-success rounded-full`}
        >
          <div
            className={`${isAuthenticated ? `${statusStyles[session!.kycVerified].bgcolor}` : ""} size-2 rounded-full bg-cargo-success`}
          />
          <p className="text-xs leading-5.5 capitalize">
            {session?.kycVerified.toLowerCase()}
          </p>
        </div>
      </div>

      <KycVerificationModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Verification;
