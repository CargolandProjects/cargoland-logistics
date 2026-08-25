import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "./auth.service";

export interface ShipmentVolume {
  month: string;
  volume: number;
}

export interface SpendingTrend {
  month: string;
  amount: number;
}

interface Insights {
  totalShipment: number;
  delivered: number;
  cancelledDelivered: number;
  totalSpend: number;
  topDestination: null;
  shipmentVolume: ShipmentVolume[];
  spendingTrend: SpendingTrend[];
}


export const company = {
  async getCompanyInsights() {
    const res = await apiClient.get<Insights>(API_ROUTES.company);
    return res.data;
  },
};
