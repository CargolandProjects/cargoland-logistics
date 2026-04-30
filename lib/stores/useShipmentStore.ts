import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ShipmentFormType } from "../schemas/shipmentSchema";
import { DeepPartial } from "react-hook-form";

export type ShipmentType = "air" | "road" | "ocean";
export type ShipmentScope = "domestic" | "international";
type Step = "selectScope" | "selectType" | "ShipmentForm";

// Create a type that matches react-hook-form's watch return type
// export type DeepPartial<T> = {
//   [P in keyof T]?: DeepPartial<T[P]>;
// };

interface ShipmentStore {
  step: Step;
  shipmentType: ShipmentType | null;
  shipmentScope: ShipmentScope | null;
  formData: {
    step: number | null;
    data: DeepPartial<ShipmentFormType> | {};
  };

  setShipmentScope: (shipmentScope: ShipmentScope) => void;
  setShipmentType: (shipmentType: ShipmentType) => void;
  setFormData: (formData: {
    step: number;
    data: DeepPartial<ShipmentFormType>;
  }) => void;
  clearShipment: () => void;
}

export const useShipmentStore = create(
  persist<ShipmentStore>(
    (set) => ({
      step: "selectScope",
      shipmentType: null,
      shipmentScope: null,
      formData: {
        step: null,
        data: {},
      },

      setShipmentScope: (shipmentScope) => {
        set({ shipmentScope, step: "selectType" });
        // alert("SHipment scope set to: " + shipmentScope);
      },
      setShipmentType: (shipmentType) =>
        set({ shipmentType, step: "ShipmentForm" }),
      setFormData: (formData) =>
        set((state) => ({
          formData: {
            ...state.formData,
            step: formData.step,
            data: { ...formData.data },
          },
        })),

      clearShipment: () =>
        set({
          step: "selectScope",
          shipmentScope: null,
          shipmentType: null,
          formData: {
            step: null,
            data: {},
          },
        }),
    }),
    {
      name: "shipment-store",
    }
  )
);
