import TrackShipment from "@/components/websitePages/home/TrackShipment";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="max-w-[1554px] mx-auto bg-white">
      <Header />
      {children}
      <TrackShipment />
      <Footer />
    </div>
  );
}
