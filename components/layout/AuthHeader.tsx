"use client";

import { cargolandLogo } from "@/assets/images";
import { Menu, UserCircleIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/hooks/useSession";
import { ArrowDown } from "../icons";

const authenticatedLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Ship",
    href: "/shipment",
  },
  {
    title: "Track",
    href: "/track-shipment",
  },
  {
    title: "My Shipment",
    href: "/my-shipment",
  },
  {
    title: "Get Quote",
    href: "/estimate",
  },
];

const AuthHeader = () => {
  const pathName = usePathname();
  const { isAuthenticated } = useSession();

  return (
    <header className="py-2 md:py-4 padding-x bg-white">
      <div className="container flex items-center justify-between">
        <Link
          href="/"
          className="relative w-28 md:w-[151px] h-10 md:h-12 shrink-0"
        >
          <Image
            src={cargolandLogo.src}
            alt="Cargoland Logo"
            className="size-full object-cover"
            fill
          />
        </Link>

        <nav className="max-md:hidden">
          <ul className="flex gap-6 lg:gap-10.5">
            {isAuthenticated &&
              authenticatedLinks.map((link, idx) => {
                const active = link.href === pathName;
                return (
                  <li
                    key={idx}
                    className={` ${
                      active ? "bg-primary/8 rounded-[4px] p-2 text-primary" : ""
                    } text-sm leading-5 flex items-center gap-1.5 hover:text-primary duration-200`}
                  >
                    <Link href={link.href}>{link.title}</Link>
                  </li>
                );
              })}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <div className="flex gap-2 max-md:hidden">
            <UserCircleIcon className="size-6" />
            <p className="leading-5">My Profile</p>
            <ArrowDown className="size-5 text-black" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <button className="p-0">
                <Menu className="hover:cursor-pointer block group-data-[state=open]:hidden" />
                <X className="hover:cursor-pointer hidden group-data-[state=open]:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              onCloseAutoFocus={(e) => e.preventDefault()}
              align="end"
              className="p-2"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/#services"
                  className="text-sm w-full leading-5 flex items-center justify-between"
                >
                  Services
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-sm leading-5">
                <Link href="/#tracking">Tracking</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-sm leading-5">
                <Link href="/#how-it-works">How It Works</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-sm leading-5">
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
