import PopularRoutes from "@/components/websitePages/pricing/PopularRoutes";
import PricingHero from "@/components/websitePages/pricing/PricingHero";
import PricingLivePrices from "@/components/websitePages/pricing/PricingLivePrices";

export const metadata = {
  title: "Freight Rates & Pricing",
  description: "Transparent pricing for air freight, ocean shipping, and road haulage. Get cost estimates for domestic and international cargo.",
  keywords: ["freight costs Nigeria", "shipping rates UK", "cargo pricing", "logistics quotes"],
  openGraph: {
    title: "Cargoland Pricing & Freight Rates",
    description: "Affordable and transparent shipping costs across the globe.",
  },
};

export default function PricingPage() {
  return (
    <div>
      <PricingHero />
      <PopularRoutes />
      <PricingLivePrices />
    </div>
  );
}
