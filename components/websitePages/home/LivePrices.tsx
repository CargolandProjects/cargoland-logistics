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
import { Bracket, ShipmentType } from "@/lib/services/pricing.service";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { nigeriaStates } from "@/lib/utils/countryOptions";
import DomesticCards from "../pricing/DomesticCards";
import DomesticTable from "../pricing/DomesticTable";
import InternationalCards from "../pricing/InternationalCards";
import InternationalTable from "../pricing/InternationalTable";

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
    data: localLivePrices,
    isLoading: isLocalLoading,
    isError: isLocalError,
    isSuccess: isLocalSuccess,
  } = useLocalPricing({
    origin: filters.origin,
    destination: filters.destination,
  });

  const router = useRouter();
  console.log("Filters: ", filters);
  const States = [{ value: "all", label: "All" }, ...nigeriaStates];

  const MAX_BRACKETS = 6;

  const normalizedLPrice = (localLivePrices || []).map((item) => ({
    ...item,
    brackets: [
      ...item.brackets,
      ...Array(MAX_BRACKETS - item.brackets.length).fill(null),
    ] as (Bracket | null)[],
  }));

  return (
    <section className="padding-y padding-x bg-primary">
      <div className="max-w-[402px] mx-auto text-white">
        <h2 className="sec-heading">Live Prices Today</h2>
        <p className="sec-paragraph">
          Real-time shipping rates per kilogram across popular international
          routes.
        </p>
      </div>

      {/* Tabs */}
      <div className="my-6 p-1 flex max-xxs:flex-col gap-1 bg-white rounded-sm max-w-[367px] mx-auto">
        <Button
          onClick={() => setTab("International")}
          variant={tab === "International" ? "default" : "ghost"}
          className={`${tab === "Domestic" && "text-gray-500 font-normal"} flex-1 rounded-md py-2 px-3 h-auto gap-2 max-xs:text-xs`}
        >
          <Plane className="size-4" strokeWidth={3} />
          International Shipping
        </Button>
        <Button
          onClick={() => setTab("Domestic")}
          variant={tab === "Domestic" ? "default" : "ghost"}
          className={`${tab === "International" && "text-gray-500 font-normal"} flex-1 rounded-md py-2 px-3 h-auto gap-2 max-xs:text-xs`}
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
          {isLoading && <TableSkeleton ShipmentType="INTERNATIONAL" />}

          {/* Desktop Screens */}
          <InternationalTable
            livePrices={livePrices ?? []}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
          />
          {/* Mobile Screens */}-
          <InternationalCards
            livePrices={livePrices ?? []}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
          />
        </div>
      )}

      {tab === "Domestic" && (
        <>
          <div className="mt-6 p-6 rounded-[12px] bg-white">
            <h3 className="text-base font-roboto font-bold ">Filters</h3>
            {/* Filters */}
            <div className="mt-4 flex max-sm:flex-col gap-2 md:gap-4">
              {/* Origin */}
              <div>
                <p className="text-base text-gray-500">Origin</p>
                <Combobox
                  items={States}
                  value={filters.origin}
                  defaultValue="All"
                  onValueChange={(val) => {
                    setFilters((prev) => ({
                      ...prev,
                      origin:
                        val === "All" || val === null
                          ? undefined
                          : (val as string),
                    }));
                  }}
                >
                  <ComboboxInput className="mt-3 py-[5.5px]! h-auto px-1.5 text-primary-dark! font-roboto [&_input]:text-sm!" />

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
              <div className="space-y-">
                <p className="text-base text-gray-500">Destination</p>
                <Combobox
                  items={States}
                  value={filters.origin}
                  defaultValue="All"
                  onValueChange={(val) => {
                    setFilters((prev) => ({
                      ...prev,
                      destination:
                        val === "All" || val === null
                          ? undefined
                          : (val as string),
                    }));
                  }}
                >
                  <ComboboxInput className="mt-3 py-[5.5px]! h-auto px-1.5 text-primary-dark! font-roboto [&_input]:text-sm!" />

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
          {/* Skeleton loading state for the table */}
          {isLoading && <TableSkeleton colCount={6} ShipmentType="DOMESTIC" />}

          <DomesticTable
            localPrices={normalizedLPrice}
            isLoading={isLocalLoading}
            isError={isLocalError}
            isSuccess={isLocalSuccess}
          />

          {/* Mobile Screens */}
          <DomesticCards
            localPrices={normalizedLPrice}
            isLoading={isLocalLoading}
            isError={isLocalError}
            isSuccess={isLocalSuccess}
          />
        </>
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
