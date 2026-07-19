import AuthHeader from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full max-w-[1554px] mx-auto bg-background-screen">
      <AuthHeader />
      {children}
      <Footer />
    </div>
  );
}
