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

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/hooks/useSession";
import { ArrowDown } from "../icons";
import { Button } from "../ui/button";
import { Fragment, useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import SignOutModal from "../SignOutModal";

const authenticatedLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Shipment",
    href: "/shipment",
  },
  {
    title: "Track",
    href: "/track-shipment",
  },
  {
    title: "My Shipments",
    href: "/my-shipment",
  },
  {
    title: "Get Quote",
    href: "/estimate",
  },
  {
    title: "Wallet",
    href: "/wallet",
  },
  {
    title: "Profile",
    href: "/profile",
  },
];

const homeLinks = [
  {
    title: "Shipment",
    href: "/shipment",
  },
  {
    title: "Tracking",
    href: "/track-shipment",
  },
  {
    title: "Get Quote",
    href: "/estimate",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Company",
    href: "/company",
  },
];

const Header = () => {
  const { isAuthenticated, signOut } = useSession();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const pathName = usePathname();

  const handleSignout = () => {
    signOut();
    setOpen(false);
  };

  const displayLinks = isAuthenticated ? authenticatedLinks : homeLinks; // check if user is a
  const desktopLinks = displayLinks.filter(
    (link) => link.title !== "Profile" && link.title !== "Wallet",
  );

  return (
    <header className="py-2 md:py-4 padding-x bg-white">
      <div className="container flex gap-2 items-center justify-between">
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

        {/* Desktop nav links */}
        <nav className="max-md:hidden">
          <ul className="flex gap-6 lg:gap-10.5">
            {desktopLinks.map((link, idx) => {
              const active = link.href === pathName;
              return (
                <li
                  key={idx}
                  className={` ${
                    active && "bg-primary/8 rounded-[4px] p-2 text-primary"
                  } text-sm leading-5 flex items-center gap-1.5 hover:text-primary duration-200`}
                >
                  <Link href={link.href}>{link.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          {/*  Desktop dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {isAuthenticated ? (
                <Button className="flex gap-2 max-md:hidden p-0 text-black bg-transparent hover:bg-transparent hover:underline underline-offset-[1.5px]">
                  <UserCircleIcon className="size-6" />
                  <p className="leading-5">My Profile</p>
                  <ArrowDown className="size-5 text-black" />
                </Button>
              ) : (
                <div className="flex gap-2 max-md:hidden  ">
                  <UserCircleIcon className="size-6" />
                  <p>
                    <Link
                      href="/login"
                      className="leading-5 hover:text-primary duration-200 hover:underline underline-offset-[1.5px]"
                    >
                      Login
                    </Link>
                    /
                    <Link
                      href="/signup"
                      className="leading-5 hover:text-primary duration-200 hover:underline underline-offset-[1.5px]"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              )}
            </DropdownMenuTrigger>

            {isAuthenticated && (
              <DropdownMenuContent className="max-md:hidden space-y-2 p-2">
                <DropdownMenuItem
                  asChild
                  className="p-0 font-medium leading-5.5 hover:p-2 hover:bg-primary/8! duration-200 cursor-pointer"
                >
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="p-0 font-medium leading-5.5 hover:p-2 hover:bg-primary/8! duration-200 cursor-pointer"
                >
                  <Link href="/wallet">Wallet</Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="font-medium leading-5.5 hover:p-2 hover:bg-primary/8! duration-200 cursor-pointer"
                >
                  <Button
                    onClick={() => setOpen(true)}
                    variant="ghost"
                    className="p-0 w-full justify-start h-fit text-black hover:text-destructive! hover:bg-destructive/10! font-roboto"
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>

          {/* Mobile nav links */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild className="group">
                <button className="p-0">
                  <Menu className="hover:cursor-pointer block group-data-[state=open]:hidden" />
                  <X className="hover:cursor-pointer hidden group-data-[state=open]:block" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="p-5 max-w-[277px] flex flex-col justify-between"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <ul>
                  {displayLinks.map((link, idx) => (
                    <Fragment key={idx}>
                      <li className="text-base font-normal hover:text-primary duration-200 cursor-pointer">
                        <Link
                          href={link.href}
                          className="leading-6 w-full! block"
                        >
                          {link.title}
                        </Link>
                      </li>
                      {idx !== displayLinks.length - 1 && (
                        <div className="my-4 w-full h-px bg-border" />
                      )}
                    </Fragment>
                  ))}
                </ul>

                {!isAuthenticated ? (
                  <div className="space-y-2">
                    <Button
                      onClick={() => router.push("/login")}
                      variant="outline"
                      className="h-12! w-full rounded-lg text-primary border-primary hover:text-primary"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => router.push("/signup")}
                      className="h-12! w-full rounded-lg"
                    >
                      Get Started
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setOpen(true)}
                    variant="outline"
                    className="h-12! w-full rounded-lg text-primary border-primary hover:text-primary"
                  >
                    Log Out
                  </Button>
                )}
              </SheetContent>
            </Sheet>
          )}
        </div>

        <SignOutModal
          open={open}
          setOpen={setOpen}
          handleSignout={handleSignout}
        />
      </div>
    </header>
  );
};

export default Header;
