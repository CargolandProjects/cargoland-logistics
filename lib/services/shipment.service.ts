import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { ShipmentDataType } from "../schemas/shipmentSchema";
import { APIResponse } from "./auth.service";

export type Shipment = ShipmentDataType & {
  id?: string;
  totalShipmentWeight?: number;
  trackingId?: string;
  price?: string;
  userId?: string;
  paymentStatus?: string;
  createdAt?: string;
  updatedAt?: string;
};

type CreateShipment = APIResponse<Shipment>;

export const shipment = {
  async createShipment(data: ShipmentDataType) {
    const res = await apiClient.post<CreateShipment>(
      API_ROUTES.shipment.createShipment,
      data
    );
    return res.data;
  },

  async createShipmentUser(data: ShipmentDataType) {
    const res = await apiClient.post<CreateShipment>(
      API_ROUTES.shipment.createShipmentUser,
      data
    );
    return res.data;
  },

  async trackShipment(trackingId: string) {
    const res = await apiClient.get(
      `${API_ROUTES.shipment.trackShipment}?trackingId=${trackingId}`
    );
    return res.data;
  },
};
