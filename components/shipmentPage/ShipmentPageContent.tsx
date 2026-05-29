"use client";

import AuthPrompt from "./AuthPrompt";
import WhereTo from "./WhereTo";
import SelectFreight from "./SelectFreight";
import { useShipmentStore } from "@/lib/stores/useShipmentStore";
import ShipmentForm from "./shipmentForm/ShipmentForm";
import { useSession } from "@/lib/hooks/useSession";

const ShipmentPageContent = () => {
  const shipmentStep = useShipmentStore((s) => s.step);
  const { isAuthenticated } = useSession();
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
    <div className={`padding-x text-brand-black pb-6 ${isAuthenticated ? "mt-7.5" : "mt-10"} `}>
      <div className="max-w-[888.5px] mx-auto">
        {!isAuthenticated && <AuthPrompt />}
        {shipmentStage()}
      </div>
    </div>
  );
};

export default ShipmentPageContent;
