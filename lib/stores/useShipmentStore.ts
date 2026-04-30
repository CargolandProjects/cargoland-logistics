import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ShipmentType = "air" | "road" | "ocean";
export type ShipmentScope = "domestic" | "international";
type Step = "selectScope" | "selectType" | "ShipmentForm";

interface ShipmentStore {
  step: Step;
  shipmentType: ShipmentType | null;
  shipmentScope: ShipmentScope | null;
  formData: Record<string, string>;

  setShipmentScope: (shipmentScope: ShipmentScope) => void;
  setShipmentType: (shipmentType: ShipmentType) => void;
  setFormData: (formData: Record<string, string>) => void;
  clearShipment: () => void;
}

export const useShipmentStore = create(
  persist<ShipmentStore>(
    (set) => ({
      step: "selectScope",
      shipmentType: null,
      shipmentScope: null,
      formData: {},

      setShipmentScope: (shipmentScope) => {
        set({ shipmentScope, step: "selectType" });
        // alert("SHipment scope set to: " + shipmentScope);
      },
      setShipmentType: (shipmentType) =>
        set({ shipmentType, step: "ShipmentForm" }),
      setFormData: (formData) =>
        set((state) => ({ ...state.formData, formData })),

      clearShipment: () =>
        set({
          step: "selectScope",
          shipmentScope: null,
          shipmentType: null,
          formData: {},
        }),
    }),
    {
      name: "shipment-store",
    }
  )
);
