import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "./auth.service";

export type Method = "DOMESTIC" | "INTERNATIONAL";

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

type PricingRes = APIResponse<Pricing[]>;

export const pricing = {
  async getAllPricing(
    page: number,
    limit: number,
    origin?: string,
    destination?: string,
    method?: Method,
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
};
