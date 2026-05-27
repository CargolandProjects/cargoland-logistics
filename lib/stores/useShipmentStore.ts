import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ShipmentDataType } from "../schemas/shipmentSchema";
import { DeepPartial } from "react-hook-form";
import { Shipment } from "../services/shipment.service";

export type FreightType = "AIR_FREIGHT" | "OCEAN_FREIGHT" | "ROAD_FREIGHT";
export type ShipmentType = "DOMESTIC" | "INTERNATIONAL";
type Step = "selectScope" | "selectType" | "ShipmentForm" | "successful";

// Create a type that matches react-hook-form's watch return type
// export type DeepPartial<T> = {
//   [P in keyof T]?: DeepPartial<T[P]>;
// };

interface ShipmentStore {
  step: Step;
  freightType: FreightType | null;
  shipmentType: ShipmentType | null;
  createdShipment: Shipment | null;
  formData: {
    step: number | null;
    data: DeepPartial<ShipmentDataType> | null;
  };

  setShipmentType: (shipmentType: ShipmentType) => void;
  setFreightType: (freightType: FreightType) => void;
  setShipmentFlow: (shipmentFlow: Step) => void;
  setCreatedShipment: (createdShipment: Shipment) => void;
  setFormData: (formData: {
    step: number;
    data?: DeepPartial<ShipmentDataType>;
  }) => void;
  clearShipment: () => void;
}

export const useShipmentStore = create(
  persist<ShipmentStore>(
    (set) => ({
      step: "selectScope",
      freightType: null,
      shipmentType: null,
      createdShipment: null,
      formData: {
        step: null,
        data: null,
      },

      setShipmentType: (shipmentType) => {
        set({ shipmentType, step: "selectType" });
        // alert("SHipment scope set to: " + shipmentScope);
      },
      setFreightType: (freightType) =>
        set({ freightType, step: "ShipmentForm" }),

      setShipmentFlow: (shipmentFlow) => {
        set({
          step: shipmentFlow,
        });
      },
      setCreatedShipment: (createdShipment) =>
        set({
          createdShipment,
        }),

      setFormData: (formData) =>
        set((state) => ({
          formData: {
            ...state.formData,
            step: formData.step,
            data: { ...state.formData.data, ...formData.data },
          },
        })),

      clearShipment: () =>
        set({
          step: "selectScope",
          shipmentType: null,
          freightType: null,
          createdShipment: null,
          formData: {
            step: null,
            data: null,
          },
        }),
    }),
    {
      name: "shipment-store",
    }
  )
);
