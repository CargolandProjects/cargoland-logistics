import { formatDate } from "@/lib/utils";
import React, { MouseEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import { Shipment } from "@/lib/services/shipment.service";
import { ArrowRight } from "../icons";

interface ShipmentCardProps {
  shipment: Shipment;
  handleView: (e: MouseEvent, id: string) => void;
  handleTrack: (e: MouseEvent, trackingId: string) => void;
}

const ShipmentCard = ({
  shipment,
 
  handleView,
  handleTrack,
}: ShipmentCardProps) => {
  return (
    <div className="px-5.25 py-6 flex flex-col justify-start border-b">
      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-xs leading-5">{shipment.trackingId}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="size-6 flex items-center justify-center border border-neutral-200 rounded-[4px]"
              >
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
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
        </div>
        <div className="flex items-center gap-2">
          <p className="text-base leading-5.5">{shipment.country}</p>
          <ArrowRight className="size-4.5 text-primary" />
          <p className="text-base leading-5.5">{shipment.receiverCountry}</p>
        </div>
        <p className="leading-5.5">{Number(shipment.price).toLocaleString()}</p>
        <div className="flex items-center gap-2">
          <p className="capitalize text-xs leading-5">
            {shipment.freightType.replace("_", " ").toLowerCase()}
          </p>
          <div className="size-1 bg-neutral-300 rounded-full" />
          <p className="capitalize text-xs leading-5">
            {formatDate(shipment.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;
