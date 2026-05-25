import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";

export const shipment = {
  async trackShipment(trackingId: string) {
    const res = await apiClient.get(
      `${API_ROUTES.shipment.trackShipment}?trackingId=${trackingId}`
    );
    return res.data;
  },
};
