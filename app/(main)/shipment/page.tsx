"use client";

import AuthPrompt from "@/components/shipments/AuthPrompt";
import WhereTo from "@/components/shipments/WhereTo";
import SelectFreight from "@/components/shipments/SelectFreight";
import { useShipmentStore } from "@/lib/stores/useShipmentStore";
import ShipmentForm from "@/components/shipments/shipmentForm/ShipmentForm";
import { useSession } from "@/lib/hooks/useSession";

export default function CreateShipmentPage() {
  const shipmentStep = useShipmentStore((s) => s.step);
  const { isAuthenticated } = useSession();

  console.log("Shipment Step: ", shipmentStep);

  const shipmentStage = () => {
    switch (shipmentStep) {
      case "shipmentType":
        return <WhereTo />;
      case "freightType":
        return <SelectFreight />;
      case "shipmentForm":
        return <ShipmentForm />;
    }
  };

  return (
    <div
      className={`padding-x text-brand-black pb-6 ${
        isAuthenticated ? "mt-7.5" : "mt-15 md:mt-10"
      } `}
    >
      <div className="max-w-[888.5px] mx-auto">
        {!isAuthenticated && shipmentStep !== "shipmentForm" && <AuthPrompt />}
        <div className="mt-5">{shipmentStage()}</div>
      </div>
    </div>
  );
}
