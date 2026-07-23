import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const localPricingSchema = z.object({
  shipmentType: z.enum(["DOMESTIC", "INTERNATIONAL"], {
    error: "Please select a shipment type",
  }),
  fromState: z.string().min(2, "Origin State is required").max(100),
  fromCity: z.string().min(2, "Origin City is required").max(100),
  toWhereState: z.string().min(2, "Destination state is required").max(100),
  toWhereCity: z.string().min(2, "Destination city is required").max(100),
  weight: z
    .string("Weight is required")
    .min(0.1, "Weight must be at least 0.1 kg")
    .max(10000, "Weight cannot exceed 10000 kg")
    .regex(/^\d+(\.\d+)?$/, "Must be a valid number"),
});

type LocalPricingData = z.infer<typeof localPricingSchema>;

const DomesticPricingTab = () => {
  const { handleSubmit, control } = useForm<LocalPricingData>({
    resolver: zodResolver(localPricingSchema),
    defaultValues: {
      shipmentType: "DOMESTIC",
      fromState: "",
      fromCity: "",
      toWhereState: "",
      toWhereCity: "",
      weight: "",
    },
  });
  return <form>DomesticPricingTab</form>;
};

export default DomesticPricingTab;
