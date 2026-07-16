import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import React from "react";

const Overview = () => {
  return (
    <div className="mt-8 grid md:grid-cols-2 gap-8 rounded-[16px] bg-white">
      <div className="px-5.25 py-6.75">
        <div className="flex items-center gap-3">
          <ArrowDownLeft className="size-6 text-cargo-success" />
          <p className="leading-5 text-neutral-600/90">Total Funded</p>
        </div>
        <h2 className="mt-5 text-xl font-bold leading-7">₦45,000</h2>
      </div>

      <div className="px-5.25 py-6.75">
        <div className="flex items-center gap-3">
          <ArrowUpRight className="size-6 text-primary" />
          <p className="leading-5 text-neutral-600/90">Total Spent</p>
        </div>
        <h2 className="mt-5 text-xl font-bold leading-7">₦45,000</h2>
      </div>
    </div>
  );
};

export default Overview;
