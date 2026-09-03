"use client";

import { cargolandLogo } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart,
  DeliveryTruckStripe,
  Home,
  Locations,
  Wallet2,
} from "../icons";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useSession } from "@/lib/hooks/useSession";

const b2bLinks = [
  {
    links: [
      {
        title: "Home",
        href: "/b2b/dashboard",
        icon: Home,
      },
      {
        title: "My Shipment",
        href: "/b2b/my-shipment",
        icon: DeliveryTruckStripe,
      },
      {
        title: "Wallet",
        href: "/b2b/wallet",
        icon: Wallet2,
      },
      {
        title: "Track Shipment",
        href: "/b2b/track-shipment",
        icon: Locations,
      },
      {
        title: "Insight",
        href: "/b2b/insights",
        icon: BarChart,
      },
    ],
  },

  {
    title: "Account",
    links: [
      {
        title: "Settings",
        href: "/b2b/settings",
        icon: Settings,
      },
    ],
  },
];

const B2BSidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const { isTeamMember } = useSession();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const pathName = usePathname();

  // Create a filter function
  const visibleLinks = b2bLinks
    .map((section) => ({
      ...section,
      links: section.links.filter((link) => {
        // Hide "Settings" and "Insight" for team members
        if (isTeamMember) {
          if (link.title === "Settings" || link.title === "Insight")
            return false;
        }
        return true;
      }),
    }))
    .filter((section) => section.links.length > 0); // remove empty sections

  return (
    <>
      <aside className="w-68 max-lg:hidden bg-secondary fixed h-screen z-10">
        {/* Logo */}
        <Link
          href="/"
          className="relative mt-7 ml-6 w-28 md:w-[151px] h-10 md:h-12 shrink-0 flex"
        >
          <Image
            src={cargolandLogo.src}
            alt="Cargoland Logo"
            className="size-full object-cover"
            fill
          />
        </Link>

        <div className="mt-5 px-2">
          {visibleLinks.map((section, idx) => {
            return (
              <div key={idx}>
                {section.title && (
                  <h3 className="mt-5 px-3 text-sm font-medium font-roboto text-gray-600 uppercase">
                    {section.title}
                  </h3>
                )}

                <ul className="space-y-2">
                  {section.links.map((link, idx) => {
                    const isActive = link.href === pathName;

                    return (
                      <li key={idx}>
                        <Link
                          href={link.href}
                          className={` ${isActive ? "bg-[#17204F]" : ""} px-4 py-3 flex gap-3 text-white rounded-md`}
                        >
                          <link.icon className="size-5 text-white" />
                          {link.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Mobile screens sidebar */}
      {isMobile && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="left"
            className="w-68 bg-secondary max-w-[277px]! gap-0"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            {/* Logo */}
            <Link
              href="/"
              className="relative mt-7 ml-6 w-28 md:w-[151px] h-10 md:h-12 shrink-0 inline-flex"
            >
              <Image
                src={cargolandLogo.src}
                alt="Cargoland Logo"
                className="size-full object-cover"
                fill
              />
            </Link>

            <div className="mt-5 px-2">
              {visibleLinks.map((section, idx) => {
                return (
                  <div key={idx}>
                    {section.title && (
                      <h3 className="mt-5 px-3 text-sm font-medium font-roboto text-gray-600 uppercase">
                        {section.title}
                      </h3>
                    )}

                    <ul className="space-y-2">
                      {section.links.map((link, idx) => {
                        const isActive = link.href === pathName;

                        return (
                          <li key={idx} onClick={() => setOpen(false)}>
                            <Link
                              href={link.href}
                              className={` ${isActive ? "bg-[#17204F]" : ""} px-4 py-3 flex gap-3 text-white rounded-md`}
                            >
                              <link.icon className="size-5 text-white" />
                              {link.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default B2BSidebar;
