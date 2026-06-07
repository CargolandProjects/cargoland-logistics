import AuthHeader from "@/components/layout/AuthHeader";

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
