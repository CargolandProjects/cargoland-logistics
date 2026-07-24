"use client";

import { DeliveryTruck, Plane } from "../../icons";
import { Button } from "../../ui/button";
import { useLocalPricing, usePricing } from "@/lib/hooks/queries/usePricing";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Bracket, ShipmentType } from "@/lib/services/pricing.service";
import { nigeriaStates } from "@/lib/utils/countryOptions";
import z from "zod";
import IntlPricingTab from "../pricing/IntlPricingTab";
import DomesticPricingTab from "../pricing/DomesticPricingTab";

interface Filter {
  origin?: string;
  destination?: string;
}

const LivePrices = () => {
  const [filters, setFilters] = useState<Filter>({});
  const [method, setMethod] = useState("");
  const [tab, setTab] = useState<"International" | "Domestic">("International");
  const selectedMethod = method === "all" ? undefined : method;

  const router = useRouter();

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

      {tab === "International" && <IntlPricingTab />}
      {tab === "Domestic" && <DomesticPricingTab />}

      {/* <div className="flex justify-center">
        <Button
          onClick={() => router.push("/pricing")}
          className="mt-6 py-3 h-auto text-base font-normal border-white "
        >
          See more
        </Button>
      </div> */}
    </section>
  );
};

export default LivePrices;
