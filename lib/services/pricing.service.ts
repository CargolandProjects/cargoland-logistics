import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "./auth.service";

export type ShipmentType = "DOMESTIC" | "INTERNATIONAL";

export interface Pricing {
  id: string;
  shipmentType: ShipmentType;
  fromWhere: string;
  toWhere: string;
  isPopularRoute: boolean;
  adminId: string;
  createdAt: string;
  updatedAt: string;
  brackets: Bracket[];
}

export interface Bracket {
  id: string;
  minWeight: string;
  maxWeight: string;
  airFreightRate: string;
  oceanFreightRate: string;
  roadFreightRate: string;
}

export interface LocalPricing {
  id: string;
  shipmentType: string;
  fromState: string;
  fromCity: string;
  toWhereState: string;
  toWhereCity: string;
  adminId: string;
  createdAt: string;
  updatedAt: string;
  brackets: {
    id: string;
    minWeight: string;
    maxWeight: string;
    ratePerkg: string;
  }[];
}

type PricingRes = APIResponse<Pricing[]> & {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
type LocalPricingRes = APIResponse<LocalPricing[]> & {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export interface GetAllPricingData {
  page?: number;
  limit?: number;
  shipmentType?: ShipmentType;
  fromCountry?: string;
  fromState?: string;
  fromCity?: string;
  toCountry?: string;
  toState?: string;
  toCity?: string;
  weight?: string;
}
export interface GetLocalPricingData {
  page?: number;
  limit?: number;
  shipmentType?: ShipmentType;
  fromState?: string;
  fromCity?: string;
  toWhereState?: string;
  toWhereCity?: string;
  weight?: string;
}

export const pricing = {
  async getAllPricing(data: GetAllPricingData) {
    const res = await apiClient.get<PricingRes>(
      API_ROUTES.pricing.getAllPricing,
      {
        params: {
          page: data.page ?? 1,
          limit: data.limit ?? 10,
          ...(data.shipmentType && { shipmentType: data.shipmentType }),
          ...(data.fromCountry && { fromCountry: data.fromCountry }),
          ...(data.toCountry && { toCountry: data.toCountry }),
          ...(data.weight && { weight: data.weight }),
          ...(data.fromState && { fromState: data.fromState }),
          ...(data.toState && { toState: data.toState }),
          ...(data.fromCity && { fromCity: data.fromCity }),
          ...(data.toCity && { toCity: data.toCity }),
        },
      },
    );
    return res.data;
  },

  async getAllLocalPricing(data: GetLocalPricingData) {
    const res = await apiClient.get<LocalPricingRes>(
      API_ROUTES.pricing.getAllLocalPricing,
      {
        params: {
          page: data.page ?? 1,
          limit: data.limit ?? 10,
          ...(data.shipmentType && { shipmentType: data.shipmentType }),
          ...(data.weight && { weight: data.weight }),
          ...(data.fromState && { fromState: data.fromState }),
          // ...(data.fromCity && { fromCity: data.fromCity }),
          ...(data.toWhereState && { toWhereState: data.toWhereState }),
          // ...(data.toWhereCity && { toWhereCity: data.toWhereCity }),
        },
      },
    );
    return res.data;
  },
};
