import ShipmentPageContent from "@/components/shipments/ShipmentPageContent";

export default async function B2BShipmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // console.log("Shipment ID: ", id);

  return <ShipmentPageContent id={id} mode="B2B" />;
}
