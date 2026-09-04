import { shipment } from "@/lib/services/shipment.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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

export const useMakePayment = () => {
  return useMutation({
    mutationFn: shipment.makePayment,
    onError: (res) => {
      toast.error(res.message || "Payment failed. Please try again.");
    },
  });
};

export const useShipmentInvoice = () => {
  return useMutation({
    mutationFn: shipment.getShipmentInvoice,
  });
};
