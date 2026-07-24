import { Wallet } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Globe } from "lucide-react";
import { useState } from "react";
import { PaymentMethod } from "./ShipmentForm";
import { useWalletBalance } from "@/lib/hooks/queries/useBalance";
import Loader from "@/components/Loader";

interface PaymentModalProps {
  open: boolean;
  isCharging: boolean;
  setOpen: (val: boolean) => void;
  handlePayment: (method: PaymentMethod) => void;
}

const PaymentModal = ({
  open,
  setOpen,
  handlePayment,
  isCharging,
}: PaymentModalProps) => {
  const { isPending, data } = useWalletBalance();
  const [method, setMethod] = useState<PaymentMethod>("WALLET");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="px-8 pt-15 pb-10 gap-6 md:max-w-128.5! rounded-[16px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold leading-8">
            Payment Method
          </DialogTitle>
        </DialogHeader>

        <RadioGroup
          orientation="horizontal"
          value={method}
          onValueChange={(val) => setMethod(val as PaymentMethod)}
          className="gap-4 md:gap-5.5"
        >
          {/* Wallet */}
          <FieldLabel
            htmlFor="wallet"
            className="rounded-sm! h-14 cursor-pointer has-data-checked:border-primary has-data-checked:bg-transparent"
          >
            <Field
              orientation="horizontal"
              className="md:px-4! h-full gap-[9.5px] w-full"
            >
              <FieldTitle className="font-normal text-sm gap-2">
                <Wallet className="size-4.5" /> Wallet{" "}
                {isPending ? (
                  <Loader size={16} />
                ) : (
                  <p className="truncate max-w-50 ">
                    ₦{Number(data?.balance || 0.0).toLocaleString()}
                  </p>
                )}
              </FieldTitle>
              <RadioGroupItem
                value="WALLET"
                id="wallet"
                className="border-brand-gray/90"
              />
            </Field>
          </FieldLabel>

          {/* Online */}
          <FieldLabel
            htmlFor="online"
            className="rounded-sm! h-14 cursor-pointer has-data-checked:border-primary has-data-checked:bg-transparent"
          >
            <Field
              orientation="horizontal"
              className="md:px-4! h-full gap-[9.5px] w-full"
            >
              <FieldTitle className="font-normal text-sm gap-2">
                <Globe className="size-4.5" /> Online
              </FieldTitle>
              <RadioGroupItem
                value="ONLINE"
                id="online"
                className="border-brand-gray/90"
              />
            </Field>
          </FieldLabel>
        </RadioGroup>

        <Button
          onClick={() => handlePayment(method)}
          disabled={isCharging}
          className="submit-button font-medium!"
        >
          Pay
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
