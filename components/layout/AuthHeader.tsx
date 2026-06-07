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
import { Button } from "../ui/button";

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
  const { isAuthenticated, signOut } = useSession();

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
                      active
                        ? "bg-primary/8 rounded-[4px] p-2 text-primary"
                        : ""
                    } text-sm leading-5 flex items-center gap-1.5 hover:text-primary duration-200`}
                  >
                    <Link href={link.href}>{link.title}</Link>
                  </li>
                );
              })}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex gap-2 max-md:hidden p-0 text-black bg-transparent  hover:underline underline-offset-[1.5px]">
                <UserCircleIcon className="size-6" />
                <p className="leading-5">My Profile</p>
                <ArrowDown className="size-5 text-black" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="gap-4 p-2">
              <DropdownMenuItem className=" font-medium leading-5.5 hover:p-2 hover:bg-primary/8 duration-200">
                <Link href="/profile">My Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuItem className=" font-medium leading-5.5 hover:p-2 hover:bg-primary/8 duration-200">
                <Button onClick={signOut} className="p-0 h-fit text-black bg-transparent">Logout</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
              {authenticatedLinks.map((link, idx) => (
                <DropdownMenuItem
                  key={idx}
                  asChild
                  className="text-sm leading-5"
                >
                  <Link href={link.href}>{link.title}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild className="text-sm leading-5">
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
