import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { ShipmentDataType } from "../schemas/shipmentSchema";
import { FreightType, ShipmentType } from "../stores/useShipmentStore";
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

interface TrackShipment {
  id: string;
  shipmentType: ShipmentType;
  freightType: FreightType;
  status: "PENDING" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED" | string;
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  stateOrCity: string;
  address: string;
  pickUpAddressType: "HOME" | "OFFICE" | "DROP_OFF";
  pickupDate: string;
  pickupTime: string;
  receiverName: string;
  receiverEmail: string;
  receiverCountry: string;
  receiverNumber: string;
  receiverStateOrCity: string;
  receiverAddress: string;
  packageType: string;
  numberOfItems: number;
  weight: number;
  length: number;
  breadth: number;
  height: number;
  descriptionOfGoods: string;
  totalShipmentWeight: number;
  trackingId: string;
  price: string;
  userId: string;
  paymentStatus: "PENDING" | "PAID" | "FAILED" | string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardStats {
  totalShipments: number;
  activeShipments: number;
  deliveredShipments: number;
  pendingShipments: number;
}

interface AllShipments {
  shipments: TrackShipment[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface EstimateData {
  weight: number;
  length: number;
  breadth: number;
  height: number;
}

interface Estimate {
  totalShipmentWeight: number;
  estimatedPrice: number;
}

type CreateShipment = APIResponse<Shipment>;
type TrackShipmentRes = APIResponse<TrackShipment>;
type DashboardStatsRes = APIResponse<DashboardStats>;
type AllShipmentsRes = APIResponse<AllShipments>;
type EstimateRes = APIResponse<Estimate>;

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
    const res = await apiClient.get<TrackShipmentRes>(
      `${API_ROUTES.shipment.trackShipment}?trackingId=${trackingId}`
    );
    return res.data;
  },

  async dashboardStats() {
    const res = await apiClient.get<DashboardStatsRes>(
      API_ROUTES.shipment.dashboardStats
    );
    return res.data;
  },

  async allShipments() {
    const res = await apiClient.get<AllShipmentsRes>(
      API_ROUTES.shipment.allShipments
    );
    return res.data;
  },

  async estimateShipment(data: EstimateData) {
    const res = await apiClient.post<EstimateRes>(
      API_ROUTES.shipment.estimateShipment,
      data
    );
    return res.data;
  },
};
