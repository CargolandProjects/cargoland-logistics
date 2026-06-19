import { TrendingDown, TrendingUp } from "lucide-react";
import { ArrowRight } from "../icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

const livePrices = [
  {
    origin: "Nigeria",
    destination: "Ghana",
    routeAir: "Air: 2-4 days",
    routeOcean: "Ocean: 18-25 days",
    priceAirKg: "$10.5",
    priceLandKg: "$10.5",
    priceOceanKg: "$10.5",
    thread: -3.2,
  },
  {
    origin: "Nigeria",
    destination: "Ghana",
    routeAir: "Air: 2-4 days",
    routeOcean: "Ocean: 18-25 days",
    priceAirKg: "$10.5",
    priceLandKg: "$10.5",
    priceOceanKg: "$10.5",
    thread: 3.2,
  },
  {
    origin: "Nigeria",
    destination: "Ghana",
    routeAir: "Air: 2-4 days",
    routeOcean: "Ocean: 18-25 days",
    priceAirKg: "$10.5",
    priceLandKg: "$10.5",
    priceOceanKg: "$10.5",
    thread: 3.2,
  },
  {
    origin: "Nigeria",
    destination: "Ghana",
    routeAir: "Air: 2-4 days",
    routeOcean: "Ocean: 18-25 days",
    priceAirKg: "$10.5",
    priceLandKg: "$10.5",
    priceOceanKg: "$10.5",
    thread: 3.2,
  },
  {
    origin: "Nigeria",
    destination: "Ghana",
    routeAir: "Air: 2-4 days",
    routeOcean: "Ocean: 18-25 days",
    priceAirKg: "$10.5",
    priceLandKg: "$10.5",
    priceOceanKg: "$10.5",
    thread: -3.2,
  },
  {
    origin: "Nigeria",
    destination: "Ghana",
    routeAir: "Air: 2-4 days",
    routeOcean: "Ocean: 18-25 days",
    priceAirKg: "$10.5",
    priceLandKg: "$10.5",
    priceOceanKg: "$10.5",
    thread: 3.2,
  },
];

const LivePrices = () => {
  return (
    <section className="padding-y padding-x bg-primary">
      <div className="max-w-[402px] mx-auto text-white">
        <h2 className="sec-heading">Live Prices Today</h2>
        <p className="sec-paragraph">
          Real-time shipping rates per kilogram across popular international
          routes.
        </p>
      </div>

      <div className="mt-6 flex justify-between items-end text-white">
        <div className="flex max-md:flex-col md:items-center gap-3">
          <p className="">Filter by origin</p>

          <Select defaultValue="all">
            <SelectTrigger className="md:min-w-[186px] bg-primary-light text-primary-dark!">
              <SelectValue placeholder="Select a value" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="NG">Nigeria</SelectItem>
              <SelectItem value="GB">Great Britain</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="leading-6 text-primary-light">Updated: 10:40:57 PM</p>
      </div>

      <Table
        className="max-md:hidden bg-white"
        containerClassName="mt-6 rounded-t-lg overflow-hidden hide-scrollbar"
      >
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
            <TableHead className="text-base font-normal uppercase text-primary-dark">
              Tread
            </TableHead>
            <TableHead className="text-base font-normal uppercase text-primary-dark" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {livePrices.map((price, idx) => (
            <TableRow key={idx} className="border hover:bg-muted">
              <TableCell className="pl-4 py-3">
                <div className="flex gap-3.5">
                  <p className="text-base capitalize">{price.origin}</p>
                  <ArrowRight className="size-4.5 text-primary" />
                  <p className="text-base capitalize">{price.destination}</p>
                </div>

                <div className="mt-2 flex gap-1 items-center">
                  <p className="text-gray-400">{price.routeAir}</p>
                  <div className="size-1 rounded-full bg-neutral-200" />
                  <p className="text-gray-400">{price.routeOcean}</p>
                </div>
              </TableCell>
              <TableCell className="text-base font-bold">
                {price.priceAirKg}
              </TableCell>
              <TableCell className="text-base font-bold">
                {price.priceLandKg}
              </TableCell>
              <TableCell className="text-base font-bold">
                {price.priceOceanKg}
              </TableCell>
              <TableCell
                className={`${price.thread < 0 ? " text-red-500" : " text-green-500"} text-base font-bold`}
              >
                <div className="flex gap-0.75 items-center">
                  {price.thread < 0 ? (
                    <TrendingDown className="size-4.5" />
                  ) : (
                    <TrendingUp className="size-4.5" />
                  )}
                  {price.thread > 0 ? `+${price.thread}` : price.thread}%
                </div>
              </TableCell>
              <TableCell className="pr-10.5">
                <Button
                  variant="outline"
                  className="py-3 h-auto w-full border-primary text-base font-normal text-primary hover:text-primary"
                >
                  Book
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="md:hidden bg-white rounded-lg  overflow-hidden">
        <h3 className="py-3 px-4 bg-primary-light  uppercase font-roboto">
          Route
        </h3>

        <div>
          {livePrices.map((price, idx) => (
            <div
              key={idx}
              className={`${idx !== livePrices.length - 1 && "border-b"} p-6 `}
            >
              <div className="flex justify-between">
                <div className="flex gap-3.5">
                  <p className="text-base capitalize">{price.origin}</p>
                  <ArrowRight className="size-4.5 text-primary" />
                  <p className="text-base capitalize">{price.destination}</p>
                </div>

                <p
                  className={`${price.thread < 0 ? " text-red-500" : " text-green-500"} text-base font-bold flex gap-0.75 items-center`}
                >
                  {price.thread < 0 ? (
                    <TrendingDown className="size-4.5" />
                  ) : (
                    <TrendingUp className="size-4.5" />
                  )}
                  {price.thread > 0 ? `+${price.thread}` : price.thread}%
                </p>
              </div>

              <div className="mt-2 flex gap-1 items-center">
                <p className="text-gray-400">{price.routeAir}</p>
                <div className="size-1 rounded-full bg-neutral-200" />
                <p className="text-gray-400">{price.routeOcean}</p>
              </div>
              <div className="mt-4.5 flex gap-2 max-xs:justify-between xs:gap-6">
                <div className="space-y-2">
                  <p className="text-lg font-semibold leading-6.5 uppercase">
                    Air/kg
                  </p>
                  <p className="text-base font-bold">{price.priceAirKg}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold leading-6.5 uppercase">
                    Land/kg
                  </p>
                  <p className="text-base font-bold">{price.priceLandKg}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold leading-6.5 uppercase">
                    Ocean/kg
                  </p>
                  <p className="text-base font-bold">{price.priceOceanKg}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-6 py-3 h-auto w-full border-primary text-base font-normal text-primary hover:text-primary"
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="mt-6 py-3 h-auto text-base font-normal border-white ">
          See more
        </Button>
      </div>
    </section>
  );
};

export default LivePrices;
