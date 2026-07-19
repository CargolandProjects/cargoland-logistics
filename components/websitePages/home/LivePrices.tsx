"use client";

// import { TrendingDown, TrendingUp } from "lucide-react";
import { ArrowRight, DeliveryTruck, Plane } from "../../icons";
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
} from "@/components/ui/table";
import { Button } from "../../ui/button";
import { useLocalPricing, usePricing } from "@/lib/hooks/queries/usePricing";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TableSkeleton from "../pricing/TableSkeleton";
import CardSkeleton from "../pricing/CardSkeleton";
import { formatMinSecMill } from "@/lib/utils";
import { ShipmentType } from "@/lib/services/pricing.service";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { nigeriaStates } from "@/lib/utils/countryOptions";

interface Filter {
  origin?: string;
  destination?: string;
}

const LivePrices = () => {
  const [filters, setFilters] = useState<Filter>({});
  const [method, setMethod] = useState("");
  const [tab, setTab] = useState<"International" | "Domestic">("International");
  const selectedMethod = method === "all" ? undefined : method;

  const {
    data: livePrices,
    isLoading,
    isError,
    isSuccess,
  } = usePricing({
    method: selectedMethod as ShipmentType,
  });

  const {
    data: liveLocalPrices,
    isLoading: isLoadingLocal,
    isError: isErrorLocal,
    isSuccess: isSuccessLocal,
  } = useLocalPricing({
    origin: filters.origin,
    destination: filters.destination,
  });

  const router = useRouter();
  console.log("Filters: ", filters);
  const States = [{ value: "all", label: "All" }, ...nigeriaStates];

  return (
    <section className="padding-y padding-x bg-primary">
      <div className="max-w-[402px] mx-auto text-white">
        <h2 className="sec-heading">Live Prices Today</h2>
        <p className="sec-paragraph">
          Real-time shipping rates per kilogram across popular international
          routes.
        </p>
      </div>

      <div className="my-6 p-1 flex gap-1 bg-white rounded-sm max-w-[367px] mx-auto">
        <Button
          onClick={() => setTab("International")}
          variant={tab === "International" ? "default" : "ghost"}
          className={`${tab === "Domestic" && "text-gray-500 font-normal"} flex-1 rounded-md py-2 px-3 h-auto gap-2`}
        >
          <Plane className="size-4" strokeWidth={3} />
          International Shipping
        </Button>
        <Button
          onClick={() => setTab("Domestic")}
          variant={tab === "Domestic" ? "default" : "ghost"}
          className={`${tab === "International" && "text-gray-500 font-normal"} flex-1 rounded-md py-2 px-3 h-auto gap-2`}
        >
          <DeliveryTruck className="size-4" strokeWidth={0.5} />
          Domestic Shipping
        </Button>
      </div>

      {tab === "International" && (
        <div>
          <div className="mt-6 flex justify-between items-end text-white">
            <div className="flex max-md:flex-col md:items-center gap-3">
              <p className="">Filter by method</p>

              <Select
                onValueChange={(val) => setMethod(val)}
                defaultValue="all"
              >
                <SelectTrigger className="md:min-w-[186px] bg-primary-light text-primary-dark!">
                  <SelectValue placeholder="Select a value" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="INTERNATIONAL">International</SelectItem>
                  <SelectItem value="DOMESTIC">Domestic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="leading-6 text-primary-light">
              Updated: {formatMinSecMill(new Date())}
            </p>
          </div>

          {/* Skeleton loading state for the table */}
          {isLoading && <TableSkeleton />}

          {/* Desktop Screens */}
          <Table
            className="max-md:hidden bg-white table-fixed"
            containerClassName="mt-6 rounded-t-lg overflow-hidden hide-scrollbar"
          >
            {!isLoading && (
              <TableHeader className="rounded-lg! bg-primary-light">
                <TableRow className="">
                  <TableHead className="text-base font-normal uppercase text-primary-dark">
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
                  <TableHead className="text-base font-normal uppercase text-primary-dark sr-only">
                    Book Action
                  </TableHead>
                </TableRow>
              </TableHeader>
            )}

            <TableBody>
              {isError && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-red-400"
                  >
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

                  {livePrices.length > 0 &&
                    livePrices.map((price, idx) => (
                      <TableRow
                        key={idx}
                        className="border hover:bg-muted flex-1"
                      >
                        <TableCell className="pl-4 py-3">
                          <div className="flex gap-3.5 items-center">
                            <p className="text-base capitalize">
                              {price.fromWhere}
                            </p>
                            <ArrowRight className="size-4.5 text-primary" />
                            <p className="text-base capitalize">
                              {price.toWhere}
                            </p>
                          </div>

                          {/* <div className="mt-2 flex gap-1 items-center">
                      <p className="text-gray-400">{price.airFreightRate}</p>
                      <div className="size-1 rounded-full bg-neutral-200" />
                      <p className="text-gray-400">{price.oceanFreightRate}</p>
                    </div> */}
                        </TableCell>
                        <TableCell className="text-base font-bold">
                          ₦{Number(price.airFreightRate).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-base font-bold">
                          ₦{Number(price.roadFreightRate).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-base font-bold">
                          ₦{Number(price.oceanFreightRate).toLocaleString()}
                        </TableCell>
                        {/* Trend cell */}
                        {/* <TableCell
                  className={`${price.trend < 0 ? " text-red-500" : " text-green-500"} text-base font-bold`}
                >
                  <div className="flex gap-0.75 items-center">
                    {price.trend < 0 ? (
                      <TrendingDown className="size-4.5" />
                    ) : (
                      <TrendingUp className="size-4.5" />
                    )}
                    {price.pricingShippingType > 0 ? `+${price.trend}` : price.trend}%
                  </div>
                </TableCell> */}
                        <TableCell className="pr-10.5">
                          <Button
                            onClick={() => router.push("/shipment")}
                            variant="outline"
                            className="py-3 h-auto w-full border-primary text-base font-normal text-primary hover:text-primary"
                          >
                            Book
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              )}
            </TableBody>
          </Table>

          {/* Mobile Screens */}
          <div className="md:hidden bg-white rounded-lg  overflow-hidden">
            <h3 className="py-3 px-4 bg-primary-light  uppercase font-roboto">
              Route
            </h3>

            {isLoading && <CardSkeleton />}

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

                <div>
                  {livePrices.length > 0 &&
                    livePrices.map((price, idx) => (
                      <div
                        key={idx}
                        className={`${idx !== livePrices.length - 1 && "border-b"} p-6 `}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center gap-3.5">
                            <p className="text-base capitalize">
                              {price.fromWhere}
                            </p>
                            <ArrowRight className="size-4.5 text-primary" />
                            <p className="text-base capitalize">
                              {price.toWhere}
                            </p>
                          </div>
                          {/* Trend */}
                          {/* <p
                      className={`${price.trend < 0 ? " text-red-500" : " text-green-500"} text-base font-bold flex gap-0.75 items-center`}
                    >
                      {price.trend < 0 ? (
                        <TrendingDown className="size-4.5" />
                      ) : (
                        <TrendingUp className="size-4.5" />
                      )}
                      {price.trend > 0 ? `+${price.trend}` : price.trend}%
                    </p> */}
                        </div>

                        {/* <div className="mt-2 flex gap-1 items-center">
                    <p className="text-gray-400">{price.routeAir}</p>
                    <div className="size-1 rounded-full bg-neutral-200" />
                    <p className="text-gray-400">{price.routeOcean}</p>
                  </div> */}
                        <div className="mt-4.5 flex gap-2 max-xxs:justify-between xxs:gap-6">
                          <div className="space-y-2">
                            <p className="text-lg font-semibold leading-6.5 uppercase">
                              Air/kg
                            </p>
                            <p className="text-base font-bold">
                              ₦{price.airFreightRate}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-lg font-semibold leading-6.5 uppercase">
                              Land/kg
                            </p>
                            <p className="text-base font-bold">
                              ₦{price.roadFreightRate}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-lg font-semibold leading-6.5 uppercase">
                              Ocean/kg
                            </p>
                            <p className="text-base font-bold">
                              ₦{price.oceanFreightRate}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => router.push("/shipment")}
                          variant="outline"
                          className="mt-6 py-3 h-auto w-full border-primary text-base font-normal text-primary hover:text-primary"
                        >
                          Book Now
                        </Button>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {tab === "Domestic" && (
        <div className="mt-6 p-6 rounded-[12px] bg-white">
          <h3 className="text-base font-roboto font-bold ">Filters</h3>

          <div className="mt-4 flex gap-4">
            {/* Origin */}
            <div className="space-y-3">
              <p className="text-base text-gray-500">Origin</p>
              <Combobox
                items={States}
                value={filters.origin}
                defaultValue="All"
                onValueChange={(val) => {
                  setFilters((prev) => ({
                    ...prev,
                    origin: val === "All" ? undefined : (val as string),
                  }));
                }}
              >
                <ComboboxInput className="py-1! h-auto px-1.5 text-primary-dark! font-roboto [&_input]:text-sm!" />

                <ComboboxContent>
                  <ComboboxEmpty>No state found</ComboboxEmpty>
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
            </div>
            {/* Destination */}
            <div className="space-y-3">
              <p className="text-base text-gray-500">Destination</p>
              <Combobox
                items={States}
                value={filters.origin}
                defaultValue="All"
                onValueChange={(val) => {
                  setFilters((prev) => ({
                    ...prev,
                    destination: val === "All" ? undefined : (val as string),
                  }));
                }}
              >
                <ComboboxInput className="py-1! h-auto px-1.5 text-primary-dark! font-roboto [&_input]:text-sm!" />

                <ComboboxContent>
                  <ComboboxEmpty>No state found</ComboboxEmpty>
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
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <Button
          onClick={() => router.push("/pricing")}
          className="mt-6 py-3 h-auto text-base font-normal border-white "
        >
          See more
        </Button>
      </div>
    </section>
  );
};

export default LivePrices;
