import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "./auth.service";

export type ShipmentType = "DOMESTIC" | "INTERNATIONAL";

interface Pricing {
  id: string;
  pricingShippingType: string;
  airFreightRate: string;
  roadFreightRate: string;
  oceanFreightRate: string;
  fromWhere: string;
  toWhere: string;
  isPopularRoute: false;
  adminId: string;
  createdAt: string;
  updatedAt: string;
}

interface LocalPricing {
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

export const pricing = {
  async getAllPricing(
    page: number,
    limit: number,
    origin?: string,
    destination?: string,
    method?: ShipmentType,
  ) {
    const res = await apiClient.get<PricingRes>(
      API_ROUTES.pricing.getAllPricing,
      {
        params: {
          page,
          limit,
          ...(origin && { origin }),
          ...(destination && { destination }),
          ...(method && { method }),
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
          ...(origin && { origin }),
          ...(destination && { destination }),
          ...(shipmentType && { shipmentType }),
        },
      },
    );
    return res.data;
  },
};
