import { useCallback, useEffect, useState } from "react";
import { Separator } from "../../ui/separator";
import KycVerificationModal from "./KycVerificationModal";
import { useSession } from "@/lib/hooks/useSession";
import { toast } from "sonner";
import { ChevronRight } from "lucide-react";
import { verifiedUser } from "@/assets/images";
import Image from "next/image";

const statusStyles = {
  NOT_VERIFIED: {
    bgcolor: "bg-gray-400",
    containerStyles: "border-gray-400 bg-gray-400/5 text-gray-400",
  },
  PENDING: {
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

  console.log("Session:", session);

  const handleOpen = useCallback(() => {
    if (session?.kycVerified === "SUCCESS") return;

    if (session?.kycVerified === "PENDING") {
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

  const showModal =
    session?.kycVerified === "NOT_VERIFIED" ||
    session?.kycVerified === "FAILED";

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg">
      <h2 className="text-lg sm:text-base font-semibold sm:font-bold leading-7 sm:leading-6">
        Verification
      </h2>

      <Separator className="mt-2" />

      {/* Trigger modal */}
      {showModal && (
        <div
          onClick={handleOpen}
          className="relative h-auto w-full mt-5 md:mt-7 pr-3 md:pr-5.5 flex items-center justify-between rounded-[16px] bg-[#FFFBF0] overflow-hidden border border-[#FFB703] hover:bg-[#FFFBF0] hover:cursor-pointer"
        >
          <div className="absolute top-1.75 -left-6 size-[72px] md:size-[87.79px] rotate-[21.86deg]">
            <Image
              src={verifiedUser}
              alt="verified user image"
              className="size-full object-cover"
            />
          </div>
          <div className="py-5.5 md:py-6 pl-12.5 md:pl-17.5 ">
            <p className="mt-0.5 text-[10px] md:text-sm font-roboto font-light">
              Verify your business identity to unlock all platform features and
              services.{" "}
            </p>
          </div>
          <ChevronRight className="size-6 text-[#BF8902]" />
        </div>
      )}

      <div className=" mt-4 px-4 py-3.5 flex justify-between items-center rounded-lg bg-gray-100/89">
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
