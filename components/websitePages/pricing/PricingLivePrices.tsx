"use client";

import { useRef, useState } from "react";
import { Button } from "../../ui/button";
import { DeliveryTruck, Plane } from "../../icons";
import { useLocalPricing, usePricing } from "@/lib/hooks/queries/usePricing";
import {
  Bracket,
  LocalBracket,
  LocalPricing,
  Pricing,
  ShipmentType,
} from "@/lib/services/pricing.service";
import { countryOptions, nigeriaStates } from "@/lib/utils/countryOptions";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { formatMinSecMill } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { RoutePrice } from "./RoutePrice";
import { RoutePriceSkeleton } from "./RoutePriceSkeleton";
import { Pagination } from "@/components/Pagination";
import Image from "next/image";
import { boxChecked } from "@/assets/images";

interface Filter {
  origin?: string;
  destination?: string;
  weight?: string;
}

type AnyPricingItem = Pricing | LocalPricing;
type AnyBracket = Bracket | LocalBracket;

const RoutesLoading = () => {
  return (
    <div className="mt-2.5 md:mt-10 grid md:grid-cols-2 gap-2.5 md:gap-x-5.5 md:gap-y-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <RoutePriceSkeleton key={idx} />
      ))}
    </div>
  );
};
// Type guards
function isInternational(item: AnyPricingItem): item is Pricing {
  return "fromWhere" in item && "toWhere" in item;
}

function isDomestic(item: AnyPricingItem): item is LocalPricing {
  return "fromState" in item && "toWhereState" in item;
}

function flattenPricingData(pricingData: AnyPricingItem[], weight: number) {
  const result: {
    id: string;
    fromWhere: string;
    toWhere: string;
    freightType: string;
    rate: number;
    key: string;
    shipmentType: ShipmentType;
  }[] = [];

  pricingData.forEach((item) => {
    let fromWhere = "";
    let toWhere = "";
    let brackets: AnyBracket[] = [];
    let shipmentType;

    if (isInternational(item)) {
      fromWhere = item.fromWhere;
      toWhere = item.toWhere;
      brackets = item.brackets; // Bracket[]
      shipmentType = item.shipmentType;
    } else if (isDomestic(item)) {
      fromWhere = item.fromState;
      toWhere = item.toWhereState;
      brackets = item.brackets; // LocalBracket[]
      shipmentType = item.shipmentType;
    } else {
      return;
    }

    const matchingBrackets = brackets.filter((b) => {
      const min = parseFloat(b.minWeight);
      const max = parseFloat(b.maxWeight);
      return weight >= min && weight <= max;
    });

    matchingBrackets.forEach((bracket) => {
      let rates: { key: string; label: string; rate: number }[] = [];

      // International bracket has airFreightRate
      if ("airFreightRate" in bracket && bracket.airFreightRate !== undefined) {
        const b = bracket as Bracket;
        const air = parseFloat(b.airFreightRate) || 0;
        const ocean = parseFloat(b.oceanFreightRate) || 0;
        const road = parseFloat(b.roadFreightRate) || 0;

        if (air > 0)
          rates.push({ key: "air", label: "Air Freight", rate: air });
        if (ocean > 0)
          rates.push({ key: "ocean", label: "Ocean Freight", rate: ocean });
        if (road > 0)
          rates.push({ key: "road", label: "Road Freight", rate: road });
      } else if ("ratePerkg" in bracket) {
        // Domestic bracket has ratePerkg
        const b = bracket as LocalBracket;
        const rate = parseFloat(b.ratePerkg) || 0;
        if (rate > 0) {
          rates = [{ key: "domestic", label: "Road Freight", rate }];
        }
      }

      rates.forEach((r) => {
        if (r.rate > 0) {
          result.push({
            id: item.id,
            fromWhere,
            toWhere,
            freightType: r.label,
            rate: r.rate,
            key: `${item.id}-${r.key}`,
            shipmentType, // "DOMESTIC" or "INTERNATIONAL"
          });
        }
      });
    });
  });

  return result;
}

