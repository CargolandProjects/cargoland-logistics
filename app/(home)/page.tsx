import ChooseFreight from "@/components/home/ChooseFreight";
import Faqs from "@/components/home/Faqs";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import LivePrices from "@/components/home/LivePrices";
import ShippingPrices from "@/components/home/ShippingPrices";
import Stats from "@/components/home/Stats";
import TrackShipment from "@/components/home/TrackShipment";

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
      <TrackShipment />   
    </div>
  );
}
