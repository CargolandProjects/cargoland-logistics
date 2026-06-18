import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight } from "../icons";
import Image from "next/image";
import { heroImg } from "@/assets/images";

const Hero = () => {
  return (
    <section className="max-md:px-4 md:pl-14 lg:pl-[97px] pb-[82px] md:pb-15">
      <div className="grid md:grid-cols-2 gap-13.75">
        <div className="max-md:mt-15 flex flex-col justify-center">
          <h1 className="text-2xl md:text-[60px] font-extrabold leading-8 md:leading-[72px]">
            Fast & Reliable <br className="sm:hidden" />
            <span className="font-montserrat text-2xl md:text-[60px] font-extrabold leading-8 md:leading-[72px] text-primary">
              Global
            </span>{" "}
            Shipping
          </h1>
          <p className="mt-2 md:mt-4 text-sm md:text-lg font-light leading-5 md:leading-7 max-sm:max-w-[321px] max-md:max-w-[450px]">
            Ship packages across countries via Air, Ocean, or Road freight with
            real-time tracking and transparent pricing.
          </p>

          <div className="relative mt-10">
            <Input
              placeholder="Enter your tracking number"
              className="form-input border-gray-400/90! bg-neutral-100"
            />
            <Button className=" absolute top-1/2 -translate-y-1/2 active:-translate-y-6! active:scale-98 right-1 h-12 w-[106px] rounded-lg gap-2 ">
              Track <ArrowRight />{" "}
            </Button>
          </div>
        </div>

        <div className="h-[569px] max-md:h-[354px] max-md:rounded-lg overflow-hidden">
          <Image
            src={heroImg}
            alt="hero image"
            className="size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
