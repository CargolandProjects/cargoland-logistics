"use client";

import B2BHeader from "@/components/layout/B2BHeader";
import B2BSidebar from "@/components/layout/B2BSidebar";
import { useSession } from "@/lib/hooks/useSession";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export default function B2BLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { session, status } = useSession();
  const [openMenu, setOpenMenu] = useState(false);

  if (status === "loading") return null;

  if (session?.role !== "B2B") {
    redirect("/");
  }

  return (
    <div className="w-full bg-background-screen flex">
      <B2BSidebar open={openMenu} setOpen={setOpenMenu} />
      <div className="flex-1 lg:ml-68 w-full">
        <B2BHeader setOpenMenu={setOpenMenu} />
        <div className="px-4 md:px-10 py-9 md:py-12 w-full ">{children}</div>
      </div>
    </div>
  );
}
