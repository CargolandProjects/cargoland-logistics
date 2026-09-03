"use client";

import ChooseFreight from "@/components/websitePages/home/ChooseFreight";
import Faqs from "@/components/websitePages/home/Faqs";
import Hero from "@/components/websitePages/home/Hero";
import HowItWorks from "@/components/websitePages/home/HowItWorks";
import LivePrices from "@/components/websitePages/home/LivePrices";
import Stats from "@/components/websitePages/home/Stats";
import WhyChooseUs from "@/components/websitePages/home/WhyChooseUs";
import { useSession } from "@/lib/hooks/useSession";

export default function HomePage() {
  const { session, status, isTeamMember } = useSession();
  
  console.log("Session:", session, status, isTeamMember);
  return (
    <div>
      <Hero />
      <Stats />
      <ChooseFreight />
      <WhyChooseUs />
      {/* <ShippingPrices /> */}
      <LivePrices />
      <HowItWorks />
      <Faqs />
    </div>
  );
}
