import React from "react";

const Stats = () => {
  return (
    <section className="bg-primary px-4 py-20 md:py-[31px]">
      <div className="max-w-[786px] mx-auto flex max-md:flex-col gap-[52px]">
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-[60px] font-semibold leading-[72px] text-white">10,000+</h2>
          <p className="text-lg font-semibold leading-7 text-primary-light">Shipments monthly</p>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-[60px] font-semibold leading-[72px] text-white">99.2%</h2>
          <p className="text-lg font-semibold leading-7 text-primary-light">On-time Delivery</p>
        </div>
        <div className="flex-1 flex flex-col items-center ">
          <h2 className="text-[60px] font-semibold leading-[72px] text-white">4.8/5</h2>
          <p className="text-lg font-semibold leading-7 text-primary-light">Customer Rating</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
