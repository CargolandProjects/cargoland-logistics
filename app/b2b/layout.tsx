"use client";

import B2BHeader from "@/components/layout/B2BHeader";
import B2BSidebar from "@/components/layout/B2BSidebar";
import { useSession } from "@/lib/hooks/useSession";
import { redirect } from "next/navigation";
import React from "react";

export default function B2BLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { session, status } = useSession();

  if (status === "loading") return null;

  if (session?.role !== "B2B") {
    redirect("/");
  }
  return (
    <div className="w-full max-w-[1554px] mx-auto bg-background-screen flex">
      <B2BSidebar />
      <div className="flex-1 lg:ml-68">
        <B2BHeader />
        <div className="px-4 md:px-10 py-12">{children}</div>
      </div>
    </div>
  );
}
