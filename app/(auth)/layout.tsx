import ContactHeader from "@/components/layout/ContactHeader";
import Footer from "@/components/layout/Footer";
import MainHeader from "@/components/layout/Header";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ContactHeader />
      <MainHeader />

      <div className="w-full max-w-[1554px] mx-auto bg-background-screen">
        {children}
        <Footer />
      </div>
    </>
  );
}
