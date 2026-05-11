"use client";

import AuthPrompt from "./AuthPrompt";
import WhereTo from "./WhereTo";
import SelectFreight from "./SelectFreight";
import { useShipmentStore } from "@/lib/stores/useShipmentStore";
import ShipmentForm from "./shipmentForm/ShipmentForm";

const ShipmentPageContent = () => {
  const shipmentStep = useShipmentStore((s) => s.step);
  //   const clearShipment = useShipmentStore((s) => s.clearShipment);

  console.log("Shipment Step: ", shipmentStep);
  //   clearShipment();

  const shipmentStage = () => {
    switch (shipmentStep) {
      case "selectScope":
        return <WhereTo />;
      case "selectType":
        return <SelectFreight />;
      case "ShipmentForm":
        return <ShipmentForm />;
    }
  };
  return (
    <div className="min-h-screen padding-x bg-background-screen text-brand-black pb-6">
      <div className="max-w-[888.5px] mx-auto">
        <AuthPrompt />
        {shipmentStage()}
      </div>
    </div>
  );
};

export default ShipmentPageContent;
