import PopularRoutes from "@/components/pricing/PopularRoutes";
import PricingHero from "@/components/pricing/PricingHero";
import PricingLivePrices from "@/components/pricing/PricingLivePrices";

export default function PricingPage() {
  return (
    <div>
      <PricingHero />
      <PopularRoutes />
      <PricingLivePrices />
    </div>
  );
}
