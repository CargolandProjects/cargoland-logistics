import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight } from "../icons";
import Image from "next/image";
import { heroImg } from "@/assets/images";

const TrackShipment = () => {
  return (
    <section className="padding-x py-10.5 bg-primary">
      <div className="flex max-md:flex-col-reverse justify-between items-center gap-12.75 text-white">
        <div className="flex-1 max-w-[671px] w-full">
          <h2 className="sec-heading text-start!">
            Track Your Shipment in Real Time
          </h2>
          <p className="mt-3 text-sm md:text-base max-md:font-light text-start! max-w-none!">
            Enter your tracking ID to monitor shipment progress from pickup to
            delivery.
          </p>
          <div className="relative mt-10 md:max-w-[462px]">
            <Input
              placeholder="Enter your tracking number"
              className="form-input border-gray-400/90! bg-neutral-100"
            />
            <Button className=" absolute top-1/2 -translate-y-1/2 active:-translate-y-6! active:scale-98 right-1 h-12 w-[106px] rounded-lg gap-2 ">
              Track <ArrowRight />{" "}
            </Button>
          </div>
        </div>
        
        <div className="md:flex-1 h-[343px] w-full md:max-w-[492px] bg-amber-200">
            <Image src={heroImg} alt="track shipment image" className="size-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default TrackShipment;
