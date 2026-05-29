import AuthHeader from "@/components/layout/AuthHeader";
import Footer from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AuthHeader />
      <div className="pb-6 bg-background-screen min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-125px)] ">
        {children}
      </div>
    </>
  );
}
