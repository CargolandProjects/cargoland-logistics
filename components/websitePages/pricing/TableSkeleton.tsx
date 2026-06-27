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

const TableSkeleton = () => {
  return (
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
          <TableHead className="text-base font-normal uppercase text-primary-dark" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 5 }).map((_, idx) => (
          <TableRow key={idx} className="border hover:bg-muted">
            <TableCell className="pl-4 py-3">
              <div className="flex gap-3.5 items-center">
                <Skeleton className="h-5 w-20 capitalize" />
                <ArrowRight className="size-4.5 text-neutral-200 animate-pulse" />
                <Skeleton className="h-5 w-20 capitalize" />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-16" />
            </TableCell>
            <TableCell className="pr-10.5">
              <Skeleton className="h-11 w-18 rounded-md rounded-lg" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
