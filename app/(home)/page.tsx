import ChooseFreight from "@/components/home/ChooseFreight";
import Hero from "@/components/home/Hero";
import LivePrices from "@/components/home/LivePrices";
import ShippingPrices from "@/components/home/ShippingPrices";
import Stats from "@/components/home/Stats";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Stats />
      <ChooseFreight />
      <ShippingPrices />
      <LivePrices />
    </div>
  );
}
