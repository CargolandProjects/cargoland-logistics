import { shipment } from "@/lib/services/shipment.service";
import { useMutation } from "@tanstack/react-query";

export const useTrackShipment = () => {
  return useMutation({
    mutationFn: shipment.trackShipment,
  });
};
