"use client";

import { DeliveryTruck, Plane } from "../../icons";
import { Button } from "../../ui/button";
import { useState } from "react";
import { ShipmentType } from "@/lib/services/pricing.service";
import IntlPricingTab from "../pricing/IntlPricingTab";
import DomesticPricingTab from "../pricing/DomesticPricingTab";

const LivePrices = () => {
  const [tab, setTab] = useState<ShipmentType>("INTERNATIONAL");

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

      {tab === "INTERNATIONAL" && <IntlPricingTab />}
      {tab === "DOMESTIC" && <DomesticPricingTab />}

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
