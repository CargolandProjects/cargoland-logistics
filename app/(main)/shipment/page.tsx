"use client";

import AuthPrompt from "@/components/shipments/AuthPrompt";
import WhereTo from "@/components/shipments/WhereTo";
import SelectFreight from "@/components/shipments/SelectFreight";
import { useShipmentStore } from "@/lib/stores/useShipmentStore";
import ShipmentForm from "@/components/shipments/shipmentForm/ShipmentForm";
import { useSession } from "@/lib/hooks/useSession";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { ShipmentType } from "@/lib/services/pricing.service";

const CreateShipmentPageContent = () => {
  const shipmentStep = useShipmentStore((s) => s.step);
  const setShipmentType = useShipmentStore((s) => s.setShipmentType);
  const { isAuthenticated } = useSession();
  const searchParams = useSearchParams();
  const shipmentTypeQ = searchParams.get("shipmentType");

  // console.log("Shipment Type From Query: ", shipmentTypeQ);
  // console.log("Shipment Step: ", shipmentStep);

  useEffect(() => {
    if (!shipmentTypeQ) return;

    setShipmentType(shipmentTypeQ as ShipmentType);
  }, [setShipmentType, shipmentTypeQ]);

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
};

export default function CreateShipmentPage() {
  return (
    <Suspense>
      <CreateShipmentPageContent />
    </Suspense>
  );
}
