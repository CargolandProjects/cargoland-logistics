"use client";

import AuthPrompt from "@/components/shipmentPage/AuthPrompt";
import WhereTo from "@/components/shipmentPage/WhereTo";
import SelectFreight from "@/components/shipmentPage/SelectFreight";
import { useShipmentStore } from "@/lib/stores/useShipmentStore";
import ShipmentForm from "@/components/shipmentPage/shipmentForm/ShipmentForm";
import { useSession } from "@/lib/hooks/useSession";

export default function ShipmentPage() {
  const shipmentStep = useShipmentStore((s) => s.step);
  const { isAuthenticated } = useSession();
  //   const clearShipment = useShipmentStore((s) => s.clearShipment);

  console.log("Shipment Step: ", shipmentStep);
  //   clearShipment();

  const shipmentStage = () => {
    switch (shipmentStep) {
      case "shipmentType":
        return <WhereTo />;
      case "FreightType":
        return <SelectFreight />;
      case "ShipmentForm":
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
        {!isAuthenticated && shipmentStep !== "ShipmentForm" && <AuthPrompt />}
        <div className="mt-5">{shipmentStage()}</div>
      </div>
    </div>
  );
}
