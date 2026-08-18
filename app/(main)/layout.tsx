"use client";

import ContactHeader from "@/components/layout/ContactHeader";
import MainHeader from "@/components/layout/Header";
import { useSession } from "@/lib/hooks/useSession";
import { redirect } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { session, isAuthenticated } = useSession();

  if (status === "loading") return null;

  if (isAuthenticated && session?.role !== "USER") {
    redirect("/");
  }

  return (
    <>
      <ContactHeader />
      <MainHeader />

      <div className="w-full max-w-[1554px] mx-auto pb-6 bg-background-screen min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-125px)]">
        {children}
      </div>
    </>
  );
}
