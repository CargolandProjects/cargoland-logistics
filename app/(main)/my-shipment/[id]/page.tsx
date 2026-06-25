import ShipmentPageContent from "@/components/shipments/ShipmentPageContent";

export default async function ShipmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log("Shipment ID: ", id);

  return <ShipmentPageContent id={id} />;
}
