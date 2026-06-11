import { shipment } from "@/lib/services/shipment.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateShipment = () => {
  return useMutation({
    mutationFn: shipment.createShipment,
  });
};
export const useCreateShipmentUser = () => {
  return useMutation({
    mutationFn: shipment.createShipmentUser,
  });
};

export const useTrackShipment = () => {
  return useMutation({
    mutationFn: shipment.trackShipment,
  });
};

export const useShipmentEstimate = () => {
  return useMutation({
    mutationFn: shipment.shipmentEstimate,
  });
};
