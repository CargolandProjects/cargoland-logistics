import { Shipment } from "@/lib/services/shipment.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { statusStyles } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { ArrowRight, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MouseEvent } from "react";

interface ShipmentTableProps {
  shipments: Shipment[];
  handleRoute?: (path: string) => void;
  handleView: (e: MouseEvent, id: string) => void;
  handleTrack: (e: MouseEvent, trackingId: string) => void;
}

const ShipmentTable = ({
  shipments,
  // handleRoute,
  handleView,
  handleTrack,
}: ShipmentTableProps) => {
  return (
    <Table className="mt-3 bg-white rounded-lg">
      <TableHeader>
        <TableRow className="h-[53px] hover:bg-white">
          <TableHead className="pl-6 text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
            Tracking ID
          </TableHead>
          <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
            Route
          </TableHead>
          <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
            Shipping Type
          </TableHead>
          <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
            Price
          </TableHead>
          <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
            Date
          </TableHead>
          <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
            Status
          </TableHead>
          <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90 sr-only">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {shipments.map((shipment, idx) => {
          const status =
            shipment.status === "ASSIGNED" ? "PENDING" : shipment.status;
          return (
            <TableRow
              // onClick={() => handleRoute(`/my-shipment/${shipment.id}`)}
              key={idx}
              className="h-15.5"
            >
              <TableCell className="pl-6 leading-5.5">
                {shipment.trackingId}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 leading-5.5 max-w-[180px]">
                  <p className="leading-5.5">{shipment.country}</p>
                  <ArrowRight className="shrink-0 size-4.5 text-primary" />
                  <p className="leading-5.5 min-w-0 truncate">{shipment.receiverCountry}</p>
                </div>
              </TableCell>
              <TableCell className="leading-5.5 capitalize">
                {shipment.freightType.replace("_", " ").toLowerCase()}
              </TableCell>
              <TableCell className="leading-5.5">
                ₦{Number(shipment.price).toLocaleString()}
              </TableCell>
              <TableCell className="leading-5.5">
                {formatDate(shipment.createdAt)}
              </TableCell>
              <TableCell className="">
                <div
                  className={`px-2 py-0.5 size-fit ${
                    statusStyles[status]?.containerStyles
                  } flex items-center justify-center gap-1 border rounded-full text-center leading-5.5 capitalize`}
                >
                  <div
                    className={` ${
                      statusStyles[status]?.bgcolor
                    } size-1.5 rounded-full`}
                  />
                  <p className="text-xs leading-5">
                    {status.replace("_", " ").toLowerCase()}
                  </p>
                </div>
              </TableCell>
              <TableCell className="pr-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="size-6 flex items-center justify-center border border-neutral-200 rounded-[4px]"
                    >
                      <MoreVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => handleView(e, shipment.id)}
                      className="cursor-pointer"
                    >
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => handleTrack(e, shipment.trackingId)}
                      className="cursor-pointer"
                    >
                      Track
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ShipmentTable;
