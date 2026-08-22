"use client";

import { User } from "@/components/icons";
import UpdatePassword from "@/components/profile/UpdatePassword";
import UpdateProfile from "@/components/profile/UpdateProfile";
import Team from "@/components/settings/team/Team";
import Verification from "@/components/settings/Verification";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldPlus, UserCircle, Users2 } from "lucide-react";
import { useState } from "react";

type Tabs = "Profile" | "Verification" | "Security" | "Team";

const tabs = [
  {
    title: "Profile",
    icon: UserCircle,
  },
  {
    title: "Verification",
    icon: ShieldCheck,
  },
  {
    title: "Security",
    icon: ShieldPlus,
  },
  {
    title: "Team",
    icon: Users2,
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tabs>("Profile");

  const showActiveTab = () => {
    switch (activeTab) {
      case "Profile":
        return <UpdateProfile mode="B2B" />;
      case "Verification":
        return <Verification />;
      case "Security":
        return <UpdatePassword mode="B2B" />;
        case "Team":
          return <Team />
    }
  };

  return (
    <div className="max-w-[756px] mx-auto">
      <h1 className="text-lg md:text-xl font-bold leading-7">Settings</h1>
      <p className="mt-1 md:mt-2 text-sm md:text-base font-light">
        Manage your business profile, security, and team
      </p>

      <section className="mt-5 md:mt-7 flex gap-2.5 p-1 rounded-lg bg-gray-200 transition-all duration-200 overflow-auto hide-scrollbar">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = tab.title === activeTab;
          return (
            <Button
              onClick={() => setActiveTab(tab.title as Tabs)}
              key={idx}
              variant="ghost"
              className={`${isActive ? "bg-white hover:bg-white! text-black!" : ""} flex-1 gap-1 md:gap-2 py-0.75 md:py-1 h-auto leading-5.5 text-neutral-600/86 hover:bg-gray-400/20 transition-all duration-200`}
            >
              <Icon className="size-3.5 md:size-6" />
              {tab.title}
            </Button>
          );
        })}
      </section>

      <section className="mt-5 md:mt-7">{showActiveTab()}</section>
    </div>
  );
}
