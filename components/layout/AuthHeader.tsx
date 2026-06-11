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
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

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
  const { isAuthenticated, signOut } = useSession();
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  const handleSignout = () => {
    signOut();
    setOpen(false);
  };

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
          {/* Desktop nav links */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {isAuthenticated ? (
                <Button className="flex gap-2 max-md:hidden p-0 text-black bg-transparent  hover:underline underline-offset-[1.5px]">
                  <UserCircleIcon className="size-6" />
                  <p className="leading-5">My Profile</p>
                  <ArrowDown className="size-5 text-black" />
                </Button>
              ) : (
                <Link href="/login" className="flex gap-2 max-md:hidden  ">
                  <UserCircleIcon className="size-6" />
                  <p className="leading-5 hover:text-primary duration-200 hover:underline underline-offset-[1.5px]">
                    Login/Register
                  </p>
                </Link>
              )}
            </DropdownMenuTrigger>

            {isAuthenticated && (
              <DropdownMenuContent className="max-md:hidden space-y-2 p-2">
                <DropdownMenuItem
                  asChild
                  className="p-0 font-medium leading-5.5 hover:p-2 hover:bg-primary/8 duration-200 cursor-pointer"
                >
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="font-medium leading-5.5 hover:p-2 hover:bg-primary/8 duration-200 cursor-pointer"
                >
                  <Button
                    onClick={signOut}
                    className="p-0 w-full justify-start  h-fit text-black hover:text-destructive hover:destructive/10 bg-transparent font-roboto"
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>

          {/* Mobile nav links */}
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
              className="space-y-2 p-2 md:hidden"
            >
              {isAuthenticated &&
                authenticatedLinks.map((link, idx) => (
                  <DropdownMenuItem
                    key={idx}
                    asChild
                    className="p-0 font-medium hover:p-2 leading-5.5 hover:bg-primary/8 duration-200 cursor-pointer"
                  >
                    <Link href={link.href}>{link.title}</Link>
                  </DropdownMenuItem>
                ))}

              {/* Additional Actions */}
              {isAuthenticated ? (
                <>
                  <DropdownMenuItem
                    asChild
                    className="p-0 font-medium leading-5.5 hover:p-2 hover:bg-primary/8 duration-200 cursor-pointer"
                  >
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="font-medium leading-5.5 hover:p-2 hover:bg-primary/8 duration-200 cursor-pointer"
                  >
                    <Button
                      onClick={() => setOpen(true)}
                      className="p-0 w-full justify-start  h-fit text-black hover:text-destructive hover:destructive/10 bg-transparent font-roboto"
                    >
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem
                  asChild
                  className="p-0 font-medium leading-5.5 hover:p-2 hover:bg-primary/8 duration-200 "
                >
                  <Link href="/profile">Login</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="px-8 pt-15 pb-10 gap-0">
            <DialogHeader className="gap-4">
              <DialogTitle className="text-2xl font-semibold leading-8">
                Logout
              </DialogTitle>
              <DialogDescription className="text-base leading-5">
                Are you sure you want to Log out of your account?{" "}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex items-center justify-end gap-2 font-roboto ">
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                className="flex-1 h-13.75 border-[1.5px] border-slate-300 rounded-md text-base"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSignout}
                className=" flex-1 h-13.75 rounded-md text-base"
              >
                Log Out
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default AuthHeader;
