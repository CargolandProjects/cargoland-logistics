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
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

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
        href: "/estimate",
        icon: Wallet2,
      },
      {
        title: "Track Shipment",
        href: "/track-shipment",
        icon: Locations,
      },
      {
        title: "Insight",
        href: "#",
        icon: BarChart,
      },
    ],
  },

  {
    title: "Account",
    links: [
      {
        title: "Settings",
        href: "#",
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
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const pathName = usePathname();

  return (
    <>
      <aside className="w-68 max-lg:hidden bg-secondary fixed h-screen">
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
          {b2bLinks.map((section, idx) => {
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
                      <li
                        key={idx}
                        className={`px-4 py-3 flex gap-3 rounded-md  ${isActive ? "bg-[#17204F]" : ""}`}
                      >
                        <link.icon className="size-5 text-white" />
                        <Link href={link.href} className="text-white">
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
            className="w-68 bg-secondary max-w-[277px]!"
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
              {b2bLinks.map((section, idx) => {
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
                          <li
                            key={idx}
                            className={`px-4 py-3 flex gap-3 rounded-md  ${isActive ? "bg-[#17204F]" : ""}`}
                          >
                            <link.icon className="size-5 text-white" />
                            <Link href={link.href} className="text-white">
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
