import { shipment } from "@/lib/services/shipment.service";
import { useQuery } from "@tanstack/react-query";

// export const useTrackShipment = (trackingId: string) => {
//   return useQuery({
//     queryKey: ["trackShipment", trackingId],
//     queryFn: () => shipment.trackShipment(trackingId),
//     enabled: !!trackingId,
//   });
// };
