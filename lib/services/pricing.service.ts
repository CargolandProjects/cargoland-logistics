import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "./auth.service";
import { shipment } from "./shipment.service";

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
  brackets: (Bracket | null)[];
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

  async getAllLocalPricing(
    page: number,
    limit: number,
    origin?: string,
    destination?: string,
    shipmentType?: string,
  ) {
    const res = await apiClient.get<LocalPricingRes>(
      API_ROUTES.pricing.getAllLocalPricing,
      {
        params: {
          page,
          limit,
          ...(origin && { fromState: origin }),
          ...(destination && { toWhereState: destination }),
          ...(shipmentType && { shipmentType }),
        },
      },
    );
    return res.data;
  },
};
