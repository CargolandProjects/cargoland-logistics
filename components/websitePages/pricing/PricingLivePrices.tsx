"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
// import { TrendingDown, TrendingUp } from "lucide-react";
import { ArrowRight } from "../../icons";
import { usePricing } from "@/lib/hooks/queries/usePricing";
import { useRouter } from "next/navigation";
import TableSkeleton from "./TableSkeleton";
import CardSkeleton from "./CardSkeleton";
import { ShipmentType } from "@/lib/services/pricing.service";
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

interface Filter {
  origin?: string;
  destination?: string;
  method?: ShipmentType;
}

const PricingLivePrices = () => {
  const [filters, setFilters] = useState<Filter>({});
  const router = useRouter();
  const { data: livePrices, isLoading, isError, isSuccess } = usePricing();
  console.log("Filters", filters);
  const fromList =
    filters.method === "DOMESTIC"
      ? [{ value: "origin", label: "Origin" }, ...nigeriaStates]
      : [{ value: "origin", label: "Origin" }, ...countryOptions];

  const toList =
    filters.method === "DOMESTIC"
      ? [{ value: "destination", label: "Destination" }, ...nigeriaStates]
      : [{ value: "destination", label: "Destination" }, ...countryOptions];

  return (
    <div className="padding-x pt-20 pb-20.5 ">
      <div>
        <h2 className="sec-heading md:text-start!">Live Prices Today</h2>
        <p className="sec-paragraph md:max-w-none! md:text-start!">
          Real-time shipping rates per kilogram across popular international
          routes.
        </p>
      </div>

      <div className="mt-2.5 md:mt-6 flex max-md:flex-col justify-between md:items-end gap-6">
        <div className="flex max-md:flex-col max-md:w-full md:items-center gap-3">
          <p className="text-lg leading-6 shrink-0">Filter by:</p>
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
              <ComboboxInput className="py-1! h-auto px-1.5 text-primary-dark! bg-primary-light font-roboto [&_input]:text-sm!" />

              <ComboboxContent>
                <ComboboxEmpty>
                  {filters.method === "INTERNATIONAL"
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
              <ComboboxInput className="py-1! h-auto px-1.5 text-primary-dark! bg-primary-light font-roboto [&_input]:text-sm!" />

              <ComboboxContent>
                <ComboboxEmpty>
                  {filters.method === "INTERNATIONAL"
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
            <Select
              value={filters.method ?? "method"}
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
                {/* <SelectItem value="DOOR_TO_DOOR_SHIPPING">
                  Door to door
                </SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="shrink-0 leading-6 font-light ">
          Updated: {formatMinSecMill(new Date())}
        </p>
      </div>

      {/* Skeleton loading state for the table */}
      {isLoading && <TableSkeleton ShipmentType="INTERNATIONAL" />}

      {/* Desktop Screens */}
      <Table
        className="max-md:hidden bg-white table-fixed"
        containerClassName="mt-6 rounded-t-lg overflow-hidden hide-scrollbar"
      >
        {!isLoading && (
          <TableHeader className="rounded-lg! bg-primary-light">
            <TableRow className="">
              <TableHead className="pl-4 text-base font-normal uppercase text-primary-dark">
                Route
              </TableHead>
              <TableHead className="text-base font-normal uppercase text-primary-dark">
                Air/Kg
              </TableHead>
              <TableHead className="text-base font-normal uppercase text-primary-darkt">
                Land/Kg
              </TableHead>
              <TableHead className="text-base font-normal uppercase text-primary-dark">
                Ocean/kg
              </TableHead>
              {/* <TableHead className="text-base font-normal uppercase text-primary-dark">
                  Trend
                </TableHead> */}
              <TableHead className="text-base font-normal uppercase text-primary-dark" />
            </TableRow>
          </TableHeader>
        )}

        <TableBody>
          {isError && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-red-400">
                Failed to Load Prices
              </TableCell>
            </TableRow>
          )}

          {isSuccess && (
            <>
              {livePrices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>

      {/* Mobile Screens */}
      <div className="md:hidden bg-white rounded-lg  overflow-hidden">
        <h3 className="py-3 px-4 bg-primary-light  uppercase font-roboto">
          Route
        </h3>

        {isLoading && <CardSkeleton ShipmentType="INTERNATIONAL" />}

        {/* Error State */}
        {isError && (
          <div className="p-6 text-center text-red-400">
            Failed to Load Prices
          </div>
        )}

        {isSuccess && (
          <>
            {/* Empty State */}
            {livePrices.length === 0 && (
              <div className="p-6 text-center">No data found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PricingLivePrices;