const PricingLivePrices = () => {
  const [filters, setFilters] = useState<Filter>({ weight: "3" });
  const [tab, setTab] = useState<ShipmentType>("INTERNATIONAL");
  const [currentIntlPage, setCurrentIntlPage] = useState(1);
  const [currentLPage, setCurrentLPage] = useState(1);
  const debouncedWeight = useDebounce(filters.weight);
  const weight = parseFloat(debouncedWeight || "0");
  const pricesRef = useRef<HTMLElement>(null);

  const {
    data: intlPrices,
    isLoading,
    isError,
    isSuccess,
  } = usePricing({
    page: currentIntlPage,
    fromCountry: filters.origin,
    toCountry: filters.destination,
    weight: weight,
    enabled: tab === "INTERNATIONAL",
  });

  const {
    data: localPrices,
    isLoading: isLocalLoading,
    isSuccess: isLocalSuccess,
    isError: isLocalError,
  } = useLocalPricing({
    page: currentLPage,
    fromState: filters.origin,
    toWhereState: filters.destination,
    weight: weight,
    enabled: tab === "DOMESTIC",
  });

  // console.log("Filters", filters);

  const fromList =
    tab === "DOMESTIC"
      ? [{ value: "origin", label: "Origin" }, ...nigeriaStates]
      : [{ value: "origin", label: "Origin" }, ...countryOptions];

  const toList =
    tab === "DOMESTIC"
      ? [{ value: "destination", label: "Destination" }, ...nigeriaStates]
      : [{ value: "destination", label: "Destination" }, ...countryOptions];

  const filteredIntlPrices =
    intlPrices?.data?.filter((p) => p.brackets.length > 0) || [];
  const filteredLocalPrices =
    localPrices?.data?.filter((p) => p.brackets.length > 0) || [];

  const flattenedPrices = flattenPricingData(filteredIntlPrices, weight);
  const flattenedLocalPrices = flattenPricingData(filteredLocalPrices, weight);

  const isActiveLoading = tab === "INTERNATIONAL" ? isLoading : isLocalLoading;
  const isActiveSuccess = tab === "INTERNATIONAL" ? isSuccess : isLocalSuccess;
  const isActiveError = tab === "INTERNATIONAL" ? isError : isLocalError;

  const pagination =
    tab === "INTERNATIONAL" ? intlPrices?.meta : localPrices?.meta;

  const totalPages = pagination?.totalPages || 1;
  const page = pagination?.page || 1;

  const activePrices =
    tab === "INTERNATIONAL" ? flattenedPrices : flattenedLocalPrices;

  const handlePageChange = (page: number) => {
    if (tab === "INTERNATIONAL") setCurrentIntlPage(page);
    if (tab === "DOMESTIC") setCurrentLPage(page);
    // Scroll to top of the table when page changes

    if (pricesRef.current) {
      pricesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // console.log("Filtered Live Prices: ", flattenedPrices);
  return (
    <div className="padding-x py-20 bg-[#F5F7F8]">
      <div className="flex max-md:flex-col justify-between">
        <div>
          <h2 className="sec-heading md:text-start!">Live Prices Today</h2>
          <p className="sec-paragraph md:max-w-none! md:text-start!">
            Real-time shipping rates per kilogram across popular international
            routes.
          </p>
        </div>

        {/* Tabs */}
        <div className="max-md:mt-2.5 p-1 flex max-xxs:flex-col gap-1 h-fit bg-white rounded-sm">
          <Button
            onClick={() => setTab("INTERNATIONAL")}
            variant={tab === "INTERNATIONAL" ? "default" : "ghost"}
            className={`${tab === "DOMESTIC" && "text-gray-500 font-normal"} flex-1 rounded-md py-2 px-3 h-auto gap-2 max-xs:text-xs`}
          >
            <Plane className="size-4" strokeWidth={3} />
            International Shipping
          </Button>

          <Button
            onClick={() => setTab("DOMESTIC")}
            variant={tab === "DOMESTIC" ? "default" : "ghost"}
            className={`${tab === "INTERNATIONAL" && "text-gray-500 font-normal"} flex-1 rounded-md py-2 px-3 h-auto gap-2 max-xs:text-xs`}
          >
            <DeliveryTruck className="size-4" strokeWidth={0.5} />
            Domestic Shipping
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="mt-2.5 md:mt-6 flex max-md:flex-col justify-between md:items-end gap-6">
        <div className="flex max-md:flex-col max-md:w-full md:items-center gap-3">
          <p className="md:text-lg max-md:font-medium leading-5.5 md:leading-6 shrink-0">
            Filter by:
          </p>
          <div className="grid md:grid-cols-3 max-w-[650px] 2xl:max-w-[807px] gap-4">
            {/* origin */}
            <Combobox
              items={fromList}
              value={filters.origin}
              defaultValue="Origin"
              onValueChange={(val) => {
                setFilters((prev) => ({
                  ...prev,
                  origin: val === "Origin" ? undefined : (val as string),
                }));
              }}
            >
              <ComboboxInput className="py-1! h-auto px-1.5 font-roboto [&_input]:text-sm! focus-border bg-white" />

              <ComboboxContent>
                <ComboboxEmpty>
                  {tab === "INTERNATIONAL"
                    ? "No country found"
                    : "No state found"}
                </ComboboxEmpty>
                <ComboboxList>
                  {(country) => (
                    <ComboboxItem
                      key={country.value}
                      value={country.label}
                      className="font-roboto"
                    >
                      {country.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            {/* destination */}
            <Combobox
              items={toList}
              value={filters.destination}
              defaultValue="Destination"
              onValueChange={(val) =>
                setFilters((prev) => ({
                  ...prev,
                  destination:
                    val === "Destination" ? undefined : (val as string),
                }))
              }
            >
              <ComboboxInput className="py-1! h-auto px-1.5 font-roboto [&_input]:text-sm! focus-border bg-white" />

              <ComboboxContent>
                <ComboboxEmpty>
                  {tab === "INTERNATIONAL"
                    ? "No country found"
                    : "No state found"}
                </ComboboxEmpty>
                <ComboboxList>
                  {(country) => (
                    <ComboboxItem
                      key={country.value}
                      value={country.label}
                      className="font-roboto"
                    >
                      {country.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            {/* Method */}
            {/* <Select
              value={filters.weight ?? "method"}
              onValueChange={(val) =>
                setFilters((prev) => ({
                  ...prev,
                  method: val === "method" ? undefined : (val as ShipmentType),
                }))
              }
            >
              <SelectTrigger className="w-full py-3 h-auto! px-4 text-primary-dark! bg-primary-light">
                <SelectValue placeholder="Method" />
              </SelectTrigger>

              <SelectContent position="popper">
                <SelectItem value="method">Method</SelectItem>
                <SelectItem value="INTERNATIONAL">International</SelectItem>
                <SelectItem value="DOMESTIC">Domestic</SelectItem>
                <SelectItem value="DOOR_TO_DOOR_SHIPPING">
                  Door to door
                </SelectItem>
              </SelectContent>
            </Select> */}
            <Input
              type="number"
              value={filters.weight}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, weight: e.target.value }))
              }
              placeholder="Weight (kg)"
              className="form-input h-11.25! bg-white"
            />
          </div>
        </div>

        <p className="shrink-0 leading-6 font-light ">
          Updated: {formatMinSecMill(new Date())}
        </p>
      </div>

      <section ref={pricesRef}>
        {isActiveLoading && <RoutesLoading />}
        {isActiveError && (
          <div className="mt-3 px-2 py-3 rounded-lg bg-white">
            <p className="text-red-600 font-roboto ">
              Failed to fetch <span className="lowercase">{tab}</span> prices
            </p>
          </div>
        )}

        {isActiveSuccess && activePrices.length === 0 && (
          <div className="col-span-2 flex flex-col items-center justify-center py-20 text-center">
            <div className="size-20 grayscale-33">
              <Image
                src={boxChecked}
                alt="box package checked icon"
                className="size-full object-cover"
              />
            </div>
            <h3 className="mt-1 text-xl font-semibold text-gray-700 capitalize">
              No routes found
            </h3>
            <p className="text-gray-500 md:mt-0.5 ">
              Try adjusting your filters or weight.
            </p>
          </div>
        )}

        {isActiveSuccess && activePrices.length > 0 && (
          <div className="mt-2.5 md:mt-10 grid md:grid-cols-2 gap-2.5 md:gap-x-5.5 md:gap-y-4">
            {activePrices.map((price, idx) => (
              <RoutePrice
                key={idx}
                fromWhere={price.fromWhere}
                toWhere={price.toWhere}
                freightType={price.freightType}
                shipmentType={price.shipmentType}
                rate={price.rate}
                weight={weight}
              />
            ))}
          </div>
        )}
      </section>

      {isActiveSuccess && totalPages > 1 && (
        <div className="mt-9.25">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            siblings={totalPages > 3 ? 1 : 0}
          />
        </div>
      )}
    </div>
  );
};

export default PricingLivePrices;
