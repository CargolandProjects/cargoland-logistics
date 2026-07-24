import TrackShipment from "@/components/websitePages/home/TrackShipment";
import Footer from "@/components/layout/Footer";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full max-w-[1554px] mx-auto bg-white">
      {children}
      <TrackShipment />
      <Footer />
    </div>
  );
}
