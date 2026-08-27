import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";

export interface ShipmentVolume {
  month: string;
  volume: number;
}

export interface SpendingTrend {
  month: string;
  amount: number;
}

export interface TopDestination {
  city: string;
  state: string;
  shipmentCount: number;
}

interface Insights {
  totalShipment: number;
  delivered: number;
  cancelledDelivered: number;
  totalSpend: number;
  topDestination: TopDestination[];
  shipmentVolume: ShipmentVolume[];
  spendingTrend: SpendingTrend[];
}

export const company = {
  async getCompanyInsights() {
    const res = await apiClient.get<Insights>(API_ROUTES.company);
    return res.data;
  },
};
