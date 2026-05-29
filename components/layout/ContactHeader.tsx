import { ArrowDown, CallOutline, Mail, WorldFilled } from "../icons";
import { Button } from "../ui/button";

const ContactHeader = () => {
  return (
    <section className="bg-primary text-white py-1 md:py-2.5 padding-x">
      <div className="container flex justify-between items-center">
        <div className="flex max-md:flex-col gap-px md:gap-10.5">
          <div className="flex">
            <Mail className="size-4 mr-1" />
            <p className="text-xs font-medium leading-4.5">
              info@cargoland.africa
            </p>
          </div>
          <div className="flex">
            <CallOutline className="size-4 mr-1" />
            <p className="text-xs font-medium leading-4.5">
              (081) 2763-1001, (080) 3923- 1045
            </p>
          </div>
        </div>

        <Button variant="link" className="text-white gap-2 items-center p-0 h-fit">
          <WorldFilled className="size-6" />
          <span className="text-xs sm:text-sm font-normal sm:leading-5 underline">
            Lagos, NG{" "}
          </span>
          <ArrowDown className="size-5" />
        </Button>
      </div>
    </section>
  );
};

export default ContactHeader;
