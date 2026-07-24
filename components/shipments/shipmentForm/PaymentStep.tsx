import ArrowRight from "@/components/icons/ArrowRight";
import { Separator } from "@/components/ui/separator";
import { useDeleteImage } from "@/lib/hooks/mutation/useImage";
import { useShipmentStore } from "@/lib/stores/useShipmentStore";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { ImageAsset, RenderExistingImage } from "./ImageUploadField";
import { toast } from "sonner";

const PaymentStep = () => {
  const freightType = useShipmentStore((s) => s.freightType);
  const shipmentData = useShipmentStore((s) => s.createdShipment);
  const formData = useShipmentStore((s) => s.formData);
  const setData = useShipmentStore((s) => s.setFormData);
  const [deletingPublicIds, setDeletingPublicIds] = useState<Set<string>>(
    new Set(),
  );
  const { mutateAsync: deleteImage } = useDeleteImage();

  const images = shipmentData?.imageUrl || [];

  // console.log("Shipment Data", shipmentData);

  // ----- Delete (mutate with callbacks) -----
  const handleDeleteImage = async (asset: ImageAsset) => {
    if (deletingPublicIds.has(asset.publicId)) return;

    setDeletingPublicIds((prev) => new Set(prev).add(asset.publicId));

    try {
      await deleteImage(asset.publicId);
      const updatedAssets = shipmentData?.imageUrl.filter(
        (a) => a.publicId !== asset.publicId,
      );

      setData({
        ...formData,
        data: { ...formData.data, imageUrl: updatedAssets },
      });

      toast.success("Image deleted");
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Failed to delete image",
      );
    } finally {
      setDeletingPublicIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(asset.publicId);
        return newSet;
      });
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-lg font-semibold leading-7 font-poppins">
        Bill Payment
      </h2>
      <Separator className="mt-4 md:mt-2 bg-brand-gray/35" />

      <div className="mt-6 grid sm:grid-cols-2 max-md:gap-y-6 md:grid-cols-4">
        <div>
          <h3 className="bill-sub-title">From</h3>

          <div className="mt-2 space-y-1.5">
            <p>{shipmentData?.fullName}</p>
            <p className="text-[#475367]">{shipmentData?.address}</p>
            <p className="text-[#475367]">{shipmentData?.phoneNumber}</p>
          </div>
        </div>

        <div>
          <h3 className="bill-sub-title">To</h3>

          <div className="mt-2 space-y-1.5">
            <p>{shipmentData?.receiverName}</p>
            <p className="text-[#475367]">{shipmentData?.receiverAddress}</p>
            <p className="text-[#475367]">{shipmentData?.receiverNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div>
            <h3 className="bill-sub-title">Invoice Date</h3>

            <p className="mt-2 text-sm font-normal">
              {formatDate(shipmentData?.createdAt ?? "")}
            </p>
          </div>

          <div>
            <h3 className="bill-sub-title">Subject</h3>

            <p className="mt-2 text-sm font-normal capitalize">
              {freightType?.toLowerCase().replace("_", " ")}
            </p>
          </div>
        </div>
      </div>

      <Separator className="mt-10 mb-6 bg-brand-gray/35" />

      <div className="grid grid-cols-2 max-md:gap-y-6 md:grid-cols-4">
        <div>
          <h3 className="bill-sub-title">Shipment Summary</h3>

          <p className="mt-2 text-sm font-normal capitalize">
            {shipmentData?.country}
            <ArrowRight className="size-4.5 text-primary inline mx-2.5" />
            {shipmentData?.receiverCountry}
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

          <p className="mt-2 text-sm font-normal capitalize">
            {shipmentData?.trackingId}
          </p>
        </div>

        <div>
          <h3 className="bill-sub-title">Invoice of Naira</h3>

          <p className="mt-2 text-[32px] font-semibold leading-10 text-primary capitalize">
            ₦{Number(shipmentData?.price).toLocaleString()}
          </p>
        </div>
      </div>

      {/* <Separator className="mt-10 mb-6" /> */}
      <div className="mt-10 grid md:grid-cols-2">
        <div className="space-y-2">
          <h3 className="bill-sub-title">Shipment Weight</h3>
          <p className="text-sm font-medium leading-5.5">
            Total Shipment Weight: {shipmentData?.totalShipmentWeight} kg
          </p>
        </div>

        <div className="mt-2 mt-3 md:mt-2 flex flex-wrap gap-3">
          {images.length > 0 &&
            images.map((img) => (
              <RenderExistingImage
                key={img.publicId}
                asset={img}
                handleDeleteImage={handleDeleteImage}
                deletingPublicIds={deletingPublicIds}
              />
            ))}
        </div>
      </div>

      <Separator className="mt-6 mb-4 bg-brand-gray/35" />
      <p className="text-sm font-normal leading-5.5 text-primary">
        Please note that VAT is included in the total payment amount.
      </p>
    </div>
  );
};

export default PaymentStep;
