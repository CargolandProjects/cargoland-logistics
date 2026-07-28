import {
  GetAllPricingData,
  ShipmentType,
  pricing,
} from "@/lib/services/pricing.service";
import { useQuery } from "@tanstack/react-query";

export const usePricing = ({
  page = 1,
  limit = 10,
  weight,
  fromCountry,
  fromState,
  fromCity,
  shipmentType = "INTERNATIONAL",
  toCountry,
  toState,
  toCity,
  enabled,
}: GetAllPricingData & { enabled: boolean }) => {
  return useQuery({
    queryKey: [
      "pricing",
      {
        page,
        limit,
        weight,
        fromCountry,
        fromState,
        fromCity,
        shipmentType,
        toCountry,
        toState,
        toCity,
      },
    ],
    queryFn: () =>
      pricing.getAllPricing({
        page,
        limit,
        weight,
        fromCountry,
        fromState,
        fromCity,
        shipmentType,
        toCountry,
        toState,
        toCity,
      }),
    placeholderData: (prev) => prev,
    enabled: enabled,
  });
};

export const useLocalPricing = ({
  page = 1,
  limit = 10,
  weight,
  fromState,
  toWhereState,
  shipmentType = "DOMESTIC",
  enabled = false,
}: {
  page?: number;
  limit?: number;
  weight?: number;
  fromState?: string;
  toWhereState?: string;
  shipmentType?: ShipmentType;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [
      "localPricing",
      { page, limit, weight, fromState, toWhereState, shipmentType },
    ],
    queryFn: () =>
      pricing.getAllLocalPricing({
        page,
        limit,
        weight,
        fromState,
        toWhereState,
        shipmentType,
      }),
    placeholderData: (prev) => prev,
    enabled: enabled,
  });
};
