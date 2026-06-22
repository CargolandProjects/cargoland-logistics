import ChooseFreight from "@/components/websitePages/home/ChooseFreight";
import Faqs from "@/components/websitePages/home/Faqs";
import Hero from "@/components/websitePages/home/Hero";
import HowItWorks from "@/components/websitePages/home/HowItWorks";
import LivePrices from "@/components/websitePages/home/LivePrices";
import ShippingPrices from "@/components/websitePages/home/ShippingPrices";
import Stats from "@/components/websitePages/home/Stats";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Stats />
      <ChooseFreight />
      <ShippingPrices />
      <LivePrices />
      <HowItWorks />
      <Faqs />
    </div>
  );
}
