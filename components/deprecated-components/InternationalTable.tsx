import { ArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Pricing } from "@/lib/services/pricing.service";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const InternationalTable = ({
  livePrices,
  isLoading,
  isError,
  isSuccess,
}: {
  livePrices: Pricing[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}) => {
  const router = useRouter();
  return (
    <Table
      className="max-md:hidden bg-white table-fixed"
      containerClassName="mt-6 rounded-t-lg"
    >
      {!isLoading && (
        <TableHeader className="rounded-lg! bg-primary-light">
          <TableRow>
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
            <TableCell colSpan={5} className="text-center py-10 text-red-400">
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
                <TableRow key={idx} className="border hover:bg-muted flex-1">
                  <TableCell className="pl-4 py-3">
                    <div className="flex gap-3.5 items-center max-w-[180px]">
                      <p className="text-base capitalize">{price.fromWhere}</p>
                      <ArrowRight className="shrink-0 size-4.5 text-primary" />
                      <p className="text-base capitalize min-w-0 truncate">
                        {price.toWhere}
                      </p>
                    </div>

                    {/* <div className="mt-2 flex gap-1 items-center">
                            <p className="text-gray-400">
                              {price.airFreightRate}
                            </p>
                            <div className="size-1 rounded-full bg-neutral-200" />
                            <p className="text-gray-400">
                              {price.oceanFreightRate}
                            </p>
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
                            {price.pricingShippingType > 0
                              ? `+${price.trend}`
                              : price.trend}
                            %
                          </div>
                        </TableCell> */}
                  <TableCell className="pr-10.5">
                    <Button
                      onClick={() => router.push("/shipment")}
                      variant="outline"
                      className="py-3 h-auto w-full min-w-18 border-primary text-base font-normal text-primary hover:text-primary"
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
  );
};
export default InternationalTable;
