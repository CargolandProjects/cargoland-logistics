"use client";

import { SecurityLock, UserCircle, Team as Users } from "@/components/icons";
import UpdatePassword from "@/components/profile/UpdatePassword";
import UpdateProfile from "@/components/profile/UpdateProfile";
import Team from "@/components/settings/team/Team";
import Verification from "@/components/settings/Verification";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type Tabs = "PROFILE" | "VERIFICATION" | "SECURITY" | "TEAM";

const tabs: { title: Tabs; icon: React.ElementType }[] = [
  {
    title: "PROFILE",
    icon: UserCircle,
  },
  {
    title: "VERIFICATION",
    icon: ShieldCheck,
  },
  {
    title: "SECURITY",
    icon: SecurityLock,
  },
  {
    title: "TEAM",
    icon: Users,
  },
];

const SettingsPageContent = () => {
  const [activeTab, setActiveTab] = useState<Tabs>("PROFILE");
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as Tabs;

  useEffect(() => {
    if (!tab) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveTab(tab as Tabs);
  }, [tab]);

  const showActiveTab = () => {
    switch (activeTab) {
      case "PROFILE":
        return <UpdateProfile mode="B2B" />;
      case "VERIFICATION":
        return <Verification isTriggered={tab === "VERIFICATION"} />;
      case "SECURITY":
        return <UpdatePassword mode="B2B" />;
      case "TEAM":
        return <Team />;
    }
  };

  return (
    <div className="max-w-[756px] mx-auto">
      <h1 className="text-lg md:text-xl font-bold leading-7">Settings</h1>
      <p className="mt-1 md:mt-2 text-sm md:text-base font-light">
        Manage your business profile, security, and team
      </p>

      <section className="mt-5 md:mt-7 flex gap-2.5 p-1 rounded-lg bg-gray-200/80 overflow-auto hide-scrollbar">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = tab.title === activeTab;
          return (
            <Button
              onClick={() => setActiveTab(tab.title as Tabs)}
              key={idx}
              variant="ghost"
              className={`${isActive ? "bg-white hover:bg-white! text-black!" : ""} flex-1 gap-1 md:gap-2 py-0.75 md:py-1 h-auto leading-5.5 capitalize text-neutral-600/86 hover:bg-gray-400/20 transition-all duration-300`}
            >
              <Icon className="size-3.5 md:size-4" />
              {tab.title.toLowerCase()}
            </Button>
          );
        })}
      </section>

      <section className="mt-5 md:mt-7">{showActiveTab()}</section>
    </div>
  );
};

export default function SettingsPage() {
  return (
    <Suspense>
      <SettingsPageContent />
    </Suspense>
  );
}
