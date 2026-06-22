import CompanyHero from "@/components/websitePages/company/CompanyHero";
import OurMissionVision from "@/components/websitePages/company/OurMissionVision";
import Stats from "@/components/websitePages/home/Stats";

export const metadata = {
  title: "About Our Company",
  description:
    "Learn about Cargoland Logistics' mission, global network, and commitment to reliable freight forwarding across Africa and the UK.",
  keywords: [
    "about Cargoland",
    "logistics company UK",
    "freight forwarding history",
  ],
  openGraph: {
    title: "About Cargoland Logistics | Our Story",
    description:
      "Reliable road, sea, and air freight services with a global reach.",
  },
};

export default function CompanyPage() {
  return (
    <div>
      <CompanyHero />
      <Stats />
      <OurMissionVision />
    </div>
  );
}
