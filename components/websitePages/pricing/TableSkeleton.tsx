import { ArrowRight } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShipmentType } from "@/lib/services/pricing.service";

const TableSkeleton = ({
  ShipmentType,
  rowCount = 5,
  colCount = 3,
}: {
  ShipmentType: ShipmentType;
  rowCount?: number;
  colCount?: number;
}) => {
  return (
    <Table
      className="max-md:hidden bg-white"
      containerClassName="mt-6 rounded-t-lg"
    >
      {ShipmentType === "INTERNATIONAL" && (
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
            <TableHead className="text-base font-normal uppercase text-primary-dark" />
          </TableRow>
        </TableHeader>
      )}

      {ShipmentType === "DOMESTIC" && (
        <TableHeader className="rounded-lg! ">
          <TableRow>
            <TableHead className="sticky left-0 bg-white px-4 py-5.5 text-lg font-medium leading-7 ">
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

            <TableHead className="sticky right-0 bg-white px-4 py-5.5 text-lg font-medium leading-7">
              <p className="sr-only">Book Action</p>
            </TableHead>
          </TableRow>
        </TableHeader>
      )}

      <TableBody>
        {Array.from({ length: rowCount }).map((_, idx) => (
          <TableRow key={idx} className="border hover:bg-muted">
            <TableCell
              className={`${ShipmentType === "DOMESTIC" && "sticky left-0 z-10 bg-white"} pl-4 py-3`}
            >
              <div className="flex gap-3.5 items-center">
                <Skeleton className="h-5 w-20 capitalize" />
                <ArrowRight className="size-4.5 text-neutral-200 animate-pulse" />
                <Skeleton className="h-5 w-20 capitalize" />
              </div>
            </TableCell>

            {Array.from({ length: colCount }).map((_, i) => (
              <TableCell key={i}>
                <Skeleton className="h-5 w-16" />
              </TableCell>
            ))}

            <TableCell
              className={`${ShipmentType === "DOMESTIC" && "sticky right-0 z-10 bg-white"}  pr-10.5`}
            >
              <Skeleton className="h-11 w-18 rounded-md rounded-lg" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
