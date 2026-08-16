import TrackShipment from "@/components/websitePages/home/TrackShipment";
import Footer from "@/components/layout/Footer";
import ContactHeader from "@/components/layout/ContactHeader";
import MainHeader from "@/components/layout/Header";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ContactHeader />
      <MainHeader />
      
      <div className="w-full max-w-[1554px] mx-auto bg-white">
        {children}
        <TrackShipment />
        <Footer />
      </div>{" "}
    </>
  );
}
