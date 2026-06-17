import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-background-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
