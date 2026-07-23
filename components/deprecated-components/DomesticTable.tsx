import { ArrowRight } from "@/components/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LocalPricing } from "@/lib/services/pricing.service";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DomesticTable = ({
  localPrices,
  isLoading,
  isError,
  isSuccess,
}: {
  localPrices: LocalPricing[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}) => {
  const router = useRouter();
  return (
    <Table
      className="max-md:hidden bg-white"
      containerClassName="mt-4 rounded-t-lg"
    >
      {!isLoading && (
        <TableHeader className="rounded-lg! ">
          <TableRow>
            <TableHead className="sticky left-0 z-10 bg-white px-4 py-5.5 text-lg font-medium leading-7 ">
              Location
            </TableHead>
            <TableHead className="px-4 py-5.5 text-lg font-medium leading-7">
              0-3(kg)
            </TableHead>
            <TableHead className="px-4 py-5.5 text-lg font-medium leading-7">
              4 (kg)
            </TableHead>
            <TableHead className="px-4 py-5.5 text-lg font-medium leading-7">
              5 (kg)
            </TableHead>
            <TableHead className="px-4 py-5.5 text-lg font-medium leading-7">
              6 (kg)
            </TableHead>
            <TableHead className="px-4 py-5.5 text-lg font-medium leading-7">
              7 (kg)
            </TableHead>
            <TableHead className="px-4 py-5.5 text-lg font-medium leading-7">
              8 (kg)
            </TableHead>

            <TableHead className="sticky right-0 z-10 bg-white px-4 py-5.5 text-lg font-medium leading-7">
              <p className="sr-only">Book Action</p>
            </TableHead>
          </TableRow>
        </TableHeader>
      )}

      <TableBody>
        {isError && (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-10 text-red-400">
              Failed to Load Prices
            </TableCell>
          </TableRow>
        )}

        {isSuccess && (
          <>
            {localPrices.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10">
                  No data found
                </TableCell>
              </TableRow>
            )}

            {localPrices.length > 0 &&
              localPrices.map((price, idx) => (
                <TableRow key={idx} className="border hover:bg-muted flex-1">
                  <TableCell className="sticky left-0 z-10 p-4 bg-white">
                    <div className="flex gap-3.5 items-center max-w-[180px]">
                      <p className="text-base capitalize">{price.fromState}</p>
                      <ArrowRight className="shrink-0 size-4.5 text-primary" />
                      <p className="text-base capitalize min-w-0 truncate">
                        {price.toWhereState}
                      </p>
                    </div>
                  </TableCell>

                  {price.brackets.map((b, idx) => (
                    <TableCell
                      key={idx}
                      // className={`${!b?.ratePerkg && "text-center"} text-base p-4`}
                    >
                      {/* {b?.ratePerkg ? `₦${b.ratePerkg}` : "-"} */}
                    </TableCell>
                  ))}
                  <TableCell className="sticky z-10 right-0 bg-white pr-10.5">
                    <Button
                      onClick={() =>
                        router.push("/shipment?shipmentType=DOMESTIC")
                      }
                      variant="outline"
                      className="py-2 h-auto w-full min-w-18 border-primary text-base font-normal text-primary hover:text-primary"
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

export default DomesticTable;
