import ChooseFreight from "@/components/home/ChooseFreight";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Stats />
      <ChooseFreight />
    </div>
  );
}
