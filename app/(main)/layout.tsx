import Header from "@/components/layout/Header";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <div className="w-full max-w-[1554px] mx-auto pb-6 bg-background-screen min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-125px)]">
        {children}
      </div>
    </>
  );
}
