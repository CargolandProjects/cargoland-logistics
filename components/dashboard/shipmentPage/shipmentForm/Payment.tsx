import ArrowRight from "@/components/icons/ArrowRight";
import { Separator } from "@/components/ui/separator";
import { useShipmentStore } from "@/lib/stores/useShipmentStore";
import { formatDate } from "@/lib/utils";

const Payment = () => {
  const shipmentType = useShipmentStore((s) => s.shipmentType);
  const formData = useShipmentStore((s) => s.formData.data);
  const sender = formData?.sender;
  const receiver = formData?.receiver;
  const shipment = formData?.shipment;

  const totalShipmentWeight =
    (shipment?.weightKg ?? 0) * (shipment?.itemNumber ?? 0);

  return (
    <div className="mt-7.5 px-6 py-8 bg-white rounded-lg">
      <h2 className="text-lg font-semibold leading-7 font-poppins">
        Bill Payment
      </h2>
      <Separator className="mt-2 bg-brand-gray/35" />

      <div className="mt-6 grid grid-cols-2 max-md:gap-y-6 md:grid-cols-4">
        <div>
          <h3 className="bill-sub-title">From</h3>

          <div className="mt-2 space-y-1.5">
            <p className="text-sm font-normal">{sender?.fullName}</p>
            <p className="text-sm font-normal text-[#475367]">
              {sender?.address}
            </p>
            <p className="text-sm font-normal text-[#475367]">
              {sender?.phoneNumber}
            </p>
          </div>
        </div>

        <div>
          <h3 className="bill-sub-title">To</h3>

          <div className="mt-2 space-y-1.5">
            <p className="text-sm font-normal">{receiver?.fullName}</p>
            <p className="text-sm font-normal text-[#475367]">
              {receiver?.address}
            </p>
            <p className="text-sm font-normal text-[#475367]">
              {receiver?.phoneNumber}
            </p>
          </div>
        </div>

        <div>
          <h3 className="bill-sub-title">Invoice Date</h3>

          <p className="mt-2 text-sm font-normal">
            {formatDate(new Date().toISOString())}
          </p>
        </div>

        <div>
          <h3 className="bill-sub-title">Subject</h3>

          <p className="mt-2 text-sm font-normal capitalize">
            {shipmentType} freight
          </p>
        </div>
      </div>

      <Separator className="mt-10 mb-6 bg-brand-gray/35" />

      <div className="grid grid-cols-2 max-md:gap-y-6 md:grid-cols-4">
        <div>
          <h3 className="bill-sub-title">Shipment Summary</h3>

          <p className="mt-2 text-sm font-normal capitalize">
            {sender?.country}
            <ArrowRight className="size-4.5 text-primary inline mx-2.5" />
            {receiver?.country}
          </p>
        </div>

        <div>
          <h3 className="bill-sub-title">Due Date</h3>

          <p className="mt-2 text-sm font-normal capitalize">
            {formatDate(new Date().toISOString())}
          </p>
        </div>

        <div>
          <h3 className="bill-sub-title">ID Number</h3>

          <p className="mt-2 text-sm font-normal capitalize">CLD-12345678</p>
        </div>

        <div>
          <h3 className="bill-sub-title">Invoice of Naira</h3>

          <p className="mt-2 text-[32px] font-semibold leading-10 text-primary capitalize">
            ₦45,000
          </p>
        </div>
      </div>

      {/* <Separator className="mt-10 mb-6" /> */}

      <div className="mt-10">
        <h3 className="bill-sub-title">Shipment Weight</h3>
        <p className="text-sm font-medium leading-5.5">
          Total Shipment Weight: {totalShipmentWeight} kg
        </p>
      </div>

      <Separator className="mt-6 mb-2.5 bg-brand-gray/35" />
      <p className="text-sm font-normal leading-5.5 text-primary">
        Please note that VAT is included in the total payment amount.
      </p>
    </div>
  );
};

export default Payment;
