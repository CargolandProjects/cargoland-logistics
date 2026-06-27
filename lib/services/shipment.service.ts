import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { ShipmentDataType } from "../schemas/shipmentSchema";
import { FreightType, ShipmentType } from "../stores/useShipmentStore";
import { APIResponse } from "./auth.service";

export type ShipmentStatus =
  | "PENDING"
  | "ASSIGNED"
  | "PICKED_UP"
  | "AT_ORIGIN_HUB"
  | "IN_TRANSIT"
  | "DESTINATION"
  | "CUSTOM_CLEARANCE"
  | "DELIVERED"
  | "CANCELLED";

export type Shipment = {
  id: string;
  shipmentType: ShipmentType;
  freightType: FreightType;
  status: ShipmentStatus;
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  stateOrCity: string;
  address: string;
  pickUpAddressType: "HOME" | "OFFICE" | "DROP_OFF";
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
  imageUrl: {
    imageUrl: string;
    publicId: string;
  }[];
  descriptionOfGoods: string;
  totalShipmentWeight: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  trackingId: string;
  price: string;
  pickupDate: string;
  pickupTime: string;
  bookingId: string | null;
  carrierName: string | null;
  currentLocation: string | null;
  fuelLevel: number | null;
  lastGpsPing: string | null;
  speedKmh: number | null;
  vehicleId: string | null;
  driverId: string | null;
  driverName: string | null;
  driverPhoneNumber: string | null;
  driverStatus: string | null;
  vehicleName: string | null;
  vehiclePlate: string | null;
  gpsCoordinates: string | null;
  packagesOnboard: number;
  packageConfirmedOnboard: boolean;
  vehicleOperatingNormally: boolean;
  engineStatus: string | null;
  fuelRangeKm: number | null;
  completionRate: number;
  estimatedTime: string | null;
  routeOrigin: string | null;
  routeDestination: string | null;
  paymentStatus: "PENDING" | "PAID" | "FAILED";
};

// export type Shipment = ShipmentDataType & {
//   id?: string;
//   totalShipmentWeight?: number;
//   trackingId?: string;
//   price?: string;
//   userId?: string;
//   paymentStatus?: string;
//   createdAt?: string;
//   updatedAt?: string;
// };

// interface TrackShipment {
//   id: string;
//   shipmentType: ShipmentType;
//   freightType: FreightType;
//   status: "PENDING" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED" | string;
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   country: string;
//   stateOrCity: string;
//   address: string;
//   pickUpAddressType: "HOME" | "OFFICE" | "DROP_OFF";
//   pickupDate: string;
//   pickupTime: string;
//   receiverName: string;
//   receiverEmail: string;
//   receiverCountry: string;
//   receiverNumber: string;
//   receiverStateOrCity: string;
//   receiverAddress: string;
//   packageType: string;
//   numberOfItems: number;
//   weight: number;
//   length: number;
//   breadth: number;
//   height: number;
//   descriptionOfGoods: string;
//   totalShipmentWeight: number;
//   trackingId: string;
//   price: string;
//   userId: string;
//   paymentStatus: "PENDING" | "PAID" | "FAILED" | string;
//   createdAt: string;
//   updatedAt: string;
// }

interface DashboardStats {
  totalShipments: number;
  activeShipments: number;
  deliveredShipments: number;
  pendingShipments: number;
}

interface AllShipments {
  shipments: Shipment[];
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

interface MakePayment {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

type CreateShipment = APIResponse<Shipment>;
type TrackShipmentRes = APIResponse<Shipment>;
type DashboardStatsRes = APIResponse<DashboardStats>;
type AllShipmentsRes = APIResponse<AllShipments>;
type MyShipmentsRes = APIResponse<Shipment[]>;
type EstimateRes = APIResponse<Estimate>;
type MakePaymentRes = APIResponse<MakePayment>;

export const shipment = {
  async createShipment(data: ShipmentDataType) {
    const res = await apiClient.post<CreateShipment>(
      API_ROUTES.shipment.createShipment,
      data,
    );
    return res.data;
  },

  async createShipmentUser(data: ShipmentDataType) {
    const res = await apiClient.post<CreateShipment>(
      API_ROUTES.shipment.createShipmentUser,
      data,
    );
    return res.data;
  },

  async trackShipment(trackingId: string) {
    const res = await apiClient.get<TrackShipmentRes>(
      `${API_ROUTES.shipment.trackShipment}?trackingId=${trackingId}`,
    );
    return res.data;
  },

  async dashboardStats() {
    const res = await apiClient.get<DashboardStatsRes>(
      API_ROUTES.shipment.dashboardStats,
    );
    return res.data;
  },

  async allShipments(page: number, limit: number) {
    const res = await apiClient.get<AllShipmentsRes>(
      API_ROUTES.shipment.allShipments,
      {
        params: {
          page,
          limit,
        },
      },
    );
    return res.data;
  },

  async shipmentEstimate(data: EstimateData) {
    const res = await apiClient.post<EstimateRes>(
      API_ROUTES.shipment.shipmentEstimate,
      data,
    );
    return res.data;
  },

  async getShipment(id: string) {
    const res = await apiClient.get<TrackShipmentRes>(
      API_ROUTES.shipment.getShipmentById(id),
    );
    return res.data;
  },

  async myShipments(query: string) {
    const res = await apiClient.post<MyShipmentsRes>(
      `${API_ROUTES.shipment.myShipments}?status=${query}`,
    );
    return res.data;
  },

  async makePayment(shipmentId: string) {
    const res = await apiClient.post<MakePaymentRes>(
      API_ROUTES.shipment.makePayment(shipmentId),
    );
    return res.data;
  },
};
